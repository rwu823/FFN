var Gen = function * (u) {
  var res = '', 
      i = 1;
  $.ajax({
    url: u,
    dataType: 'text',
    success: function (r) { console.log('gotta data!!'); res = r; }
  });
  while (i) { yield '' + i++ + res; }
};

var data = new Gen('../category/effects/basics/');

data.next();
//Object {value: "1", done: false}
//gotta data!! 
data.next();
//Object {value: "2<!doctype html>↵<!--[if IE 7 ]>		 <html class="no…ore(ga, s);↵    })();↵</script>↵↵</body>↵</html>↵", done: false}
data.next();
//Object {value: "3<!doctype html>↵<!--[if IE 7 ]>		 <html class="no…ore(ga, s);↵    })();↵</script>↵↵</body>↵</html>↵", done: false}


// (1) 創建完成Gen class / data 實例 時，都沒有真的執行function內容
// (2) 一直到第一個.next() 才開始執行
// (3) 一段時間之後顯示gotta data!!, 代表generator內部callback正常執行, 可是計數器沒上升!!
// (4) 呼叫.next()時, 計數器才上升, 迴圈繼續