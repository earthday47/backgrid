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
  drupal_add_js(array('backgrid' => array(
    'basePath' => drupal_get_path('module', 'backgrid'),
  )), 'setting');
  drupal_add_js(drupal_get_path('module', 'backgrid_example') . '/backgrid_example_basic.js');
  return array(
    '#markup' => '<div id="backgrid-table"></div>',
  );
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
  drupal_add_js(array('backgrid' => array(
    'basePath' => drupal_get_path('module', 'backgrid'),
  )), 'setting');
  drupal_add_js(drupal_get_path('module', 'backgrid_example') . '/backgrid_example.js');
  return array(
    '#markup' => '<div id="backgrid-table"></div>',
  );
}

/**
 * Page callback for /backgrid-example-theme.
 */
function backgrid_example_theme_page() {
  return theme('backgrid_table', array(
    'table_id' => 'rockadoodledoo',
    'columns' => array(
      array(
        'name' => 'id',
        'label' => 'ID',
        'editable' => FALSE,
        'cell' => 'string',
      ),
      array(
        'name' => 'name',
        'label' => 'Name',
        'editable' => FALSE,
        'cell' => 'string',
      ),
      array(
        'name' => 'pop',
        'label' => 'Population',
        'editable' => FALSE,
        'cell' => 'integer',
      ),
      array(
        'name' => 'percentage',
        'label' => '% of World Population',
        'editable' => FALSE,
        'cell' => 'number',
      ),
      array(
        'name' => 'date',
        'label' => 'Date',
        'editable' => FALSE,
        'cell' => 'date',
      ),
      array(
        'name' => 'url',
        'label' => 'URL',
        'editable' => FALSE,
        'cell' => 'uri',
      ),
    ),
    'data_url' => base_path() . drupal_get_path('module', 'backgrid_example') . '/data/territories.json',
  ));
}
