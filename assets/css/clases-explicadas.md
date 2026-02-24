**CSS classes overview for the "the-hills" theme**

This document groups and explains the classes found in the CSS files under the `assets/css` folder. For repetitive utilities (margins, paddings, responsive sizes, breakpoints) the general pattern is explained and representative examples are provided.

**Borders.css**
- ` .pt-border`: Applies a 1px solid top border.
- ` .pb-border`: Applies a 1px solid bottom border.
- ` .pl-border`: Applies a 1px solid left border.
- ` .pr-border`: Applies a 1px solid right border.
- ` .border`: 1px solid border on all sides.
- ` .max-sm:\pt-border`, ` .md:\pt-border`, ` .lg:\pt-border`, ` .xl:\pt-border` (and pb/pl/pr/border variants): Responsive prefixed versions applied only within the matching media query range.

**Buttons.css**
- ` .the-hills-button-primary` / `.the-hills-buttons-primary .wp-block-button__link`: Primary button; uses `--primary-color` for background, white text, padding, 4px border-radius, font-weight 700; includes transition and a border using the same color.
- ` :hover` on primary variants: inverted background (transparent) and primary color for the text.
- Other thematic button variants: ` .the-hills-button-secondary`, ` .the-hills-button-black`, ` .the-hills-button-third-primary`, etc., change colors and hover behavior.
- ` .wpcf7 form .wpcf7-form-control.wpcf7-submit`: Style applied to Contact Form 7 submit to match the black button style.

**Carousels.css**
- ` .testimonial-list`: Slider container with calculated width and centered layout.
  - ` .ignite-slick-button`: Carousel buttons with minimum size and centered SVG usage.
- ` .slick-item-wrapp`: Lateral padding for slider items.
- ` .slick-dots` and ` .slick-dots li button`: Styles for navigation dots; size, default color (`--primary-color`) and active/hover color (`--third-color`).

**Colors.css**
- ` .bg-primary`, `.bg-secondary`, etc.: Utilities to set background colors using CSS variables defined in `:root`.
- ` .text-primary`, `.text-secondary`, etc.: Utilities for text color.
- ` .border-primary`, `.border-secondary`, etc.: Utilities for border color.
- ` .bg-transparent`, `.text-transparent`, `.border-transparent`: Transparency utilities.
- ` .hover\:bg-*`, `.hover\:text-*`, `.hover\:border-*`: Hover variants that apply the corresponding style on `:hover` (naming escaped with `:` for Tailwind-like compatibility).

**Font-sizes.css**
- Global rules for `h1..h6` and alternate classes `.h1 .h2 .h3 ...` that use responsive variables (`--h1-responsive`, `--h1-tablet`, `--h1`) to adapt sizes across breakpoints.
- Font-weight helper classes: `.regular` (400), `.medium` (500), `.semibold` (600), `.bold` (600).

**Fonts.css**
- `@font-face` definitions for `Montserrat` in regular/italic/bold variants, pointing to `../fonts/`.

**Gaps.css**
- Utilities ` .gap-0`, ` .gap-4`, ` .gap-8`, ... ` .gap-100`: Set the `gap` property using values based on variables (`--text`, `--h3`, etc.).
- Responsive versions: `md:`, `lg:`, `xl:` (and `max-sm:` for mobile) for different breakpoints.

**General.css**
- Variables in `:root`: typography sizes (`--h1`, `--h2`, etc.), responsive sizes, colors (`--primary-color`, `--secondary-color`, `--third-color`, etc.), and percentages (`--p25`, etc.).
- Base rules: `body` uses `Montserrat`, `--text` size, `--primary-color` for color. `h1..h6` inherit primary color and weight 700.

**Heights.css**
- Height utilities: `.height-0`, `.h-100`, `.h-50`, `.h-40`, `.h-150` and max-height variants like `.max-h-100`, `.max-h-150`.

**Layout.css**
- Containers: `.hero-banner`, `.ignite-section`, `.hero-text-container`, `.container` control padding and max-width (1200px).
- Display utilities: `.grid`, `.flex`, `.block`.
- Grid columns: `.grid-cols-1` ... `.grid-cols-4`.
- Flex width/fraction helpers: `.flex-full`, `.flex-1\/3`, etc., set `flex-basis` and `max-width` for flexible columns.
- Responsive versions use `md:`, `lg:`, `xl:` prefixes.

**Margins.css**
- Utilities `m-0`, `m-16`, `m-24`, ... and directional variants `mr-*`, `ml-*`, `mt-*`, `mb-*`, `mx-*`, `my-*`, `mx-auto`, `m-auto`.
- Responsive prefixes: `max-sm:`, `md:`, `lg:`, `xl:`.

**Paddings.css**
- Similar to margins but for `padding`: `p-*`, `pr-*`, `pl-*`, `pt-*`, `pb-*`, `px-*`, `py-*` with values based on variables.

**Positions.css**
- Position utilities: `.relative`, `.absolute`, `.fixed`, `.sticky`.
- Positive position helpers: `.top-0`, `.top-16`, `.left-*`, etc.
- Negative and percentage position helpers are also available, with responsive variants.

**Radius.css**
- Border-radius classes: `.radius-4`, `.radius-8`, ... `.radius-full`, `.radius-0` with values derived from variables and responsive versions.

**Style.css**
- Theme/template specific classes like `.lines-background`, `.line-bg-content`, `.line` for line backgrounds, and floating phone button styles `a.the-hills-phone-button`.
- Footer related rules and various utilities and components used across templates.

**Utilities.css**
- Alignment and text helpers: `.text-center`, `.text-left`, `.text-right`.
- Flex helpers: `.items-center`, `.flex-col`, `.flex-row`, `.justify-center`, `.justify-between`, etc.
- Other utilities: `.shadow-base`, `.object-cover`, `.hidden`, `.w-full`, `.max-w-full`, aspect-ratio helpers, overflow helpers, transitions, and responsive variants.

**Final notes and patterns**
- Many classes follow a Tailwind-like utility pattern: breakpoint prefixes and short helper names (`m-`, `p-`, `gap-`, `h-`, `w-`, `radius-`, `text-`, `bg-`).
- CSS variables in `:root` centralize colors and sizes — changing `--primary-color` / `--secondary-color` will affect many utilities.
- To find the exact class used in HTML, search for the literal class name (e.g. `.term-list-item`) as many utilities are intentionally generic.

If you want, I can generate a more detailed version that lists every class on its own line (this document groups patterns to keep it manageable). Do you want the exhaustive class list?