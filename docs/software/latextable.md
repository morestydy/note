# 关于 LaTeX 的表格和插图

如果你想要在 LaTeX 中插入一张图片，网上大多数教程都会告诉你使用类似于如下的代码即可完成
```LaTeX
\begin{figure}[htbp]
    \centering
    \includegraphics[width = 5cm]{img.png}
    \caption{xxx}
\end{figure}
```
这会导致一个误区，也即是认为插图 figure 环境是必不可少的，这或多或少与浮动体环境的命名有点关系，实际上真正起到插图作用的只有

`\includegraphics[width = 5cm]{img.png}`
浮动体之图不对味(位)
上面的 figure 环境，以及 table 环境其实都是 LaTeX 中大名鼎鼎的 浮动体，可以理解为一个盒子，盒子里面的所有内容都会具有浮动效果，浮动体会对应一套浮动算法，会根据你的文章结构选择合适的位置来放置这个 盒子，所以如果遇到图片没有出现在它应该出现的地方的时候，不用惊讶，这说明 LaTeX 认为你的图片放在当前的位置或许不太合适，你可以接受它的安排你可以通过调整它的参数来控制浮动体的行为，甚至不用浮动体

+ 图表标题
    `\caption` 用于显示编号和标题

## 左右分栏插图

我们的思路就是先排版图片，然后编号，再考虑浮动，那么步骤就是

左右分栏排版 (minipage, \parbox 等)
编号 \caption 即可
浮动 (将需要浮动的整体放在 figure 之中即可)
```LaTeX
\begin{figure}
    \centering
    \begin{minipage}{.48\textwidth}
        \centering
        \includegraphics[width = 5cm]{example-image}
        \caption{xxx1}
    \end{minipage}
    
    \begin{minipage}{.48\textwidth}
        \centering
        \includegraphics[width = 5cm]{example-image}
        \caption{xxx2}
    \end{minipage}
\end{figure}
```
## 子图排版
子图比较推荐 subcaption 宏包，subcaptionblock 环境可以认为是对 minipage 环境的再封装，只是改变了 \caption 的编号形式，思路与上面无异
```LaTeX
\begin{figure}
    \centering
    \begin{subcaptionblock}{.48\textwidth}
        \centering
        \includegraphics[width = 5cm]{example-image-a}
        \caption{xxx1}
    \end{subcaptionblock}
    
    \begin{subcaptionblock}{.48\textwidth}
        \centering
        \includegraphics[width = 5cm]{example-image-b}
        \caption{xxx2}
    \end{subcaptionblock}
    \caption{xxx3}
\end{figure}
```
排版表格和图片思路都是一样的，最主要的是要将 图片/表格 实体，编号，浮动体 分离开来，首先是需要考虑如何布局，其次才是编号，最后一步才是浮动