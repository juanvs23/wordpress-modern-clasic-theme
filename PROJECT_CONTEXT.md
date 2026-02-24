# Project context: Ignite Theme

This file documents the structure, rules and automation requirements for the `nuevo-theme` (Ignite Theme) WordPress theme located at `wp-content/themes/nuevo-theme`.

## Architecture rule: placement of functionality

- Any functionality that should not run on the `init` hook must be attached to the appropriate hook: `after_setup_theme` for theme setup (supports, image sizes, menus) or `widgets_init` for widget registration.
- Additional theme features and domain-specific code must live under `inc/features/` and be loaded via `inc/features/features.php`.

Project path: `/wp-content/themes/nuevo-theme`

Summary
- Boilerplate WordPress theme based on "Ignite Theme".
- Gutenberg styles are dequeued on the frontend and PHP features are organized under `inc/features/`.

Current architecture (Screaming Architecture applied for PHP)
- Domain-driven PHP code in `inc/features/` (examples: `theme-setup`, `assets`, `gutenberg`).
- `inc/bootstrap.php` is the central loader that orchestrates folder loaders.
- `functions.php` requires `inc/bootstrap.php`.
- Frontend/build source files (PostCSS, Tailwind, `src/`) remain in `src/` if present.

Important files and folders
- `style.css` — theme header
- `functions.php` — central defines and bootstrap require
- `inc/` — theme PHP organized by domain/features
- `assets/css/` — compiled CSS output (ensure `style.css` exists)
- `src/`, `package.json`, `package-lock.json`, `node_modules/` — frontend build sources (Tailwind pipeline was removed)
- `composer.json`, `vendor/` — composer config (autoload points to `inc/`) (composer may be absent on the machine)

Example of loaders and features
- `inc/setups/theme-setup.php` — theme supports (`title-tag`, `post-thumbnails`), menu and sidebar registration.
- `inc/scripts/enqueue.php` — enqueues `assets/css/style.css`, theme JS and libraries from `assets/libs/`.
- `inc/scripts/dequeue.php` — dequeues Gutenberg styles and unwanted scripts.

Developer instructions after refactor

1) The Tailwind CSS build pipeline was removed; if you need a build pipeline (PostCSS, Sass, etc.), add it and update `package.json` accordingly.

2) If you use Composer for PHP autoloading, run:

```bash
composer dump-autoload
```

3) Ensure `assets/css/style.css` contains the compiled styles required by the theme.

Environment note (current machine check)

```
PHP 8.4.17 (cli)
Composer: not available (not installed)
Node: v20.19.6
npm: v10.8.2
npx tailwindcss: execution error in this environment
```

Guidelines and recommendations
- To build CSS: install Node.js/npm then run `npm install` and `npm run build` in the theme folder.
- Install Composer if you plan to use it for autoloading or PHP packages.
- Verify `assets/css/style.css` after building to ensure theme styles are present.

This file also defines code organization conventions that must be followed by developers and automation tools.

Conventions (code organization)

- Custom Post Types (CPT):
  - Place all CPTs under `inc/features/` with one folder per CPT.
  - Suggested structure per CPT:

    cptname/
    - cptname.php         # module bootstrap
    - posttype.php        # register_post_type
    - taxonomies.php      # register_taxonomy
    - shortcodes/
      - shortcodes.php    # shortcodes loader
      - shortcode-name.php # individual shortcodes

- `inc/extras`:
  - Only theme-specific reusable shortcodes and general PHP components used across the theme.
  - Do not place utility functions or generic reusable logic here; those belong in `inc/functions`.

- `inc/functions`:
  - Pure helper functions and utilities without side effects.
  - Avoid side-effects (hook registrations, enqueues) inside `inc/functions`; perform those from folder loaders.

Loaders and modularization (MANDATORY)

- `inc/bootstrap.php` is the main loader and is the only file that includes top-level folder loaders (for example `inc/filters/filters.php`, `inc/features/features.php`, `inc/scripts/scripts.php`).
- Each folder (e.g., `inc/filters`, `inc/features`, `inc/scripts`, `inc/functions`, `inc/extras`) MUST provide a loader file named `<folder>.php` in its root.
- All `require_once` inclusions for files in a folder must be performed from that folder's loader. Do not require files from other folders directly.
- No script, enqueue or asset management code should live outside `inc/scripts`.

