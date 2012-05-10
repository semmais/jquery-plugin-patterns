/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani 
 * methods call/private/public: @semmais
 * Licensed under the MIT license
 */

// the semi-colon before function invocation is a safety net against concatenated 
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, undefined ) {

  // undefined is used here as the undefined global variable in ECMAScript 3 is
  // mutable (ie. it can be changed by someone else). undefined isn't really being
  // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
  // can no longer be modified.

  // window and document are passed through as local variables rather than globals
  // as this (slightly) quickens the resolution process and can be more efficiently
  // minified (especially when both are regularly referenced in your plugin).

  // Create the defaults once
  //static vars
  var pluginName = 'yourPluginName',
      document = window.document,
      defaults = {
        propertyName: "value"
      };

  // The actual plugin constructor
  function Plugin( element, options ) {
    this.element = element;

    // jQuery has an extend method which merges the contents of two or 
    // more objects, storing the result in the first object. The first object
    // is generally empty as we don't want to alter the default options for
    // future instances of the plugin
    this.options = $.extend( {}, defaults, options) ;

    this._defaults = defaults;
    this._name = pluginName;

    this._init();
    
    
  }
  
  //public methods
  //example public method call: $("a").yourPluginName("publicMethod","argumentaData1","argumentData2")
  Plugin.prototype.publicMethod=function(argument1, argument2)
  {
      console.log("I'am a public method, my arguments are: "+argument1+" ,"+argument2);
      
      //example: private method call
      this._privateMethod("data1","data2","data3");
  }
  
  //private methods, always need start with _
  Plugin.prototype._privateMethod=function(argument1, argument2, argument3)
  {
      console.log("I'am a private method, my arguments are: "+argument1+" ,"+argument2+" ,"+argument3);
  }

  Plugin.prototype._init = function () {
    // Place initialization logic here
    // You already have access to the DOM element and the options via the instance, 
    // e.g., this.element and this.options
    
    

    
  };

  // A really lightweight plugin wrapper around the constructor, 
  // preventing against multiple instantiations
  
  //example create a instance: $("a").yourPluginName({option1:"val1", option2: "val2", ... });
      
  $.fn[pluginName] = function ( options ) {
    var args=arguments;
    return this.each(function () {
      var pluginInstance = $.data(this, 'plugin_' + pluginName);
      if (!pluginInstance) {
        $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
      }else{//try call a method
          if (options && pluginInstance[options] ) 
          {
            if (options.substr(0,1)!="_")
                pluginInstance[options].apply( pluginInstance, Array.prototype.slice.call( args, 1 ));  
            else $.error( 'Method ' +  options + ' is a private @ '+pluginName+' jQuery.' );
          }

          else $.error( 'Method ' +  options + ' does not exist on plugin '+pluginName+' jQuery.' );
      }
    });
  }

}(jQuery, window));