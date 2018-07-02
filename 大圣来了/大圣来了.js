auto();
sleep(300)
device.setNotificationVolume(1)
sleep(300)
device.setAlarmVolume(1)

//请求截图
if(!requestScreenCapture()){
    toast("请求截图失败");
    exit();
}

imgPath="/sdcard/快手小游戏截图/";
files.ensureDir(imgPath);

daShengLaiLe()

function daShengLaiLe(){



    imgMonkey = captureScreen();
    let monkey=monkeyGetPositon()
    log("monkey=",monkey)
    if(monkey){
        let pillar=pillarGetPositon(monkey)
        log("pillar=",pillar)
        if(pillar){
            let dis=pillar-monkey.x
            jump(dis)
            sleep(2500)

        }
    }


}
function jump(distance){
    log("jump收到的参数distance=",distance)
    let tolerance=0.673
    let t=distance*tolerance
    press(500,500,t);
}


function monkeyGetPositon(){
    let position=false
    //屏幕中间,返回小猪身体中心
    let 猴子的寻找区域=[40,1201,225,1261]
    let objectName="大圣左眼睛"
    let imgSmall= images.read(imgPath+objectName+".png");
    let p = findImage(imgMonkey, imgSmall, {
    region: [猴子的寻找区域[0], 猴子的寻找区域[1], 猴子的寻找区域[2]-猴子的寻找区域[0], 猴子的寻找区域[3]-猴子的寻找区域[1]],
    threshold: 0.9
    });

    // //猴子的眼睛
    // 128,1233
    // //柱子
    // 163,1338


    if(p){
        log("\n找到了",objectName,"它的坐标是",p)
        position={x:p.x,y:p.y+111}
    }else{
        log("\n没找到",objectName);
    }
    return position
}


function pillarGetPositon(monkey){
    log("调用78行pillarGetPositon")



    let position=false
    //屏幕中间,返回小猪身体中心
    let 柱子的寻找区域=[monkey.x+100,monkey.y,monkey.x+810,monkey.y+10]
    log("柱子的寻找区域=",柱子的寻找区域)
    let objectName="柱子"
    let colorList=[]
    for(let i=0;i<6;i++){
        let color=images.pixel(imgMonkey, monkey.x, monkey.y-i)
        colorList.push(color)
    }
    log(colorList)
    let p=false
    let pList=[]
    for(let i=0;i<colorList.length;i++){
        p = images.findColor(imgMonkey, colorList[i], {
            region: [柱子的寻找区域[0], 柱子的寻找区域[1], 柱子的寻找区域[2]-柱子的寻找区域[0], 柱子的寻找区域[3]-柱子的寻找区域[1]],
            threshold: 0.8
        });
        if(p){
            pList.push(p.x)
        }
    }
    // log("100行pList=",pList)
    if(p==false){
        log("103行没找到柱子")
        return position;
    }else{
        if(pList.length==0){
            log("pList是一个空列表")
            return;
        }
        log("109行pList=",pList)
        p=Math.min.apply(null, pList)
        log("111行p=",p)
        //在坐标里面找最左值
        //如果有黄色手指,那么返回黄色手指的坐标,黄色手指下面是红色
        //439,1305,759,1347
        let redPoint=redPointGetPositon()
        if(redPoint){
            p=redPoint
        }
    }
    log("p=",p)


    // log([柱子的寻找区域[0], 柱子的寻找区域[1], 柱子的寻找区域[2]-柱子的寻找区域[0], 柱子的寻找区域[3]-柱子的寻找区域[1]])


    if(p){
        log("\n找到了",objectName,"它的坐标是",p)
        position=p
    }else{
        log("\n没找到",objectName);
        return position
    }
    log("pillarGetPositon(monkey)返回的结果是",position)
    return position+100
}



function redPointGetPositon(){
    let line=[245,1075,850,1075]
    // 667,1075
    // 686,1075
    //至少15个是黄色的点
    let yellow="#FDF339"
    let objectName="拈花指"

    let position=false
    // imgMonkey
    let sameColor=[]
    for(let k=0;k<line[2]-line[0];k++){
        // log("比较的点的坐标=",line[0]+k, line[1])
        let color=images.pixel(imgMonkey, line[0]+k, line[1])
        color=colors.toString(color)
        // log(yellow, color)
        let result=colors.isSimilar(yellow, color)
        if(result){
            sameColor.push([line[0]+k])
        }
    }
    if(sameColor.length<10){
        log("\n没找到",objectName);
        return position
    }else{
        let minP=Math.min.apply(null, sameColor)
        let maxP=Math.max.apply(null, sameColor)
        removeByValue(sameColor,minP)
        removeByValue(sameColor,maxP)
        minP=Math.min.apply(null, sameColor)
        maxP=Math.max.apply(null, sameColor)
        removeByValue(sameColor,minP)
        removeByValue(sameColor,maxP)
        minP=Math.min.apply(null, sameColor)
        maxP=Math.max.apply(null, sameColor)
        position=Math.round((maxP-minP)/2)+minP
        log("\n找到了",objectName,"它的坐标是",position)
        return position
    }
}


function removeByValue(arr, val) {
    for(var i=0; i<arr.length; i++) {
      if(arr[i] == val) {
        arr.splice(i, 1);
        break;
      }
    }
  }
