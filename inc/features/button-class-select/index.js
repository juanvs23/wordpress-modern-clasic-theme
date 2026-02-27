( function( wp ) {
    var addFilter = wp.hooks.addFilter;
    var createElement = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var InspectorControls = (wp.blockEditor && wp.blockEditor.InspectorControls) || (wp.editor && wp.editor.InspectorControls);
    var BlockListBlock = (wp.blockEditor && wp.blockEditor.BlockListBlock) || (wp.editor && wp.editor.BlockListBlock);
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

    function ensureEditorPreviewStyles() {
        if (!document || document.getElementById('nt-button-class-editor-preview-styles')) {
            return;
        }

        var style = document.createElement('style');
        style.id = 'nt-button-class-editor-preview-styles';
        style.textContent = '' +
            '.nt-button-editor-preview .wp-block-button__link {' +
                'display:inline-flex;' +
                'align-items:center;' +
                'gap:8px;' +
            '}' +
            '.nt-button-editor-preview.nt-button-has-before .wp-block-button__link::before {' +
                'content:"";' +
                'display:inline-block;' +
                'width:1em;' +
                'height:1em;' +
                'background-image:var(--nt-editor-before-image);' +
                'background-size:contain;' +
                'background-repeat:no-repeat;' +
                'background-position:center;' +
                'flex:0 0 auto;' +
            '}' +
            '.nt-button-editor-preview.nt-button-has-after .wp-block-button__link::after {' +
                'content:"";' +
                'display:inline-block;' +
                'width:1em;' +
                'height:1em;' +
                'background-image:var(--nt-editor-after-image);' +
                'background-size:contain;' +
                'background-repeat:no-repeat;' +
                'background-position:center;' +
                'flex:0 0 auto;' +
            '}';

        document.head.appendChild(style);
    }

    function withButtonEditorPreview(OriginalBlockListBlock) {
        return function(props) {
            if (!props || props.name !== 'core/button') {
                return createElement(OriginalBlockListBlock, props);
            }

            ensureEditorPreviewStyles();

            var attrs = props.attributes || {};
            var variant = attrs.ntVariant || 'variant-1';
            var beforeURL = attrs.ntImageBeforeURL || '';
            var afterURL = attrs.ntImageAfterURL || '';

            var hasBefore = (variant === 'variant-2' || variant === 'variant-4') && !!beforeURL;
            var hasAfter = (variant === 'variant-3' || variant === 'variant-4') && !!afterURL;

            var wrapperProps = Object.assign({}, props.wrapperProps || {});
            var wrapperClassName = (wrapperProps.className || '') + ' nt-button-editor-preview' + (hasBefore ? ' nt-button-has-before' : '') + (hasAfter ? ' nt-button-has-after' : '');
            var wrapperStyle = Object.assign({}, wrapperProps.style || {});

            if (hasBefore) {
                wrapperStyle['--nt-editor-before-image'] = 'url("' + beforeURL + '")';
            } else {
                wrapperStyle['--nt-editor-before-image'] = 'none';
            }

            if (hasAfter) {
                wrapperStyle['--nt-editor-after-image'] = 'url("' + afterURL + '")';
            } else {
                wrapperStyle['--nt-editor-after-image'] = 'none';
            }

            return createElement(OriginalBlockListBlock, Object.assign({}, props, {
                wrapperProps: Object.assign({}, wrapperProps, {
                    className: wrapperClassName.trim(),
                    style: wrapperStyle
                })
            }));
        };
    }

    if (BlockListBlock) {
        addFilter('editor.BlockListBlock', 'nt/button-class/editor-preview-images', withButtonEditorPreview);
    }

    // Apply class and inject images in saved HTML
    function addClassAndImagesToSaveElement(element, blockType, attributes) {
        if (!blockType || blockType.name !== 'core/button') return element;
        var extra = attributes && attributes.classType ? attributes.classType : '';
        var beforeURL = attributes && attributes.ntImageBeforeURL ? attributes.ntImageBeforeURL : '';
        var afterURL = attributes && attributes.ntImageAfterURL ? attributes.ntImageAfterURL : '';
        var variant = attributes && attributes.ntVariant ? attributes.ntVariant : 'variant-1';

        function normalizeChildren(children, props) {
            if (children === null || children === undefined) {
                var fallback = [];
                if (props && (typeof props.value === 'string' || typeof props.value === 'number')) {
                    fallback.push(props.value);
                }
                return fallback;
            }
            if (Array.isArray(children)) return children.slice();
            return [ children ];
        }

        function packChildren(list) {
            if (!list || list.length === 0) return null;
            return list.length === 1 ? list[0] : list;
        }

        function makeImg(url, pos) {
            return createElement('img', { src: url, alt: '', className: 'nt-btn-image nt-image-' + pos });
        }

        function applyImagesToChildren(list) {
            var result = list.slice();

            if ((variant === 'variant-2' || variant === 'variant-4') && beforeURL) {
                result.unshift(makeImg(beforeURL, 'before'));
            }
            if ((variant === 'variant-3' || variant === 'variant-4') && afterURL) {
                result.push(makeImg(afterURL, 'after'));
            }

            return result;
        }

        function isButtonLinkNode(node) {
            if (!node || typeof node !== 'object') return false;
            if (node.type === 'a' || node.type === 'button') return true;
            var cls = node.props && node.props.className;
            return typeof cls === 'string' && cls.indexOf('wp-block-button__link') !== -1;
        }

        function injectIntoButtonLink(node) {
            if (!node || typeof node !== 'object') {
                return { node: node, updated: false };
            }

            if (isButtonLinkNode(node)) {
                var linkChildren = normalizeChildren(node.props && node.props.children !== undefined ? node.props.children : null, node.props);
                var linkClassName = ((node.props && node.props.className ? node.props.className : '') + (extra ? ' ' + extra : '')).trim();
                var finalLinkChildren = applyImagesToChildren(linkChildren);

                return {
                    node: createElement(node.type, Object.assign({}, node.props, { className: linkClassName }), packChildren(finalLinkChildren)),
                    updated: true
                };
            }

            var children = normalizeChildren(node.props && node.props.children !== undefined ? node.props.children : null, node.props);
            if (children.length === 0) {
                return { node: node, updated: false };
            }

            var changed = false;
            var updatedChildren = [];

            for (var i = 0; i < children.length; i++) {
                var childResult = injectIntoButtonLink(children[i]);
                updatedChildren.push(childResult.node);
                if (childResult.updated) {
                    changed = true;
                }
            }

            if (!changed) {
                return { node: node, updated: false };
            }

            return {
                node: createElement(node.type, Object.assign({}, node.props), packChildren(updatedChildren)),
                updated: true
            };
        }

        var injected = injectIntoButtonLink(element);
        if (injected.updated) {
            return injected.node;
        }

        // Fallback if no link node is found
        var rootChildren = normalizeChildren(element.props && element.props.children !== undefined ? element.props.children : null, element.props);
        var rootClassName = ((element.props && element.props.className ? element.props.className : '') + (extra ? ' ' + extra : '')).trim();
        var finalRootChildren = applyImagesToChildren(rootChildren);
        return createElement(element.type, Object.assign({}, element.props, { className: rootClassName }), packChildren(finalRootChildren));
    }
    addFilter('blocks.getSaveElement', 'nt/button-class/add-class-and-images-to-save', addClassAndImagesToSaveElement);

} )( window.wp );
