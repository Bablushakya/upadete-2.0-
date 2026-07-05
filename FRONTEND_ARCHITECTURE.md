# FRONTEND ARCHITECTURE DOCUMENTATION
## Elevation By Kim — India Sourcing Journey
### Public Website — Complete Technical Reference

> **Scope:** This document covers ONLY the public-facing website.
> `index.html` · `css/index.css` · `js/app.js`
> Admin panel files (`admin.html`, `admin.js`, `admin.css`) are entirely excluded.

**Last Updated:** July 2026
**Stack:** Vanilla HTML · Tailwind CSS (CDN) · Vanilla JavaScript · Custom CSS

---

## TABLE OF CONTENTS

```
======================================================
MODULE 01 — Background System
MODULE 02 — Typography System
MODULE 03 — Design Tokens
MODULE 04 — Sidebar Navigation
MODULE 05 — Introduction Section
MODULE 06 — Why This Trip
MODULE 07 — Ideal Sourcing Participants
MODULE 08 — Experience Section
MODULE 09 — Itinerary
MODULE 10 — Logistics
MODULE 11 — Why Travel With Kim (Our Network)
MODULE 12 — Join Us
MODULE 13 — Global Button System
MODULE 14 — Image System
MODULE 15 — Animation System
MODULE 16 — JavaScript Architecture
MODULE 17 — CSS Architecture
MODULE 18 — HTML Architecture
MODULE 19 — Project File Structure
MODULE 20 — Dependency Map
======================================================
```

---

======================================================
MODULE 01 — BACKGROUND SYSTEM
======================================================

## MODULE 01 — Background System

### Purpose
The background system creates the editorial luxury atmosphere of the entire site — a layered radial glow system built entirely in CSS on the body element. No background image file exists; every visual effect uses CSS gradients and an inline data-URI SVG mandala texture. The background is fixed so it never moves during section transitions, creating depth as content slides over it.

### Design Philosophy
The background communicates warmth, heritage, and premium quality before the user reads a single word. It deliberately avoids flat white or pure cream. Instead it uses a living, glowing warmth centered in the viewport — the way candlelight illuminates a room. The mandala texture adds Indian cultural identity at 3.5% opacity — felt rather than consciously seen.

### Files Involved
- css/index.css — Section 05 (Body Background)
- index.html — body element

### Background Layer Architecture (4 stacked layers, topmost first)

Layer 1 — Primary Center Radial Glow
  radial-gradient(ellipse 80% 70% at 55% 45%, rgba(242,185,150,0.62) 0%, rgba(248,210,183,0.42) 28%, rgba(252,228,210,0.22) 55%, rgba(255,249,246,0.00) 85%)
  Position: 55% 45% (slightly right and down — feels natural, not mechanical)
  Why: Acts as the primary warmth source. Offset right means it peeks behind the sidebar on desktop.

Layer 2 — Secondary Warmth Bloom (Upper-Left)
  radial-gradient(ellipse 55% 45% at 20% 20%, rgba(248,215,190,0.28) 0%, rgba(255,249,246,0.00) 70%)
  Why: Prevents the top-left sidebar area from feeling cold.

Layer 3 — Depth Warmth (Lower-Right)
  radial-gradient(ellipse 50% 40% at 88% 82%, rgba(245,200,168,0.18) 0%, rgba(255,249,246,0.00) 65%)
  Why: Prevents the bottom-right from feeling flat. Subtlest layer.

Layer 4 — Mandala Texture (Repeating SVG)
  240x240px tile. 8-petal lotus core, double intersecting squares, dotted rings, floral accents.
  Color: #823b18 (primary terracotta) at 3.5% opacity.
  background-attachment: scroll (unlike fixed layers 1-3)
  Why: Cultural texture at a level that is felt, not seen as a pattern.

### Background Control Properties
  background-color: #FFF9F6  (fallback base)
  background-repeat: no-repeat, no-repeat, no-repeat, repeat
  background-size: 100% 100%, 100% 100%, 100% 100%, auto
  background-attachment: fixed, fixed, fixed, scroll
  overflow: hidden  (JS section paging engine takes full scroll control)

### Complete Background Color Palette

| Token Name         | HEX / rgba            | Opacity    | Purpose                                         |
|--------------------|-----------------------|------------|-------------------------------------------------|
| Base Cream         | #FFF9F6               | 100%       | Main canvas fallback — near-white, faint warmth |
| Center Peach       | rgba(242,185,150)     | 62% center | Primary warmth glow — editorial candlelight     |
| Mid Blush          | rgba(248,210,183)     | 42% 28%r   | Transition from center heat to ambient warmth   |
| Outer Diffuse      | rgba(252,228,210)     | 22% 55%r   | Edge softening                                  |
| Upper-Left Warmth  | rgba(248,215,190)     | 28%        | Anti-cold bloom for the sidebar region          |
| Lower-Right Warmth | rgba(245,200,168)     | 18%        | Depth warmth for the lower viewport             |
| Mandala Stroke     | #823b18               | 3.5%       | Cultural texture — same as primary terracotta   |

