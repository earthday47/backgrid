<?php

/**
 * Theme functions and preprocess hooks for backgrid module.
 */

/**
 * Output a backgrid table.
 */
function theme_backgrid_table() {
  // Add settings.
  drupal_add_js(array('backgrid' => array(
    'basePath' => drupal_get_path('module', 'backgrid'),
  )), 'setting');
  return array(
    '#markup' => '<div id="backgrid-table"></div>',
  );
}