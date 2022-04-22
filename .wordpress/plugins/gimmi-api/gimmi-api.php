<?php
/**
 * Plugin Name: Gimmi Custom API
 * Plugin URI: 
 * Description:
 * Version: 1.0
 * Author: 
 * Author URI: 
 */

/* Influencers
------------------------------------------ */

function gimmi_influencers() {
	$influencers = get_posts([
		'post_type' => 'influencers',
		'numberposts'	=> -1,
	]);

	$data = [];

	foreach( $influencers as $influencer )
	{
		$data[] = [ 
			'slug' => $influencer->post_name,
			'display_name' => get_field('display_name', $influencer->ID), 
			'avatar' => get_field('avatar', $influencer->ID) 
		];
	}

	return $data;
}

add_action('rest_api_init', function() {
	register_rest_route('gimmi/v1', 'influencers', [
		'methods' => 'GET',
		'callback' => 'gimmi_influencers',
	]);
});

/* Influencer
------------------------------------------ */

function gimmi_influencer() {
	$post = get_page_by_path($_GET['slug'], OBJECT, 'influencers');

	$data = [ 
		'slug' => $post->post_name,
		'display_name' => get_field('display_name', $post->ID), 
		'avatar' => get_field('avatar', $post->ID) 
	];

	return $data;
}

add_action('rest_api_init', function() {
	register_rest_route('gimmi/v1', 'influencer', [
		'methods' => 'GET',
		'callback' => 'gimmi_influencer',
	]);
});



/* Game data
------------------------------------------ */

function gimmi_game() {
	$post = get_page_by_path($_GET['slug'], OBJECT, 'games');

	$data = [];

	if( isset($post))
	{
		$influencer = get_field('assign_influencer', $post->ID);

		$data = [ 
			'influencer' => [
				'name' => get_field('display_name', $influencer->ID),
				'avatar' => get_field('avatar', $influencer->ID),
				'slug' => $influencer->post_name,
			],
			'overview' => [
				'text' => get_field('overview_text', $post->ID),
				'video_poster' => get_field('overview_video_poster', $post->ID),
				'video_file' => get_field('overview_video_file', $post->ID),
				'mobile_image' => get_field('overview_mobile_image', $post->ID)
			],
			'game' => [
				'slug' => $post->post_name,
				'title' => get_field('game_title', $post->ID), 
				'developer' => get_field('developer', $post->ID), 
				'genre' => get_field('genre', $post->ID),
				'cover' => get_field('cover_image', $post->ID),
				'price' => get_field('buy_price', $post->ID) ,
				'buyUrl' => get_field('buy_url', $post->ID),
				'requirements' => [
					'title' => get_field('requirements_title', $post->ID),
					'columns' => get_field('requirement_columns', $post->ID),
				],
				'info' => get_field('info_entries', $post->ID),
				'header_background_video' => get_field('header_background_video', $post->ID),
				'header_background_poster' => get_field('header_background_poster', $post->ID),
				'game_trailer_video' => get_field('game_trailer_video', $post->ID),
				'game_trailer_poster' => get_field('game_trailer_poster', $post->ID),
			],
			'highlights' => get_field('tabs', $post->ID),
			'gallery' => get_field('gallery_slides', $post->ID)
		];
	}

	return $data;
}

add_action('rest_api_init', function() {
	register_rest_route('gimmi/v1', 'game', [
		'methods' => 'GET',
		'callback' => 'gimmi_game',
	]);
});


/* Paths
------------------------------------------ */

function influencer_paths() {
	$influencers = get_posts([
		'post_type' => 'influencers',
		'numberposts'	=> -1,
	]);

	$data = [];

	foreach( $influencers as $influencer )
	{
		$data[] = [ 
			'params' => [
				'influencer' => $influencer->post_name,
			]
		];
	}

	return $data;
}

add_action('rest_api_init', function() {
	register_rest_route('gimmi/v1', 'influencer_paths', [
		'methods' => 'GET',
		'callback' => 'influencer_paths',
	]);
});


function game_paths() {
	$games = get_posts([
		'post_type' => 'games',
		'numberposts'	=> -1,
	]);

	$data = [];

	foreach( $games as $game )
	{
		$influencer = get_field('assign_influencer', $game->ID);

		$data[] = [ 
			'params' => [
				'influencer' => $influencer->post_name,
				'game' => get_field('game_slug', $game->ID), 
			]
		];
	}

	return $data;
}

add_action('rest_api_init', function() {
	register_rest_route('gimmi/v1', 'game_paths', [
		'methods' => 'GET',
		'callback' => 'game_paths',
	]);
});


/* Questions Submit
------------------------------------------ */

function question_submit() {

	$data = json_decode(file_get_contents('php://input'));

	if( $data->key != '3d9pu8inf3w98j3f09k3dd0990309jfijnr39-93dd' ) return ['success' => false];

	$post_id = wp_insert_post([
		'post_title'    => wp_strip_all_tags( $data->influencer_name.' - '.$data->user_name.' - '.$data->game_name ),
		'post_status'   => 'pending',
		'post_author'   => 1,
		'post_type'     => 'questions'
	]);

	update_field( 'user_id', wp_strip_all_tags($data->user_id), $post_id);
	update_field( 'user_name', wp_strip_all_tags($data->user_name), $post_id );
	update_field( 'user_avatar', wp_strip_all_tags($data->user_avatar), $post_id );
	update_field( 'user_question', wp_strip_all_tags($data->user_question), $post_id );
	update_field( 'influencer_slug', wp_strip_all_tags($data->influencer_slug), $post_id );
	update_field( 'game_slug', wp_strip_all_tags($data->game_slug), $post_id );

	return ['success' => true ];
}

add_action('rest_api_init', function() {
	register_rest_route('gimmi/v1', 'question_submit', [
		'methods' => 'POST',
		'callback' => 'question_submit',
	]);
});



/* Page Data
------------------------------------------ */

function gimmi_page() {
	$post = get_page_by_path($_GET['slug'], OBJECT, 'page');

	$data = [ 
		'slug' => $post->post_name,
		'title' => $post->post_title, 
		'content' => wpautop($post->post_content)
	];

	return $data;
}

add_action('rest_api_init', function() {
	register_rest_route('gimmi/v1', 'page', [
		'methods' => 'GET',
		'callback' => 'gimmi_page',
	]);
});




/* Page Data
------------------------------------------ */

function gimmi_questions() {
	
	$posts = get_posts(array(
		'numberposts'	=> -1,
		'post_type'		=> 'questions',
		'meta_query'	=> array(
			'relation'		=> 'AND',
			array(
				'key'	 	=> 'influencer_slug',
				'value'	  	=> $_GET['influencer'],
				'compare' 	=> '=',
			),
			array(
				'key'	  	=> 'game_slug',
				'value'	  	=> $_GET['game'],
				'compare' 	=> '=',
			),
		),
		'orderby' => 'date',
    	'order'   => 'ASC',
	));

	$data = [];

	foreach( $posts as $post )
	{
		$data[] = [ 
			'user_name' => get_field('user_name', $post->ID),
			'user_avatar' => get_field('user_avatar', $post->ID), 
			'user_question' => get_field('user_question', $post->ID), 
			'influencer_response' => get_field('influencer_response', $post->ID), 
		];
	}

	return $data;
}

add_action('rest_api_init', function() {
	register_rest_route('gimmi/v1', 'questions', [
		'methods' => 'GET',
		'callback' => 'gimmi_questions',
	]);
});
