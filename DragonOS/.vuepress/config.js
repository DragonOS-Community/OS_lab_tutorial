module.exports = {
    base: '/OS_lab_tutorial/DragonOS',
    title: '操作系统实验',
    description: 'Welcome!',
    themeConfig: {
      nav: [
          {
              text: '首页', link: '/'
          },
          {
              text: '实验教程',
              items: [
                  { text: '实验1-熟悉类Linux系统', link: '/Lab/Lab1' },
                  { text: '实验2-进程创建与进程间通信', link: '/Lab/Lab2' },
                  { text: '实验3-进程调度算法', link: '/Lab/Lab3' },
                  { text: '实验4-存储管理算法', link: '/Lab/Lab4' },
                  { text: '实验5-文件管理系统', link: '/Lab/Lab5' },
                  { text: '实验6-网络编程(暂定)', link: '/Lab/Lab6' }
              ]
          },
          {
              text: '课程练习',
              items: [
                  { text: '实验1-熟悉类Linux系统', link: '/Assignment/Lab1' },
                  { text: '实验2-进程创建与进程间通信', link: '/Assignment/Lab2' },
                  { text: '实验3-进程调度算法', link: '/Assignment/Lab3' },
                  { text: '实验4-存储管理算法', link: '/Assignment/Lab4' },
                  { text: '实验5-文件管理系统', link: '/Assignment/Lab5' },
                  { text: '实验6-网络编程(暂定)', link: '/Assignment/Lab6' }
              ]
          },
          {
              text: '附录',
              items: [
                  { text: '实验1-熟悉类Linux系统', link: '/Appendix/Lab1' },
                  { text: '实验2-进程创建与进程间通信', link: '/Appendix/Lab2' },
                  { text: '实验3-进程调度算法', link: '/Appendix/Lab3' },
                  { text: '实验4-存储管理算法', link: '/Appendix/Lab4' },
                  { text: '实验5-文件管理系统', link: '/Appendix/Lab5' },
                  { text: '实验6-网络编程(暂定)', link: '/Appendix/Lab6' }
              ]
          },
          {
              text: '关于我们',
              link: '/about'
          }
      ],
    }
  }