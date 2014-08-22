define(function(require){
  
  var QS = require('lib/js/kit').queryString() ; 

  function cancelAll(){
    check_all(0) ;
  }

  function toggleSite(){
    QS.site.split('|').forEach(function(site){
      toggle_all_languages(site) ;
    })
  }

  function lightCheckbox(){
    $('[type="checkbox"]:checked').each(function(){
      var $this = $(this);
      $this.parent().css('background', '#ffc') ;
    })    
  }

  cancelAll() ;
  toggleSite() ;
  lightCheckbox() ;

})