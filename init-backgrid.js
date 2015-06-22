/**
 * @file
 * Initialize Backgrid with Drupal theme variables.
 */

(function ($) {

  // Extend cell to include an "html" data type.
  Backgrid.DrupalHtmlCell = Backgrid.Cell.extend({
    className: "drupal-html-cell",
    render: function () {
      this.$el.empty();
      var rawValue = this.model.get(this.column.get("name"));
      // var formattedValue = this.formatter.fromRaw(rawValue, this.model);
      // @todo strip all tags for formattedValue
      // @todo Add XSS validation, passing raw data from feed is bad
      this.$el.append(rawValue);
      this.delegateEvents();
      return this;
    }
  });

  // Extend row to add classes the the row HTML.
  var DrupalRow = Backgrid.Row.extend({

    render: function () {
      this.$el.empty();

      var fragment = document.createDocumentFragment();
      for (var i = 0; i < this.cells.length; i++) {
        fragment.appendChild(this.cells[i].render().el);
      }

      // Append id.
      this.el.dataset.id = this.model.attributes.id;
      // Append type (actually bundle).
      this.el.dataset.bundle = this.model.attributes.type;

      this.el.appendChild(fragment);

      this.delegateEvents();

      return this;
    },
  });

  Drupal.behaviors.backgrid = {
    attach: function (context, settings) {

      $(".backgrid-table", context).each(function(index){
        var $tableId = this.id;
        // Retrieve settings from Drupal object.
        tableSettings = settings.backgrid.tables[$tableId];

        var tableColumns = tableSettings.columns;

        var bgModel = Backbone.Model.extend({});

        var bgCollection = Backbone.Collection.extend({
          model: bgModel,
          url: tableSettings.dataUrl,
        });

        var objects = new bgCollection();

        // Initialize a new Grid instance
        var grid = new Backgrid.Grid({
          columns: tableSettings.columns,
          collection: objects,
          row: DrupalRow,
        });

        // Render the grid and attach the root to your HTML document
        $(this).append(grid.render().el);

        // Fetch objects
        objects.fetch({reset: true});

      })

    }
  };

})(jQuery);
