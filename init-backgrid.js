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

      var bgModel = Backbone.Model.extend({});

      var bgCollection = Backbone.Collection.extend({
        model: bgModel,
        url: tableSettings.dataUrl,
      });

      var objects = new bgCollection();

      // Initialize a new Grid instance
      var grid = new Backgrid.Grid({
        columns: tableSettings.columns,
        collection: objects
      });

      // Render the grid and attach the root to your HTML document
      $(this).append(grid.render().el);

      // Fetch objects
      objects.fetch({reset: true});

    })

  }
};

})(jQuery);
