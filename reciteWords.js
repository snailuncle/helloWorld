console.show();
print('………………');
var o = new Object();
//hellogithub
// alert(obj.username);
// obj.username = "allen";
// alert(obj.username);
//分三种页面
//[1]我不确定 对象属性中,是否有该属性,有则点击,没有就点击我不确定
//[2]继续背   更新对象属性,然后点击继续背
//其他        延迟一秒
while (true) {
    //有没有中间提示的控件
    if (id('tv_middle_tips').className('android.widget.TextView').exists()) {
        // 有
        print("有中间提示");
        var tipText = id('tv_middle_tips').className('android.widget.TextView').findOne().text();
        // 我不确定
        // 对象属性中,是否有该属性,有则点击,没有就点击我不确定
        if (tipText == "我不确定") {
            print("中间提示=我不确定");
            var que = id('tv_question').className('android.widget.TextView').depth(8).findOne().text();
            if (o[que]) {
                s = o[que];
                print("该单词已保存---" + que + "=" + s);
                //              分两种情况:结尾的优先,包含的落后
                if (textEndsWith(s).exists()) {
                    print("找到以" + s "+结尾的单词");
                    //翻译在结尾
                     
                    //var o = textEndsWith(s).findOne();
                    var oo = textEndsWith(s).findOne();
                    print("以╳结尾的单词=" + oo.text()); 
                    print("点击对应的单词选项---结尾");
                    while (!click(oo.text()));
                } else {
                    print("找到包含" + s "+的单词");
                    //翻译在中间
                    var oo = textContains(s).findOne();
                    print("包含╳的单词=" + oo.text()); 
                    print("点击对应的单词选项---中间");
                    while (!click(oo.text()));
                } 
            } else {
                print("该单词-没有-保存,点击---我不确定");
                while (!click(tipText));
            }
        }
        // 继续背
        // 更新对象属性,然后点击继续背
        else if (tipText == "继续背") {
            print("中间提示=我不确定");
            var que1 = id('tv_question').className('android.widget.TextView').depth(8).findOne().text();
            var que2 = id('tv_answer_tran').className('android.widget.TextView').depth(10).findOne().text();
            o[que1] = que2;
            print("设置属性完毕---" + que1 + "=" + que2);
            print("点击---继续背");
            while (!click(tipText));
        } else {
            console.error("不是-我不确定,也不是-继续背");
        }
    }
    // 没有
    else {
        sleep(100);
    }
}
//---------------------------------------------------------------------------------------------
// console.show();
// print('………………'); 
// //className = 'android.widget.TextView'
// //id = 'tv_middle_tips' 
// //var emoj = id("name").packageName("com.tencent.mobileqq").clickable()
// //        .className("ImageView").drawingOrder(5).findOne();
//  
// sleep(5000);
//  
// var obj = new Object();
// alert(obj.username);
// obj.username = "allen";
// alert(obj.username);
// var s = "";
// var t = 200;
// while (true) {
//     while (id('tv_middle_tips').className('android.widget.TextView').exists()) {
//         var tipText = id('tv_middle_tips').className('android.widget.TextView').findOne().text();
//         // print(tipText);
//         sleep(t);
//         if (tipText == "我不确定") {
//             print("发现>我不确定");
//             if (s == "") {
//                 print("s=空")
//             } else {
//                  
//                 print("s=" + s);
//                 //分两种情况
//                 //翻译在结尾
//                 //翻译在中间
//                 if (textEndsWith(s).exists()) {
//                     //翻译在结尾
//                      
//                     //var o = textEndsWith(s).findOne();
//                     var oo = textEndsWith(s).findOne();
//                     print("以╳结尾的单词=" + oo.text()); 
//                     while (!click(oo.text()));
//                 } else {
//                     //翻译在中间
//                     var oo = textContains(s).findOne();
//                     print("包含╳的单词=" + oo.text()); 
//                     while (!click(oo.text()));
//                 } 
//             }
//             /*
//             var c = className("AbsListView").find();
//             if(c.empty()){
//                 toast("找到啦");
//             }else{
//                 toast("没找到╭(╯^╰)╮");
//             }
//             */
//              
//             while (!click(tipText));
//         } else if (tipText == "继续背") {
//             print("发现>继续背");
//             //设置s文本=单词翻译，取最后两个字符
//             //  id = tv_answer_tran
//             var tran = id('tv_answer_tran').className('android.widget.TextView').findOne().text();
//             if (tran.indexOf("(") > 0) {
//                 print("特殊翻译左左=" + tran);
//                 //sleep(2000);
//                 // alert(s.substring(0, s.indexOf('+')));
//                  
//                 s = tran.substring(tran.indexOf("(") - 2, tran.indexOf("("));
//                 //如果有点号，那么取右括号后面两个字
//                 if (s.indexOf(".") >= 0) {
//                     print("特殊翻译右右=" + tran);
//                     // sleep(2000);
//                     // alert(s.substring(0, s.indexOf('+')));
//                      
//                     s = tran.substr(tran.length - 2); 
//                 }
//             } else {
//                 s = tran.substr(tran.length - 2); 
//             }
//             print("翻译=" + s); 
//              
//             while (!click(tipText));
//         } else {
//             print("空");
//         }
//     }
//     sleep(t);
// }