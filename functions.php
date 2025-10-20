<?php
/**
 * Twenty Twenty-Two functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WordPress
 * @subpackage Twenty_Twenty_Two
 * @since Twenty Twenty-Two 1.0
 */

if ( ! function_exists( 'twentytwentytwo_support' ) ) :

	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * @since Twenty Twenty-Two 1.0
	 *
	 * @return void
	 */
	function twentytwentytwo_support() {

		// Add support for block styles.
		add_theme_support( 'wp-block-styles' );

		// Enqueue editor styles.
		add_editor_style( 'style.css' );
	}

endif;

add_action( 'after_setup_theme', 'twentytwentytwo_support' );

if ( ! function_exists( 'twentytwentytwo_styles' ) ) :

	/**
	 * Enqueue styles.
	 *
	 * @since Twenty Twenty-Two 1.0
	 *
	 * @return void
	 */
	function twentytwentytwo_styles() {
		// Register theme stylesheet.
		$theme_version = wp_get_theme()->get( 'Version' );

		$version_string = is_string( $theme_version ) ? $theme_version : false;
		wp_register_style(
			'twentytwentytwo-style',
			get_template_directory_uri() . '/style.css',
			array(),
			$version_string
		);

		// Enqueue theme stylesheet.
		wp_enqueue_style( 'twentytwentytwo-style' );
	}

endif;

add_action( 'wp_enqueue_scripts', 'twentytwentytwo_styles' );

// Add block patterns.
require get_template_directory() . '/inc/block-patterns.php';

// functions.php - Security Headers
function add_security_headers() {
    if (!is_admin()) {
        header('X-Content-Type-Options: nosniff');
        header('X-Frame-Options: SAMEORIGIN');
        header('X-XSS-Protection: 1; mode=block');
        header('Referrer-Policy: strict-origin-when-cross-origin');
    }
}
add_action('send_headers', 'add_security_headers');

// API Rate Limiting
function api_rate_limiting() {
    $ip = $_SERVER['REMOTE_ADDR'];
    $transient_key = 'api_requests_' . md5($ip);
    $requests = get_transient($transient_key) ?: 0;
    
    if ($requests > 100) { // 100 requests per hour
        wp_die('API Rate limit exceeded', 'Rate Limited', array('response' => 429));
    }
    
    set_transient($transient_key, $requests + 1, HOUR_IN_SECONDS);
}
add_action('rest_api_init', 'api_rate_limiting');

// Custom Post Type für Projekte
function create_projekt_post_type() {
    register_post_type('projekte', array(
        'labels' => array(
            'name' => 'Projekte',
            'singular_name' => 'Projekt',
            'add_new' => 'Neues Projekt',
            'add_new_item' => 'Neues Projekt hinzufügen',
            'edit_item' => 'Projekt bearbeiten',
            'all_items' => 'Alle Projekte',
            'view_item' => 'Projekt anzeigen'
        ),
        'public' => true,
        'show_in_rest' => true, // KRITISCH für REST API!
        'rest_base' => 'projekte',
        'supports' => array(
            'title',        // Projekt-Name
            'editor',       // Vollbeschreibung  
            'excerpt',      // Kurzbeschreibung
            'thumbnail',    // Bild
            'custom-fields',
            'revisions'
        ),
        'menu_icon' => 'dashicons-portfolio',
        'has_archive' => true,
        'rewrite' => array('slug' => 'projekte'),
        'show_in_menu' => true
    ));
}
add_action('init', 'create_projekt_post_type');

// Taxonomie für Projekt-Kategorien
function create_projekt_taxonomy() {
    register_taxonomy('projekt-kategorie', 'projekte', array(
        'labels' => array(
            'name' => 'Projekt Kategorien',
            'singular_name' => 'Projekt Kategorie'
        ),
        'hierarchical' => true,
        'show_in_rest' => true, // KRITISCH für REST API!
        'rest_base' => 'projekt-kategorien',
        'show_admin_column' => true,
        'rewrite' => array('slug' => 'projekt-kategorie')
    ));
    
    // Standard-Kategorien automatisch anlegen
    $categories = [
        'menschen' => 'Menschen',
        'frieden' => 'Frieden', 
        'umwelt' => 'Umwelt',
        'zusammenarbeit' => 'Zusammenarbeit',
        'zukunft' => 'Zukunft'
    ];
    
    foreach($categories as $slug => $name) {
        if (!term_exists($slug, 'projekt-kategorie')) {
            wp_insert_term($name, 'projekt-kategorie', array('slug' => $slug));
        }
    }
}
add_action('init', 'create_projekt_taxonomy');

// CORS Headers für Next.js Domain
function add_cors_headers_for_nextjs() {
    add_action('rest_api_init', function() {
        remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
        
        add_filter('rest_pre_serve_request', function($value) {
            $allowed_origins = [
                'http://localhost:3000', // Development
                'https://dasentwicklerhaus.de', // Production
                'https://www.dasentwicklerhaus.de'
            ];
            
            $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
            
            if (in_array($origin, $allowed_origins)) {
                header('Access-Control-Allow-Origin: ' . $origin);
                header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
                header('Access-Control-Allow-Headers: Content-Type, Authorization');
                header('Access-Control-Allow-Credentials: true');
            }
            
            return $value;
        });
    }, 15);
}
add_action('init', 'add_cors_headers_for_nextjs');
