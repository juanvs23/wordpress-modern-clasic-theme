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

    // Add attributes: class, variant and image URLs/IDs
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
                        { title: 'Button type', initialOpen: true },
                        createElement(SelectControl, {
                            label: 'Variant',
                            value: attributes.ntVariant || 'variant-1',
                            options: [
                                { label: '1 — extra classes only', value: 'variant-1' },
                                { label: '2 — image before text', value: 'variant-2' },
                                { label: '3 — image after text', value: 'variant-3' },
                                { label: '4 — images before and after', value: 'variant-4' }
                            ],
                            onChange: function(val) { setAttributes({ ntVariant: val }); }
                        }),
                        createElement(SelectControl, {
                            label: 'Select class type',
                            value: attributes.classType || '',
                            options: [
                                { label: 'None', value: '' },
                                { label: 'Primary', value: 'btn-primary' },
                                { label: 'Secondary', value: 'btn-secondary' },
                                { label: 'Alert', value: 'btn-alert' }
                            ],
                            onChange: function(val) { setAttributes({ classType: val }); }
                        }),
                        // Imagen antes
                        (attributes.ntVariant === 'variant-2' || attributes.ntVariant === 'variant-4') && createElement(
                            'div',
                            { style: { marginTop: '12px' } },
                            createElement('strong', null, 'Image before text'),
                            createElement('div', { style: { marginTop: '8px' } },
                                createElement(MediaUploadCheck, null,
                                    createElement(MediaUpload, {
                                        onSelect: onSelectBefore,
                                        allowedTypes: [ 'image' ],
                                        value: attributes.ntImageBeforeID,
                                        render: function( obj ) {
                                            return createElement( Button, { onClick: obj.open, isSecondary: true }, attributes.ntImageBeforeURL ? 'Change image' : 'Select image' );
                                        }
                                    })
                                ),
                                attributes.ntImageBeforeURL && createElement('div', { style: { marginTop: '8px' } },
                                    createElement('img', { src: attributes.ntImageBeforeURL, style: { maxWidth: '100%', height: 'auto' } }),
                                    createElement(Button, { style: { marginLeft: '8px' }, isDestructive: true, onClick: function(){ setAttributes({ ntImageBeforeID: undefined, ntImageBeforeURL: '' }); } }, 'Remove')
                                )
                            )
                        ),
                        // Imagen después
                        (attributes.ntVariant === 'variant-3' || attributes.ntVariant === 'variant-4') && createElement(
                            'div',
                            { style: { marginTop: '12px' } },
                            createElement('strong', null, 'Image after text'),
                            createElement('div', { style: { marginTop: '8px' } },
                                createElement(MediaUploadCheck, null,
                                    createElement(MediaUpload, {
                                        onSelect: onSelectAfter,
                                        allowedTypes: [ 'image' ],
                                        value: attributes.ntImageAfterID,
                                        render: function( obj ) {
                                            return createElement( Button, { onClick: obj.open, isSecondary: true }, attributes.ntImageAfterURL ? 'Change image' : 'Select image' );
                                        }
                                    })
                                ),
                                attributes.ntImageAfterURL && createElement('div', { style: { marginTop: '8px' } },
                                    createElement('img', { src: attributes.ntImageAfterURL, style: { maxWidth: '100%', height: 'auto' } }),
                                    createElement(Button, { style: { marginLeft: '8px' }, isDestructive: true, onClick: function(){ setAttributes({ ntImageAfterID: undefined, ntImageAfterURL: '' }); } }, 'Remove')
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
