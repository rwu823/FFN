define(function(require, exports){

  require('./spin.css') ;
  
  $('body').append('<div id="spin"><s></s><span></span></div>')  

  var $spin = $('#spin')
  var $txt = $('>span', $spin ) ;

  return {
    open : function(opt){
      var set = $.extend({
        color: '#fff',
        txt : 'Loading...'
      },opt) ;

      $spin.css({
        color : set.color
      }).show() ;

      $txt.text( set.txt ) ;        
    },

    close : function(){
      $spin.hide() ;
    },

    fadeOut : function(){
      $spin.fadeOut(1200)
    }
    
  }

}) ;