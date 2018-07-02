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


let cycleTimes=100000
for(let k=0;k<cycleTimes;k++){
    img = captureScreen();
    let pig=pigGetPositon()
    let road=roadGetPositon()
    log("\n\npig=",pig,"\nroad=",road)

    //没有障碍物,小猪保持在中间
    //有障碍物,判断高度,确定点不点.

    if(road.top==false || road.bottom==false){
        if(pig){
            if(pig-900>0){
                jump(pig-900);
            }
        }

    }else{
        let dis=road.bottom-road.top
        jump(pig-900);
    }
}

function jump(distance){
    //小猪跳一次的高度
    let height=208
    let n=Math.ceil(distance/208)
    for(let i=0;i<n;i++){
        press(500,500,1);
    }


}



function isPigInRoad(pig,road){
    let tolerance=150
    //坐标统一选取小猪的中心和路的中心
    let pigPosition=pig.position
    // region格式   左上角  右下角  x1,y1,x2,y2
    let roadPosition=road.position
    //小猪的中心和路的中心不超过某个阈值,就表示小猪没有碰到障碍物
    if(Math.abs(pigPosition-roadPosition)<tolerance){
        //小猪在路中间,碰不到障碍物
        return true;
    }else{
        return false;
    }
}







function pigGetPositon(){
    let position=false
    //屏幕中间,返回小猪身体中心
    let 飞猪小奇的寻找区域=[527,242,528,1796]
    let objectName="小猪中间的皮肤"
    let imgSmall= images.read(imgPath+objectName+".png");


    let p = images.findColor(img, "#53C5FE", {
        region: [飞猪小奇的寻找区域[0], 飞猪小奇的寻找区域[1], 飞猪小奇的寻找区域[2]-飞猪小奇的寻找区域[0], 飞猪小奇的寻找区域[3]-飞猪小奇的寻找区域[1]],
        threshold: 0.9
   });


    if(p){
        log("\n找到了",objectName,"它的坐标是",p)
        position=p.y+14
        log(position)
    }else{
        log("\n没找到",objectName);
    }
    return position
}

function roadGetPositon(){
    //获取路的区间
    let roadTop=false
    let roadBottom=false
    let 障碍物的寻找区域=[406,291,945,1634]
    let objectNameTop="上障碍物"
    let objectNameBottom="下障碍物"
    let imgSmallTop= images.read(imgPath+objectNameTop+".png");
    let imgSmallBottom= images.read(imgPath+objectNameBottom+".png");


    let p=false
    p = findImage(img, imgSmallTop, {
        region: [障碍物的寻找区域[0], 障碍物的寻找区域[1], 障碍物的寻找区域[2]-障碍物的寻找区域[0], 障碍物的寻找区域[3]-障碍物的寻找区域[1]],
        threshold: 0.9
    });
    if(p){
        log("\n找到了",objectNameTop,"它的坐标是",p)
        roadTop=p.y+70
    }else{
        log("\n没找到",objectNameTop);
    }
    p = findImage(img, imgSmallBottom, {
        region: [障碍物的寻找区域[0], 障碍物的寻找区域[1], 障碍物的寻找区域[2]-障碍物的寻找区域[0], 障碍物的寻找区域[3]-障碍物的寻找区域[1]],
        threshold: 0.9
    });
    if(p){
        log("\n找到了",objectNameBottom,"它的坐标是",p)
        roadBottom=p.y-75
    }else{
        log("\n没找到",objectNameBottom);
    }
    return {top:roadTop,bottom:roadBottom}
}
