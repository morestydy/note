import { defineConfig } from 'vitepress';
import { set_sidebar } from "../utils/auto-gen-sidebar.mjs";	// 改成自己的路径
// import { backToTopPlugin } from '@vuepress/plugin-back-to-top';
import { withMermaid } from "vitepress-plugin-mermaid";



// https://vitepress.dev/reference/site-config
export default withMermaid({
  // base: "/note/",
  markdown: {
    math: true,
    container: {
      abstract: '摘要',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    },
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true
    },
  },
  mermaid: {
    // refer https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults for options
  },
 mermaidPlugin: {
    class: "mermaid my-class", // set additional css classes for parent container
  },

  // vue: {
  //   // @vitejs/plugin-vue 选项
  //   plugins: [backToTopPlugin()],
  // },

  head: [['link', { rel: 'icon', href: 'logo.jpg'}]],
  title: "我的学习笔记",
  description: "A VitePress Site",
  themeConfig: {

    outlineTitle: "文章目录",
    outline: [2,6], // 文章右边目录
    logo: 'docs.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '家', items:[ //下拉框
        {text:'首页',link:'/'},
        {text:'markdown示例',link:'markdown-examples.md'},
      ]},
      {
        text: '工具软件',items:[
          {text:"bat脚本编写", link: "/docs/Coding/batscript.md"},
          {text:"Markdown",link:"/docs/software/markdown-note"},
          {text:'常用软件',link:'/docs/software/softwarebackup'},
          {text:"vitepress插件", link:"/docs/software/plugins"},
          {text:"LaTeX相关", items:[
            {text: 'LaTex安装',  link:"/docs/software/latexl"},
            {text: 'LaTex表图',  link:"/docs/software/latextable"},
            {text: 'LaTex其他小知识',  link:"/docs/software/others"},
          ]},
        ]
      },
      {
        text: '学习',items:[
          {text:"有机化学",items: [
            {text:"绪论", link: "/docs/chemistry/有机化学.md"},
            {text:"lewis结构式", link: "/docs/chemistry/Organic2.md"},
            {text:"有机反应理论", link: "/docs/chemistry/Organic3.md"}
          ]},
          // {text:'首页',link:'/'},
        ]
      },
      {
        text: 'Stent',items:[
          {text:"中英文对照表",link:"docs/Paper/en-zh-bilingual.md"},
          {text:"Review",items: [
            {text:"Review", link: "/docs/Paper/review/index.md"},
            {text:"Polymers", link: "docs/Paper/review/polymer.md"}
          ]},
          {text:"Research",items: [
            {text:"TOC", link: "docs/Paper/research/index.md"},
            {text:"Polymers", link: "docs/Paper/research/stent.md"}
          ]},
          {text:"临床试验",items: [
            {text:"NeoVas", link: "/docs/Paper/trials/NeoVas.md"},
            {text:"Polymers", link: "docs/Paper/research/stent.md"}
          ]},
          // {text:'首页',link:'/'},
        ]
      },

      {
        text: "编程基础",items:[
          // {text:"R", link: "docs/Coding/Rbasis.md"},
          {text:"R", items:[
            {text:"基础语法", link: "/docs/Coding/Rbasis.md"},
            {text:"统计分析", link: "/docs/Coding/Rstat.md"},
          ]},
          {text: "Python", items:[
          {text:"基础语法", link: "/docs/Coding/python.md"},
          {text:"爬虫", link: "/docs/Coding/spider.md"},
          {text:"绘图", link: "/docs/Coding/draw.md"},
        ]},

        ]
      
      },
      

      // { text: '自动生成侧边栏', link:'/front-end/react/'},
      // // { text: '自动生成侧边栏2',link:'/backend/react/'},
      // // { text: '两边栏演示', link:'/两边栏演示'}
    ],

    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown 示例', link: '/markdown-examples' },
    //       { text: 'Runtime API 示例', link: '/api-examples' }
    //     ]
    //   },
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown 示例', link: '/markdown-examples' },
    //       { text: 'Runtime API 示例', link: '/api-examples' }
    //     ]
    //   }
    // ],
    // sidebar: { 
    //   "/front-end/react": set_sidebar("/front-end/react"),
    //   "/backend/rabbitmq": set_sidebar("backend/rabbitmq"),
    // },
    navbar: true, //开启导航栏，我设置成false也没啥用不知道为啥
    sidebar: false,// 关闭侧边栏
    // lastUpdated: '最后更新时间：',
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    }, // 显示上次修改时间
    aside: 'left',// 设置右侧侧边栏在左侧显示
    socialLinks: [
      { icon: 'github', link: 'https://github.com/morestydy' }
    ],
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    smoothScroll: true,
    // 页脚
    footer:{
      copyright:"Copyright © 2023-present xufengr"
    },

       // 设置搜索框的样式
       search: {
        provider: "local",
        options: {
          translations: {
            button: {
              buttonText: "搜索文档",
              buttonAriaLabel: "搜索文档",
            },
            modal: {
              noResultsText: "无法找到相关结果",
              resetButtonTitle: "清除查询条件",
              footer: {
                selectText: "选择",
                navigateText: "切换",
              },
            },
          },
        },
      },

  }
})
