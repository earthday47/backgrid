/**
 * @file
 * Initialize Backgrid with Drupal theme variables.
 */

(function ($) {

Drupal.behaviors.backgrid = {
  attach: function (context, settings) {

    $(".backgrid-table", context).each(function(index){
      var $tableId = this.id;
      // Retrieve settings from Drupal object.
      tableSettings = settings.backgrid.tables[$tableId];

      var Territory = Backbone.Model.extend({});

      var Territories = Backbone.Collection.extend({
        model: Territory,
        url: Drupal.settings.backgrid.basePath + "/backgrid_example/data/territories.json",
      });

      var territories = new Territories();

      // Initialize a new Grid instance
      var grid = new Backgrid.Grid({
        columns: tableSettings.columns,
        collection: territories
      });

      // Render the grid and attach the root to your HTML document
      $(this).append(grid.render().el);

      // Fetch some countries from the url
      territories.fetch({reset: true});

    })

  }
};

})(jQuery);
