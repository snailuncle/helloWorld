//        git         消除空行           ^[ \t]*\n
"auto";
openConsole();
// var ra = null;
var t = 25;
var ra = new RootAutomator();
events.on('exit', function () {
    if (ra) {
        ra.exit();
    }
});
//-------------函数自定义开始-------------------------------------------------------------------
function UiObjectLongPress(UiObiect, duration) {
    var Min = 2,
        Max = 20;
    let x = UiObiect.bounds().centerX() + GetRandomNum(Min, Max);
    let y = UiObiect.bounds().centerY() + GetRandomNum(Min, Max);
    shell(util.format("input swipe %d %d %d %d %d", x, y, x, y, duration), true);
}
function GetRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}
function slideUp() {
    print("开始向上滑");
    var Min = 20,
        Max = 50;
    var X1 = parseInt(deviceWidth / 2) + GetRandomNum(Min, Max),
        Y1 = parseInt(deviceHeight / 8 * 6) + GetRandomNum(Min, Max),
        X2 = parseInt(deviceWidth / 3 * 2) + GetRandomNum(Min, Max),
        Y2 = parseInt(deviceHeight / 8 * 5) + GetRandomNum(Min, Max);
    // print(GetRandomNum(Min, Max));
    // print(GetRandomNum(Min, Max));
    // print(GetRandomNum(Min, Max));
    // print(GetRandomNum(Min, Max));
    print(X1, Y1, X2, Y2);
    shell(util.format("input swipe %d %d %d %d %d", X1, Y1, X2, Y2, GetRandomNum(Min, Max) * 3), true);
    print("结束向上滑");
}
function clickScreenMiddle() {
    print("开始点击屏幕中心");
    var Min = 5,
        Max = 50;
    var X1 = parseInt(deviceWidth / 2) + GetRandomNum(Min, Max),
        Y1 = parseInt(deviceHeight / 2) + GetRandomNum(Min, Max),
        X2 = X1
    Y2 = Y1
    print(X1, Y1, X2, Y2);
    shell(util.format("input swipe %d %d %d %d %d", X1, Y1, X2, Y2, GetRandomNum(Min, Max) * 2), true);
    print("结束点击屏幕中心");
}
function pageHasAdvertisement() {
    var quTouTiaoFindRangeX1 = 0,
        quTouTiaoFindRangeY1 = parseInt(deviceHeight / 6),
        quTouTiaoFindRangeX2 = parseInt(deviceWidth),
        quTouTiaoFindRangeY2 = parseInt(deviceHeight / 10 * 8);
    print("广告查找范围", quTouTiaoFindRangeX1, quTouTiaoFindRangeY1, quTouTiaoFindRangeX2, quTouTiaoFindRangeY2);
    var quTouTiaoTitle = boundsInside(quTouTiaoFindRangeX1, quTouTiaoFindRangeY1, quTouTiaoFindRangeX2, quTouTiaoFindRangeY2).packageName("com.jifen.qukan").text("广告").find();
    if (quTouTiaoTitle.empty()) {
        print("没找到===广告╭(╯^╰)╮");
        return false;
    } else {
        print("找到啦===广告");
        print("找到", quTouTiaoTitle.size(), "个");
        // 点击头条返回主页
        // UiObjectLongPress(quTouTiaoTitle.get(0), 30);
        // print("已经点击广告");
        return true;
    }
}
function browseNews() {
    print("开始浏览新闻");
    var fulltextUnfold = false
    // id("and_img_star").waitFor();
    var date1 = new Date(); //开始时间
    var date2 = new Date(); //结束时间
    var date3 = date2.getTime() - date1.getTime() //时间差的毫秒数
    var quTouTiaoFindRangeX1 = 0,
        quTouTiaoFindRangeY1 = 0,
        quTouTiaoFindRangeX2 = parseInt(deviceWidth),
        quTouTiaoFindRangeY2 = parseInt(deviceHeight / 2);
    print("视频查找范围", quTouTiaoFindRangeX1, quTouTiaoFindRangeY1, quTouTiaoFindRangeX2, quTouTiaoFindRangeY2);
    var quTouTiaoTitle = boundsInside(quTouTiaoFindRangeX1, quTouTiaoFindRangeY1, quTouTiaoFindRangeX2, quTouTiaoFindRangeY2).packageName("com.jifen.qukan").className("android.widget.FrameLayout").id("video_view_container").find();
    if (quTouTiaoTitle.empty()) {
        print("没找到===视频╭(╯^╰)╮");
        while (true) {
            slideUp();
            sleep(2000);
            if (desc("展开查看全文 ▾").find().empty()) {} else {
                desc("展开查看全文 ▾").click();
            }
            date2 = new Date(); //结束时间
            date3 = date2.getTime() - date1.getTime();
            if (date3 > t * 1000) {
                break;
            }
        }
    } else {
        print("找到啦===视频");
        print("找到", quTouTiaoTitle.size(), "个");
        // 点击头条返回主页
        // UiObjectLongPress(quTouTiaoTitle.get(0), 30);
        // print("已经点击广告");
        sleep((t + 10) * 1000);
    }
    print("结束浏览新闻");
    back();
    sleep(2000);
}
//-------------函数自定义结束-------------------------------------------------------------------
//打开趣头条
//返回主页,头顶有趣头条三个字
launchApp("趣头条");
sleep(1000);
//获取屏幕宽度高度
var deviceWidth = device.width,
    deviceHeight = device.height
