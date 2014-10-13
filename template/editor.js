'use strict'
define(function(require, exports, module ){  
  
  var Mockup = require('./mockup')
    , Api = require('./api')
    , Kit = require('lib/js/kit')
    , Load = require('lib/js/load')
    , Spin = require('./spin') 

  var QS = Kit.queryString(),

      $advedit = $('#advedit'),
      $form = $('#editor'),

      $center = $('body > center'),
      has_rd = $('> font:first-child', $form).length,
      $status = $(has_rd ? '> p > b:first-child' : '> b:first-child', $form),
      isDB = /^DB/i.test($status.text()),

      $formContents = has_rd ? $('>p', $form).contents() : $form.contents(),
      CM, Timer = {},
      title = document.title = QS.keyword + '-' + QS.site + '-' + QS.lang,
      url = decodeURIComponent(location.href),

      $command, $command_in, $tip = {}, $cm,

      getHeadLine = function(){
        var hl = []
        for(var i = 3, _ai, l = $formContents.length; i < l; i++){
          _ai = $formContents[i]
          if( _ai.nodeType === 1 && _ai.id === 'advedit') break;
          hl.push(_ai)
        }
        return $(hl)
      },

      $headLine = getHeadLine(),

      $btnPublish = $('input[value="Publish"]'),
      $btnLoadLocal = $('input[value="Load local"]'),
      $btnSaveLocal = $('input[value="Save local"]'),
      $btnClearLocal = $('input[value="Clear local"]'),
      $btnReloadFromDB = $('input[value="Reload from DB"]'),
      $btnCommit = $('input[value="Commit to DB"]'),
      $pickReview = $('select[name="pickreview"]'),
      $links        = $form.find('a'),
/*
      $grid         = $links.eq(0).addClass('button'),  //Grid
      $search       = $links.eq(1).addClass('button'),  //Search
      $pretty_print = $links.eq(2).addClass('button'),  //Pretty Print
      $history      = $links.eq(3).addClass('button'),  //History
      $preview      = $links.eq(4).addClass('button'),  //Preview
*/
      $info         = $links.eq(5).addClass('button').attr('target', '_blank'),  //Info
      $check_push   = $links.eq(6).addClass('button').attr('target', '_blank'),  //Check Push
      $fix_char     = $links.eq(7).addClass('button').attr('target', '_blank')   //Fix Garbled Characters

  if(1||location.port === '21321') !function(){

    $headLine.wrapAll('<div id="head-line" />')
    $headLine = $('#head-line')
    $headLine
      .html($btnPublish)
      .append($btnCommit, $pickReview, $info, $check_push, $fix_char, $btnClearLocal)

    $status.append(' ' + document.title)
  }()

  $status.attr('id', isDB ? 'status-db' : 'status-local')

  var EventListener = (function(){          

    var ctrl_alt_c = 0
      , arr_cmd = localStorage.arr_cmd && JSON.parse( localStorage.arr_cmd ) || []

    function hotkey(e){
      // log(e.which)

      var Key = {

        Ctrl: {
          '83': function(lang){ // S
            lang = lang || QS.lang 
            if( isDB ){
              alert("DB EDIT can't to save Local") 
            }else{
              Spin.close() 
              setTimeout(function(){
                Spin.open({ txt : 'Save Local', color:'#37F14A' })               
              },100 )
              if( Api.Ajax.Save )Api.Ajax.Save.abort() 
              Api.save( { code : CM.getValue() }, function(htm){ 
                Spin.open({ txt : 'Push to : ' + lang , color:'#37F14A' }) 
                Api.pushSandbox({lang:lang},function(){
                  document.title = title        
                  Spin.close() 
                }) 
              }) 
            }
          }

          
        },

        Alt: {
          '71': function(){ // G Grid
            open( location.href.replace( 'editor.cgi' , 'grid.cgi' ) )   
          },

          '72': function(){ // H History
            open( location.href.replace( 'editor.cgi' , 'history.cgi' ) )  
          },

          '66': function(){ // B Batch publish
            open( 'pushtolive.cgi?multipush=1&site=' + QS.site ) 
          },

          '90': function(){ // Z Toogle DB/Local
            location.href = isDB ?  url + '&action=Load local' : url.replace('action=Load local', '')
          },

          '77': function(){ // M main.cgi
            open( 'main.cgi' ) 
          },

          '80': function(){ // P Publish sandbox
            open('pushtolive.cgi?version=devel&'+ QS.site +'-'+ QS.lang +'=1&local=1&submit=1&keyword=' + QS.keyword  + '&compiled=-1')
          }

        },

        'Ctrl+Alt': {
          '67': function(){ // C Copy template name  
            $command.show() 
            $command_in.val(document.title).select()

            $command_in[0].selectionStart = 0

            if( ctrl_alt_c ){
              $command_in[0].selectionEnd = document.title.length
              ctrl_alt_c = 0
            }else{              
              $command_in[0].selectionEnd = QS.keyword.length
              ctrl_alt_c = 1
            }

          }
        },

        'Ctrl+Shift': {
          '80': function(){ // P            
            if( $command.is(':hidden') ){
              $command.show() 
              $command_in.select()               
            }else{
              // $command.hide() 
              $command_in.focus() 
            }            
          },
          '83': function(){ // S
            Key.Ctrl['83']('all') 
          }
        },

        Fn : {
    
          '112': function(){ // F1            
            $tip.f1[$tip.f1.hasClass('_off') ? 'removeClass' : 'addClass']('_off') 

            $tip.f2.addClass('_off') 
          },

          '113': function(){ //F2
            $tip.f2[$tip.f2.hasClass('_off') ? 'removeClass' : 'addClass']('_off') 

            $tip.f1.addClass('_off') 
          },
          
          '122': function(){ //F11            
            $cm[$cm.hasClass('_f11') ? 'removeClass' : 'addClass']('_f11') 
          }
          
        }

      }   
      
      if( e.ctrlKey && e.shiftKey && Key['Ctrl+Shift'][e.which] ){
        e.preventDefault() 
        e.stopPropagation()
        Key['Ctrl+Shift'][e.which]() 
      }else if( e.ctrlKey && e.altKey && Key['Ctrl+Alt'][e.which] ){
        e.preventDefault() 
        e.stopPropagation()
        Key['Ctrl+Alt'][e.which]() 
      }else if( e.ctrlKey && Key.Ctrl[e.which] ) {
        e.preventDefault() 
        e.stopPropagation()
        Key.Ctrl[e.which]() 
      }else if( e.altKey && Key.Alt[e.which] ){
        e.preventDefault() 
        e.stopPropagation()
        Key.Alt[e.which]()
      }else if( Key.Fn[e.which] ){
        e.preventDefault() 
        e.stopPropagation()
        Key.Fn[e.which]()
      }
      
    }

    function hotString(e){

      var value =  this.value
        , re_chk_param = /-\w+\s+\w+/g 

      if( e.which === 13 && value) { //enter    

        e.preventDefault()    

        arr_cmd.push(value)
        localStorage.arr_cmd = JSON.stringify( arr_cmd )
        $command_in.attr('idx_cmd', arr_cmd.length)

        var Map = {
          vi: function(){

            // var url = location.href 

            // if( target.match( re_chk_param ) ) {
            //   target.match( re_chk_param ).forEach(function(v){
            //     var param = v.match( /^\S+/ )[0] 
            //     var cmd = v.match( /\S+$/ )[0] 

            //     if( /^(-s|-site)$/.test(param) ) url = url.replace( /site=[^&]+/, 'site=' + cmd )
            //     else if ( param === '-t' ) {
            //       cmd.split(' ').forEach(function(template_name){
            //         if( template_name ) open( url.replace(/keyword=[^&]+/, 'keyword=' + template_name ) ) 
            //       })     
            //     }
                
            //   })
            // }else{
              target.split(' ').forEach(function(template_name){
                if( template_name ) open( 'editor.cgi?action=Load local&site=' + QS.site + '&lang=' + QS.lang + '&keyword=' + template_name ) 
              }) 
            // }

          },
          vim: function(){ Map.vi() },

          text: function(){
            target.split(' ').forEach(function(deftag){ 
              open( 'https://admin.friendfinderinc.com/cgi-bin/admin/dictionary/deftags.cgi?page=edit_deftag_rows&defnames=' + deftag ) 
            })
          },
          text_js: function(){ Map.text() },
            
          commit: function(){
            if( /\bp?\d{5}\b/i.test( target ) || /\b\w+-\d+\b/.test( target ) || /\bp\d{5}[sb]\d+\b/i.test( target ) ){
              Spin.open({ txt : 'Commit to DB', color:'#9D201C' }) 
              Api.commit({ comment : target, code : CM.getValue()},function(htm){
                Spin.close()  
                localStorage.lastCommit = target 
              })
            }else{
              alert('"' + target + '"' + ' is not a correct project number.') 
            }
          },

          grep: function(){
            open( 'search.cgi?action=query&search_sites=' + QS.site + '&text_string=' + target  ) 
          },

          clear: function(){
            Spin.open({ txt : 'Clear Local', color:'#629DFF' }) 
            Api.clear(function(htm){
              Spin.close() 
              CM.setValue( $(htm).find('#advedit').val() ) 
            })
          },

          pu: function(){            
            open( location.href.replace( 'editor.cgi' , 'pushtolive.cgi' ) + '&pu=' + target  )
          },

          set: function(){
            var Map = {
              js : 'javascript',
              htm : 'html'
            }

            CM.setOption( "mode", Map[target] || target )
          },
        
          deftag: function(){
            target.split('|').forEach(function(txt){ 
              open( 'https://admin.friendfinderinc.com/cgi-bin/admin/dictionary/deftags.cgi?action_find_by_text=by+text&pattern=^' + txt + '$' ) 
            })
          },

          diff: function(){
            open(location.href.replace( 'editor.cgi' , 'history.cgi' ) + '&mode=diffspec&submit=get+diff&version=local&diffversion=' + $('select[name=pickreview] >option:eq(1)').val() )
          },

          env: function(){            
            var url = location.href 

            var err_param = [] 

            target.match( re_chk_param ).forEach(function(v){
              var param = v.match( /^\S+/ )[0] 
              var cmd = v.match( /\S+$/ )[0] 

              switch( param ){
                case '-dev':
                case '-d': 
                  url = url.replace( /dev\d+/, 'dev' + cmd ); break

                case '-port':
                case '-p': 
                  url = url.replace( /:\d+/, ':' + cmd ); break

                case '-site':
                case '-s': 
                  url = url.replace( /site=[^&]+/, 'site=' + cmd ); break

                default: err_param.push( param ) 
              }
              
            })

            if( !err_param.length ) location.href = url 
            else alert( err_param.join(', ') + ' not found.')

          }
        }     

        var command = value.match(/^\w+/)[0] 
        var target = $.trim( value.split( command + ' ' )[1] )

        if( Map[command] ) Map[command]()
        else {
          alert( '"' + command +'"' + ' is not a correct command.')
          $command_in[0].selectionStart = 0
          $command_in[0].selectionEnd = command.length 
        }        
        
      }else if( e.which === 27){ //esc

        $command.hide() 
        CM.focus() 
        ctrl_alt_c = 0 

      }else if( e.which === 9 ){ //Tab
        e.preventDefault() 
        var command = value.match(/^\w+/)[0] 
        if( command === 'commit' ) {
          $command_in.val( 'commit ' + localStorage.lastCommit ) 
          $command_in[0].selectionStart = 'commit '.length
          $command_in[0].selectionEnd = $command_in.val().length
        }
      }else if( e.which === 38){ // Up
        $command_in
          .val( arr_cmd[ +$command_in.attr('idx_cmd') - 1 ] )
          .attr( 'idx_cmd', Math.max( 0, +$command_in.attr('idx_cmd') -1 ) )
      }else if ( e.which === 40 ){ // Down
        $command_in
          .val( arr_cmd[ +$command_in.attr('idx_cmd') + 1 ] )
          .attr( 'idx_cmd', Math.min( arr_cmd.length, +$command_in.attr('idx_cmd') +1 ) )
      }
    }

    function init(){

      $(window).on('keydown', hotkey) 

      $command_in.on('keydown', hotString).attr('idx_cmd', arr_cmd.length)

      $status.on('click', 'font', function(e){
        location.href = isDB ?  url + '&action=Load local' : url.replace('action=Load local', '')
      })
      
    }

    return { init : init } 

  })() 

  var Main = {

    insertMockup: function(){
      $('body').append( Mockup.tip ) 

      $command = $('#command') 
      $command_in = $('>input', $command) 

      $tip.f1 = $('#tip_f1') 
      $tip.f2 = $('#tip_f2') 

    }, 

    runCodemirror: function(){
      Load.codemirror({emmet:true, theme:'night' }, function(){    
              
        CM = CodeMirror.fromTextArea( $advedit[0], {
          mode: 'text/' + (/^(javascript|css)[-_]/i.test( QS.keyword ) && RegExp.$1 || 'html'),
          lineNumbers: true,
          matchBrackets: true,
          theme: 'night',
          tabSize: 2,
          autoCloseTags: true,

          profile: 'xhtml'
        })          
        // CM.focus() 

        $cm = $(CM.display.wrapper)
      }) 

    },

    init: function(){
      Main.runCodemirror() 
      Main.insertMockup() 

      EventListener.init() 
      document.cookie = 'debug_cookie_perf_off=1; path=/; domain=.' + /([^.]+\.[^.]+)$/.test(document.domain) && RegExp.$1
    }

  }


  Main.init() 

}) 