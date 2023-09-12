(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{327:function(a,s,t){"use strict";t.r(s);var e=t(14),l=Object(e.a)({},(function(){var a=this,s=a._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"lab-1-熟悉类linux系统的命令"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#lab-1-熟悉类linux系统的命令"}},[a._v("#")]),a._v(" Lab-1 熟悉类Linux系统的命令")]),a._v(" "),s("h2",{attrs:{id:"本节导读"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#本节导读"}},[a._v("#")]),a._v(" 本节导读")]),a._v(" "),s("p",[a._v("通过练习掌握Linux一般命令格式，掌握有关文件和目录操作的常用命令，学会使用vi编辑器建立、编辑、显示及加工处理文本文件。")]),a._v(" "),s("h2",{attrs:{id:"实验内容"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#实验内容"}},[a._v("#")]),a._v(" 实验内容")]),a._v(" "),s("h3",{attrs:{id:"简单命令的使用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#简单命令的使用"}},[a._v("#")]),a._v(" 简单命令的使用")]),a._v(" "),s("p",[a._v("使用以下命令，看看系统会输出什么：")]),a._v(" "),s("p",[s("code",[a._v("date")]),a._v("命令：显示或设置系统的日期或时间")]),a._v(" "),s("p",[s("code",[a._v("cal")]),a._v("命令：显示公元1-9999年中任意一年或任意一个月的日历")]),a._v(" "),s("p",[s("code",[a._v("who")]),a._v("命令：列出所有正在使用系统的用户、所有终端名和注册到系统的时间")]),a._v(" "),s("p",[s("code",[a._v("clear")]),a._v("命令：清除屏幕上的信息")]),a._v(" "),s("p",[a._v("如果你忘了命令对应的功能或如何使用它们，请尝试使用"),s("code",[a._v("man")]),a._v("和"),s("code",[a._v("help")]),a._v("命令寻求帮助")]),a._v(" "),s("h3",{attrs:{id:"浏览文件系统"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#浏览文件系统"}},[a._v("#")]),a._v(" 浏览文件系统")]),a._v(" "),s("ol",[s("li",[s("p",[a._v("运行"),s("code",[a._v("pwd")]),a._v("命令，查看当前工作目录")])]),a._v(" "),s("li",[s("p",[a._v("运行"),s("code",[a._v("ls -l")]),a._v("命令，尝试理解输出各字段的含义")])]),a._v(" "),s("li",[s("p",[a._v("运行"),s("code",[a._v("ls -ai")]),a._v("命令，看看发生了什么变化，尝试理解输出各字段的含义")])]),a._v(" "),s("li",[s("p",[a._v("使用cd命令，将工作目录更改到根目录上")])])]),a._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("$ "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("cd")]),a._v(" /\n")])])]),s("p",[a._v("再次运行"),s("code",[a._v("ls -l")]),a._v("命令，查看该目录下有哪些东西，了解各目录的作用")]),a._v(" "),s("ol",{attrs:{start:"5"}},[s("li",[s("p",[a._v("这时如果直接使用"),s("code",[a._v("cd")]),a._v("命令，当前路径是什么？尝试使用相应命令查看并验证")])]),a._v(" "),s("li",[s("p",[a._v("使用mkdir建立一个子目录subdir")])])]),a._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("mkdir")]),a._v(" subdir\n")])])]),s("ol",{attrs:{start:"7"}},[s("li",[a._v("子目录创建成功了吗？让我们使用"),s("code",[a._v("ls")]),a._v("命令查看，并将工作目录更改到subdir")])]),a._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("ls")]),a._v("\n$ "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("cd")]),a._v(" subdir\n")])])]),s("h3",{attrs:{id:"对文件和目录操作"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#对文件和目录操作"}},[a._v("#")]),a._v(" 对文件和目录操作")]),a._v(" "),s("ol",[s("li",[a._v("运行date > file1，然后运行cat file1，我们将看到什么信息？")])]),a._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("date")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v(" file1\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("cat")]),a._v(" file1\n")])])]),s("ol",{attrs:{start:"2"}},[s("li",[a._v("尝试运行"),s("code",[a._v("cat subdir")]),a._v("，会有什么结果？如果回到上一个目录，再次运行，又会有什么结果？为什么？")])]),a._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("cat")]),a._v(" subdir\n$ "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("cd")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("..")]),a._v("/\n")])])]),s("ol",{attrs:{start:"3"}},[s("li",[a._v("运行"),s("code",[a._v("man date >>file1")]),a._v("，我们能看到什么？再运行cat file1，又看到什么？")])]),a._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("man")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("date")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">>")]),a._v("file1\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("cat")]),a._v(" file1\n")])])]),s("ol",{attrs:{start:"4"}},[s("li",[a._v("利用"),s("code",[a._v("ls -l file1")]),a._v("，该文件链接计数是多少？运行"),s("code",[a._v("ln file1 ../fa")]),a._v("，再运行"),s("code",[a._v("ls -l file1")]),a._v("，看链接计数有无变化？")])]),a._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("ls")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-l")]),a._v(" file1\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("ln")]),a._v(" file1 "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("..")]),a._v("/fa\n")])])]),s("ol",{attrs:{start:"5"}},[s("li",[s("p",[a._v("用cat命令显示fa文件内容，注意fa文件所在位置，理解"),s("code",[a._v("ln")]),a._v("命令的作用是什么。")])]),a._v(" "),s("li",[s("p",[a._v("尝试显示file1的前10行，后10行。")])])]),a._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 尝试使用多种方法")]),a._v("\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("head")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-10")]),a._v(" file1\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("cat")]),a._v(" file1 "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("tail")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-n")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("10")]),a._v("\n")])])]),s("ol",{attrs:{start:"7"}},[s("li",[a._v("运行"),s("code",[a._v("cp file1 file2")]),a._v("，然后"),s("code",[a._v("ls -l")]),a._v("，会看到什么？运行"),s("code",[a._v("mv file2 file3")]),a._v("，然后"),s("code",[a._v("ls -l")]),a._v("，又看到什么？运行"),s("code",[a._v("cat f*")]),a._v("，结果如何？")])]),a._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("cp")]),a._v(" file1 file2\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("mv")]),a._v(" file2 file3\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("cat")]),a._v(" f*\n")])])]),s("ol",{attrs:{start:"8"}},[s("li",[a._v("运行"),s("code",[a._v("rm file3")]),a._v("，然后"),s("code",[a._v("ls -l")]),a._v("，结果如何？")])]),a._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("rm")]),a._v(" file3\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("ls")]),a._v(" –l\n")])])]),s("h3",{attrs:{id:"vi编辑器的使用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vi编辑器的使用"}},[a._v("#")]),a._v(" vi编辑器的使用")]),a._v(" "),s("ol",[s("li",[a._v("建立一个文件，如file.c。输入一个C语言程序的各行内容，故意制造几处错误。")])]),a._v(" "),s("blockquote",[s("p",[a._v("这里有多种方式，你可以通过"),s("code",[a._v("touch 文件名")]),a._v("来建立空白文件，接着在对应文件夹下使用"),s("code",[a._v("vi 文件名")]),a._v("进行操作")]),a._v(" "),s("p",[a._v("或者，直接通过打开vi编辑器，进入插入模式，最后将该文件存盘。")])]),a._v(" "),s("ol",{attrs:{start:"2"}},[s("li",[a._v("运行"),s("code",[a._v("gcc file.c -o myfile")]),a._v("，编译该文件，会看到什么？尝试理解其含义。")])]),a._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("$ gcc file.c "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-o")]),a._v(" myfile\n")])])]),s("ol",{attrs:{start:"3"}},[s("li",[a._v("重新进入vi，对该文件进行修改。然后存盘，退出vi。重新编译该文件。如果编译通过了，可以用"),s("code",[a._v("./myfile")]),a._v("运行该程序。")])]),a._v(" "),s("blockquote",[s("p",[s("code",[a._v("./")]),a._v("(点斜杠)的意思是执行当前目录下的某个可执行文件")])]),a._v(" "),s("ol",{attrs:{start:"4"}},[s("li",[a._v("运行"),s("code",[a._v("man date > file2")]),a._v("，然后"),s("code",[a._v("vi file2")]),a._v("。使用"),s("code",[a._v("x")]),a._v("，"),s("code",[a._v("dd")]),a._v("等命令删除某些文本行。使用"),s("code",[a._v("u")]),a._v("命令复原此前的情况。")])])])}),[],!1,null,null,null);s.default=l.exports}}]);