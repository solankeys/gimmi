<?php 

/**
 * Customize the preview button in the WordPress admin to point to the headless client.
 *
 * @param  str $link The WordPress preview link.
 * @return str The headless WordPress preview link.
 */
/*
function set_headless_preview_link( $link ) {

	$parsed = parse_url($link);
	$slug = parse_url($link)['path'];
	$secret = 'f34w09jf43woijfw34olikmnj3f2oijjmf-43f2oinbfeoijf342ijjfjfd';

	return "https://gimmi-dev.vercel.app/api/preview?secret=$secret&slug=$slug";
}

add_filter( 'preview_post_link', 'set_headless_preview_link' );
*/

/* Tweaks
------------------------------------- */

remove_action('welcome_panel', 'wp_welcome_panel');


/* Custom Button
------------------------------------- */

function trigger_build_button($wp_admin_bar){
	$args = array(
		'id' => 'trigger_build_button-button',
		'title' => '<span class="ab-icon dashicons dashicons-yes" style="position: relative; top: 3px;"></span> <span class="ab-label">Push Changes Live</span>',
		'href' => '/wp-content/themes/gimmi/trigger_rebuild.php',
		'meta' => array(
			'class' => 'trigger_build_button'
		)
	);
	$wp_admin_bar->add_node($args);
}
	
add_action('admin_bar_menu', 'trigger_build_button', 2000);