### Heritage Backdrop Pattern (used behind portrait images)
  .heritage-backdrop-pattern
  - background-color: #FEF0EC
  - SVG tile 40x40px: outer diamond #823b18 15%, inner diamond #C59B27 15%, center dot 20%
  - border: 1px solid rgba(197, 155, 39, 0.25)
  - box-shadow: 0 10px 25px -10px rgba(130, 59, 24, 0.1)
  Applied: div absolutely positioned behind portrait images, offset +4px right/+4px down.

### Sidebar Glass Background (.glass-sidebar)
  background: rgba(254, 240, 236, 0.82)  — 82% opacity ivory
  backdrop-filter: blur(14px)              — frosted glass
  border: 1px solid rgba(197, 155, 39, 0.20)
  crosshatch texture: 2 linear-gradients at rgba(130,59,24,0.02), 10x10px tile

======================================================
MODULE 02
TYPOGRAPHY SYSTEM
======================================================

## MODULE 02 — Typography System

### Purpose
The typography system uses a deliberate hierarchy of five web font families loaded from Google Fonts to establish an elegant, magazine-style editorial aesthetic. This includes high-contrast serifs, functional interface sans-serifs, and expressive heritage display typefaces.

### Files Involved
- index.html — <link> elements to Google Fonts, 	ailwind.config configuration
- css/index.css — Section 06 (Heritage Font Families), Section 08 (Editorial Dropcap)

### Font Families Reference

1. Playfair Display (Serif)
   - Tokens: font-display-lg, font-headline-md, font-display-lg-mobile
   - Purpose: Luxury editorial headings, section titles, and brand wordmarks.
   - Design Rationale: High contrast between thick and thin lines, classic serifs, and beautiful italic curves that mimic premium print publications.

2. DM Sans (Sans-serif)
   - Tokens: font-body-md, font-body-lg, font-nav-item
   - Purpose: Primary UI text, buttons, body copy, and navigation link text.
   - Design Rationale: High legibility at small sizes, wide geometric character set, clean rendering on all screen sizes.

3. Space Grotesk (Sans-serif)
   - Token: font-label-numeric
   - Purpose: Purely numeric indicators, day numbers (e.g., "01"), price figures, and section paging counters.
   - Design Rationale: Distinctive geometric numbers that feel designed rather than standard system glyphs.

4. Kurale (Serif)
   - Custom CSS class: .font-heritage-serif
   - Purpose: Category badges, uppercase micro-labels (e.g., "SOURCING JOURNEY"), mobile navigation labels, and small subtitles.
   - Design Rationale: A South Asian-inspired serif that embeds local cultural identity into the finest typographic details.

5. Yatra One (Display / Cursive)
   - Custom CSS class: .font-heritage-title
   - Purpose: Large decorative numeral accents, specifically in the Ideal Participants grid.
   - Design Rationale: Expressive stroke weights modeled after traditional Devanagari brush lettering.

6. Material Symbols Outlined (Variable Font)
   - Purpose: System UI icons (e.g., home, storefront, receipt_long, groups, diamond).
   - Override rule in css/index.css:
     `css
     .material-symbols-outlined {
         font-variation-settings: 'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24;
     }
     `
     Sets font-weight to 200 (thinner than default) to align with the elegant, lightweight look of the site.

### Typography Scale (tailwind.config)

| Token | CSS Class Equivalents | Font Family | Desktop Size | Mobile Size | Line Height | Letter Spacing |
|---|---|---|---|---|---|---|
| display-lg | .font-display-lg | Playfair Display | 64px | 40px | 1.1 | -0.02em |
| headline-md | .font-headline-md | Playfair Display | 32px | 32px | 1.3 | — |
| body-lg | .font-body-lg | DM Sans | 18px | 18px | 1.6 | — |
| body-md | .font-body-md | DM Sans | 16px | 16px | 1.5 | — |
| nav-item | .font-nav-item | DM Sans | 14px | 14px | 1.0 | 0.05em |
| label-numeric | .font-label-numeric | Space Grotesk | 12px | 12px | 1.0 | 0.1em |

### Editorial Dropcap (.editorial-dropcap)
`css
.editorial-dropcap::first-letter {
    font-family: 'Playfair Display', serif;
    font-size: 3.5rem;
    float: left;
    line-height: 0.85;
    margin-right: 0.6rem;
    margin-top: 0.15rem;
    color: #823b18;
    font-weight: 500;
}
`
Applied to lead paragraphs (e.g., Hero lead copy). Splits the first character out, rendering it large, float-left, and terracotta, mimicking classic print layout design.

