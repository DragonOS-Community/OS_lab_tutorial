---
sidebar: auto
---

# 文件系统

## 本章导读

本章意在介绍文件系统相关知识，包括虚拟文件系统、ramfs。

## DragonOS文件系统的架构设计

首先，我们来总览一下DragonOS文件系统的架构设计。相关的机制主要包括以下几个部分：

>- 系统调用接口
>
>- 虚拟文件系统
>
>>文件抽象（File）
>>
>>挂载文件系统（MountFS）
>
>- 具体的文件系统

如图所示：

![图片1](../../.vuepress/public/DragonOS/DragonOS.png '文件系统架构设计')

其中我们可以看到，中间部分作为接口对多个并行的物理文件系统实例（每一个都叫做文件系统的实现）提供支持。这就是虚拟文件系统。

## 虚拟文件系统

`虚拟文件系统`（Virtual File System，缩写为`VFS`）是计算机操作系统中的一个抽象层，它提供了文件系统的标准化接口，使得应用程序可以通过统一的方式访问各种不同类型的文件系统。

其设计目的是将文件系统的实现细节与应用程序分离，使得应用程序可以独立于底层文件系统的具体实现方式。它定义了一组通用的文件操作接口，如打开文件、关闭文件、读取文件、写入文件等，应用程序可以通过这些接口来访问和操作文件，而无需关心文件系统的底层细节。例如，一个应用程序可以通过虚拟文件系统接口打开一个文件，而不需要关心这个文件是存储在本地磁盘上的普通文件，还是位于远程服务器上的网络文件。虚拟文件系统会将这些不同类型的文件系统映射到一个统一的文件层次结构中，使得应用程序可以以相同的方式访问这些文件。

在*DragonOS*中，VFS作为适配器，遮住了具体文件系统之间的差异，对外提供统一的文件操作接口抽象。

VFS是DragonOS文件系统的核心，它提供了一套统一的文件系统接口，使得DragonOS可以支持多种不同的文件系统。VFS的主要功能包括：

>提供统一的文件系统接口
>
>提供文件系统的挂载和卸载机制（MountFS）
>
>提供文件抽象（File）
>
>提供文件系统的抽象（FileSystem）
>
>提供IndexNode抽象

## VFS的架构设计

![图片2](../../.vuepress/public/DragonOS/vfs_archi_design.png 'vfs架构设计')

### File

`File`结构体是VFS中最基本的抽象，它代表了一个打开的文件。每当进程打开了一个文件，就会创建一个File结构体，用于维护该文件的状态信息。

```rust
/// @brief 抽象文件结构体
pub struct File {
    inode: Arc<dyn IndexNode>,
    /// 对于文件，表示字节偏移量；对于文件夹，表示当前操作的子目录项偏移量
    offset: usize,
    /// 文件的打开模式
    mode: FileMode,
    /// 文件类型
    file_type: FileType,
    /// readdir时候用的，暂存的本次循环中，所有子目录项的名字的数组
    readdir_subdirs_name: Vec<String>,
    pub private_data: FilePrivateData,
}
```

### Traits

对于每个具体文件系统，都需要实现以下的trait：

FileSystem：表明某个struct是一个文件系统

```rust
pub trait FileSystem: Any + Sync + Send + Debug {
    /// @brief 获取当前文件系统的root inode的指针
    fn root_inode(&self) -> Arc<dyn IndexNode>;

    /// @brief 获取当前文件系统的信息
    fn info(&self) -> FsInfo;

    /// @brief 本函数用于实现动态转换。
    /// 具体的文件系统在实现本函数时，最简单的方式就是：直接返回self
    fn as_any_ref(&self) -> &dyn Any;
}
```

`IndexNode`： 表明某个struct是一个索引节点