No dynamic autoloaders

- Dynamic recursive autoloading was removed per maintainer request. Loaders must explicitly require files using `require_once __DIR__ . '/path/file.php'` rather than `glob()` or `RecursiveDirectoryIterator`.
  - Example:

    if ( file_exists( __DIR__ . '/scripts/enqueue.php' ) ) {
        require_once __DIR__ . '/scripts/enqueue.php';
    }

Automation / AI obligations

- Any automated change must validate compliance with these organization rules.
- Automation must not introduce dynamic loaders.
- When adding a module, update the corresponding folder loader with an explicit `require_once`.
- All automated commits must reference this `PROJECT_CONTEXT.md` and describe the action in the commit message.

Changelog and versioning

- Record all relevant changes in `CHANGELOG.md` following Semantic Versioning (SemVer) with sections: `Added`, `Changed`, `Fixed`, `Removed`, `Deprecated`, and `Security`.
- On release, update `style.css` header and `functions.php` notes if needed.

Documentation language policy

- `README.md` and `CHANGELOG.md` in the theme root must be written in English.

Context file language

- El archivo `PROJECT_CONTEXT.md` estará siempre en español. Cualquier cambio automatizado o manual debe respetar este requisito y, si realiza traducciones o modificaciones de idioma, documentarlas en el mensaje de commit. (Regla obligatoria)

Internationalization and string rules

- All UI strings in the codebase should use English as the source language and WordPress i18n functions (`__()`, `_e()`, `_n()`, `esc_html__()`, etc.).
- New or modified strings must remain in English in the source code. Provide `.pot/.po/.mo` files for translations when needed, but do not change the English source strings.

Language rules for AI and developers

- Rule 1 (AI-generated identifiers/comments): All variables, constants and comments generated by AI/automation must be in English.
- Rule 2 (human comments): Comments added by human developers in other languages must be translated to English. Document translated comments in the commit message.
- Rule 3 (strings): All project strings must be in English as source text; use WordPress i18n for localization to other languages.

Automation obligations regarding language

- Before applying automated changes, the automation must:
  - Translate any non-English comments relevant to the change into English.
  - Ensure AI-generated identifiers and comments are in English.
  - Use WordPress i18n functions for user-facing strings and keep the English source text.
  - Reference `PROJECT_CONTEXT.md` in the commit message and describe translations performed.

Reference project structure

```
root/
├── assets/
│   ├── css/
│   ├── js/
│   ├── libs/
│   ├── fonts/
│   └── images/
├── classes/
│   ├── utils/
│   └── assets/
├── includes/
│   ├── scripts/
│   ├── filters/
│   ├── features/
│   ├── functions/
│   ├── extras/
│   ├── setups/
│   └── hooks/
├── pages/
├── template-parts/
│   └── components/
├── tmp/
├── functions.php
├── style.css
├── header.php
├── footer.php
├── page.php
├── single.php
├── archive.php
```

This file serves as the authoritative guide for any automation or contributor making structural or localization changes to the theme.

    automatizado que añada o mueva módulos debe también añadir el `require_once __DIR__ ...`
    correspondiente y documentar el commit con referencia a esta sección.

Regla estricta sobre assets y enqueues:
- Todo lo relativo a assets (CSS, JS, librerías), el registro/registro de estilos y scripts, y las operaciones de `enqueue` / `dequeue` / `deregister` debe residir exclusivamente en `inc/scripts`.
- Cualquier archivo PHP que actualmente haga `wp_enqueue_script`, `wp_enqueue_style`, `wp_dequeue_*` o `wp_deregister_*` fuera de `inc/scripts` deberá ser movido allí o reemplazado por un loader que delegue a `inc/scripts`.
- `inc/scripts` será el único punto de entrada para todo lo relacionado con el frontend (assets, dependencias de librerías, inicialización de scripts). Los loaders de otras carpetas no deben encolar ni desencolar assets.

