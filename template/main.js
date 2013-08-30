
seajs.config({
  base : 'http://rwu823.github.io/',
  preload : [    
    '//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js'
  ],
  debug : true
}) ;
  
seajs.use('lib/js/kit', function(Kit){

  var QS = Kit.queryString()
    , pathUrl = 'https://dl.dropboxusercontent.com/u/3430677/FFN/template/'

  if( /pushtolive\.cgi$/i.test(location.pathname) ) {
    if( QS.multipush ) seajs.use( pathUrl + 'batch' ) ;
    else if ( QS.pu ) seajs.use( pathUrl + 'publish' ) ;
  }
  else if (/history\.cgi$/i.test(location.pathname) ) seajs.use( pathUrl + 'history' ) ;
  else if (/cr\.cgi$/i.test(location.pathname) ) seajs.use( pathUrl + 'cr' ) ;
  else if( /editor\.cgi$/i.test(location.pathname) ) seajs.use( pathUrl + 'editor' ) ;
  else if( /grid\.cgi$/i.test(location.pathname) ) seajs.use( pathUrl + 'grid' ) ;
})