```rust
pub trait IndexNode: Any + Sync + Send + Debug {
   /// 以下陈列部分函数

   /// @brief 打开文件
   /// @return 成功：Ok()
   ///         失败：Err(错误码)
   fn open(&self, _data: &mut FilePrivateData, _mode: &FileMode) -> Result<(), SystemError> {
       // 若文件系统没有实现此方法，则返回“不支持”
       return Err(SystemError::EOPNOTSUPP_OR_ENOTSUP);
   }

   /// @brief 关闭文件
   /// @return 成功：Ok()
   ///         失败：Err(错误码)
    fn close(&self, _data: &mut FilePrivateData) -> Result<(), SystemError> {
        // 若文件系统没有实现此方法，则返回“不支持”
        return Err(SystemError::EOPNOTSUPP_OR_ENOTSUP);
    }

    /// @brief 在inode的指定偏移量开始，读取指定大小的数据
    /// @param offset 起始位置在Inode中的偏移量
    /// @param len 要读取的字节数
    /// @param buf 缓冲区. 请注意，必须满足@buf.len()>=@len
    /// @param _data 各文件系统系统所需私有信息
    /// @return 成功：Ok(读取的字节数)
    ///         失败：Err(Posix错误码)
    fn read_at(
        &self,
        offset: usize,
        len: usize,
        buf: &mut [u8],
        _data: &mut FilePrivateData,
    ) -> Result<usize, SystemError>;

    /// @brief 在inode的指定偏移量开始，写入指定大小的数据（从buf的第0byte开始写入）
    /// @param offset 起始位置在Inode中的偏移量
    /// @param len 要写入的字节数
    /// @param buf 缓冲区. 请注意，必须满足@buf.len()>=@len
    /// @param _data 各文件系统系统所需私有信息
    /// @return 成功：Ok(写入的字节数)
    ///         失败：Err(Posix错误码)
    fn write_at(
        &self,
        offset: usize,
        len: usize,
        buf: &[u8],
        _data: &mut FilePrivateData,
    ) -> Result<usize, SystemError>;

    /// @brief 在当前目录下创建一个新的inode，并传入一个简单的data字段，方便进行初始化。
    /// @param name 目录项的名字
    /// @param file_type 文件类型
    /// @param mode 权限
    /// @param data 用于初始化该inode的数据。（为0则表示忽略此字段）对于不同的文件系统来说，代表的含义可能不同。
    /// @return 创建成功：返回Ok(新的inode的Arc指针)
    /// @return 创建失败：返回Err(错误码)
    fn create_with_data(
        &self,
        _name: &str,
        _file_type: FileType,
        _mode: u32,
        _data: usize,
    ) -> Result<Arc<dyn IndexNode>, SystemError> {
        // 若文件系统没有实现此方法，则返回“不支持”
        return Err(SystemError::EOPNOTSUPP_OR_ENOTSUP);
    }

    ...
}
```

一般情况下，FileSystem和IndexNode是一对一的关系，也就是，一个文件系统对应一种IndexNode。但是，对于某些特殊的文件系统，比如DevFS，根据不同的设备类型，会有不同的IndexNode，因此，FileSystem和IndexNode是一对多的关系。

### MountFS

`挂载文件系统`是将一个磁盘分区或者远程的存储设备连接到计算机文件系统中的一个过程。当我们需要访问一个磁盘分区或者远程存储设备时，首先要确定其所属的文件系统类型，然后再将它挂载到指定的目录下。这样，在访问该目录时就可以直接读取或写入外部设备上的数据了。

```rust
pub struct MountFS {
    // MountFS内部的文件系统
    inner_filesystem: Arc<dyn FileSystem>,
    /// 用来存储InodeID->挂载点的MountFS的B树
    mountpoints: SpinLock<BTreeMap<InodeId, Arc<MountFS>>>,
    /// 当前文件系统挂载到的那个挂载点的Inode
    self_mountpoint: Option<Arc<MountFSInode>>,
    /// 指向当前MountFS的弱引用
    self_ref: Weak<MountFS>,
}
```

```rust
/// @brief MountFS的Index Node 
/// 注意，这个IndexNode只是一个中间层。它的目的是将具体文件系统的Inode与挂载机制连接在一起。
pub struct MountFSInode {
    /// 当前挂载点对应到具体的文件系统的Inode
    inner_inode: Arc<dyn IndexNode>,
    /// 当前Inode对应的MountFS
    mount_fs: Arc<MountFS>,
    /// 指向自身的弱引用
    self_ref: Weak<MountFSInode>,
}
```

虽然其实现了FileSystem和IndexNode这两个trait，但它并不是一个“文件系统”，而是一种机制，用于将不同的文件系统挂载到同一个文件系统树上。所有的文件系统要挂载到文件系统树上，都需要通过`MountFS`来完成。也就是说，挂载树上的每个文件系统结构体的外面，都套了一层MountFS结构体。

对于大部分的操作，MountFS都是直接转发给具体的文件系统，而不做任何处理。同时，为了支持跨文件系统的操作，比如在目录树上查找，每次`lookup`操作或者是`find`操作，都会通过`MountFSInode`的对应方法，判断当前inode是否为挂载点，并对挂载点进行特殊处理。如果发现操作跨越了具体文件系统的边界，MountFS就会将操作转发给下一个文件系统，并执行Inode替换。这个功能的实现，也是通过在普通的Inode结构体外面，套一层MountFSInode结构体来实现的。

## RamFS

ramfs是vfs下具体实现的一种基于RAM做存储的文件系统，主要实现了以下功能：

- `read_at`: 读
- `write_at`: 写
- `poll`: 获取文件状态
- `resize`: 重置用于存放数据的data的大小
- `create_with_data`: 创建自带数据的文件
- `link**`: 链接
- `unlink`: 解链接
- `rmdir`: 删除文件夹
- `move`: 移动文件
- `find`: 查找文件
- `list`: 显示当前文件夹下的内容
