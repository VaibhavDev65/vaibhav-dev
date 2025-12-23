"""
Utility script to generate a simple programmer themed illustration as
`assets/images/programmer_v_02.png`. This keeps the project self-contained
without relying on downloading external assets.
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


def build_image(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)

    width, height = 1400, 900
    base = Image.new("RGB", (width, height), "#0b1224").convert("RGBA")

    # Soft color blobs for depth.
    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    odraw = ImageDraw.Draw(overlay)
    odraw.ellipse((-220, -80, 620, 520), fill="#0ea5e9cc")
    odraw.ellipse((820, -200, 1550, 480), fill="#22d3ee80")
    odraw.ellipse((260, 420, 1160, 1080), fill="#6366f1b0")
    base = Image.alpha_composite(base, overlay)

    draw = ImageDraw.Draw(base)

    # Desk and supports.
    desk_y = 640
    draw.rectangle((160, desk_y, 1240, desk_y + 18), fill="#1f2937")
    draw.rectangle((220, desk_y + 18, 320, desk_y + 120), fill="#111827")
    draw.rectangle((1080, desk_y + 18, 1180, desk_y + 120), fill="#111827")

    # Monitor shell.
    draw.rounded_rectangle(
        (430, 290, 990, 600),
        radius=28,
        fill="#0f172a",
        outline="#38bdf8",
        width=2,
    )
    draw.rounded_rectangle((640, 600, 780, 640), radius=14, fill="#111827")

    # Code lines.
    code_colors = ["#38bdf8", "#c084fc", "#a5b4fc", "#f97316"]
    y = 340
    for idx, line_width in enumerate([400, 520, 460, 340, 520, 380]):
        draw.rounded_rectangle(
            (470, y, 470 + line_width, y + 20),
            radius=10,
            fill=code_colors[idx % len(code_colors)],
        )
        y += 34

    # Character silhouette.
    draw.ellipse((250, 330, 350, 430), fill="#fcd34d")  # head
    draw.rounded_rectangle((240, 420, 370, 640), radius=36, fill="#f97316")  # torso
    draw.rounded_rectangle((360, 430, 470, 550), radius=18, fill="#f59e0b")  # right arm
    draw.rounded_rectangle((170, 430, 280, 550), radius=18, fill="#f59e0b")  # left arm
    draw.rounded_rectangle((270, 560, 430, 700), radius=26, fill="#111827")  # pants
    draw.rounded_rectangle((240, 640, 300, 780), radius=22, fill="#0ea5e9")  # left leg
    draw.rounded_rectangle((380, 640, 440, 780), radius=22, fill="#0ea5e9")  # right leg
    draw.rounded_rectangle((220, 760, 320, 790), radius=12, fill="#0f172a")  # left shoe
    draw.rounded_rectangle((360, 760, 460, 790), radius=12, fill="#0f172a")  # right shoe
    draw.rounded_rectangle((300, 500, 560, 560), radius=22, fill="#111827")  # keyboard area

    # Desk accents.
    draw.rounded_rectangle((560, 520, 620, 550), radius=10, fill="#1f2937")
    draw.rounded_rectangle((590, 520, 650, 550), radius=10, fill="#1f2937")
    draw.rounded_rectangle((620, 520, 680, 550), radius=10, fill="#1f2937")

    # Ambient sparkles.
    for cx, cy in [(520, 230), (1040, 260), (1160, 520), (360, 260), (680, 700)]:
        draw.ellipse((cx - 6, cy - 6, cx + 6, cy + 6), fill="#ffffff90")

    # Caption text.
    try:
        title_font = ImageFont.truetype("arial.ttf", 44)
        subtitle_font = ImageFont.truetype("arial.ttf", 24)
    except OSError:
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()

    draw.text((520, 220), "Programmer at Work", font=title_font, fill="#e0f2fe")
    draw.text(
        (520, 270),
        "Building, debugging, and shipping great ideas.",
        font=subtitle_font,
        fill="#cbd5e1",
    )

    base.convert("RGB").save(path, optimize=True)


if __name__ == "__main__":
    output = Path(__file__).resolve().parent.parent / "assets" / "images" / "programmer_v_02.png"
    build_image(output)
    print(f"Saved illustration to: {output}")

