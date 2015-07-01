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
      var dateSort = '';
      if (this.column.get("isDate")) {
        var dateSort = this.model.get('_' + this.column.get("name"));
      }
      this.$el.append(rawValue).data('dateSort', dateSort);
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
      $(".backgrid-table", context).each(function(index) {
        var tableId = this.id;
        // Retrieve settings from Drupal object.
        tableSettings = settings.backgrid.tables[tableId];
        _backgridInit(tableId, tableSettings, context, settings);
      });
    }
  }

  /**
   * Initialize Backgrid table.
   */
  function _backgridInit(tableId, tableSettings, context, settings) {
    var table = $('#' + tableId, context);
    var tableColumns = tableSettings.columns;

    // For DrupalHtml cell, sort on plain text value.
    for (id in tableColumns) {
      if (tableColumns[id].cell == 'drupal-html') {
        $.extend(tableColumns[id], {
          sortValue: function (model, sortKey) {
            // If there is sort column in the resultset, use that instead.
            var sortString = '';
            if (sortString = model.get('_' + sortKey)) {
              return sortString;
            }
            return $(model.get(sortKey)).text().trim();
          }
        });
      }
    }

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

    // Allow other modules to alter the configuration before rendering.
    $(document).trigger('backgrid.preRender', [table, tableSettings]);

    // Save the grid object in the Drupal object so we can retrieve it later.
    Drupal.backgrid = Drupal.backgrid || {};
    Drupal.backgrid.tables = Drupal.backgrid.tables || [];
    Drupal.backgrid.tables[tableId] = grid;

    // Fetch objects
    objects.fetch({reset: true});

    var renderedGrid = grid.render().el;

    // Allow other modules to modify the html of the table.
    $(document).trigger('backgrid.preAttach', [table, grid, renderedGrid]);

    // Render the grid and attach the root to your HTML document
    table.append(renderedGrid);

  }

})(jQuery);
