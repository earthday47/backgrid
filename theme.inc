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
    $table_id = drupal_html_id($vars['table_id']);
  }

  // Add Backgrid scripts.
  backgrid_js_load($table_id, $vars['columns'], $vars['data_url']);

  return array(
    '#markup' => '<div class="backgrid-table" id="' . $table_id . '"></div>',
  );
}