( function( wp ) {
    var el = wp.element.createElement;
    var Fragment = wp.element.Fragment;
    var InspectorControls = wp.blockEditor && wp.blockEditor.InspectorControls ? wp.blockEditor.InspectorControls : wp.editor.InspectorControls;
    var PanelBody = wp.components && wp.components.PanelBody ? wp.components.PanelBody : null;
    var SelectControl = wp.components && wp.components.SelectControl ? wp.components.SelectControl : null;
    var RangeControl = wp.components && wp.components.RangeControl ? wp.components.RangeControl : null;
    var ToggleControl = wp.components && wp.components.ToggleControl ? wp.components.ToggleControl : null;
    var hooks = wp.hooks;

    var AOS_OPTIONS = [
        { label: 'None', value: '' },
        { label: 'fade', value: 'fade' },
        { label: 'fade-up', value: 'fade-up' },
        { label: 'fade-down', value: 'fade-down' },
        { label: 'fade-left', value: 'fade-left' },
        { label: 'fade-right', value: 'fade-right' },
        { label: 'zoom-in', value: 'zoom-in' },
        { label: 'zoom-out', value: 'zoom-out' }
    ];

    var EASING_OPTIONS = [
        { label: 'Default', value: '' },
        { label: 'ease', value: 'ease' },
        { label: 'ease-in', value: 'ease-in' },
        { label: 'ease-out', value: 'ease-out' },
        { label: 'ease-in-out', value: 'ease-in-out' }
    ];

    var ANCHOR_OPTIONS = [
        { label: 'Top Bottom', value: 'top-bottom' },
        { label: 'Top Center', value: 'top-center' },
        { label: 'Top Top', value: 'top-top' },
        { label: 'Center Bottom', value: 'center-bottom' },
        { label: 'Center Center', value: 'center-center' },
        { label: 'Center Top', value: 'center-top' },
        { label: 'Bottom Bottom', value: 'bottom-bottom' },
        { label: 'Bottom Center', value: 'bottom-center' },
        { label: 'Bottom Top', value: 'bottom-top' }
    ];

    // Add AOS attributes to core/group block settings
    hooks.addFilter( 'blocks.registerBlockType', 'nuevo-theme/group-aos', function( settings, name ) {
        if ( name !== 'core/group' ) {
            return settings;
        }

        settings.attributes = Object.assign( {}, settings.attributes, {
            aos: { type: 'string', default: '' },
            aos_offset: { type: 'number', default: 120 },
            aos_delay: { type: 'number', default: 0 },
            aos_duration: { type: 'number', default: 400 },
            aos_easing: { type: 'string', default: '' },
            aos_once: { type: 'boolean', default: false },
            aos_mirror: { type: 'boolean', default: false },
            aos_anchor_placement: { type: 'string', default: 'top-bottom' }
        } );

        return settings;
    } );

    // Add Inspector controls for AOS settings
    hooks.addFilter( 'editor.BlockEdit', 'nuevo-theme/group-aos/block-edit', function( BlockEdit ) {
        return function( props ) {
            if ( props.name !== 'core/group' ) {
                return el( BlockEdit, props );
            }

            var attrs = props.attributes || {};

            return el( Fragment, null,
                el( BlockEdit, props ),
                el( InspectorControls, null,
                    PanelBody && el( PanelBody, { title: 'AOS Animation', initialOpen: false },
                        SelectControl && el( SelectControl, {
                            label: 'AOS animation',
                            value: attrs.aos || '',
                            options: AOS_OPTIONS,
                            onChange: function( value ) { props.setAttributes( { aos: value } ); }
                        } ),
                        RangeControl && el( RangeControl, {
                            label: 'Offset (px)',
                            value: attrs.aos_offset || 120,
                            min: 0,
                            max: 2000,
                            onChange: function( value ) { props.setAttributes( { aos_offset: parseInt( value, 10 ) || 0 } ); }
                        } ),
                        RangeControl && el( RangeControl, {
                            label: 'Delay (ms)',
                            value: attrs.aos_delay || 0,
                            min: 0,
                            max: 5000,
                            onChange: function( value ) { props.setAttributes( { aos_delay: parseInt( value, 10 ) || 0 } ); }
                        } ),
                        RangeControl && el( RangeControl, {
                            label: 'Duration (ms)',
                            value: attrs.aos_duration || 400,
                            min: 0,
                            max: 5000,
                            onChange: function( value ) { props.setAttributes( { aos_duration: parseInt( value, 10 ) || 0 } ); }
                        } ),
                        SelectControl && el( SelectControl, {
                            label: 'Easing',
                            value: attrs.aos_easing || '',
                            options: EASING_OPTIONS,
                            onChange: function( value ) { props.setAttributes( { aos_easing: value } ); }
                        } ),
                        ToggleControl && el( ToggleControl, {
                            label: 'Animate Once',
                            checked: !! attrs.aos_once,
                            onChange: function( value ) { props.setAttributes( { aos_once: !! value } ); }
                        } ),
                        ToggleControl && el( ToggleControl, {
                            label: 'Mirror (animate out while scrolling past)',
                            checked: !! attrs.aos_mirror,
                            onChange: function( value ) { props.setAttributes( { aos_mirror: !! value } ); }
                        } ),
                        SelectControl && el( SelectControl, {
                            label: 'Anchor placement',
                            value: attrs.aos_anchor_placement || 'top-bottom',
                            options: ANCHOR_OPTIONS,
                            onChange: function( value ) { props.setAttributes( { aos_anchor_placement: value } ); }
                        } )
                    )
                )
            );
        };
    } );

    // Ensure saved element includes AOS data attributes
    hooks.addFilter( 'blocks.getSaveElement', 'nuevo-theme/group-aos/get-save-element', function( element, blockType, attributes ) {
        if ( blockType.name !== 'core/group' ) {
            return element;
        }
        if ( ! attributes ) {
            return element;
        }

        var newProps = Object.assign( {}, element.props );

        if ( attributes.aos ) {
            newProps['data-aos'] = attributes.aos;
        }
        if ( typeof attributes.aos_offset !== 'undefined' ) {
            newProps['data-aos-offset'] = attributes.aos_offset;
        }
        if ( typeof attributes.aos_delay !== 'undefined' ) {
            newProps['data-aos-delay'] = attributes.aos_delay;
        }
        if ( typeof attributes.aos_duration !== 'undefined' ) {
            newProps['data-aos-duration'] = attributes.aos_duration;
        }
        if ( attributes.aos_easing ) {
            newProps['data-aos-easing'] = attributes.aos_easing;
        }
        if ( typeof attributes.aos_once !== 'undefined' ) {
            newProps['data-aos-once'] = attributes.aos_once ? 'true' : 'false';
        }
        if ( typeof attributes.aos_mirror !== 'undefined' ) {
            newProps['data-aos-mirror'] = attributes.aos_mirror ? 'true' : 'false';
        }
        if ( attributes.aos_anchor_placement ) {
            newProps['data-aos-anchor-placement'] = attributes.aos_anchor_placement;
        }

        return wp.element.cloneElement( element, newProps );
    } );

} )( window.wp );