Acción para asistentes/IA:
- Al automatizar refactorizaciones o migraciones, primero buscar patrones: `wp_enqueue_script`, `wp_enqueue_style`, `wp_dequeue_style`, `wp_dequeue_script`, `wp_deregister_script`, `wp_deregister_style`.
- Si se encuentra alguno fuera de `inc/scripts`, mover el código funcional a `inc/scripts` y dejar en su lugar un pequeño loader que requiera el archivo en `inc/scripts` (si se desea mantener compatibilidad durante la transición).
- Actualizar `PROJECT_CONTEXT.md` y comentar en los cambios de git la intención: "mover assets a `inc/scripts` según convención".

Regla de loaders y modularización (OBLIGATORIO)

- El loader principal del tema es `inc/bootstrap.php`. Este archivo es el único punto que incluye los loaders de carpeta de primer nivel (por ejemplo `inc/filters/filters.php`, `inc/features/features.php`, `inc/scripts/scripts.php`, etc.).
- Cada carpeta módulo (por ejemplo `inc/filters`, `inc/features`, `inc/scripts`, `inc/functions`, `inc/extras`) DEBE tener su propio loader en la raíz de la carpeta llamado como la carpeta seguida de `.php` (ej. `inc/filters/filters.php`).
- Todas las inclusiones (require_once) de ficheros que pertenecen a una carpeta deben realizarse exclusivamente desde el loader de esa carpeta. Por ejemplo, si se añade `svg-uploads.php` dentro de `inc/filters/`, su inclusión debe estar en `inc/filters/filters.php`:

    if ( file_exists( __DIR__ . '/svg-uploads.php' ) ) {
        require_once __DIR__ . '/svg-uploads.php';
    }

- NO se debe incluir directamente un fichero perteneciente a otra carpeta desde fuera de su loader (por ejemplo: no incluir `inc/filters/svg-uploads.php` desde `inc/setups/theme-setup.php`). Siempre pasar por el loader de la carpeta correspondiente.
- Nunca añadir scripts, enqueues, o módulos en carpetas ajenas a la estructura. Si un fichero realiza `wp_enqueue_*` o gestiona assets debe vivir en `inc/scripts` y ser requerido desde `inc/scripts/scripts.php`.
- El propósito: mantener una jerarquía clara y predecible donde `inc/bootstrap.php` orquesta la carga de loaders por dominio, y cada loader orquesta sus módulos internos.

Cumplimiento y automatizaciones:
- Las automatizaciones y asistentes (IA, scripts) deben respetar esta regla: al añadir un nuevo módulo, crear/actualizar el loader de su carpeta y añadir el `require_once` correspondiente en ese loader, y no modificar loaders de otras carpetas salvo para añadir su propio `require_once`.

Changelog y versionado

- Todas las modificaciones relevantes del proyecto deben documentarse en `CHANGELOG.md` en la raíz del tema. El `CHANGELOG.md` seguirá Semantic Versioning (SemVer) y deberá incluir entradas para `Added`, `Changed`, `Fixed`, `Removed`, `Deprecated`, y `Security` según corresponda.
- En cada release, además del `CHANGELOG.md`, se actualizarán los siguientes archivos para reflejar la nueva versión y notas de la release:
    - `style.css` (cabecera del tema y versión)
    - `functions.php` (si aplica, incluir notas de migración o flags de compatibilidad)
- Convención operativa: los fixes, cambios mayores y nuevas funcionalidades se registran en `CHANGELOG.md` y las versiones siguen SemVer. Los incrementos de versión y la actualización de `style.css` / `functions.php` deben hacerse al crear la release.

**Idioma de documentación:** Los archivos `README.md` y `CHANGELOG.md` en la raíz del tema deben estar escritos en inglés. Esta regla facilita la colaboración externa y el cumplimiento con convenciones de repositorios públicos. Todas las nuevas entradas en `CHANGELOG.md` y cualquier `README.md` principal deben redactarse en inglés.

**Reglas sobre idioma y localización:**

- **Regla 1 (IA — variables/constantes/comentarios):** Todas las variables, constantes y comentarios generados por asistentes de IA o automatizaciones deben estar escritos en inglés. Esto incluye nombres de variables, nombres de constantes, etiquetas en arrays, y comentarios inline o de bloque creados por la IA.

