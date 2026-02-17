# Feature: Button Class Select

Descripción
- Extiende el bloque `core/button` del editor Gutenberg para permitir: seleccionar una clase de estilo predefinida y elegir imágenes para mostrar antes y/o después del texto del botón.

Archivos
- `button-class-select.php` — loader de la feature. Registra y encola el script del editor (`index.js`).
- `index.js` — lógica JS que añade atributos al bloque, controles en `InspectorControls` (selector de variante, selector de clase, selectores de imagen) y modifica el HTML guardado según la variante.

Atributos que añade
- `classType` (string): clase CSS adicional (ej. `btn-primary`).
- `ntVariant` (string): variante del botón, posible valores:
  - `variant-1`: solo clases extras
  - `variant-2`: imagen antes del texto
  - `variant-3`: imagen después del texto
  - `variant-4`: imágenes antes y después
- `ntImageBeforeID` / `ntImageBeforeURL` — imagen antes (ID y URL)
- `ntImageAfterID` / `ntImageAfterURL` — imagen después (ID y URL)

Cómo usar
1. Activar el tema `nuevo-theme`.
2. En el editor de bloques, seleccionar un bloque "Botón".
3. En la barra lateral encontrarás el panel "Tipo de botón" con:
   - Selector de variante (1–4)
   - Selector de clase (Ninguno / Primario / Secundario / Alerta)
   - Controles para seleccionar imágenes (según variante)
4. Guardar y comprobar en el frontend. Las imágenes añadidas aparecen como `<img>` dentro del botón con clases `nt-btn-image nt-image-before` / `nt-image-after`.

Notas para reutilizar
- Si necesitas añadir más opciones de clase, modifica el array `options` dentro de `index.js`.
- Los estilos CSS para `.btn-primary`, `.nt-btn-image`, etc., deben agregarse en el tema (por ejemplo en `assets/css/style.css`) para obtener el aspecto deseado.
- El script se encola en el hook `enqueue_block_editor_assets` desde `button-class-select.php`.

Seguridad
- Este feature no maneja datos sensibles; sin embargo, las imágenes provienen de la Biblioteca de Medios y siguen las políticas de subida del sitio (ej. el filtro SVG puede permitir subir SVGs si está activo en `inc/filters`).
