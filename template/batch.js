'use strict'
define(function(require){  

  require('./util-push-grid')

  function setTextarea(){
    setTimeout(function(){
      $('textarea[name="templatebatch"]').focus().css({
        height: '200px',
        font: '16px/1.3 consolas',
        border: '1px solid #ccc',
        padding: '6px'
      })
    }, 200)
  }  
  setTextarea()
})