- **Regla 2 (comentarios de desarrolladores humanos):** Los comentarios añadidos por desarrolladores humanos que estén en otro idioma deberán ser traducidos al inglés. Las traducciones pueden aplicarse mediante commits separados o como parte de la misma mejora funcional; en cualquier caso, documente en el commit qué comentarios fueron traducidos.

- **Regla 3 (cadenas/strings):** Todas las cadenas de texto del proyecto deben estar en inglés. Para cadenas de interfaz de usuario (user-facing) use las funciones i18n de WordPress (`__()`, `_e()`, `_n()`, `esc_html__()`, etc.) con el inglés como idioma fuente (en_US). Si se requiere soporte para otros idiomas, genere archivos de traducción (`.pot/.po/.mo`) apropiados sin cambiar la cadena fuente.

**Obligaciones para IA / Automatizaciones relativas a idioma:**
- Antes de aplicar cambios automáticos que modifiquen código, la automatización debe:
    - Verificar y traducir (a inglés) cualquier comentario no inglés que afecte al contexto del cambio.
    - Asegurar que las nuevas variables/constantes y comentarios generados por la IA estén en inglés.
    - Para cadenas nuevas o modificadas, usar las funciones i18n de WordPress y mantener la cadena fuente en inglés.
    - Añadir en el mensaje de commit la referencia a `PROJECT_CONTEXT.md` y describir brevemente las traducciones realizadas (por ejemplo: "Translate comments and strings to English — see PROJECT_CONTEXT.md").

Estas reglas son obligatorias y deben cumplirse en cualquier PR, commit automatizado o cambio realizado por asistentes/IA.


Estructura de referencia (ejemplo `root`) - obligación de cumplimiento:

La siguiente estructura es la referencia canónica que debe tomarse en cuenta en futuras sesiones y por cualquier automatización/IA que modifique el proyecto. Intenta siempre cumplir con este árbol cuando organices el tema.

```
root/
├── assets/                      # Recursos estáticos
│   ├── css/                    # Hojas de estilo
│   ├── js/                     # Scripts JavaScript
│   ├── libs/                   # Librerías externas
│   ├── fonts/                  # Fuentes personalizadas
│   └── images/                 # Imágenes del tema
├── classes/                     # Sistema de clases y utilidades para el uso y simplificación de código de wordpress (tiene assets propios para su funcionamiento) y no deben ser mezclados con los assets propios del tema. No deben moverse a `inc/` ni ser mezclados con el código de funcionalidades del tema.
│   ├── utils/                  # Utilidades
│   └── assets/                 # Assets de clases
├── includes/                    # Archivos de inclusión
│   ├── scripts/                # Gestión de scripts y estilos (enqueues, dequeues)
│   ├── filters/                # Filtros de WordPress personalizados
│   ├── features/               # Funcionalidades del tema, debe organizarse en base a moduloas basados acquitectura limpia tomando como referencia que solo estarian los CPTs, widgets tomando en cuenta la estructura en la linea 102 
│   ├── functions/              # Funciones auxiliares, helpers y utilidades (sin side-effects)
│   ├── extras/                 # Extras y shortcodes específicos del tema (reutilizables globalmente)
│   ├── setups/                 # Configuraciones y soportes (theme support, registro de menús, sidebars, etc.)
│   └── hooks/                  # Hooks personalizados y acciones del tema
├── pages/                       # Plantillas de página
├── template-parts/              # Partes de plantillas
│   └── components/             # Componentes reutilizables
├── tmp/                         # Archivos temporales
├── functions.php               # Funciones principales del tema
├── style.css                   # Hoja de estilos principal
├── header.php                  # Cabecera personalizada
├── footer.php                  # Pie de página personalizado
├── page.php                    # Plantilla de páginas
├── single.php                  # Plantilla de entradas
├── archive.php                 # Plantilla de archivos
```

Nota: esta estructura se añadió al `PROJECT_CONTEXT.md` como referencia y regla operativa — la IA y scripts automatizados deben respetarla y usarla como guía antes de introducir cambios estructurales.

