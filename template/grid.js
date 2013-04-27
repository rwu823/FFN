define(function(require){
  
  var $grid_table = $('table[bgcolor^="333"] table') 
    , $grid_table_tds = $('>tbody>tr>td', $grid_table)
    , $grid_site_tds = $('>tbody>tr>td:nth-of-type(1)', $grid_table)
    , $grid_lang_tds = $('>tbody>tr:eq(0)>td', $grid_table)

  $('head').append(
    '<style>' +
      'center > div > div { padding-left:50px!important; }' +
      'table[bgcolor^="333"] table { width:100%;border-collapse: collapse;border-spacing: 0; }' +
      'table[bgcolor^="333"] table >tbody>tr>td {border:1px solid #ccc;color:#999; }'+
      'table[bgcolor^="333"] table >tbody>tr>td._on { background:#EF0FFF;color:#fff; }' +
      'table[bgcolor^="333"] table font[size="1"] { font-size:16px; }' +
    '</style>'
  )

  $grid_table.on('mouseenter', 'td[bgcolor!="white"]', function(e){

    var $this = $(this)
      , idx = $this.index()
      , $parent_tr = $this.parent() ;
      
      $grid_table_tds.removeClass('_on')

      $grid_lang_tds.eq(idx)
        .add( $('>td:eq(0)', $parent_tr) )
        .add($this).addClass('_on') ;
  })

  $grid_table.on('mouseleave', function(e){
    $grid_table_tds.removeClass('_on');    
  })

})
