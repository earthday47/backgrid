<?php

/**
 * Theme functions and preprocess hooks for backgrid module.
 */

/**
 * Output a backgrid table.
 */
function theme_backgrid_table($vars) {
  // Set selector name.
  $table_id = 'backgrid-table';
  if (!empty($vars['table_id'])) {
    $table_id = check_plain($vars['table_id']);
  }

  libraries_load('backgrid');
  // Add settings.
  drupal_add_js(array('backgrid' => array(
    'basePath' => drupal_get_path('module', 'backgrid'),
    'tables' => array(
      $table_id => array(
        'tableId' => $table_id,
      ),
    ),
  )), 'setting');

  // Add init script.
  drupal_add_js(drupal_get_path('module', 'backgrid') .'/init-backgrid.js');

  return array(
    '#markup' => '<div class="backgrid-table" id="' . $table_id . '"></div>',
  );
}