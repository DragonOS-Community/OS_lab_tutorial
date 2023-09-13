---
sidebar: auto
---

# 文件系统

## 补写代码

### 创建文件

ramfs的基本功能在/kernel/src/filesystem/ramfs/mod.rs中，实现过程中请参考文件../vfs/mod.rs以及已实现函数的相关代码和注释。在实现基本的文件操作之前，需要先实现创建文件结构的辅助函数：create_with_data。其用于创建文件时，在父目录下创建带初始化数据的inode。

>练习1：实现位于/kernel/src/filesystem/ramfs/mod.rs中的 create_with_data。

```rust
    // 该函数用于在当前目录下创建一个新的inode，并传入一个简单的data字段，方便进行初始化。
    // 需要判断当前inode是否是文件且是否重名，接着创建inode进行初始化。
    fn create_with_data(
        &self,
        name: &str,
        file_type: FileType,
        mode: u32,
        data: usize,
    ) -> Result<Arc<dyn IndexNode>, SystemError> {
        // 获取当前inode
        let mut inode = self.0.lock();
        
        // LAB TODO BEGIN

        // LAB TODO END

        // 初始化inode的自引用的weak指针
        result.0.lock().self_ref = Arc::downgrade(&result);

        // 将子inode插入父inode的B树中
        inode.children.insert(String::from(name), result.clone());

        return Ok(result);
    }
```

### 文件读写

文件读写是文件系统的基本功能，ramfs的读写操作会将文件数据块中内容读入内存缓冲区，或将缓冲区内容写入对应文件数据块。`read_at`和 `write_at`两个函数分别用于以一定偏移量读取和写入一段长度的数据，并且返回实际的读写字节长度 （读取不能超过文件大小）

>练习2：实现位于/kernel/src/filesystem/ramfs/mod.rs中的 read_at和 write_at。

```rust
    // 该函数用于实现对文件以一定偏移量读取一段长度的数据，并且返回实际的读字节长度。
    // 首先检查当前inode是否为一个文件，然后计算读文件的偏移量，最后拷贝数据（copy_from_slice）。
    fn read_at(
        &self,
        offset: usize,
        len: usize,
        buf: &mut [u8],
        _data: &mut FilePrivateData,
    ) -> Result<usize, SystemError> {
        if buf.len() < len {
            return Err(SystemError::EINVAL);
        }
        // 加锁
        let inode: SpinLockGuard<RamFSInode> = self.0.lock();

        // LAB TODO BEGIN

        // LAB TODO END

        return Ok(src.len());
    }

    // 该函数用于实现对文件以一定偏移量写一段长度的数据，并且返回实际的写字节长度。
    // 首先检查当前inode是否为一个文件，如果文件大小比原来的大，那就resize这个数组，最后将数据写入（copy_from_slice）。
    fn write_at(
        &self,
        offset: usize,
        len: usize,
        buf: &[u8],
        _data: &mut FilePrivateData,
    ) -> Result<usize, SystemError> {
        if buf.len() < len {
            return Err(SystemError::EINVAL);
        }

        // 加锁
        let mut inode: SpinLockGuard<RamFSInode> = self.0.lock();

        // 检查当前inode是否为一个文件夹，如果是的话，就返回错误
        if inode.metadata.file_type == FileType::Dir {
            return Err(SystemError::EISDIR);
        }

        // LAB TODO BEGIN

        // LAB TODO END

        return Ok(len);
    }
```

## 实现 myramfs

> 练习3：模仿 ramfs 实现 my_ramfs，并更正 ramfs

原 ramfs 其实是有点小问题的，需要在 my_ramfs 更正后再测试，具体如下：

### open和close

测试代码中打开文件调用的`open`函数，最终会进行系统调用，在 **kernel/src/syscall** 中，标志是`SYS_OPEN`

```rust
SYS_OPEN => {
    let path: &CStr = unsafe { CStr::from_ptr(args[0] as *const c_char) };
    let path: Result<&str, core::str::Utf8Error> = path.to_str();
    let res = if path.is_err() {
        Err(SystemError::EINVAL)
    } else {
        let path: &str = path.unwrap();
        let flags = args[1];
        let open_flags: FileMode = FileMode::from_bits_truncate(flags as u32);
        Self::open(path, open_flags)
    };
    res
}
```

检查文件路径正确后会调用同级目录下的 **syscall.rs** 中的 open 函数

