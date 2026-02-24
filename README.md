# Nuevo Theme — Project summary

This repository contains the `nuevo-theme` WordPress theme (based on the "Ignite Theme" boilerplate). The project follows a modular architecture where each domain lives under `inc/` and a central bootstrap (`inc/bootstrap.php`) loads the folder loaders.

Quick summary
- WordPress theme with modular PHP code under `inc/`.
- `inc/bootstrap.php` is the main loader: it includes folder loaders (for example `inc/filters/filters.php`, `inc/features/features.php`).
- Each folder (`filters`, `features`, `scripts`, `functions`, `extras`, `setups`, `hooks`) must provide a loader named `<folder>.php` at its root. That loader should `require_once` its internal modules.

Key rules (brief)
- Do not include files from one folder directly in another folder: always go through the corresponding folder loader.
- All asset-related code (`wp_enqueue_*`, `wp_dequeue_*`, etc.) must live in `inc/scripts/`.
- Theme supports and registrations that must run on `after_setup_theme` or `widgets_init` should live in `inc/setups/` or `inc/features/` as appropriate.

Using features
- Features live in `inc/features/<feature-name>/`. Each feature should include a `README.md` (this file) documenting its purpose, files, hooks, and usage.
- `inc/features/features.php` loads registered features.

Included features
- `button-class-select`: Extends the `core/button` Gutenberg block with a button-type selector and options to add images before/after the text. Loader: `inc/features/button-class-select/button-class-select.php`.

SVG uploads
- This theme includes a filter (`inc/filters/svg-uploads.php`) that allows uploading `.svg` and `.svgz` without sanitization. Intended for internal designer-provided assets. Use with caution.

Contributing
- Follow the project loader and modularization rules. Add documentation inside each feature folder.

Contact
- Maintainer: project team (internal)

Ignite Theme - Boilerplate

Quick instructions:

1) Change to the theme folder:

   cd /mnt/9420742b-e4d8-4f3a-8ab2-9f01ace8f27d/projects/apache/nuevo-theme/wp-content/themes/nuevo-theme

2) Install dependencies (requires Node.js/npm):

   npm install

3) (Tailwind removed) If you need to compile CSS, add your preferred build pipeline.

4) Activate the theme from the WordPress admin.

Note: The theme dequeues Gutenberg styles on the front-end.
