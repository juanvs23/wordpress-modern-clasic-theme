# Nuevo Theme — Resumen del proyecto

Este repositorio contiene el tema `nuevo-theme` (basado en el boilerplate "Ignite Theme"). Está organizado siguiendo una arquitectura modular (cada dominio tiene su propia carpeta en `inc/`) y un bootstrap central en `inc/bootstrap.php` que carga los loaders de carpeta.

Resumen rápido
- Tema WordPress con código PHP modular dentro de `inc/`.
- `inc/bootstrap.php` es el loader principal: incluye loaders por carpeta (por ejemplo `inc/filters/filters.php`, `inc/features/features.php`).
- Cada carpeta (`filters`, `features`, `scripts`, `functions`, `extras`, `setups`, `hooks`) tiene su propio loader llamado `<carpeta>.php` en su raíz. Ese loader debe hacer `require_once` de los módulos internos.

Reglas importantes (resumido)
- No incluir ficheros de una carpeta directamente desde otra carpeta: siempre usar el loader de la carpeta correspondiente.
- Todo lo relativo a assets (`wp_enqueue_*`, `wp_dequeue_*`, etc.) debe residir en `inc/scripts/`.
- Soportes del tema y registros que deben ejecutarse en `after_setup_theme` o `widgets_init` se mantienen en `inc/setups/` y en `inc/features/` según corresponda.

Cómo usar las features
- Las features viven en `inc/features/<feature-name>/`. Cada feature debe incluir un `README.md` (este archivo) que documente su propósito, archivos, hooks, y cómo reutilizarla.
- `inc/features/features.php` carga las features registradas.

Características incluidas actualmente
- `button-class-select`: Extiende el bloque `core/button` del editor Gutenberg con un selector de tipo de botón y opciones para añadir imágenes antes/después del texto. Loader: `inc/features/button-class-select/button-class-select.php`.

Subir SVGs
- Este tema incluye un filtro (en `inc/filters/svg-uploads.php`) que permite subir `.svg` y `.svgz` sin sanitización. Útil para archivos creados por diseñadores internos. Usar con precaución.

Contribuir
- Sigue las reglas de loaders y modularización del proyecto. Añade documentación dentro de la carpeta de la feature.

Contacto
- Mantenedor: equipo del proyecto (interno)
Ignite Theme - Boilerplate

Instrucciones rápidas:

1) Ir a la carpeta del tema:

   cd /mnt/9420742b-e4d8-4f3a-8ab2-9f01ace8f27d/projects/apache/nuevo-theme/wp-content/themes/nuevo-theme

2) Instalar dependencias (requiere Node.js/npm):

   npm install

3) (Tailwind removed) Si necesitas compilar CSS, añade tu propio pipeline de build.

4) Activar el tema desde el panel de WordPress.

Nota: El tema dequeúa los estilos de Gutenberg en el front-end.
