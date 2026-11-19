"""Strip white backgrounds from *-transparent.png masters with rembg (u2net),
then trim to the alpha bounding box (+8px padding) and save in place.
Run with the rembg venv python: ~/rembg-venv/bin/python scripts/strip-backgrounds.py
First run downloads the u2net model (~170MB) to ~/.u2net.
"""
from pathlib import Path

from PIL import Image
from rembg import remove

ORIG = Path(__file__).resolve().parent.parent / "static" / "images" / "original"

for src in sorted(ORIG.glob("*-transparent.png")):
    print(f"--- {src.name} ---", flush=True)
    im = Image.open(src).convert("RGB")
    out = remove(im)  # RGBA via u2net
    alpha = out.getchannel("A")
    bbox = alpha.getbbox()
    if bbox:
        pad = 8
        x0 = max(0, bbox[0] - pad)
        y0 = max(0, bbox[1] - pad)
        x1 = min(out.width, bbox[2] + pad)
        y1 = min(out.height, bbox[3] + pad)
        out = out.crop((x0, y0, x1, y1))
    out.save(src, optimize=True)
    a = out.getchannel("A")
    total = out.width * out.height
    transp = a.histogram()[0] / total
    print(f"saved {src.name}: {out.mode} {out.size} fully-transparent: {transp:.1%}", flush=True)
print("done")