测试代码中的关闭文件调用`close`函数也和 open 类似，标志为`SYS_CLOSE`，然后调用 **syscall.rs** 中的 close 函数

```rust
SYS_CLOSE => {
    let fd = args[0];
    Self::close(fd)
}
```

再看 **kernel/vfs/mod.rs** 的`IndexNode`接口中

```rust
pub trait IndexNode: Any + Sync + Send + Debug {
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
}
```

如果文件系统没有具体实现 open 和 close 函数，就返回不支持，所以这就是出错的原因

**解决方式：**

在我们模仿的 ramfs 文件系统里，添加 open 和 close 函数的具体实现，如下：

```rust
fn open(&self, _data: &mut FilePrivateData, _mode: &super::vfs::file::FileMode) -> Result<(), SystemError> {
    return Ok(());
}

fn close(&self, _data: &mut FilePrivateData) -> Result<(), SystemError> {
    return Ok(());
}
```

### fopen

测试代码中我们用到了`fopen`来打开文件，第二个参数的"w+"的含义可以在 **user/libs/libc/src/stdio.c** 文件中查看，表示读写文件，并且如果文件不存在的话就创建这个文件

 fopen 的系统调用也是 SYS_OPEN ，但是和 open 的区别在于：

```rust
// 如果O_TRUNC，并且，打开模式包含O_RDWR或O_WRONLY，清空文件
if mode.contains(FileMode::O_TRUNC)
    && (mode.contains(FileMode::O_RDWR) || mode.contains(FileMode::O_WRONLY))
    && file_type == FileType::File
{
    inode.truncate(0)?;
}
```

 fopen 在满足条件的情况下会调用`truncate`函数，这个函数和 open 、close 一样，也是定义在 **vfs/mod.rs** 中的 IndexNode 接口中，但是没有具体实现，需要文件系统自己实现，如下：

```rust
/// @brief 截断当前inode到指定的长度。如果当前文件长度小于len,则不操作。
///
/// @param len 要被截断到的目标长度
fn truncate(&self, _len: usize) -> Result<(), SystemError> {
    return Err(SystemError::EOPNOTSUPP_OR_ENOTSUP);
}
```

**解决方式：**

所以需要在我们模仿的 ramfs 中，添加 truncate 的具体实现，如下：

```rust
fn truncate(&self, _len: usize) -> Result<(), SystemError> {
    let mut inode = self.0.lock();
    if inode.metadata.file_type == FileType::Dir {
        return Err(SystemError::EISDIR);
    }
    inode.data.resize(_len,0);
    return Ok(());
}
```

## 测试文件系统

测试我们模仿实现的 my_ramfs

### 创建测试文件夹

在 **DragonOS/user/apps** 目录下新建一个文件夹 **my_test**

### 配置文件

#### 拷贝文件

找到 **DragonOS/user/apps** 目录下其他测试文件夹（例如：test_fstat）的两个文件：**link.lds** + **Makefile**，将这两个文件拷贝到我们新建的测试文件夹 **my_test** 中

#### 更改Makefile内容

将 **Makefile** 中的测试目录名改回来，假设拷贝的是 test_fstat 目录的，则按如下修改：

#### test_fstat/Makefile

```Makefile
CC=$(DragonOS_GCC)/x86_64-elf-gcc
LD=ld
OBJCOPY=objcopy
# 修改这里，把它改为你的relibc的sysroot路径
RELIBC_OPT=$(DADK_BUILD_CACHE_DIR_RELIBC_0_1_0)
CFLAGS=-I $(RELIBC_OPT)/include -D__dragonos__

tmp_output_dir=$(ROOT_PATH)/bin/tmp/user
output_dir=$(DADK_BUILD_CACHE_DIR_TEST_FSTAT_0_1_0)

LIBC_OBJS:=$(shell find $(RELIBC_OPT)/lib -name "*.o" | sort )
LIBC_OBJS+=$(RELIBC_OPT)/lib/libc.a

all: main.o
	mkdir -p $(tmp_output_dir)
	
	$(LD) -b elf64-x86-64 -z muldefs -o $(tmp_output_dir)/test_fstat  $(shell find . -name "*.o") $(LIBC_OBJS) -T link.lds

	$(OBJCOPY) -I elf64-x86-64 -R ".eh_frame" -R ".comment" -O elf64-x86-64 $(tmp_output_dir)/test_fstat $(output_dir)/test_fstat.elf
	
	mv $(output_dir)/test_fstat.elf $(output_dir)/test_fstat
main.o: main.c
	$(CC) $(CFLAGS) -c main.c  -o main.o

clean:
	rm -f *.o
```

