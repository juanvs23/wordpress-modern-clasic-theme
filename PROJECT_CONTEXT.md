# Contexto del proyecto: Ignite Theme

Ruta del proyecto: /wp-content/themes/nuevo-theme

Resumen breve:
-- Tema de WordPress "Ignite Theme" (boilerplate) que usa TailwindCSS.
- Estructura incluye integraciones de Node (Tailwind) y soporte de autoload PSR-4 con Composer (composer.json presente aunque sin dependencias).
- Desencola estilos de Gutenberg y las funcionalidades PHP están organizadas en `inc/features/`.

Arquitectura actual (Screaming Architecture aplicada para PHP):
- Código PHP por dominio en `inc/features/` (ej. `theme-setup`, `assets`, `gutenberg`).
- `inc/bootstrap.php` carga las features declaradas.
- `functions.php` requiere `inc/bootstrap.php`.
- Archivos relacionados con frontend/build (PostCSS, Tailwind, `src/` con orígenes CSS) permanecen en `src/`.

Archivos y carpetas importantes:
- `style.css` (cabecera del tema)
- `functions.php` (defines y carga centralizada: `inc/bootstrap.php`)
- `inc/` (PHP del tema, con `inc/features/*`)
- `package.json`, `package-lock.json`, `node_modules/` (build de Tailwind)
- `postcss.config.mjs`, `tailwind.config.js`, `src/` (origen de estilos, assets frontend)
- `composer.json`, `vendor/` (vacío en "require"). Autoload apunta a `inc/`.
- `README.md` (instrucciones rápidas)
- `assets/css/style.css` (salida compilada de Tailwind)

Extracto de `functions.php` (actual):
```
<?php
/**
 * Nuevo Theme - funciones y carga de módulos
 * @package Igni
 */

if ( ! defined( 'IGNITE_VERSION' ) ) {
    define( 'IGNITE_VERSION', '1.0.0' );
}

if ( ! defined( 'IGNITE_DIR' ) ) {
    define( 'IGNITE_DIR', get_template_directory() );
}

if ( ! defined( 'IGNITE_URI' ) ) {
    define( 'IGNITE_URI', get_template_directory_uri() );
}

if ( ! defined( 'IGNITE_ASSETS_URI' ) ) {
    define( 'IGNITE_ASSETS_URI', IGNITE_URI . '/assets' );
}

if ( ! defined( 'IGNITE_STYLE_URI' ) ) {
    define( 'IGNITE_STYLE_URI', IGNITE_ASSETS_URI . '/css/style.css' );
}

/* Cargar módulos */
// Bootstrap centralizado que carga features organizadas por dominio (ubicado en `inc`)
require_once IGNITE_DIR . '/inc/bootstrap.php';
```

Estructura de setups y features (ejemplos creados):
- `inc/setups/theme-setup.php` — soporte `title-tag`, `post-thumbnails`, registro de menús y sidebars.
 - `inc/scripts/enqueue.php` — encola `assets/css/style.css`, JS del tema y librerías desde `assets/libs/`.
 - `inc/scripts/dequeue.php` — dequeúa estilos de Gutenberg y scripts no deseados.

Instrucciones para desarrolladores tras la reestructuración:

1) Para instalar dependencias de Node y compilar Tailwind:

```bash
cd wp-content/themes/nuevo-theme
npm install
npm run build
```

2) Si usas Composer para autoload PHP (opcional):

```bash
composer dump-autoload
```

3) Verifica que `assets/css/style.css` esté presente y actualizado.

Información del entorno (salida de comprobación en esta máquina):
```
PHP 8.4.17 (cli)
Composer: no disponible (no instalado en la máquina)
Node: v20.19.6
npm: v10.8.2
npx tailwindcss: error en ejecución (npx intentó ejecutar pero falló en este entorno)
```

Notas y recomendaciones:
- Para compilar los estilos instale Node.js/npm y luego en la carpeta del tema ejecutar `npm install` y `npm run build`.
- Instalar `composer` si desea usar `composer` para autoload o paquetes PHP.
- Verifique que `assets/css/style.css` exista y esté actualizado después de compilar Tailwind.

