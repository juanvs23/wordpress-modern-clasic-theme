<?php
/**
 * Loader de `inc/scripts` - requiere explícitamente los archivos de assets
 *
 * NOTA: No se utiliza autoloading dinámico para mantener control manual
 * sobre qué archivos se cargan. Añade aquí require_once con `__DIR__`.
 */

// Enqueue/dequeue explícitos
if ( file_exists( __DIR__ . '/enqueue.php' ) ) {
    require_once __DIR__ . '/enqueue.php';
}

if ( file_exists( __DIR__ . '/dequeue.php' ) ) {
    require_once __DIR__ . '/dequeue.php';
}

