# Vitepress插件


## 1. 使用Mermaid 绘制图表和图表- [使用Mermaid绘制图表和图表工具](https://github.com/emersonbottero/vitepress-plugin-mermaid)
---
### install
---

```bash
npm i vitepress-plugin-mermaid mermaid -D
```
如果使用pnpm，还需要下面的配置改变pnpm的默认行为兼容插件
```bash
pnpm install --shamefully-hoist
# 或者在根目录新建.npmrc文件，配置
shamefully-hoist=true
```

更改`.vitepress/config.mjs`配置项

1: 导入

```js
import { withMermaid } from "vitepress-plugin-mermaid";
```



2: defineConfig—>withMermaid

<img src="https://my-picture-bed1-1321100201.cos.ap-beijing.myqcloud.com/mypictures/image-20240209000231506.png" alt="image-20240209000231506" style="zoom:33%;" />

3:根配置项下添加

```js
 mermaid: {
    // refer https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults for options
  },
 mermaidPlugin: {
    class: "mermaid my-class", // set additional css classes for parent container
  },
```

可以访问[插件官网](https://emersonbottero.github.io/vitepress-plugin-mermaid/guide/getting-started.html)和[mermaid官网](https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults for options)获取更多配置信息


## 数学公式

1. install
---

```bash
npm add -D markdown-it-mathjax3
```
2. 配置
---
::: code-group
```ts [vitepress/config.ts]
// .vitepress/config.ts
export default {
  markdown: {
    math: true
  }
}
```
:::

## 3. 脚注

1. install
---

```bash
npm add -D markdown-it-footnote
```
2. 配置
---
::: code-group
```ts [vitepress/config.ts]
// .vitepress/config.ts
export default {
    config: (md) => {
      // 使用更多的 Markdown-it 插件！
      md.use(footnote_plugin)
    },
}
```
:::

## 4. 任务列表


1. install
---

```bash
 markdown-it-task-lists
```

2. 配置
::: code-group
```ts [vitepress/config.ts]
// vitepress/config.ts
export default {
    config: (md) => {
      // 使用更多的 Markdown-it 插件！
      md.use(markdownItTaskLists)
    },
}
```

:::


