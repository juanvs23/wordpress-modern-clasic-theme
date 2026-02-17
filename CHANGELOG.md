# Changelog

All changes to this project are recorded in this file following Semantic Versioning (SemVer).

## [Unreleased]
- Añadida feature `button-class-select` (extiende `core/button` con variantes e imágenes).
- Añadido filtro para permitir subida de `svg`/`svgz` en `inc/filters/svg-uploads.php` (sin sanitización).
- Añadidos loaders por carpeta: `inc/filters/filters.php`, `inc/features/features.php`.
- Añadido `inc/bootstrap.php` como loader principal.
- Añadidos README global y README para la feature `button-class-select`.

## [0.1.0] - 2026-02-17
### Added
- Feature `button-class-select` (atributos JS, encolado en editor, loader PHP).
- Filtro `svg-uploads.php` para permitir SVGs.
- Loaders y reorganización modular (`inc/bootstrap.php`, `inc/*/*-loader.php`).
- Documentación: `PROJECT_CONTEXT.md`, `README.md`, `inc/features/button-class-select/README.md`.

---

Notes
- Use Semantic Versioning: MAJOR.MINOR.PATCH
  - Bump MAJOR for incompatible API changes.
  - Bump MINOR for added functionality in a backwards-compatible manner.
  - Bump PATCH for backwards-compatible bug fixes.

Files to update on releases
- `style.css` — actualizar cabecera del tema y la versión en cada release.
- `functions.php` — anotar cambios relevantes o señales de migración si aplica.
