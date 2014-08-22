define(function(require){

  require('./util-push-grid') ;
  var QS = require('lib/js/kit').queryString() ; 

  function selectEnv( ){
    var $select = $('select[name="version"]') ;
    var Map = {
      '1' : 'devel',
      '2' : 'staging',
      '3' : 'release',
      '4' : 'live'
    }
    
    $('option[value="devel"]', $select)[0].selected = false ;

    QS.pu.split('').forEach(function(v){
      $('option[value="' + Map[v] + '"]', $select)[0].selected = true ;
    })
  }

  function publish(){
    $('form[name="searchform"] [type="submit"]').trigger('click') ;
  }


  selectEnv() ;

  if( /4/.test(QS.pu) ){    
    $('#note_holder').show()
    $('#note_holder textarea[name="note"]').val( localStorage.project_number + ' ' ).select()    
  }else publish() ;

})