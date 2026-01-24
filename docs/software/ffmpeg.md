# 使用ffmpeg剪辑

## 一、插入字幕

### 1. 软字幕 vs 硬字幕

> 软字幕：
> 这种字幕是可开关的，也就是说观众可以选择显示或隐藏它。软字幕通常嵌入到视频文件容器中，但不直接修改视频的像素。它们可以与视频分开存储，也可以通过播放器的选项打开或关闭。
> 
> 硬字幕：
> 硬字幕是直接嵌入到视频画面中的，这意味着字幕永远会显示在视频上，观众无法关闭或隐藏它们。硬字幕会修改视频内容，因此它们无法移除。

### 2.使用 FFmpeg 嵌入 SRT 字幕到视频（软字幕）


### 步骤 1：准备 SRT 字幕文件

确保你已经拥有一个 SRT 字幕文件。你可以使用基于 Whisper 的工具（如 fast-whisper、whisperx、whisper.cpp）来生成字幕可以参考我的之前的文章[使用whisper.cpp 生成字幕](https://blog.eimoon.com/p/install-use-whisper-cpp-macos-speech-to-text)。

### 步骤 2：安装 FFmpeg

FFmpeg 是支持多平台的，可以在 Linux、Mac 和 Windows 上安装。

-   Ubuntu/Debian: `sudo apt-get install ffmpeg`
-   macOS: `brew install ffmpeg`
-   Windows: 可以从 [ffmpeg官网](https://ffmpeg.org/download.html) 下载并安装

### 步骤 3：使用 FFmpeg 嵌入 SRT 字幕

一旦你安装了 FFmpeg，并准备好字幕文件，可以通过以下命令将 SRT 字幕嵌入到视频中： 这里根据视频格式和字幕文件格式，会遇到几种情况，一般常用的字幕文件格式是SRT,ASS ,视频格式有MP4，MKV等。我们分情况来说明

### 场景一：SRT 字幕 + MP4 视频

特点：最通用的组合，兼容性强，但字幕无样式（仅纯文本）。 常用命令：

#### 软字幕（可开关，需播放器支持）

```
ffmpeg -i input.mp4 -i sub.srt \
-c:v copy -c:a copy \
-c:s mov_text \
output.mp4

```

命令参数解析：

-   \-i input.mp4：输入的视频文件。
-   \-i subtitles.srt：输入的 SRT 字幕文件。
-   \-c:v copy：复制视频流，而不进行重新编码，保持视频质量。
-   \-c:a copy：复制音频流，而不进行重新编码，保持音频质量。
-   \-c:s mov\_text：将字幕编码为 mov\_text 格式（适用于 .mp4 和 .mov 文件）。mov\_text 字幕格式是 iOS、macOS 和部分播放器支持的字幕格式。
-   output.mp4：输出的文件名。 **注意事项：** 只有 .mp4 和 .mov 格式支持 mov\_text 软字幕。 若软字幕不显示，检查播放器是否支持 mov\_text（QuickTime、VLC 等通常支持） 中文乱码时，用 -sub\_charenc GBK 或转换 SRT 文件为 UTF-8 编码

#### 硬字幕（永久嵌入，所有设备可见）

```
ffmpeg -i input.mp4 -vf "subtitles=sub.srt:force_style='Fontsize=24'" \
-c:v libx264 -c:a aac output_hard.mp4

```

-   \-vf “subtitles=subtitles.srt”：使用 FFmpeg 的字幕过滤器，将字幕渲染到视频上。
-   force\_style=‘Fontsize=24,PrimaryColour=&HFFFFFF&’：设置字体大小和颜色。
-   \-c:a copy：音频编码不变，直接复制。
-   output.mp4：输出的视频文件。

### 场景二：ASS 字幕 + MKV 视频

特点：支持复杂特效（字体 / 颜色 / 动画），适合动漫或双语字幕。 推荐命令：

```
ffmpeg -i input.mkv -i sub.ass \
-c:v copy -c:a copy -c:s copy \
-output.mkv

```

优势： 无需转码，直接封装（MKV 天然支持 ASS） 保留所有字幕样式（如阴影、位置、字体） 播放器要求：需支持 ASS 渲染（如 VLC、MPV、PotPlayer）

### 场景三：ASS 字幕 + MP4 视频

MP4 格式不原生支持 ASS 字幕，可能会导致字幕乱码或样式丢失。 命令：

```
  # 尝试强制嵌入（部分播放器可能兼容）
ffmpeg -i input.mp4 -i sub.ass \
-c:v copy -c:a copy -c:s mov_text \
  output.mp4

```

替代建议：

**1.将 ASS 转换为 SRT（会丢失样式）：**

```
ffmpeg -i sub.ass sub.srt

```

**2.生成硬字幕：**

```
ffmpeg -i input.mp4 -vf "ass=sub.ass" -c:v libx264 -c:a aac output_hard.mp4

```


## 二、 FFmpeg精准时间切割视频文件

首先使用的是

```
ffmpeg -y -ss start -t duration -i filenam -codec copy

```

但是剪切出来的视频因为视频关键帧前面和后面都会多出来一部分

根据网上资料，加入了-[accurate\_seek](https://zhida.zhihu.com/search?content_id=3390896&content_type=Article&match_order=1&q=accurate_seek&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3Njk0NDg2NzYsInEiOiJhY2N1cmF0ZV9zZWVrIiwiemhpZGFfc291cmNlIjoiZW50aXR5IiwiY29udGVudF9pZCI6MzM5MDg5NiwiY29udGVudF90eXBlIjoiQXJ0aWNsZSIsIm1hdGNoX29yZGVyIjoxLCJ6ZF90b2tlbiI6bnVsbH0.oNCwDEDg3SFahbR4Zdg8EkKOQAxFSCmI2ghESgRBcGo&zhida_source=entity)参数在-i前面和-avoid\_negative\_ts 1参数

```
ffmpeg -y -ss start -t duration -accurate_see -i filename -codec copy -avoid_negative_ts 1

```

但是发现视频头部的剪裁精度基本满意但是尾部还是不准

查阅官方说明[http://trac.ffmpeg.org/wiki/Seeking](https://link.zhihu.com/?target=http%3A//trac.ffmpeg.org/wiki/Seeking)

发现将-i参数放在-ss之前可以精准切割

```
ffmpeg -y -i filename -ss start -t duratio -codec copy

```

![](https://pica.zhimg.com/v2-0e5401143c3f4e926cc2872937d6d42c_1440w.jpg)

但正如官方所说，其速度非常非常非常慢……

经过查阅资料，发现ffmpeg在进行转码的时候会自动精准时间，即不使用-codec copy编码。

```
ffmpeg -y -ss start -t duration -I filenam -c:v libx264 -perset superfast -c:a copy

```

视频可以正确的剪切，但是又出现了个很严重的问题！

部分视频的视频片段较长的时候，内存占用直接爆炸

![](https://pica.zhimg.com/v2-eddcd22ec842528db94fc7767e840ce4_1440w.jpg)

虽然将视频转码剪切视频完成了需求，但是偶尔出现的内存占用问题还是很麻烦的。继续寻求别的方法。

考虑是否可以将视频的关键帧设置的很短，这样codec copy模式工作的时候便不会错位太多了

```
ffmpeg -y -i filename -ss 0 -t end_of_vide -c:a copy -vcodec mpeg4 -keyint_min gop -g gop

```

然后用copy编码截取视频

```
ffmpeg -y -ss start -t duratio -accurate_seek -i filename codec copy -avoid_negative_ts 1

```

情况还是很理想的，速度和资源占用都不算太多，尽管部分视频的结尾大概还是会差出几帧但是整体已经很好了。

但我还是像让他更加精准，于是想到了一个邪魔歪道。

OpenCV截取的视频是极为精准的但是没有声音。

ffmpeg进行转码的时候也是非常精准的，但是转码视频会内存占用很大。

那么就用OpenCV截取视频，ffmpeg截取音频，然后合并音频和视频

使用OpenCV的[VideoWriter](https://zhida.zhihu.com/search?content_id=3390896&content_type=Article&match_order=1&q=VideoWriter&zd_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ6aGlkYV9zZXJ2ZXIiLCJleHAiOjE3Njk0NDg2NzYsInEiOiJWaWRlb1dyaXRlciIsInpoaWRhX3NvdXJjZSI6ImVudGl0eSIsImNvbnRlbnRfaWQiOjMzOTA4OTYsImNvbnRlbnRfdHlwZSI6IkFydGljbGUiLCJtYXRjaF9vcmRlciI6MSwiemRfdG9rZW4iOm51bGx9.ruD8u0qfd9ZUGUjeaIPcz2-oOD4__K4inwbETi2QvCU&zhida_source=entity).write写入视频

对视频压缩为音频

```
ffmpeg -y -I filename -vn -ar 44100 -ac  -ab 192 -f mp3

```

然后切割音频

```
ffmpeg -y -vn -ss start -t duration -i filenam -acodec copy

```

最后合并音频视频

```
ffmpeg -y -i filename -i filename2 -vcode copy -acodec copy

```

效果惊人的很好，速度也很快……

问题基本解决。

那么使用ffmpeg精准剪切视频，如果电脑性能很好的话直接转码是最好的

```
1、ffmpeg -y -ss start -t duration -I filename -c:v libx264 -preset superfast -c:a copy

```

调整关键帧也是个不错的选择

```
2、ffmpeg -y - filename -ss 0 -t end_of_video -c:a 2、ffmpeg -y - filename -ss 0 -t end_of_video -c:a copy -vcodec mpeg4 -keyint_min gop -g gopcopy -vcodec mpeg4 -keyint_min gop -g gop
ffmpeg -y -ss start -t duratio -accurate_seek -i filename codec copy -avoid_negative_ts 1

```

3、不差时间的话Output seeking是很好的选择

```
ffmpeg -y -i filename -ss start -t duratio -codec copy

```

邪魔外道法如果使用OpenCV处理的话也可以考虑……

ps: -i参数放在中间的转码可以规避内存爆炸的问题，但是视频开头会有一阵画面定格

```
ffmpeg -y -ss start -i filename -t duratio -c:a copy -vcodec mpeg4 -b:v
```




## 参考

[[1]  从零开始的程序员剪辑视频](https://gist.github.com/Tmn07/92dc75c151e9090f7b13cd21db483061)

[[2] FFmpeg精准时间切割视频文件](https://zhuanlan.zhihu.com/p/28008666)