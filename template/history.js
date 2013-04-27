define(function(require){
  
  var QS = require('lib/js/kit').queryString();
  
  if( QS.version) {
    var $textarea = $('textarea[name="data"]');

    $textarea.attr('readonly',true);  

    $(document).on('focus', function(e){
      $textarea.select();  
      
    })


  }else{

    $('head').append(
      '<style>' +
        'form[action="history.cgi"]>table>tbody>tr:hover { background:#ffc; }' +
      '</style>'
    )
    
    $('form[action="history.cgi"]>table>tbody>tr').each(function(){
      var $this = $(this);

      var href = $('>td:eq(0)>a', $this).attr('href')    
      var $history_td = $('>td:eq(6)', $this);

      if( href ){
        $history_td.html( '<a href="' + href + '">' + $history_td.text() + '</a>' );

      }
    
    })
  }

})