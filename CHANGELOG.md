# Changelog

All changes to this project are recorded in this file following Semantic Versioning (SemVer).

## [Unreleased]
- Added feature `button-class-select` (extends `core/button` with variants and image options).
- Added filter to allow uploading `svg`/`svgz` in `inc/filters/svg-uploads.php` (without sanitization).
- Added folder loaders: `inc/filters/filters.php`, `inc/features/features.php`.
- Added `inc/bootstrap.php` as the main bootstrap loader.
- Added global README and a README for the `button-class-select` feature.

## [0.1.0] - 2026-02-17
### Added
- Feature `button-class-select` (JS attributes, editor enqueue, PHP loader).
- `svg-uploads.php` filter to allow SVG uploads.
- Loaders and modular reorganization (`inc/bootstrap.php`, `inc/*/*-loader.php`).
- Documentation: `PROJECT_CONTEXT.md`, `README.md`, `inc/features/button-class-select/README.md`.

---

Notes
- Use Semantic Versioning: MAJOR.MINOR.PATCH
  - Bump MAJOR for incompatible API changes.
  - Bump MINOR for added functionality in a backwards-compatible manner.
  - Bump PATCH for backwards-compatible bug fixes.

Files to update on releases
- `style.css` — update the theme header and version on each release.
- `functions.php` — annotate relevant changes or migration flags when applicable.
