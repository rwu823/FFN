// ==UserScript==
// @id             ffn-template
// @name           ffn-template
// @version        2013.8.30
// @author         Rocky Wu <rwu.tw@ffn.com>
// @description    Improvement template system
// @website        https://github.com/rwu823/FFN/tree/master/template
// @updateURL      https://raw.github.com/rwu823/FFN/master/template/assets/ffn-template.user.js
// @icon           https://raw.github.com/rwu823/FFN/master/template/assets/favicon.png

// @include        *friendfinderinc.com*/cgi-bin/admin/dictionary/*
// @include        *friendfinderinc.com*/cgi-bin/admin/release/cr.cgi*

// @run-at         document-end
// ==/UserScript==

;(function(init){
  'use strict'
  var el_script = document.createElement('script')
  el_script.src = 'http://cdn.staticfile.org/seajs/2.1.1/sea.js'
  el_script.id = 'seajsnode'
  document.head.appendChild( el_script )

  el_script.onload = init
})(function(){
  unsafeWindow.seajs.use('https://rawgit.com/rwu823/FFN/master/template/main.js')
})