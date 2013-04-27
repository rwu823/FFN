define(function(require){
  
  var QS = require('lib/js/kit').queryString() ; 

  function cancelAll(){
    check_all(0) ;
  }

  function toggleSite(){
    toggle_all_languages(QS.site) ;
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