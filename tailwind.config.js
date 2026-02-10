module.exports = {
  corePlugins: { preflight: true },
  content: [
    "./**/*.php",
    "./src/**/*.js",
    "./**/*.html",
    "./**/*.twig",
    "./src/tailwind/generated.html",
  ],
  // Incluir patrones comunes de clases generadas por bloques (post_content)
  // y clases auxiliares de Gutenberg que no están en archivos estáticos.
  safelist: [
    { pattern: /^wp-block-/ },            // todas las clases que empiezan por wp-block-
    { pattern: /^align(?:left|right|center|wide|full)$/ },
    { pattern: /^has-[\w-]+(?:-color|-background-color)?$/ },
    { pattern: /^is-style-/ },            // estilos de bloque registrados
    { pattern: /^has-.*$/ },              // comodín para clases has-* generadas
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
