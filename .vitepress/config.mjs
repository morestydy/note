import { defineConfig } from 'vitepress'
import { set_sidebar } from "../utils/auto-gen-sidebar.mjs";	// 改成自己的路径

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/note/",
  markdown: {
    math: true,
    container: {
      abstract: '摘要',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    },
  },

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
          {text:"Markdown",link:"/software/markdown-note"},
          {text:'首页',link:'/'},
        ]
      },
      {
        text: '学习',items:[
          {text:"化学",items: [
            {text:"有机化学", link: "/chemistry/有机化学.md"},
            {text:"others", link: "/chemistry/有机化学.md"}
          ]},
          // {text:'首页',link:'/'},
        ]
      },
      {
        text: '论文笔记',items:[
          {text:"Stent",items: [
            {text:"Review", link: "/Paper/Revirew/review.md"},
            {text:"Medicine", link: "/Paper/Medicine/medicine.md"}
          ]},
          // {text:'首页',link:'/'},
        ]
      },

      { text: '自动生成侧边栏', link:'/front-end/react/'},
      // { text: '自动生成侧边栏2',link:'/backend/react/'},
      // { text: '两边栏演示', link:'/两边栏演示'}
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

    sidebar: false,// 关闭侧边栏
    aside: 'left',// 设置右侧侧边栏在左侧显示
    socialLinks: [
      { icon: 'github', link: 'https://github.com/morestydy' }
    ],
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
