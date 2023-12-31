---
sidebar: auto
---

# Lab-1 熟悉类Linux系统的命令

## 本节导读

通过练习掌握Linux一般命令格式，掌握有关文件和目录操作的常用命令，学会使用vi编辑器建立、编辑、显示及加工处理文本文件。

## 实验内容

### 简单命令的使用

使用以下命令，看看系统会输出什么：

`date`命令：显示或设置系统的日期或时间

`cal`命令：显示公元1-9999年中任意一年或任意一个月的日历

`who`命令：列出所有正在使用系统的用户、所有终端名和注册到系统的时间

`clear`命令：清除屏幕上的信息

如果你忘了命令对应的功能或如何使用它们，请尝试使用`man`和`help`命令寻求帮助

### 浏览文件系统

1. 运行`pwd`命令，查看当前工作目录

2. 运行`ls -l`命令，尝试理解输出各字段的含义

3. 运行`ls -ai`命令，看看发生了什么变化，尝试理解输出各字段的含义

4. 使用cd命令，将工作目录更改到根目录上

```shell
$ cd /
```

再次运行`ls -l`命令，查看该目录下有哪些东西，了解各目录的作用

5. 这时如果直接使用`cd`命令，当前路径是什么？尝试使用相应命令查看并验证

6. 使用mkdir建立一个子目录subdir

```shell
$ mkdir subdir
```

7. 子目录创建成功了吗？让我们使用`ls`命令查看，并将工作目录更改到subdir

```shell
$ ls
$ cd subdir
```

### 对文件和目录操作

1. 运行date > file1，然后运行cat file1，我们将看到什么信息？

```shell
$ date > file1
$ cat file1
```

2. 尝试运行`cat subdir`，会有什么结果？如果回到上一个目录，再次运行，又会有什么结果？为什么？

```shell
$ cat subdir
$ cd ../
```

3. 运行`man date >>file1`，我们能看到什么？再运行cat file1，又看到什么？

```shell
$ man date >>file1
$ cat file1
```

4. 利用`ls -l file1`，该文件链接计数是多少？运行`ln file1 ../fa`，再运行`ls -l file1`，看链接计数有无变化？

```shell
$ ls -l file1
$ ln file1 ../fa
```

5. 用cat命令显示fa文件内容，注意fa文件所在位置，理解`ln`命令的作用是什么。

6. 尝试显示file1的前10行，后10行。

```shell
# 尝试使用多种方法
$ head -10 file1
$ cat file1 | tail -n 10
```

7. 运行`cp file1 file2`，然后`ls -l`，会看到什么？运行`mv file2 file3`，然后`ls -l`，又看到什么？运行`cat f*`，结果如何？

```shell
$ cp file1 file2
$ mv file2 file3
$ cat f*
```

8. 运行`rm file3`，然后`ls -l`，结果如何？

```shell
$ rm file3
$ ls –l
```

### vi编辑器的使用

1. 建立一个文件，如file.c。输入一个C语言程序的各行内容，故意制造几处错误。

>这里有多种方式，你可以通过`touch 文件名`来建立空白文件，接着在对应文件夹下使用`vi 文件名`进行操作
>
>或者，直接通过打开vi编辑器，进入插入模式，最后将该文件存盘。

2. 运行`gcc file.c -o myfile`，编译该文件，会看到什么？尝试理解其含义。

```shell
$ gcc file.c -o myfile
```

3. 重新进入vi，对该文件进行修改。然后存盘，退出vi。重新编译该文件。如果编译通过了，可以用`./myfile`运行该程序。

>`./`(点斜杠)的意思是执行当前目录下的某个可执行文件

4. 运行`man date > file2`，然后`vi file2`。使用`x`，`dd`等命令删除某些文本行。使用`u`命令复原此前的情况。