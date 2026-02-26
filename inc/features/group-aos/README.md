# Group AOS feature

This feature extends the core `group` block to support AOS (Animate On Scroll) animations via a block attribute and editor UI.

Summary
- Adds an `aos` attribute to `core/group` and a SelectControl in the block inspector to choose an animation.
- Injects `data-aos` into the saved markup so AOS.js can animate the element on the frontend.

Files
- `inc/features/group-aos/index.js` — editor code that registers the attribute and inspector control.
- `inc/features/group-aos/group-aos.php` — server-side filter to inject `data-aos` into rendered blocks.
- `inc/scripts/enqueue-group-aos.php` — enqueues the editor script (required from `inc/scripts/scripts.php`).

Usage
1. Ensure AOS.js and its CSS are enqueued on the frontend (the theme may already include AOS or a plugin may provide it). This feature only injects the `data-aos` attribute; it does not load AOS library on the frontend.
2. Edit a Group block in the block editor and select an animation from the "AOS animation" inspector control.

Notes
- All AI-generated identifiers and comments are in English per PROJECT_CONTEXT.md.
- The loader `inc/features/features.php` already requires this module explicitly; no dynamic autoloading was added.
