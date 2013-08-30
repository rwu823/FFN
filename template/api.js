'use strict';
define(function(require){  
  
  var Kit = require('lib/js/kit') ;
  var QS = Kit.queryString() ;

  var Api = {

    Ajax : {},
    Res : {},

    defaultData : {
      site : QS.site,
      lang : QS.lang,
      keyword : QS.keyword,
      root : 1 
    } ,

    publish :function( data, callback){

      var set_data = {
        keyword : QS.keyword,
        original_site : QS.site,
        original_lang : QS.lang,
        sbumit : 'Publish',
        type : 'main',
        version : 'devel',
        Lang : ['british', 'chinese', 'dutch','english','french','gb','german','italian', 'japanese', 'korean', 'portuguese', 'romanian', 'russian', 'spanish', 'swedish', 'tagalog'],
        Site : ['bc', 'bdsm', 'bondage', 'cams', 'cff', 'dammo', 'danni', 'ff', 'ffadult', 'ffall', 'ffc', 'ffd', 'ffe', 'fff', 'ffgay', 'ffi', 'ffitaly', 'ffj', 'ffk', 'ffp', 'ffsenior', 'ffz', 'gd', 'getiton', 'hb', 'jc', 'lfc', 'mm', 'out', 'payg', 'ph', 'pm', 'slim', 'ss', 'xh']
      } ;

      set_data[ QS.site + '-british'] = 'on' ;
      set_data[ QS.site + '-chinese'] = 'on' ;
      set_data[ QS.site + '-dutch'] = 'on' ;
      set_data[ QS.site + '-english'] = 'on' ;
      set_data[ QS.site + '-french'] = 'on' ;
      set_data[ QS.site + '-german'] = 'on' ;
      set_data[ QS.site + '-italian'] = 'on' ;
      set_data[ QS.site + '-japanese'] = 'on' ;
      set_data[ QS.site + '-korean'] = 'on' ;
      set_data[ QS.site + '-portuguese'] = 'on' ;
      set_data[ QS.site + '-spanish'] = 'on' ;
      set_data[ QS.site + '-swedish'] = 'on' ;
      set_data[ QS.site + '-tagalog'] = 'on' ;

      $.extend(true, set_data, data) ;

      Api.Ajax.Publish = $.ajax({
        url : 'pushtolive.cgi?site=' + QS.site + '&lang=' + QS.lang + '&keyword=' + QS.keyword,
        data : set_data,
        success : function ( res ){
          Api.Res.Publish = res ;
          if( $.isFunction( callback ) ) callback( res ) ;
        }
      })
    },

    commit : function ( data, callback ){
      data = $.extend({
        commitaction : 'Commit to DB',
        commmit_comment : data.comment,
        data : data.code
      }, Api.defaultData )

      Api.Ajax.Commit = $.ajax({
        data : data,
        success : function ( res ){
          Api.Res.Commit = res ;
          if( $.isFunction( callback ) ) callback( res ) ;
        }
      })
    },

    save : function ( data, callback ){
      data = $.extend({
        action : 'Save local',  
        data : data.code 
      }, Api.defaultData )

      Api.Ajax.Save = $.ajax({
        data : data,
        success : function ( res ){
          Api.Res.Save = res ;
          if( $.isFunction( callback ) ) callback( res ) ;
        }
      })
    },

    pushSandbox : function( data, callback ){
      var setData = $.extend({
        site : QS.site,
        lang : QS.lang,
        keyword : QS.keyword
      }, data )

      Api.Ajax.PushSandbox = $.ajax({
        type : 'GET',
        url : 'pushtolive.cgi?version=devel&'+ setData.site +'-'+ setData.lang +'=1&local=1&submit=1&keyword=' + setData.keyword  + '&compiled=-1',
        success : function ( res ){
          Api.Res.PushSandbox = res ;
          if( $.isFunction( callback ) ) callback( res ) ;
        }
      })  
    }, 

    clear : function( callback ){
      data = $.extend({
        action : 'Clear local'
      }, Api.defaultData )

      Api.Ajax.Clear = $.ajax({
        data : data,
        success : function( res){
          Api.Res.Clear = res ;
          if( $.isFunction( callback ) ) callback( res ) ;
        }
      })
    },

    createReveiw : function(d, done){
      d = $.extend({
            pushID : '',
            ver : ''
          }, d)

      $.ajax({
        url : '/cgi-bin/admin/push.cgi?cmd=pushdetail&pushid=' + d.pushID +';create_review=1;subclass=template;commitid=' + d.ver +';branch=main;silo=all',
        type : 'GET',
        dataType : 'html',
        success : function(htm){
          var $a = $('a[href^="/cgi-bin/admin/release/cr.cgi?review_id"]', $(htm) ),
              reviewID = $a.text().split('-')[1]

          done( { reviewID : reviewID } )

        }
      })
    },

    init : function (){      
      $.ajaxSetup({
        url : 'editor.cgi',
        type : 'POST'
      })

    }
  }

  Api.init() ;

  return Api ;

}) ;