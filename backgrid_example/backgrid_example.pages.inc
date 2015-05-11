<?php

/**
 * @file
 * Page callbacks for backgrid module.
 */

/**
 * Page callback for /backgrid-example-basic.
 */
function backgrid_example_example_basic_page() {
  libraries_load('backgrid');
  drupal_add_js(drupal_get_path('module', 'backgrid_example') . '/backgrid_example_basic.js');
  return theme('backgrid_table');
}

/**
 * Page callback for /backgrid-example.
 */
function backgrid_example_example_page() {
  libraries_load('backgrid');
  libraries_load('backbone-paginator');
  libraries_load('backgrid-paginator');
  libraries_load('backgrid-select-all');
  libraries_load('backgrid-filter');
  drupal_add_js(drupal_get_path('module', 'backgrid_example') . '/backgrid_example.js');
  return theme('backgrid_table');
}