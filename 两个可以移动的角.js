//脚本目的:截图
//首先需要两个角
//需要一个截图按钮
//需要上下左右
//需要退出
requestScreenCapture()

左上角坐标 = [200, 300]
右下角坐标 = [400, 500]
files.ensureDir("/sdcard/js截图/")
// 控制台()
左上角()
右下角()
sleep(333334333)

// 首先需要两个角
//左上角
function 左上角() {
    w1 = floaty.rawWindow(
        <frame id="左上角" margin="0" padding="0" gravity="right|bottom" bg="#0000ff">
          <vertical gravity="left|top" >
            <text w="150" h="6" bg="#ffff0000"></text>
            <text w="6" h="150" bg="#ffff0000"></text>
          </vertical>
        </frame>
    );
    w1.setTouchable(true);
    w1.setPosition(左上角坐标[0], 左上角坐标[1])
    log("左上角坐标",左上角坐标[0], 左上角坐标[1])
    sleep(100)
    //角需要调整位置
    //设置一个监听事件

    w1.左上角.setOnTouchListener(function(view, event) {
        log("w1.左上角.setOnTouchListener")
        log(view)
        log(event)
        //移动角需要确定把角移动到哪里,只需要一个坐标
        //这个坐标是按下时候的坐标和移动之后的坐标差
        //再加上view本身的坐标
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                log("case event.ACTION_DOWN:")

                x = event.getRawX();//触摸点距离屏幕的绝对坐标
                y = event.getRawY();
                log(x,y)
                aw = w1.getWidth();//返回悬浮窗宽度。
                ah = w1.getHeight();
                log(aw,ah)
                windowX = w1.getX();//悬浮窗左上角距离屏幕的绝对坐标
                windowY = w1.getY();
                log(windowX,windowY)
                downTime = new Date().getTime();
            case event.ACTION_MOVE:
                log("case event.ACTION_MOVE:")

                //移动手指时调整悬浮窗位置
                //悬浮窗原本的左上角坐标+(现在的触摸点坐标-一开始按下的触摸点坐标)
                左上角坐标[0] = windowX +(event.getRawX() - x)
                左上角坐标[1] = windowY+(event.getRawY() - y)
                w1.setPosition(windowX + (event.getRawX() - x),
                               windowY + (event.getRawY() - y))
            case event.ACTION_UP:
        }
        return true;
    })

}






// 右下角
function 右下角() {
    w2 = floaty.rawWindow(
        <frame id="右下角" margin="0" padding="0" gravity="right|bottom" bg="#00ff00">
          <vertical gravity="right|bottom" >
            <text w="6" h="150" bg="#ffff0000"></text>
            <text w="150" h="6" bg="#ffff0000"></text>
          </vertical>
        </frame>
    );
    w2.setPosition(右下角坐标[0], 右下角坐标[1])
    log("右下角坐标",右下角坐标[0], 右下角坐标[1])
    sleep(100)

    w2.右下角.setOnTouchListener(function(view, event) {
        log("w2.右下角.setOnTouchListener")
        log(view)
        log(event)
        //移动角需要确定把角移动到哪里,只需要一个坐标
        //这个坐标是按下时候的坐标和移动之后的坐标差
        //再加上view本身的坐标
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                log("case event.ACTION_DOWN:")

                x = event.getRawX();//触摸点距离屏幕的绝对坐标
                y = event.getRawY();
                log(x,y)
                aw = w2.getWidth();//返回悬浮窗宽度。
                ah = w2.getHeight();
                log(aw,ah)
                windowX = w2.getX();//悬浮窗右下角距离屏幕的绝对坐标
                windowY = w2.getY();
                log(windowX,windowY)
                downTime = new Date().getTime();
            case event.ACTION_MOVE:
                log("case event.ACTION_MOVE:")

                //移动手指时调整悬浮窗位置
                //悬浮窗原本的右下角坐标+(现在的触摸点坐标-一开始按下的触摸点坐标)
                右下角坐标[0] = windowX +(event.getRawX() - x)
                右下角坐标[1] = windowY+(event.getRawY() - y)
                w2.setPosition(windowX + (event.getRawX() - x),
                               windowY + (event.getRawY() - y))
            case event.ACTION_UP:
        }
        return true;
    })

}

//截图按钮
