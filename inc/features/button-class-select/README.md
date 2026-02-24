# Feature: Button Class Select

Description
- Extends the `core/button` Gutenberg block to allow selecting a predefined style class and choosing images to show before and/or after the button text.

Files
- `button-class-select.php` — feature loader. Registers and enqueues the editor script (`index.js`).
- `index.js` — JS logic that adds block attributes, InspectorControls (variant selector, class selector, image pickers), and alters the saved HTML according to the selected variant.

Attributes added
- `classType` (string): additional CSS class (e.g. `btn-primary`).
- `ntVariant` (string): button variant, possible values:
  - `variant-1`: extra classes only
  - `variant-2`: image before text
  - `variant-3`: image after text
  - `variant-4`: images before and after
- `ntImageBeforeID` / `ntImageBeforeURL` — image before (ID and URL)
- `ntImageAfterID` / `ntImageAfterURL` — image after (ID and URL)

How to use
1. Activate the `nuevo-theme` theme.
2. In the block editor, select a "Button" block.
3. In the sidebar you will find the "Button type" panel with:
   - Variant selector (1–4)
   - Class selector (None / Primary / Secondary / Alert)
   - Image pickers (depending on variant)
4. Save and check the front-end. Added images appear as `<img>` elements inside the button with classes `nt-btn-image nt-image-before` / `nt-image-after`.

Reuse notes
- If you need to add more class options, modify the `options` array inside `index.js`.
- CSS styles for `.btn-primary`, `.nt-btn-image`, etc., should be added to the theme (for example in `assets/css/style.css`) to achieve the desired appearance.
- The script enqueues on the `enqueue_block_editor_assets` hook from `button-class-select.php`.

Security
- This feature does not handle sensitive data; however, images come from the Media Library and follow the site's upload policies (e.g. the SVG filter may allow SVG uploads if enabled in `inc/filters`).
