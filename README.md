## Vaibhav.Dev – Portfolio Website

This repository contains the source code for **Vaibhav.Dev**, a responsive personal portfolio website built with **HTML, CSS, and JavaScript**.  
The site showcases projects, blog-style content, and provides download links for packaged work such as the YouTube Video Downloader.

### Features

- **Modern responsive layout**  
  - Built with the **Poppins** typeface and a dark, gradient-based UI  
  - Works smoothly on desktop, tablet, and mobile viewports  
  - Sticky navigation bar with a hamburger menu on smaller screens

- **Global navigation**  
  - Consistent navbar with brand title: `Vaibhav Dev </>`  
  - Navigation links: **Home**, **Projects**, **Blogs**  
  - Active page highlighting and smooth mobile menu toggle via JavaScript

- **Home page (`index.html`)**  
  - Hero section with:
    - Welcome line: “Welcome to”  
    - Main title: **Vaibhav.Dev**  
    - Tech stack line: **HTML, CSS, JS, Python**  
  - Programmer illustration: `assets/images/programmer_v_02.png`  
  - Primary CTAs to visit Projects and Blogs

- **Projects page (`projects.html`)**  
  - Project cards with subtle shadows and hover scale effect  
  - Thumbnail for **YT Videos Downloader** using  
    `assets/images/YT_video_downloader.png`  
  - Download button linking directly to `YT_videos_downloader.zip`  
  - Additional placeholder cards for future web/UI projects

- **Blogs page (`blogs.html`)**  
  - Visually rich blog cards with background thumbnails and gradient overlays  
  - Local images mapped per article:
    - `assets/images/design_with_intension.png` for *Designing with intention*  
    - `assets/images/shipping_faster_with_JS.png` for *Shipping faster with JS*  
    - `assets/images/why_python_stays_in_the_stack.png` for *Why Python stays in the stack*  
  - Hover effects: cards lift, background zooms slightly, and titles highlight

- **Footer**  
  - Consistent footer across all pages  
  - Internal links (Home, Projects, Blogs)  
  - External placeholders: YouTube, Instagram, Discord  
  - Center text: `Copyright Vaibhav.Dev | All rights Reserved`

### Technology Stack

- **HTML5** for structure and content
- **CSS3** (single `styles.css`) for layout, theming, and animations
- **Vanilla JavaScript** (`scripts.js`) for:
  - Mobile hamburger menu toggle
  - Active navigation state based on current page
- **Python (optional)**  
  - Script at `scripts/generate_programmer_image.py` uses **Pillow** to generate  
    `assets/images/programmer_v_02.png` (no external downloads required).

### Project Structure

```text
VaibhavDev/
  index.html
  projects.html
  blogs.html
  styles.css
  scripts.js
  prompt.txt
  YT_videos_downloader.zip
  assets/
    images/
      programmer_v_02.png
      YT_video_downloader.png
      design_with_intension.png
      shipping_faster_with_JS.png
      why_python_stays_in_the_stack.png
  scripts/
    generate_programmer_image.py
```

### Running the Site Locally

1. **Clone or copy** this folder to your machine.  
2. Open `index.html` directly in your browser, or start a simple static server:

```bash
# Using Python 3
python -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

### Customization

- Update text and headings directly in the HTML files (`index.html`, `projects.html`, `blogs.html`).  
- Replace images in `assets/images/` with your own artwork or screenshots, keeping file names or updating the paths in HTML.  
- Adjust colors, spacing, and animations from `styles.css`.  
- Extend JavaScript behavior (for example, smooth scrolling or more interactions) via `scripts.js`.

### License

This project is intended as a **personal portfolio**.  
You are free to study and adapt the structure and styles for learning or inspiration.  
For direct reuse of branding, content, or downloadable projects, please obtain permission from **Vaibhav Singh**.


