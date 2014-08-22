'use strict'
seajs.config({
  base : 'http://rwu823.github.io/',
  preload : [
    '//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js'
  ]
})

seajs.use('lib/js/kit', function(Kit){

  var QS = Kit.queryString(),
      pathUrl = 'https://raw.githubusercontent.com/rwu823/FFN/master/template/',
      ph = location.pathname

  if(/pushtolive\.cgi$/i.test(ph)) {
    if(QS.multipush) seajs.use(pathUrl + 'batch')
    else if (QS.pu) seajs.use(pathUrl + 'publish')
  }
  else if( /(history|cr|editor|grid)\.cgi$/i.test(ph) ) seajs.use(pathUrl + RegExp.$1)

  // close perf
  document.cookie = 'debug_cookie_perf_off=1;path=/;domain=friendfinderinc.com'
})






