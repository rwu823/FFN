'use strict'
define(function(require){
  var kit = require('lib/js/kit'),
      QS = kit.queryString(),

      api = require('./api')

  var printo = function(s, o){
    return s.replace( /\{\{([\w-_]+)\}\}/g, function(m, m2){

      return String( o[m2] ) || '';
    })
  }

  if( QS.version) {
    var $textarea = $('textarea[name="data"]');
    $textarea.attr('readonly',true);  

    $(window).on('focus', function(e){
      $textarea.select();  
    })

  }else{
    
    var $emptyReviews = $('a[href="/cgi-bin/admin/release/cr.cgi?review_id="]'),
        $created = $('a[href^="/cgi-bin/admin/release/cr.cgi?review_id=REVIEW-"]'),

        $form = $('form[action="history.cgi"]')


        $.fn.loadDot = function(op){
          op = $.extend({

          }, op)

          return this.each(function(){
            var $this = $(this),
                timer = {}


          })
        }

    $('head').append(
      '<style>' +
        'form[action="history.cgi"]>table>tbody>tr:hover { background:#ffc!important; }' +
        'form[action="history.cgi"]>table { width:98%;font:14px/1.2 arial; }' +
        'form[action="history.cgi"]>table td { padding:4px 0;}' +
        'form[action="history.cgi"]>table a { text-decoration:none;color:#36c; }' +
        'form[action="history.cgi"]>table a:hover { text-decoration:underline; }' +
        'a.btn { color:#fff!important;font:12px/1 arial; display:inline-block;text-decoration:none;background:#55A82F;color:#fff;padding:5px 7px;border-radius:3px;border:1px solid #ccc; }'+
        'a.btn:hover { background:#2B6311;text-decoration:none!important; } ' +
        'a.btn._create { background:#C77A7A;min-width: 40px; }' +
        'a.btn._create:hover { background:#882A2A; }' +
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

    // set btn review
    $created.each(function(){      
      var $this = $(this),
          t = $this.text(),
          ohref = $this.attr('href')

      $this
        .addClass('btn')
        .attr('href', 'https://admin.friendfinderinc.com' + ohref )
        .text( t.split('-')[1] )
    })
    

    // had push history
    $('table tr>td:last-of-type:has(a)', $form).each(function(){
      var $this = $(this),
          $this_a = $( '>a', $this).eq(0),

          $td_review =  $this.prev().prev(),
          $td_comment = $td_review.prev().prev(),

          $td_review_a = $('>a', $td_review),
          $td_comment_a = $('>a', $td_comment),

          pushID = /(\d+)$/.test( $this_a.attr('href') ) && RegExp.$1,
          ver = /(\d+)$/.test( $td_comment_a.attr('href') ) && RegExp.$1

      if( !$td_review_a.hasClass('btn') ){
        $td_review_a
          .attr('href','#')
          .attr('ver', ver)
          .attr('pushID', pushID)
          .addClass( 'btn _create' )
          .text( 'create' )        
      }

      // set live tr background
      if( /^Pushed to live/i.test( $this_a.text() ) ){
        $this.parent().css('backgroundColor', 'rgba(248, 199, 0, 0.25)')
      }
    })

    // set btn create
    $emptyReviews.on('mouseup', function(e){
        e.preventDefault();

        if( e.button === 2 ) return ;

        var $this = $(this),
            timer = 0,
            count = 0,

            dotInterval = function(){
              var s = '';
              ++count
              for( var i = count; i--; ) s += '.';
              $this.text( s );

              if( count >= 5) count = 0;

              timer = setTimeout( dotInterval, 500 )
            }
        dotInterval();

        api.createReveiw({
          pushID : $this.attr('pushID'),
          ver : $this.attr('ver')
        }, function(j){

          clearTimeout(timer)
          $this
            .removeClass('_create')
            .text(j.reviewID)
            .attr('href', 'https://admin.friendfinderinc.com/cgi-bin/admin/release/cr.cgi?review_id=REVIEW-' + j.reviewID)

        })
        
      })


  }

})