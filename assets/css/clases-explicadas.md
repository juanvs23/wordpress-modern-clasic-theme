**Resumen de clases CSS del tema "the-hills"
**

A continuación se agrupan y explican las clases encontradas en los archivos CSS de la carpeta `assets/css`. Para utilidades repetitivas (márgenes, paddings, tamaños responsivos, breakpoints) se explica el patrón y se ejemplifican clases representativas.

**Borders.css**
- ` .pt-border`: Aplica borde superior de 1px sólido.
- ` .pb-border`: Aplica borde inferior de 1px sólido.
- ` .pl-border`: Aplica borde izquierdo de 1px sólido.
- ` .pr-border`: Aplica borde derecho de 1px sólido.
- ` .border`: Borde de 1px sólido en todos los lados.
- ` .max-sm:\pt-border`, ` .md:\pt-border`, ` .lg:\pt-border`, ` .xl:\pt-border` (y variantes pb/pl/pr/border): Versiones con prefijos responsivos aplicadas sólo en el rango de media query correspondiente.

**Buttons.css**
- ` .the-hills-button-primary` / `.the-hills-buttons-primary .wp-block-button__link`: Botón primario; usa `--primary-color` como fondo, texto blanco, padding, border-radius (4px), font-weight 700; transición y borde con el mismo color.
- ` :hover` en variantes primarias: invierte fondo (transparente) y muestra el color primario en el texto.
- ` .the-hills-button-secondary`, ` .the-hills-button-black`, ` .the-hills-button-third-primary`, ` .the-hills-button-primary-secondary`, ` .the-hills-button-secondary-primary`, ` .the-hills-button-primary-third`, ` .the-hills-button-white-secondary`: Variantes temáticas de botón que cambian colores (secundario, tercer color, blanco, negro) y comportamiento en `:hover`.
- ` .wpcf7 form .wpcf7-form-control.wpcf7-submit`: Estilo aplicado a submit de Contact Form 7 que coincide con el estilo de botón negro.

**Carousels.css**
- ` .testimonial-list`: Contenedor del slider con ancho calculado y centrado.
  - ` .ignite-slick-button`: Botones del carousel con tamaño mínimo y uso de SVG centrado.
- ` .slick-item-wrapp`: Padding lateral para items del slider.
- ` .slick-dots` y ` .slick-dots li button`: Estilos para los puntos de navegación; tamaño, color por defecto (`--primary-color`) y color activo/hover (`--third-color`).

**Colors.css**
- ` .bg-primary`, `.bg-secondary`, `.bg-third`, `.bg-soft`, `.bg-white`, `.bg-black`: Utilidades para establecer background-color con las variables CSS definidas en `:root`.
- ` .text-primary`, `.text-secondary`, `.text-third`, `.text-soft`, `.text-white`, `.text-black`: Utilidades para color de texto.
- ` .border-primary`, `.border-secondary`, etc.: Utilidades para color de borde.
- ` .bg-transparent`, `.text-transparent`, `.border-transparent`: Utilidades para transparencia.
- ` .hover\:bg-*`, `.hover\:text-*`, `.hover\:border-*`: Variantes que aplican el estilo correspondiente en `:hover` (nomenclatura escapada con `:` para compatibilidad tipo Tailwind).

**Font-sizes.css**
- Reglas globales para `h1..h6` y alternativas `.h1 .h2 .h3 ...` que usan variables responsivas (`--h1-responsive`, `--h1-tablet`, `--h1`) para adaptar tamaños en distintos breakpoints.
- Clases de peso de fuente: `.regular` (400), `.medium` (500), `.semibold` (600), `.bold` (600).

**Fonts.css**
- `@font-face` para `Montserrat` en variantes regular/italic/bold/bold-italic, apuntando a `../fonts/`.

**Gaps.css**
- Utilidades ` .gap-0`, ` .gap-4`, ` .gap-8`, ` .gap-16`, ` .gap-24`, ` .gap-30`, ` .gap-44`, ` .gap-50`, ` .gap-100`: Establecen la propiedad `gap` con valores basados en variables (`--text`, `--h3`, `--h2`, `--h1`, `--h50`, `--h100`).
- Versiones responsivas: prefijos `md:`, `lg:`, `xl:` (y `max-sm:` para mobile) para aplicar en diferentes breakpoints.

**General.css**
- Variables en `:root`: definiciones de tamaños tipográficos (`--h1`, `--h2`, etc.), tamaños responsivos, colores (`--primary-color`, `--secondary-color`, `--third-color`, `--soft-color`, `--white-color`, `--black-color`) y porcentajes (`--p25`, etc.).
- Reglas base: `body` usa `Montserrat`, tamaño `--text`, color `--primary-color`. `h1..h6` heredan color principal y peso 700.

**Heights.css**
- Utilidades de altura: `.height-0`, `.h-100`, `.h-50`, `.h-40`, `.h-150` y max-height variantes: `.max-h-100`, `.max-h-150`.