#### my_test/Makefile

```Makefile
CC=$(DragonOS_GCC)/x86_64-elf-gcc
LD=ld
OBJCOPY=objcopy
# 修改这里，把它改为你的relibc的sysroot路径
RELIBC_OPT=$(DADK_BUILD_CACHE_DIR_RELIBC_0_1_0)
CFLAGS=-I $(RELIBC_OPT)/include -D__dragonos__

tmp_output_dir=$(ROOT_PATH)/bin/tmp/user
output_dir=$(DADK_BUILD_CACHE_DIR_MY_TEST_0_1_0)

LIBC_OBJS:=$(shell find $(RELIBC_OPT)/lib -name "*.o" | sort )
LIBC_OBJS+=$(RELIBC_OPT)/lib/libc.a

all: main.o
	mkdir -p $(tmp_output_dir)
	
	$(LD) -b elf64-x86-64 -z muldefs -o $(tmp_output_dir)/my_test  $(shell find . -name "*.o") $(LIBC_OBJS) -T link.lds

	$(OBJCOPY) -I elf64-x86-64 -R ".eh_frame" -R ".comment" -O elf64-x86-64 $(tmp_output_dir)/my_test $(output_dir)/my_test.elf
	
	mv $(output_dir)/my_test.elf $(output_dir)/my_test
main.o: main.c
	$(CC) $(CFLAGS) -c main.c  -o main.o

clean:
	rm -f *.o
```

将代码里的 **test_fstat** 改为 **my_test**（**PS:** 注意区分大小写）

## 配置dadk

### 拷贝文件

在 **DragonOS/user/dadk/config** 目录下模仿其它文件新建一个文件 **my_test-0.1.0.dadk**（**PS:** 这里的my_test和我们在第一步创建的测试目录名相同），然后拷贝其他文件的内容到里面，比如拷贝 **test_fstat-0.1.0.dadk**

### 更改dadk内容

还是和之前类似，按如下修改：

#### **test_fstat-0.1.0.dadk**

```dadk
{
  "name": "test_fstat",
  "version": "0.1.0",
  "description": "一个用来测试fstat能够正常运行的app",
  "task_type": {
    "BuildFromSource": {
      "Local": {
        "path": "apps/test_fstat"
      }
    }
  },
}
```

#### **my_test-0.1.0.dadk**

```dadk
{
  "name": "my_test",
  "version": "0.1.0",
  "description": "一个用来测试ramfs能够正常运行的app",
  "task_type": {
    "BuildFromSource": {
      "Local": {
        "path": "apps/my_test"
      }
    }
  },
}
```

将代码里的 **test_fstat** 都改成 **my_test**

## 挂载文件系统

将你要测试的文件系统挂载到我们的操作系统上面

打开 **DragonOS/kernel/src/filesystem/vfs/core.rs** 文件

### 导入

导入你自己实现的文件系统，比如我这里是模仿ramfs写了一个my_ramfs，就按如下添加：

```rust
use crate::{
    driver::disk::ahci::{self},
    filesystem::{
        devfs::DevFS,
        fat::fs::FATFileSystem,
        procfs::ProcFS,
        my_ramfs::RamFS,
        sysfs::SysFS,
        vfs::{mount::MountFS, FileSystem, FileType},
    },
    include::bindings::bindings::PAGE_4K_SIZE,
    kerror, kinfo,
    syscall::SystemError,
};
```

### 创建文件夹、实例并挂载

在`vfs_init`函数中：

模仿其它文件系统创建当前准备测试的文件系统的文件夹，如下：

```rust
// 创建文件夹
root_inode
    .create("proc", FileType::Dir, 0o777)
    .expect("Failed to create /proc");
root_inode
    .create("dev", FileType::Dir, 0o777)
    .expect("Failed to create /dev");
root_inode
    .create("sys", FileType::Dir, 0o777)
    .expect("Failed to create /sys");

// 添加至这里

root_inode
    .create("ram", FileType::Dir, 0o777)
    .expect("Failed to create /ram");
```

紧接着在下面创建 ramfs 实例，并挂载，照样是模仿其它文件系统挂载，如下：