---

======================================================
MODULE 03
DESIGN TOKENS
======================================================

## MODULE 03 — Design Tokens

### Purpose
Centralized styling variables defined within 	ailwind.config to maintain layout consistency across all viewports.

### Files Involved
- index.html — Design tokens in <script id="tailwind-config">
- css/index.css — Drop shadows, z-index properties, custom media queries

### Core Tokens List

1. Colors (Hex Values)
   - primary: #823b18 (Terracotta) — primary buttons, headings, accents.
   - primary-container: #a0522d (Dark Terracotta) — hover states.
   - gold: #C59B27 (Warm Gold) — ornamental outlines, badges, divider lines.
   - background / surface / surface-bright: #FEF0EC (Blush Ivory) — app canvas, modals.
   - on-surface: #1a1c1c (Charcoal) — primary body copy.
   - on-surface-variant: #54433c (Espresso) — secondary body copy.
   - secondary: #5f5e5e (Slate Gray) — inactive nav links, sub-labels.
   - surface-container: #eeeeee (Light Gray) — card interiors, FAQ items.
   - surface-container-low: #f3f3f4 (Soft Gray) — card variations.
   - outline-variant: #dac1b8 (Blush Border) — light card lines, borders.
   - error: #ba1a1a (Red) — form validation alerts.

2. Spacing Scale
   - stack_gap: 64px — vertical margin between major blocks.
   - container_max: 1440px — layout max-width.
   - margin_mobile: 20px — page horizontal margin for mobile viewports.
   - margin_desktop: 80px — page horizontal margin for desktop viewports.
   - rail_width: 240px — desktop navigation sidebar width.
   - gutter: 32px — inner grid spacing.

3. Border Radius Scale
   - DEFAULT: 0.125rem (2px) — sharp corners for buttons, text inputs.
   - lg: 0.25rem (4px) — sidebar CTA buttons, minor containers.
   - xl: 0.5rem (8px) — form cards, modal wrappers.
   - full: 0.75rem (12px) — pill-shaped components (mobile bottom nav).

4. Layering (Z-Index Scale)
   - z-0 / default: Standard section canvas stack.
   - z-2 (active section): Moves active section above stack during animations.
   - z-40 (mobile top bar): Floating mobile header.
   - z-50 (navigation elements & modals): Sidebar, bottom nav, dialog popups.
   - z-100 (toasts): Toast alerts container.

---

======================================================
MODULE 04
SIDEBAR NAVIGATION
======================================================

## MODULE 04 — Sidebar Navigation

### Purpose
Provides a fixed navigation rail for desktop viewports (width >= 768px) and responsive floating navigators for mobile viewports. Highlights the active section, tracks paging progress, and offers instant shortcuts.

### Files Involved
- index.html — navigation layout containers
- css/index.css — Section 03 (Desktop Sidebar Navigation), Section 16 (Mobile Apply Button), Section 17 (Sidebar CTA)
- js/app.js — updateNavSlider(), switchSection(), navigation event listeners

### Layout Adaptations

