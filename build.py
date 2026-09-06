#!/usr/bin/env python3
"""把 index.html + styles.css + game.js + assets/ 打包成单文件 铃响之后.html。

图集会被压成 JPEG 再以 data URI 内嵌。由于 CSS 里多处引用同一张图，
这里先把两张图各存进一个 CSS 变量，避免同一串 base64 重复出现导致体积翻倍
（直接替换是 1.38 MB，走变量是 637 KB）。

用法：python3 build.py
"""
import base64
import io
import os
import re
import sys

from PIL import Image

ROOT = os.path.dirname(os.path.abspath(__file__))


def p(*parts):
    return os.path.join(ROOT, *parts)


def jpeg_b64(path, resize=None, quality=85):
    im = Image.open(path).convert("RGB")
    if resize:
        im = im.resize(resize, Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=quality, optimize=True, progressive=True)
    return base64.b64encode(buf.getvalue()).decode()


def main():
    html = open(p("index.html"), encoding="utf-8").read()
    css = open(p("styles.css"), encoding="utf-8").read()
    js = open(p("game.js"), encoding="utf-8").read()

    # 立绘是 4x2 精灵图，缩到单格 256x341，仍是 112px 显示尺寸的 2 倍
    ch = jpeg_b64(p("assets/characters-atlas.png"), resize=(1024, 683), quality=86)
    # 场景图要铺满开屏大图，保持原分辨率
    sc = jpeg_b64(p("assets/campus-scenes-atlas.png"), quality=82)

    css = css.replace('url("assets/characters-atlas.png")', "var(--atlas-ch)")
    css = css.replace('url("assets/campus-scenes-atlas.png")', "var(--atlas-sc)")
    css = (
        ':root{--atlas-ch:url("data:image/jpeg;base64,%s");'
        '--atlas-sc:url("data:image/jpeg;base64,%s")}\n' % (ch, sc)
    ) + css

    if "</script" in js:
        sys.exit("game.js 含有 </script，会提前闭合标签")

    html = html.replace(
        '<link rel="stylesheet" href="styles.css">', "<style>\n%s\n</style>" % css
    )
    html = html.replace(
        '<script src="game.js"></script>', "<script>\n%s\n</script>" % js
    )

    leftover = re.findall(r'(?:src|href)="(?!data:)[^"#][^"]*"', html)
    if leftover:
        sys.exit("仍有外部依赖：%s" % leftover)

    out = p("铃响之后.html")
    open(out, "w", encoding="utf-8").write(html)
    print("%s  %.0f KB" % (os.path.basename(out), os.path.getsize(out) / 1024))


if __name__ == "__main__":
    main()