```rust
// 创建 sysfs 实例
let sysfs: Arc<SysFS> = SysFS::new();
// sysfs 挂载
let _t = root_inode
    .find("sys")
    .expect("Cannot find /sys")
    .mount(sysfs)
    .expect("Failed to mount sysfs");
kinfo!("SysFS mounted.");

// 添加至这里

// // 创建ramfs实例
let ramfs: Arc<RamFS> = RamFS::new();
// ramfs挂载
let _t = root_inode
    .find("ram")
    .expect("Cannot find /ram")
    .mount(ramfs)
    .expect("Failed to mount ramfs.");
kinfo!("RamFS mounted.");
```

### 迁移伪文件系统的inode

在 **migrate_virtual_filesystem** 函数中：

#### 获取inode

模仿其它文件系统获取ramfs的inode，如下：

```rust
// ==== 在这里获取要被迁移的文件系统的inode ===
let binding = ROOT_INODE().find("proc").expect("ProcFS not mounted!").fs();
let proc: &MountFS = binding.as_any_ref().downcast_ref::<MountFS>().unwrap();
let binding = ROOT_INODE().find("dev").expect("DevFS not mounted!").fs();
let dev: &MountFS = binding.as_any_ref().downcast_ref::<MountFS>().unwrap();
let binding = ROOT_INODE().find("sys").expect("SysFs not mounted!").fs();
let sys: &MountFS = binding.as_any_ref().downcast_ref::<MountFS>().unwrap();

// 添加至这里

let binding = ROOT_INODE().find("ram").expect("RamFs not mounted!").fs();
let ram: &MountFS = binding.as_any_ref().downcast_ref::<MountFS>().unwrap();
```

#### 迁移到新的文件系统下

```rust
// 把上述文件系统,迁移到新的文件系统下
do_migrate(new_root_inode.clone(), "proc", proc)?;
do_migrate(new_root_inode.clone(), "dev", dev)?;
do_migrate(new_root_inode.clone(), "sys", sys)?;

// 添加至这里

do_migrate(new_root_inode.clone(), "ram", ram)?;
```

## 开始测试

至此，我们就可以开始测试文件系统了。

在之前我们新建的测试文件夹 **DragonOS/user/apps/my_test** 目录下添加 **main.c** 文件，用来测试文件系统的开、关、读、写

测试的过程中会出现一些问题，具体原因在上文的 **ramfs的更正** 中

```c
#include<sys/types.h>
#include<sys/stat.h>
#include<fcntl.h>
#include<unistd.h>
#include<stdio.h>

int main(){
    //需要先创建文件夹
    int check=-1;
    check = mkdir("/ram/test_0",0777);
    if(check!=0){
        printf("Cannot create dir: /ram/test_0\n");
        return;
    }
    check=-1;
    check = mkdir("/ram/test_1",0777);
    if(check!=0){
        printf("Cannot create dir: /ram/test_1\n");
        return;
    }

    //测试open+close+write+read
    printf("Test open/close/write/read\n");
    int fd=-1;
    fd=open("/ram/test_0/file_0.txt",O_WRONLY | O_CREAT);
    if(fd<0){
        printf("Open file failed!\n");
        return;
    }
    printf("File opened successfully!\n");
    const char* write_ptr = "Write str here";
    write(fd,write_ptr,strlen(write_ptr));
    printf("Having written:%s\n",write_ptr);
    close(fd);
    printf("File closed successfully!\n");

    //测试open+close+read
    fd=open("/ram/test_0/file_0.txt",O_WRONLY | O_CREAT);
    if(fd<0){
        printf("Open file failed!\n");
        return;
    }
    printf("File opened successfully!\n");
    char* buf[64];
    read(fd,buf,64);
    printf("Having read:%s\n",buf);
    close(fd);
    printf("File closed successfully!\n");

    //测试fopen+fclose+fputs
    printf("\nTest fopen/fclose/fputs/fgets\n");
    FILE* file = fopen("/ram/test_1/file_0.txt","w+");
    if(file == NULL){
        printf("Fopen file failed!\n");
        return;
    }
    printf("File opened successfully!\n");
    const char* fputs_ptr = "Fputs str here";
    fputs(fputs_ptr,file);
    printf("Having fput: %s\n",fputs_ptr);
    fclose(file);
    printf("File closed successfully!\n");

    //测试fopen+fclose+fgets
    file = fopen("/ram/test_1/file_0.txt","r+");
    if(file==NULL){
        printf("Fopen file failed!\n");
        return;
    }
    char* buf1[64];
    fgets(buf1,64,file);
    printf("Having got: %s\n",buf1);
    fclose(file);
    printf("File closed successfully!\n");
}
```
