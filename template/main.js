
seajs.config({
  base : 'http://dl.dropboxusercontent.com/u/3430677/github/',
  // base : 'http://敷敷恩.tk/',
  alias : {
    // jq : '//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js'
  }, 
  preload : [    
    '//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js'
  ],
  debug : true
}) ;
  
seajs.use('lib/js/kit', function(Kit){

  var QS = Kit.queryString()
    , folder = 'FFN/scriptish/template/'

  if( /pushtolive\.cgi$/i.test(location.pathname) ) {
    if( QS.multipush ) seajs.use( folder + 'batch' ) ;
    else if ( QS.pu ) seajs.use( folder + 'publish' ) ;
  }
  else if (/history\.cgi$/i.test(location.pathname) ) seajs.use( folder + 'history' ) ;
  else if (/cr\.cgi$/i.test(location.pathname) ) seajs.use( folder + 'cr' ) ;
  else if( /editor\.cgi$/i.test(location.pathname) ) seajs.use( folder + 'editor' ) ;
  else if( /grid\.cgi$/i.test(location.pathname) ) seajs.use( folder + 'grid' ) ;
})