**Layout.css**
- Contenedores: `.hero-banner`, `.ignite-section`, `.hero-text-container`, `.ignite-container` controlan padding y max-width (1200px).
- Display utilities: `.grid`, `.flex`, `.block`.
- Grid columns: `.grid-cols-1` ... `.grid-cols-4` (configuran `grid-template-columns`).
- Flex width/fraction helpers: `.flex-full`, `.flex-1\/3`, `.flex-2\/3`, `.flex-1\/2`, `.flex-1\/4`, `.flex-3\/4`, `.flex-1\/5`, `.flex-2\/5`, `.flex-3\/5`, `.flex-4\/5`, `.flex-1\/6`, `.flex-5\/6`, `.flex-2\/6`, `.flex-4\/6` — establecen `flex-basis` y `max-width` para columnas flex.
- Versiones responsivas con prefijos `md:`, `lg:`, `xl:` para las mismas utilidades.

**Margins.css**
- Utilidades `m-0`, `m-16`, `m-24`, `m-30`, `m-44`, `m-50`, `m-100` y variantes direccionadas: `mr-*`, `ml-*`, `mt-*`, `mb-*`, `mx-*`, `my-*`, `mx-auto`, `m-auto`.
- Prefijos responsivos: `max-sm:\*`, `md:\*`, `lg:\*`, `xl:\*` para aplicar en distintos breakpoints.

**Paddiings.css**
- Igual que margins pero para `padding`: `p-*`, `pr-*`, `pl-*`, `pt-*`, `pb-*`, `px-*`, `py-*`, con valores basados en variables (`--text`, `--h3`, `--h2`, `--h1`, `--h50`, `--h100`).
- Prefijos responsivos `max-sm:`, `md:`, `lg:`, `xl:`.

**Positions.css**
- Posicionamiento: `.relative`, `.absolute`, `.fixed`, `.sticky`.
- Posiciones positivas: `.top-0`, `.top-16`, `.top-30`, `.top-50`, `.top-100`, `.left-*`, `.right-*`, `.bottom-*` que usan variables para valores.
- Posiciones negativas: `.-top-0`, `.-top-16`, etc., y porcentuales `.-top-p25`, `.-left-p25`, `.-top-p50`, etc.
- Positivas porcentuales: `.top-p25`, `.left-p25`, `.right-p25`, `.bottom-p25`, etc.
- Reglas responsivas replicadas en los media queries.

**Radius.css**
- Clases para `border-radius`: `.radius-4`, `.radius-8`, `.radius-12`, `.radius-16`, `.radius-20`, `.radius-24`, `.radius-32`, `.radius-50`, `.radius-100`, `.radius-full`, `.radius-0`.
- Valores calculados a partir de `--text`, `--h50`, `--h100`. Versiones `md:`, `lg:`, `xl:` también definidas.

**Style.css**
- Clases específicas del tema/plantilla:
  - `.lines-background`, `.line-bg-content`, `.line` : Controles para fondo de líneas (posición fija, ancho 1px, color semitransparente con `--third-color`).
  - `a.the-hills-phone-button`, `span.the-hills-phone-icon`: Estilos para botón de teléfono flotante (padding, borde, tamaño, hover cambia background y color del SVG).
  - Reglas para footer y su disposición: `.footer-right ul`, `footer ul a`, `.footer-widget-area`, `.social-links`, `.social-section`.
  - Varias utilidades y componentes: `.hero-banner`, `.excursion-text` (overlay con fondo semitransparente, transiciones y comportamiento hover para `.readmore-button`), `.faq-answer-ignite` (oculto por defecto, `.show` lo muestra), `.latest-post-list`, `.term-list-item`, `.term-list-items`, `.term-accordeom-title.h4.bold`.

**Utilities.css**
- Alineación y texto: `.text-center`, `.text-left`, `.text-right`.
- Flex utilities: `.items-center`, `.flex-col`, `.flex-row`, `.flex-reverse`, `.flex-col-reverse`, `.justify-center`, `.justify-end`, `.justify-between`, `.wrap`, `.nowrap`.
- Sombras: `.shadow-base`.
- Objet-fit: `.object-cover`, `.object-contain`.
- Display helpers: `.hidden`, `.w-fit`, `.h-fit`, `.w-full`, `.h-full`, `.max-w-full`, `.mx-w-800`, `.mx-w-1000`.
- Aspect-ratio helpers: `.aspect-w-16`, `.aspect-w-4`, `.aspect-w-1`, `.aspect-2\/3`.
- Overflow helpers: `.overflow-hidden`, `.overflow-scroll`.
- Transitions: `.transition`, `.transition-fast`, `.transition-slow`.
- Responsivas con `md:`, `lg:`, `xl:` para las variantes de texto, flex y sombra.

**Notas finales y patrones**
- Muchas clases siguen un patrón utilitario al estilo Tailwind: prefijos de breakpoint (`max-sm:`, `md:`, `lg:`, `xl:`) y nombres abreviados (`m-`, `p-`, `gap-`, `h-`, `w-`, `radius-`, `text-`, `bg-`).
- Variables CSS en `:root` centralizan colores y tamaños, por lo que modificar `--primary-color` / `--secondary-color` afectará múltiples utilidades.
- Para encontrar la clase exacta usada en el HTML, buscar el nombre literal (ej. `.term-list-item`) pues muchas utilidades son intencionalmente genéricas.

Si quieres, genero una versión más detallada que liste cada clase en su propia línea (ahora agrupé patrones y ejemplos para mantener el archivo manejable). ¿Deseas la lista exhaustiva con cada clase por separado?