Archivo actualizado: PROJECT_CONTEXT.md

(Generado automáticamente con los archivos y comandos disponibles en el workspace.)

Convenciones de organización de código (nuevas reglas solicitadas):

- Custom Post Types (`CPT`):
    - Todos los CPT se ubicarán en `inc/features/` en una carpeta por cada CPT.
    - Estructura por CPT:

        cptname/
        - cptname.php         # Archivo principal del módulo (bootstrap del CPT)
        - posttype.php        # Registro del post type (register_post_type)
        - taxonomies.php      # Taxonomías relacionadas (register_taxonomy)
        - shortcodes/
            - shortcodes.php    # Loader de shortcodes del CPT
            - shortcode-name.php # Shortcodes individuales

    - Ejemplo: `inc/features/services/posttype.php`, `inc/features/services/taxonomies.php`, `inc/features/services/shortcodes/service_grid.php`.

- `inc/extras`:
    - En `inc/extras` únicamente pueden residir:
        - Shortcodes (y sus loaders) que sean específicos del tema y reutilizables globalmente.
        - Componentes PHP que SEAN de uso general (es decir, código acoplado al tema o a features concretas).
    - No colocar utilidades ni lógica reutilizable aquí; esas van en `inc/functions`.

- `inc/functions`:
    - Solo código de funciones útiles y helpers (equivalente a una carpeta `utils`).
    - Aquí deben ir funciones auxiliares puras, sin efectos secundarios, que puedan reutilizarse desde diferentes features.
    - Evitar side-effects (registro de hooks, enqueues, etc.) en archivos de `inc/functions`; esos se deben realizar desde los loaders de su carpeta correspondiente.

Estas convenciones deben mantenerse para facilitar mantenimiento y coherencia con la arquitectura modular (Screaming Architecture).

Nota para la IA y desarrolladores:
- Esta sección de "Convenciones de organización de código" actúa como referencia oficial para cualquier asistente de IA o script automatizado que realice cambios en el repositorio. Cuando se solicite reorganizar código o crear nuevos módulos, siga estrictamente estas reglas (ubicación de CPTs en `inc/features/`, uso de `inc/extras` y `inc/functions`, etc.).

Obligatoriedad para IA / Automatizaciones:
- La convención indicada en este documento debe ser respetada siempre por cualquier asistente de IA, bot o script automatizado que realice modificaciones en el repositorio.
- Antes de aplicar cambios automáticos, la IA debe validar que las modificaciones cumplen las reglas de organización (p. ej. mover o centralizar enqueues solo en `inc/scripts`, crear CPTs solo bajo `inc/features/<cpt>/`, etc.).
- Cualquier cambio automatizado debe incluir un comentario de commit que explique la acción y referencie esta sección de `PROJECT_CONTEXT.md`.
 - Cualquier cambio automatizado debe incluir un comentario de commit que explique la acción y referencie esta sección de `PROJECT_CONTEXT.md`.

Actualización importante (cambio aplicado): No usar autoloaders dinámicos
-----------------------------------------------------------------

- Motivo: por requerimiento del mantenedor se eliminó el autoloading recursivo/dinámico
    para dar control manual sobre qué ficheros PHP se cargan y cuándo.
- Nueva regla: los loaders en `inc/` deben requerir explícitamente los archivos necesarios
    usando `require_once __DIR__ . '/ruta/archivo.php'` en lugar de usar `glob()` o
    `RecursiveDirectoryIterator`.
- Ejemplo práctico:

        if ( file_exists( __DIR__ . '/scripts/enqueue.php' ) ) {
                require_once __DIR__ . '/scripts/enqueue.php';
        }

- Archivos modificados para cumplir esta regla (referencia):
    - `inc/scripts/scripts.php`
    - `inc/setups/setups.php`
    - `inc/features/features.php`
    - `inc/functions/functions.php`
    - `inc/extras/extras.php`
    - `inc/filters/filters.php`
    - `inc/hooks/hooks.php`

- Regla para automatizaciones/IA: NO introducir loaders dinámicos. Cualquier cambio
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

