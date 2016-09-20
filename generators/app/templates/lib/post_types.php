<?php  
/**
 * Custom post_types
 *
 * @package _theme
 */

function _theme_post_type_banner()
{
    $labels = array(
		'name'                => ( 'Banners'),
		'singular_name'       => ( 'Banner'),
		'menu_name'           => ( 'Banners'),
		'parent_item_colon'   => ( 'Parent'),
		'all_items'           => ( 'Todos'),
		'view_item'           => ( 'Visualizar'),
		'add_new_item'        => ( 'Adicionar Novo'),
		'add_new'             => ( 'Adicionar'),
		'edit_item'           => ( 'Editar'),
		'update_item'         => ( 'Atualizar'),
		'search_items'        => ( 'Pesquisar'),
		'not_found'           => ( 'Registro não encontrado'),
		'not_found_in_trash'  => ( 'Nenhum registro encontrado na lixeira')
    );

    register_post_type( 'post_banner',
        array(
            'menu_icon'   => 'dashicons-format-gallery',
            'labels'      => $labels,
            'public'      => true,
            'has_archive' => true,
            'supports'    => array( 'title', 'editor', 'thumbnail')
        )
    );
}
add_action('init', '_theme_post_type_banner');