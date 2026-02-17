( function( wp ) {
    var addFilter = wp.hooks.addFilter;
    var createElement = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var InspectorControls = (wp.blockEditor && wp.blockEditor.InspectorControls) || (wp.editor && wp.editor.InspectorControls);
    var PanelBody = wp.components.PanelBody;
    var SelectControl = wp.components.SelectControl;
    var Button = wp.components.Button;
    var MediaUpload = (wp.blockEditor && wp.blockEditor.MediaUpload) || (wp.editor && wp.editor.MediaUpload);
    var MediaUploadCheck = (wp.blockEditor && wp.blockEditor.MediaUploadCheck) || (wp.editor && wp.editor.MediaUploadCheck) || function() { return null; };

    // Añadir atributos: clase, variante y URLs/IDs de imágenes
    function addAttributes(settings, name) {
        if (name !== 'core/button') return settings;
        settings.attributes = Object.assign({}, settings.attributes, {
            classType: {
                type: 'string',
                default: ''
            },
            ntVariant: {
                type: 'string',
                default: 'variant-1'
            },
            ntImageBeforeID: {
                type: 'number'
            },
            ntImageBeforeURL: {
                type: 'string'
            },
            ntImageAfterID: {
                type: 'number'
            },
            ntImageAfterURL: {
                type: 'string'
            }
        });
        return settings;
    }
    addFilter('blocks.registerBlockType', 'nt/button-class/add-attributes', addAttributes);

    // Controls en el inspector
    function withInspectorControls(OriginalBlockEdit) {
        return function(props) {
            var name = props.name;
            var attributes = props.attributes || {};
            var setAttributes = props.setAttributes;
            var isSelected = props.isSelected;

            if (name !== 'core/button') {
                return createElement(OriginalBlockEdit, props);
            }

            function onSelectBefore(media) {
                setAttributes({ ntImageBeforeID: media.id, ntImageBeforeURL: media.url });
            }
            function onSelectAfter(media) {
                setAttributes({ ntImageAfterID: media.id, ntImageAfterURL: media.url });
            }

            return createElement(
                Fragment,
                null,
                createElement(OriginalBlockEdit, props),
                isSelected && createElement(
                    InspectorControls,
                    null,
                    createElement(
                        PanelBody,
                        { title: 'Tipo de botón', initialOpen: true },
                        createElement(SelectControl, {
                            label: 'Variante',
                            value: attributes.ntVariant || 'variant-1',
                            options: [
                                { label: '1 — con clases extras', value: 'variant-1' },
                                { label: '2 — con imagen antes del texto', value: 'variant-2' },
                                { label: '3 — con imagen después del texto', value: 'variant-3' },
                                { label: '4 — imágenes antes y después', value: 'variant-4' }
                            ],
                            onChange: function(val) { setAttributes({ ntVariant: val }); }
                        }),
                        createElement(SelectControl, {
                            label: 'Seleccionar tipo de clase',
                            value: attributes.classType || '',
                            options: [
                                { label: 'Ninguno', value: '' },
                                { label: 'Primario', value: 'btn-primary' },
                                { label: 'Secundario', value: 'btn-secondary' },
                                { label: 'Alerta', value: 'btn-alert' }
                            ],
                            onChange: function(val) { setAttributes({ classType: val }); }
                        }),
                        // Imagen antes
                        (attributes.ntVariant === 'variant-2' || attributes.ntVariant === 'variant-4') && createElement(
                            'div',
                            { style: { marginTop: '12px' } },
                            createElement('strong', null, 'Imagen antes del texto'),
                            createElement('div', { style: { marginTop: '8px' } },
                                createElement(MediaUploadCheck, null,
                                    createElement(MediaUpload, {
                                        onSelect: onSelectBefore,
                                        allowedTypes: [ 'image' ],
                                        value: attributes.ntImageBeforeID,
                                        render: function( obj ) {
                                            return createElement( Button, { onClick: obj.open, isSecondary: true }, attributes.ntImageBeforeURL ? 'Cambiar imagen' : 'Seleccionar imagen' );
                                        }
                                    })
                                ),
                                attributes.ntImageBeforeURL && createElement('div', { style: { marginTop: '8px' } },
                                    createElement('img', { src: attributes.ntImageBeforeURL, style: { maxWidth: '100%', height: 'auto' } }),
                                    createElement(Button, { style: { marginLeft: '8px' }, isDestructive: true, onClick: function(){ setAttributes({ ntImageBeforeID: undefined, ntImageBeforeURL: '' }); } }, 'Eliminar')
                                )
                            )
                        ),
                        // Imagen después
                        (attributes.ntVariant === 'variant-3' || attributes.ntVariant === 'variant-4') && createElement(
                            'div',
                            { style: { marginTop: '12px' } },
                            createElement('strong', null, 'Imagen después del texto'),
                            createElement('div', { style: { marginTop: '8px' } },
                                createElement(MediaUploadCheck, null,
                                    createElement(MediaUpload, {
                                        onSelect: onSelectAfter,
                                        allowedTypes: [ 'image' ],
                                        value: attributes.ntImageAfterID,
                                        render: function( obj ) {
                                            return createElement( Button, { onClick: obj.open, isSecondary: true }, attributes.ntImageAfterURL ? 'Cambiar imagen' : 'Seleccionar imagen' );
                                        }
                                    })
                                ),
                                attributes.ntImageAfterURL && createElement('div', { style: { marginTop: '8px' } },
                                    createElement('img', { src: attributes.ntImageAfterURL, style: { maxWidth: '100%', height: 'auto' } }),
                                    createElement(Button, { style: { marginLeft: '8px' }, isDestructive: true, onClick: function(){ setAttributes({ ntImageAfterID: undefined, ntImageAfterURL: '' }); } }, 'Eliminar')
                                )
                            )
                        )
                    )
                )
            );
        };
    }
    addFilter('editor.BlockEdit', 'nt/button-class/inspector-controls', withInspectorControls);

    // Aplicar clase e insertar imágenes en el HTML guardado según variante
    function addClassAndImagesToSaveElement(element, blockType, attributes) {
        if (!blockType || blockType.name !== 'core/button') return element;
        var existing = element.props && element.props.className ? element.props.className : '';
        var extra = attributes && attributes.classType ? attributes.classType : '';
        var className = (existing + (extra ? ' ' + extra : '')).trim();

        // Normalizar hijos
        var children = element.props && element.props.children !== undefined ? element.props.children : null;
        var childrenArray = [];
        if (children === null) {
            childrenArray = [];
        } else if (Array.isArray(children)) {
            childrenArray = children.slice();
        } else {
            childrenArray = [children];
        }

        function makeImg(url, pos) {
            return createElement('img', { src: url, alt: '', className: 'nt-btn-image nt-image-' + pos });
        }

        var beforeURL = attributes && attributes.ntImageBeforeURL ? attributes.ntImageBeforeURL : '';
        var afterURL = attributes && attributes.ntImageAfterURL ? attributes.ntImageAfterURL : '';
        var variant = attributes && attributes.ntVariant ? attributes.ntVariant : 'variant-1';

        var newChildren = childrenArray.slice();

        // Insert images depending on variant
        if (variant === 'variant-2' && beforeURL) {
            newChildren.unshift( makeImg(beforeURL, 'before') );
        }
        if (variant === 'variant-3' && afterURL) {
            newChildren.push( makeImg(afterURL, 'after') );
        }
        if (variant === 'variant-4') {
            if (beforeURL) newChildren.unshift( makeImg(beforeURL, 'before') );
            if (afterURL) newChildren.push( makeImg(afterURL, 'after') );
        }

        return createElement(element.type, Object.assign({}, element.props, { className: className }), newChildren.length === 1 ? newChildren[0] : newChildren);
    }
    addFilter('blocks.getSaveElement', 'nt/button-class/add-class-and-images-to-save', addClassAndImagesToSaveElement);

} )( window.wp );