print("宽", deviceWidth, "高", deviceHeight);
while (true) {
    var quTouTiaoFindRangeX1 = parseInt(deviceWidth / 3),
        quTouTiaoFindRangeY1 = 0,
        quTouTiaoFindRangeX2 = parseInt(deviceWidth / 3 * 2),
        quTouTiaoFindRangeY2 = parseInt(deviceHeight / 10);
    print("查找范围", quTouTiaoFindRangeX1, quTouTiaoFindRangeY1, quTouTiaoFindRangeX2, quTouTiaoFindRangeY2);
    var quTouTiaoTitle = boundsInside(quTouTiaoFindRangeX1, quTouTiaoFindRangeY1, quTouTiaoFindRangeX2, quTouTiaoFindRangeY2).packageName("com.jifen.qukan").className("android.widget.ImageView").id("imageView").find();
    if (quTouTiaoTitle.empty()) {
        print("没找到===头顶的趣头条╭(╯^╰)╮");
        //横三分之一,竖十分之一
        var quTouTiaoFindRangeX1 = 0,
            quTouTiaoFindRangeY1 = parseInt(deviceHeight / 10 * 9),
            quTouTiaoFindRangeX2 = parseInt(deviceWidth / 3),
            quTouTiaoFindRangeY2 = parseInt(deviceHeight);
        print("查找范围", quTouTiaoFindRangeX1, quTouTiaoFindRangeY1, quTouTiaoFindRangeX2, quTouTiaoFindRangeY2);
        var quTouTiaoTitle = boundsInside(quTouTiaoFindRangeX1, quTouTiaoFindRangeY1, quTouTiaoFindRangeX2, quTouTiaoFindRangeY2).packageName("com.jifen.qukan").className("android.widget.RelativeLayout").find();
        if (quTouTiaoTitle.empty()) {
            print("没找到===左下角头条╭(╯^╰)╮");
        } else {
            print("找到啦===左下角头条");
            print("找到", quTouTiaoTitle.size(), "个");
            // 点击头条返回主页
            UiObjectLongPress(quTouTiaoTitle.get(0), 30);
            print("已经点击左下角的刷新按钮");
        }
    } else {
        print("找到啦===头顶的趣头条");
        print("找到", quTouTiaoTitle.size(), "个")
    }
    slideUp();
    slideUp();
    sleep(500);
    while (pageHasAdvertisement()) {
        slideUp();
        sleep(500);
    }
    clickScreenMiddle();
    sleep(2000);
    browseNews();
}