1. Desktop Navigation Rail (#desktop-sidebar-nav)
   - Layout: Pinned left (ixed left-8 top-8 bottom-8), width 280px.
   - Backdrop: Glassmorphism (.glass-sidebar) using frosted blush ivory, back-blur, and a subtle terracotta crosshatch pattern (10px grid).
   - Progress Counter: Updates 
av-section-counter content (e.g., "01 / 05") in real time.
   - Sliding Indicator: The .nav-slider bar (2px width) aligns vertically to target nav items on active transition via JS updateNavSlider().

2. Mobile Top Bar (#mobile-header)
   - Layout: Fixed top, full width, visible only on mobile viewports (< 768px).
   - Elements: Minimal brand title + APPLY → button with infinite shimmer sweep animation.

3. Mobile Bottom Bar (#mobile-bottom-nav)
   - Layout: Pill container anchored to the bottom.
   - Elements: 5 icon links (Material Symbols) with micro-labels. Active link receives 	ext-primary-container styling.

### Navigation Actions & Events (js/app.js)
- Event: click events on .nav-link (desktop), mobileNavLinks (mobile), and .next-section-trigger (in-section paging).
- Method: Click handler extracts data-nav (integer 0-4) or data-next-target index, calling switchSection(targetIndex).

`js
function updateNavSlider(index) {
    const activeLink = document.querySelector([data-nav=""]);
    if (activeLink && navActiveIndicator) {
        const linkTop = activeLink.offsetTop;
        const linkHeight = activeLink.offsetHeight;
        // Centers the active indicator relative to the nav link
        navActiveIndicator.style.top = ${linkTop + (linkHeight / 2) - 16}px;
    }
}
`

---

======================================================
MODULE 05
INTRODUCTION SECTION
======================================================

## MODULE 05 — Introduction Section

### Purpose
The default landing section (id: #intro, index: 0). Houses the brand introduction, hero photography, lead editorial paragraphs with dropcap, primary call-to-actions, core pillars grid, and participant list card.

### Files Involved
- index.html — section#intro
- css/index.css — Section 11 (Heritage Image Frame), Section 08 (Dropcap)
- js/app.js — mousemove mouse parallax script

### Main Columns & Structure
- Section Label: Category marker ( 1 / Introduction).
- Headline: Primary display serif text (Playfair Display).
- Split Grid:
  - Left Column (Hero Image): Mounted inside a gold-bordered arched .heritage-image-frame with an offset shadow. The inner image handles subtle mouse-tracking parallax.
  - Right Column (Lead Text): Paragraph styled with .editorial-dropcap. Stacked below are Apply and Discovery Call action buttons.

### Mouse Parallax Script (js/app.js)
Listens to viewport mouse movements and applies translation adjustments to .parallax-img elements.
`js
window.addEventListener('mousemove', e => {
    const offsetX = (e.clientX - window.innerWidth / 2) * 0.01;
    const offsetY = (e.clientY - window.innerHeight / 2) * 0.01;
    parallaxImages.forEach(img => {
        img.style.transform = 	ranslate(px, px) scale(1.05);
    });
});
`

======================================================
MODULE 06
WHY THIS TRIP
======================================================

## MODULE 06 — Why This Trip (Three Pillars)

### Purpose
Acts as the secondary value statement in Section 01. Outlines three core pillars: business/cultural immersion, visual beauty of India, and guided sourcing navigation.

### Files Involved
- index.html — Why This Trip markup container inside section#intro

### Layout and Spacing
- Layout: 3-column grid on desktop (grid-cols-1 md:grid-cols-3), gaps set using Tailwind utilities (gap-8).
- Spacing: Top padding pt-10, bottom margin mb-20.
- Headline: A centered, clean serif heading (h3) with a solid terracotta underline accent.

### Typography Hierarchy (Per Pillar)
1. Categorization Label (e.g., "01 . More Than A Sourcing Trip"):
   - Font: Kurale (.font-heritage-serif)
   - Styles: uppercase, tracking-[0.2em], text-primary, 12px.
2. Pillar Title (e.g., "Business & Cultural Immersion"):
   - Font: Playfair Display (.font-display-lg)
   - Styles: text-xl, font-normal.
3. Body Narrative:
   - Font: DM Sans (.font-body-md)
   - Styles: text-on-surface-variant, leading-relaxed.

---

======================================================
MODULE 07
IDEAL SOURCING PARTICIPANTS
======================================================

## MODULE 07 — Ideal Sourcing Participants

### Purpose
Renders a featured overview card showing who the sourcing trip is designed for (designers, store owners, business founders, artisans). Uses a traditional Indian-inspired Jharokha window shape.

### Files Involved
- index.html — nested inside section#intro
- css/index.css — Section 07 (Jharokha Clip)

### Shape Clipping (.jharokha-clip)
`css
.jharokha-clip {
    clip-path: polygon(
        0 16px, 16px 16px, 16px 0,
        calc(100% - 16px) 0, calc(100% - 16px) 16px, 100% 16px,
        100% calc(100% - 16px), calc(100% - 16px) calc(100% - 16px), calc(100% - 16px) 100%,
        16px 100%, 16px calc(100% - 16px), 0 calc(100% - 16px)
    );
}
`
Creates stepped, inverted corner cuts on the card boundaries.
To simulate a 1px border around the card, a double-nested container wrapper is used:
`html
<div class="jharokha-clip bg-outline-variant/25 p-[1px]">
    <div class="jharokha-clip bg-surface-container-low p-8 md:p-12 relative">
        <!-- Inner content container -->
    </div>
</div>
`

### Visual Accents & Grid
- Corner Icons: 4 custom SVG corner accents positioned absolutely, featuring L-bracket strokes, curved segments, and small dots in 	ext-primary/35.
- Inner Border: A dashed layout guideline (order-dashed border-primary/20) inset by 12px.
- Grid: Splits items into a two-column listing on desktop (md:grid-cols-2), separated by a decorative vertical line ending in gold diamonds.
- Item Layout: Each list item is styled in a flex container (lex items-start gap-4) with oversized, stylized numerals utilizing Yatra One (.font-heritage-title).

---

======================================================
MODULE 08
EXPERIENCE SECTION
======================================================

## MODULE 08 — Experience Section

### Purpose
The second section (id: #workshop, index: 1). Integrates scroll-based interactive storytelling. Keeps visual components fixed in place while narrative sections cross-fade dynamically based on scroll progress.

### Files Involved
- index.html — section#workshop
- css/index.css — Section 13 (Experience Storytelling)
- js/app.js — Scroll event listener, index calculators, state modifiers

### Sticky Scroll Architecture
- Scroll Track Container: #experience-scroll-track sets the scroll height. To create scroll headroom, a driver spacer container is set to height: 400vh.
- Sticky Window: .experience-sticky-container utilizes position: sticky and pins content inside the viewport during scrolls.
- Visual Column (Left / Top): .experience-visual-col holds 4 experience step photos stacked on top of each other.
- Text Column (Right / Bottom): .experience-narrative-col stacks the 4 narrative panels.

### Cross-Fading Behavior
As the user scrolls, the active index (0 to 3) is calculated by dividing scrollTop by the container height:
- Steps (Text): .experience-step panels transition opacity and translateY (	ranslateY(20px) to  ).
- Images: .experience-image elements transition opacity and zoom (scale(1.05) to 1.0).

`js
// Scroll Handler excerpt:
const scrollTop = experienceSection.scrollTop;
const clientHeight = experienceSection.clientHeight;
const stepScrollHeight = clientHeight;
let activeStepIndex = Math.floor(scrollTop / stepScrollHeight);
activeStepIndex = Math.max(0, Math.min(3, activeStepIndex));
`

### Progress Indicator
A vertical line split into 3 segments updates to match the current scroll state. JavaScript targets .progress-line-fill elements and sets their height (style.height) from  % to 100% proportionally as the active index advances.

---

======================================================
MODULE 09
ITINERARY
======================================================

## MODULE 09 — Itinerary (7-Day Sourcing Journey)

### Purpose
Displays the 7-day schedule inside Section 02. Arranges cards in alternating left/right photo layouts that slide into view when scrolled into the viewport.

### Files Involved
- index.html — #itinerary-section inside section#workshop
- css/index.css — Section 14 (Itinerary Scroll Reveal), Section 11 (Heritage Image Frame)
- js/app.js — checkScrollReveals() reveal controller

### Scroll Reveal Engine (.reveal-on-scroll)
Every day-card container starts hidden (opacity: 0, translateY(35px), scale(0.98)).
JavaScript tracks coordinates using getBoundingClientRect(). When cards enter the active viewport range, the class .revealed is appended, triggering a 1000ms bezier transition.
`css
.reveal-on-scroll {
    opacity: 0;
    transform: translateY(35px) scale(0.98);
    transition: opacity 1000ms cubic-bezier(0.16, 1, 0.3, 1), transform 1000ms cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal-on-scroll.revealed {
    opacity: 1;
    transform: translateY(0) scale(1);
}
`

### Alternating Grid Pattern
- Odd Days (1, 3, 5, 7): Layout flows Image (Left) to Text (Right).
- Even Days (2, 4, 6): Layout flows Text (Left) to Image (Right). Set using Tailwind grid column ordering on desktop (order-2 md:order-1 for text, order-1 md:order-2 for image frames).

### Card Styling
- Image Frame: Set within a gold-rimmed arched frame (ounded-t-[180px] rounded-b-2xl) featuring a subtle hover-zoom.
- Day Badges: Gold pill labels (g-gold/10 border border-gold/30 text-gold) paired with category dates.

======================================================
MODULE 10
LOGISTICS
======================================================

## MODULE 10 — Logistics Section

### Purpose
The third section (id: #materials, index: 2). Explains pricing details, trip inclusions, and what is not included in the package.

### Files Involved
- index.html — section#materials markup layout

### Card Layout Grid
- Structure: Stacks two equal cards side-by-side on desktop (grid-cols-1 md:grid-cols-2), followed by a full-width exclusions card below.
- Spacing: Configured with standard stack gaps (space-y-8) and bottom margins (mb-20).

### Card Style Variations

1. What Is Included Card
   - Styling: Uses .jharokha-clip with g-surface-container-low (soft gray).
   - Bullets: Customized inline gold SVGs shaped like double diamonds with a center dot.

2. Investment & Pricing Card
   - Styling: Solid terracotta (g-primary) background with light text (	ext-on-primary).
   - Stamp Motif: An decorative SVG stamp ("SOURCED DIRECT") is absolutely positioned in the upper right (-right-6 -top-6), rotated -12deg with a low opacity of 15%.

3. What Is Not Included Card
   - Styling: Full-width container using .jharokha-clip with g-surface-container.
   - Bullets: Muted gray circle icons with horizontal minus glyphs (	ext-secondary/50).
   - Grid: Arranges text lists into a two-column grid on desktop screens.

---

======================================================
MODULE 11
WHY TRAVEL WITH KIM (OUR NETWORK)
======================================================

## MODULE 11 — Why Travel With Kim (Our Network)

### Purpose
The fourth section (id: #artisans, index: 3). Features Kim's bio, personal narrative, and sourcing network overview.

### Files Involved
- index.html — section#artisans markup layout
- css/index.css — Section 12 (Heritage Backdrop Pattern), Section 11 (Heritage Image Frame)

### Layout & Elements
- Arrangement: Two-column grid on desktop screens (md:grid-cols-12).
  - Text Column (7 cols): Lead copy utilizing .editorial-dropcap and clean body typography.
  - Image Column (5 cols): Mounted portrait photo styled within .heritage-image-frame.
- Background Accent: A decorative offset shadow container using .heritage-backdrop-pattern is placed behind the portrait frame, translated by +16px right and +16px down.
- Pull Quote: A centered, low-contrast italic quote is placed below the main grid block:
  `html
  <p class="font-body-md text-on-surface-variant/70 italic text-center max-w-xl mx-auto mb-8">
      &ldquo;India is not just a place to source — it's a place that changes how you see the world.&rdquo;
  </p>
  `

---

======================================================
MODULE 12
JOIN US
======================================================

## MODULE 12 — Join Us Section

### Purpose
The fifth and final section (id: #collection, index: 4). Houses the call-to-action details, group photos, accordion FAQ widget, application buttons, and page footer.

### Files Involved
- index.html — section#collection markup
- css/index.css — Section 15 (FAQ Accordion)
- js/app.js — Accordion click toggle logic

### Page Footer Component
- Role: Provides social navigation links, primary contact email, and corporate copyright statements.
- Styles: Bound inside contentinfo role guidelines. Top border line order-outline-variant/30, layout margins pb-4 pt-6. Social icons are rendered using inline vector SVGs that transition to terracotta on hover.

---

======================================================
MODULE 13
GLOBAL BUTTON SYSTEM
======================================================

## MODULE 13 — Global Button System

### Purpose
A unified button hierarchy used across the site to guide user interactions.

### Button Class Reference

1. Primary Button (.bg-primary)
   - Layout: py-3 px-6 text-sm uppercase tracking-widest.
   - Palette: Terracotta background (#823b18) with white text.
   - Hover State: Transitions background color to #a0522d (hover:bg-primary-container), adds elevated shadows (shadow-lg).
   - Shape: Sharp corner radius (orderRadius.DEFAULT = 2px).

2. Secondary / Outline Button (.border-outline)
   - Layout: py-3 px-6 text-sm uppercase tracking-widest.
   - Palette: Transparent background with #87736b borders.
   - Hover State: Transitions background to a warm light gray (hover:bg-surface-container).
   - Shape: Sharp corner radius (2px).

3. Sidebar CTA Button (.sidebar-cta)
   - Layout: Sidebar bottom button, block styling.
   - Design: Terracotta background with custom gold borders (order-[rgba(197,155,39,0.35)]), rounded corners (4px).
   - Animation: Includes .sidebar-cta-pulse to cycle a subtle scale/shadow transition on a 10-second loop.

4. Mobile Apply Button (.mobile-apply-btn)
   - Layout: Small, slim button pinned to the mobile top header.
   - Typography: Font set to Playfair Display italic (ont-style: italic) for a premium brand feel.
   - Accent: Features a solid gold top-edge outline (inset 0 2px 0 0 #C59B27).
   - Animation: Features a continuous shimmer sweep effect (::before shimmer gradient transition).

======================================================
MODULE 14
IMAGE SYSTEM
======================================================

## MODULE 14 — Image System

### Purpose
Manages imagery folders, loading strategies, and visual frame layout styling across the public site.

### Folder Structure (Actual)
`
upadate 2.0/
├── kim images/       ← Kim's personal photos, travel documents, product reviews
├── symbols/          ← Stock backgrounds, preloads, system placeholder graphics
├── itinerary/        ← Itinerary cards specific graphics (Day 01 & 07)
└── new image kim/    ← Trade show photo directories (Day 03 & 04)
`

### Loading Strategy
- Critical Images: Hero and Experience Step 01 images are prioritized (etchpriority="high") and preloaded in the head block.
- Off-Screen Images: All itinerary cards, secondary step images, network portraits, and footer graphics are lazy-loaded (loading="lazy") to optimize page loading speed.

### Frame Layout System (.heritage-image-frame)
Primary content images are framed inside a layered container system:
- Frame Mat: 6px inner padding using soft blush ivory (#FEF0EC).
- Border: 2px gold outline (#C59B27).
- Inner Clip: .heritage-image-frame-inner forces hidden overflows.
- Zoom Transitions: Uses .heritage-image-filter with translateZ overrides to utilize GPU hardware acceleration.

`css
/* Zoom Transition */
.heritage-image-filter {
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
img.heritage-image-filter {
    transform: translateZ(0);
    will-change: transform;
}
.group:hover img.heritage-image-filter {
    transform: scale(1.05) translateZ(0);
}
`

---

======================================================
MODULE 15
ANIMATION SYSTEM
======================================================

## MODULE 15 — Animation System

### Purpose
Maintains visual transitions across user interface states, keeping movement smooth and natural.

### Keyframe Animations

1. Sidebar CTA Pulse (ctaPulse)
   - Cycle: 10s loop. Active pulse for 1.2s, resting state for 8.8s.
   - Effect: Scales from 1.0 to 1.025 with an elevated shadow footprint.
   - Code:
     `css
     @keyframes ctaPulse {
         0%, 100% { transform: scale(1) translateY(0); ... }
         6%        { transform: scale(1.025) translateY(-1px); ... }
         12%       { transform: scale(1) translateY(0); ... }
     }
     `

2. Mobile Shimmer Sweep (applyShimmer)
   - Cycle: 2.8s loop.
   - Effect: Continuous horizontal translation of a white glow overlay.
   - Code:
     `css
     @keyframes applyShimmer {
         0%   { background-position: -200% center; }
         100% { background-position:  200% center; }
     }
     `

3. Scroll Hint Bobbing (hintPulse)
   - Cycle: 2.5s loop.
   - Effect: Gentle vertical bobbing for mobile scroll prompts.
   - Code:
     `css
     @keyframes hintPulse {
         0%, 100% { opacity: 0.5; transform: translateX(-50%) translateY(0); }
         50%       { opacity: 1;   transform: translateX(-50%) translateY(5px); }
     }
     `

---

======================================================
MODULE 16
JAVASCRIPT ARCHITECTURE
======================================================

## MODULE 16 — JavaScript Architecture

### Purpose
App app.js uses vanilla JS to coordinate section paging, scroll tracking, modal state shifts, accordion animation updates, and custom form validation.

### Files Involved
- js/app.js — Single master codebase file (832 lines)

### State Management Variables
- activeSectionIndex: Holds the current section index (0-4).
- isSectionTransitioning: Lock state variable to block input triggers during animations.
- overscrollDelta / overscrollDecayTimer: Track wheel overscroll values.
- swipeTouchStartY / swipeTouchStartScrollTop: Track mobile touch drag coordinates.

### Core Function Reference

1. checkScrollReveals()
   - Loop: Iterates through .reveal-on-scroll elements.
   - Check: Compares bounding boxes against window.innerHeight * 0.85.
   - Action: Appends .revealed to slide elements in.

2. updateNavSlider(index)
   - Action: Measures the active navigation list item offset height and repositions the indicator bar.

3. switchSection(nextIndex)
   - Action: Fades out the active section, re-indexes navigation states, scrolls to top, and displays the target section. Includes a cooldown delay to absorb extra mouse trackpad events.

4. Form Validators (validateRequiredInput / validateEmailInput)
   - Action: Validates fields on form submission. Toggles active error labels and saves submitted forms to local storage arrays.

======================================================
MODULE 17
CSS ARCHITECTURE
======================================================

## MODULE 17 — CSS Architecture

### Purpose
Organizes custom CSS properties to handle styling details that Tailwind's utility class system does not cover.

### Custom Style Categories
- Section Paging Layouts: Absolute styling stages and dynamic scroll transforms.
- Components: Lotus dividers, gold image frames, Jharokha notch clipping.
- WebKit Overrides: Custom scrollbar width and color attributes.

### Media Query Breakpoints
- Desktop Layouts (`@media (min-width: 768px)`): Configures dual column splits and side-by-side positioning.
- Accessibility Settings (`@media (prefers-reduced-motion: reduce)`): Bypasses slide animations to provide a simplified static visual fade.

---

======================================================
MODULE 18
HTML ARCHITECTURE
======================================================

## MODULE 18 — HTML Architecture

### Purpose
Structures content inside semantic layout tags to optimize accessibility (screen readers) and search engine indexing.

### semantic landmarks
- `<nav role="navigation">`: Desktop sidebar and mobile bottom navigators.
- `<header role="banner">`: Mobile top bar.
- `<main role="main">`: Paging layout content canvas.
- `<footer role="contentinfo">`: Page copyright details.
- `<form novalidate>`: Interactive dialog form structures.

### Paging Section Nodes
All 5 main viewports are marked using semantic section tags with unique label mappings:
- section#intro (Introduction)
- section#workshop (The Experience)
- section#materials (Logistics)
- section#artisans (Our Network)
- section#collection (Join Us)

---

======================================================
MODULE 19
PROJECT FILE STRUCTURE
======================================================

## MODULE 19 — Project File Structure

An ideal folder layout for future iterations to keep modules separated:

```
Project/
├── index.html                    # Main landing entry file
├── css/
│   ├── index.css                 # Consolidated style sheet
│   # Optional expansion files:
│   ├── base-reset.css            # Standard element resets
│   ├── design-tokens.css         # Visual styles, color variables
│   ├── navigation.css            # Sidebar and mobile navigation styles
│   ├── components.css            # Modular dividers, frames, and buttons
│   └── responsive.css            # Media query adjustments
├── js/
│   ├── app.js                    # Consolidated JS script
│   # Optional expansion files:
│   ├── navigation.js             # Nav click handlers, scroll tracking
│   ├── experience.js             # Storytelling timelines
│   ├── modals.js                 # Dialog overlays
│   └── validation.js             # Form rules
└── images/
    ├── hero/                     # Hero photos
    ├── experience/               # Timeline steps
    ├── itinerary/                # Day layout details
    └── icons/                    # Custom SVGs
```

---

======================================================
MODULE 20
DEPENDENCY MAP
======================================================

## MODULE 20 — Dependency Map

Visualizes layout and logic flow dependencies:

```
  [Tailwind CDN Setup] ──> [tailwind.config (Token Palette)]
                                  │
         ┌────────────────────────┴────────────────────────┐
         ▼                                                 ▼
  [css/index.css]                                   [index.html Layout]
         │                                                 │
         │ (Paging animations)                             │ (lotus-divider web component)
         ▼                                                 ▼
  [Section System Class Toggles] <────────────────── [js/app.js Engine]
                                                           │
                               ┌───────────────────────────┼───────────────────────────┐
                               ▼                           ▼                           ▼
                       [Scroll Engines]            [Timeline Tracker]           [Modal Systems]
```

---

======================================================
CODE REFERENCES
======================================================

## CODE REFERENCES

Representative code blocks demonstrating implementation details across sections:

### 1. Web Component (js/app.js)
```js
class LotusDivider extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="divider-lotus">
                <div class="divider-lotus-line"></div>
                <div class="divider-lotus-center">
                    <svg class="text-primary" viewBox="0 0 24 24">...</svg>
                </div>
                <div class="divider-lotus-line"></div>
            </div>
        `;
    }
}
customElements.define('lotus-divider', LotusDivider);
```

### 2. Paging Layout Transitions (css/index.css)
```css
section {
    position: absolute;
    inset: 0;
    display: none;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 700ms cubic-bezier(0.16, 1, 0.3, 1),
                transform 700ms cubic-bezier(0.16, 1, 0.3, 1);
}
section.active {
    display: flex;
    opacity: 1;
    transform: none;
}
section.exit {
    display: flex;
    opacity: 0;
    transform: translateY(-20px);
}
```

### 3. Scroll Transition Lock (js/app.js)
```js
function switchSection(nextIndex) {
    if (nextIndex === activeSectionIndex || isSectionTransitioning) return;
    isSectionTransitioning = true;

    const outgoingSection = sections[activeSectionIndex];
    const incomingSection = sections[nextIndex];

    outgoingSection.classList.add('exit');
    outgoingSection.classList.remove('active');

    setTimeout(() => {
        outgoingSection.style.display = 'none';
        incomingSection.style.display = 'flex';
        requestAnimationFrame(() => {
            incomingSection.classList.add('active');
        });
        activeSectionIndex = nextIndex;
        isSectionTransitioning = false;
    }, 700);
}
```

### 4. Jharokha Notch Styling (css/index.css)
```css
.jharokha-clip {
    clip-path: polygon(
        0 16px, 16px 16px, 16px 0,
        calc(100% - 16px) 0, calc(100% - 16px) 16px, 100% 16px,
        100% calc(100% - 16px), calc(100% - 16px) calc(100% - 16px), calc(100% - 16px) 100%,
        16px 100%, 16px calc(100% - 16px), 0 calc(100% - 16px)
    );
}
```

### 5. Accordion Height Transitions (css/index.css)
```css
.faq-content-wrapper {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 300ms cubic-bezier(0.16, 1, 0.3, 1);
}
.faq-item.active .faq-content-wrapper {
    grid-template-rows: 1fr;
}
.faq-content {
    min-height: 0;
    overflow: hidden;
}
```

---
*End of Technical Reference Guidelines*
