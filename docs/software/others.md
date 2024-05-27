## 审稿阶段如何突出显示论文的修改- latexdiff

用户在投稿阶段的话，到修改文章阶段。往往在邮件中，看到审稿人要求“highlight (e.g. with colored text) all changes within the paper to further facilitate re-review”，也就是要求标记增加的和删掉的内容，编辑或审稿人是希望你突出显示（例如使用彩色文本）论文中的所有更改以进一步促进重审。如下图：

![alt text](./img/image1.png)

通用的方法有两个：

1. 使用 LaTeX: 如果你的文档是用 LaTeX 编写的，你可以使用 latexdiff 工具来比较两个版本的文档，并生成一个突出显示更改的文档。你可以按照之前介绍的 latexdiff 的使用方法来操作。

2. 手动高亮: 如果文档不是用 LaTeX 编写的，或者你更喜欢手动操作，你可以使用文本编辑器或文字处理软件（如 Microsoft Word）的高亮功能来手动标记更改。在 Word 中，你可以使用“审阅”功能中的“跟踪更改”选项来突出显示所有更改。

## latexdiff 介绍
> latexdiff 是一个用于比较两个 LaTeX 文档差异的工具，是 LaTeX 用户在文档修订过程中的有力助手，它简化了文档比较的过程，使得跟踪和展示文档的变更变得更加容易。通过分析 LaTeX 源文件来生成一个包含差异的 LaTeX 文档，这个文档会以高亮的方式显示两个版本之间的变化。这对于跟踪文档的修改历史、审阅文档的变更或者准备会议论文的修订稿非常有用。
![alt text](./img/image2.png)
主要功能：
1. 差异高亮：latexdiff 会在生成的文档中用不同的颜色或文本样式来标记添加、删除和修改的部分。
2. 合并文档：它可以生成一个文档，其中包含了两个版本的差异，同时保留原始文档的格式。
3. 命令行工具：作为一个命令行工具，latexdiff 可以通过命令行参数来控制比较的细节和输出格式。
4. 兼容性：支持复杂的 LaTeX 文档，处理公式、图表和各种 LaTeX 环境。
5. 选项丰富：提供了多种选项来定制比较结果，比如忽略空白字符、忽略注释等。

### 使用方法：
`latexdiff` 的基本使用方法如下：

`latexdiff old.tex new.tex > diff.tex`
然后 编译差异文档：

`pdflatex diff.tex`

这里的 old.tex 和 new.tex 分别是你要比较的两个 LaTeX 文档，而 diff.tex 是包含差异的输出文档。如下图：

![alt text](./img/image3.png)

命令行选项：
- `-o` 或 `--oldpreamble`：指定旧文档的前导代码。

- `-n` 或 `--newpreamble`：指定新文档的前导代码。

- `-p` 或 `--preamble`：指定两个文档共享的前导代码。

- `--ignore-spaces`：忽略空格的差异。

- `--ignore-blank-lines`：忽略空白行的差异。

- `--highlight-changes`：高亮显示变化。

- `--report`：生成一个只包含变化的摘要报告。

- `--textsize`：指定生成文档的字体大小。

- `UNDERLINE-` 添加的文本为波浪下划线和蓝色，丢弃的文本被删除并呈红色;

- `CTRADITIONAL`- 添加的文本为蓝色，设置为无衬线体，并为每段丢弃的文本创建一个红色脚注;

- `TRADITIONAL`——喜欢，但没有使用颜色;CTRADITIONAL

- `CFONT`- 添加的文本为蓝色，设置为无衬线，丢弃的文本为红色，尺寸非常小;

- `FONTSTRIKE`- 添加的文本设置为无衬线字体，丢弃的文本变小并删除;

- `CHANGEBAR`- 添加的文本为蓝色，丢弃的文本为红色。此外，更改后的文本在页边距中标有条形图。

::: warning
确保两个比较的 LaTeX 文档具有相同的结构和格式，以便 latexdiff 能够正确地识别差异。
latexdiff 可能无法处理包含大量宏包或自定义命令的复杂文档，这时可能需要手动调整或优化命令行参数。
:::

参考：[LaTeXdiff 官方文档](https://www.ctan.org/pkg/latexdiff)、[LaTeXdiff project](https://github.com/ftilmann/latexdiff/)

[一个简易站点简化使用](https://3142.nl/latex-diff/)

### Overleaf 上使用 latexdiff
假设你原来的论文文档为old.tex，即为旧文档；对应的参考文献条目所在的文档为old-ref.bib。

1. 在旧文档所在文件夹下新建文档 new.tex（_具体在哪里新建文档其实无所谓，只要自行确定好新旧文档相对位置，在代码中把文件路径写正确就可以_），存储你修改后的论文，并将old.tex 中的内容全部复制粘贴到new.tex
2. 创建新的参考文献条目文档new-ref.bib ，将old-ref.bib中的内容全部复制到new-ref.bib
3. 在new.tex中更新参考文献条目的链接为new-ref.bib，之后随意撰写你的新论文（理想情况），并在new-ref.bib中新增新论文需要引用的文献
4. 在相同位置新建文档diff.tex，用于生成对比文档，在文档中书写以下代码：
```LaTeX
\RequirePackage{shellesc}
\ShellEscape{pdfLatex new.tex} %编译新文档
\ShellEscape{pdfLatex old.tex} %编译旧文档
% 上方两行是为保证生成对比文档永远是基于最新的两个论文的版本，但如果你一直手动保存并编译论文，也可以不写上方两行
\ShellEscape{latexdiff old.tex new.tex > diff_result.tex} % 生成对比结果，即为diff_result.tex
\input{diff_result}
\documentclass{dummy}
```
5. 在diff.tex点击编译即可，预览窗口将看到生成的 pdf；
节选自：https://zhuanlan.zhihu.com/p/696176077

### latexdiff.cn网站

![alt text](./img/image4.png)

+ 网站：https://latexdiff.cn
+ 源码与教程：https://github.com/am009/git-latexdiff-web

如果使用的是 overleaf，可以直接上传 overleaf 上下载的压缩包。

功能上，我们支持仅显示新增的内容，以及任意修改颜色和样式。

1. 仅显示新增的内容
2. 任意修改颜色，可以添加删除线或者波浪下划线。（其他样式开发中）
3. 新增的图表用边框标注显示

![alt text](./img/image5.png)


::: info 使用场景
当你想要看看哪里有变化。
论文的审稿意见为 major/minor revision 时，可以使用这个和上一个版本对比生成一个 diff（作为参考）。
如果你不想上传自己的项目，可以通过命令行一键在本地运行。


如果你不想暴露自己的 LaTeX 源码，可以自己跑一个 diff 后端并在网页填入本地的 API 地址，文件不会被发送到外部。或者使用我们命令行版本的 latexdiff，一行 docker 命令即可在本地运行。
:::

