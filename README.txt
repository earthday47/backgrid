
AUTHORS
-------

 * Wes Jones (earthday47)

REQUIREMENTS
------------

Backgrid relies heavily on JS libraries and Libraries API to function. For 
basic functionality, download and unpack the following JS libraries into 
sites/all/libraries (or your defined libraries path):

 - Backgrid (http://backgridjs.com/)
 - Underscore (http://underscorejs.org/)
 - Backbone (http://documentcloud.github.io/backbone/)

To view the demos in the backgrid_example module, the following libraries are required:

 - backbone-paginator
 - backgrid-paginator
 - backgrid-filter
 - backgrid-select-all

Download URLs are listed in `backgrid_libaries_info()` in the file 
`backgrid.module`.

INSTALLATION
------------

 1. Download the latest Backgrid release and dependent libraries.
 2. Unpack and place in sites/all/libraries.
 3. Enable Backgrid module.
 4. Use the theme functions defined in `theme.inc` to integrate Backgrid into 
    your project. See the examples module for implementation suggestions.
