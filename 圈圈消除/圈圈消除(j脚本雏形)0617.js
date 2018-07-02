

// 快手小游戏   圈圈消除   脚本
//作者QQ203118908
//更新日期0617



//这个脚本只是雏形,并不能得高分,只能得1600分左右
auto();
//请求截图
if(!requestScreenCapture()){
    toast("请求截图失败");
    exit();
}

imgPath="/sdcard/快手小游戏截图/";
files.ensureDir(imgPath);



//左上角第一个点的中心坐标234,658
//左上角
//大=343,655              109,0             0,109
//中=308,657                73,0            0,73
//小=272,660                38,0            0,39
bigMiddleSmall=[109,73,38]
//圈圈颜色是一个列表,列表中每个元素是对象,对象有两个属性,colorName,colorValue


CircleColors=[
    {colorName:"紫色",colorValue:["#BB30FD"]},
    {colorName:"粉色",colorValue:["#FF76E8"]},
    {colorName:"蓝色",colorValue:["#00C4FE"]},
    {colorName:"绿色",colorValue:["#8BDA40"]},
    {colorName:"橙色",colorValue:["#FF9C00"]},
    {colorName:"红色",colorValue:["#F8395E"]},
    {colorName:"黄色",colorValue:["#FFFF00","#FBFE08"]}
]

NinePoints=[
    {x:235,y:656,sequenceNumber:1},{x:540,y:655,sequenceNumber:2},{x:844,y:655,sequenceNumber:3},
    {x:236,y:960,sequenceNumber:4},{x:541,y:962,sequenceNumber:5},{x:844,y:962,sequenceNumber:6},
    {x:235,y:1264,sequenceNumber:7},{x:540,y:1265,sequenceNumber:8},{x:845,y:1265,sequenceNumber:9}

]
ThreePoints=[{x:233,y:1720,sequenceNumber:1},{x:537,y:1715,sequenceNumber:2},{x:841,y:1717,sequenceNumber:3}]


//------------------------------------------------------------------------
// ------------------------------------------------------------------------
// sequenceNumber3=2
// pointCoordinate=ThreePoints[sequenceNumber3]
// firstPoint=new PointState(pointCoordinate)
// ////log("三点中的",sequenceNumber3,"号点的信息\n",firstPoint)
// exit()
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
// sequenceNumber9=7
// pointCoordinate=NinePoints[sequenceNumber9]
// firstPoint=new PointState(pointCoordinate)
// ////log("九点中的",sequenceNumber9,"号点的信息\n",firstPoint)
// exit()





//////////log("现在检测的是",num+1,"号点")
// pointCoordinate=NinePoints[num]
//////////log(pointCoordinate)
// firstPoint=new PointState(pointCoordinate)
// ////////log(firstPoint)
// custom////////log(firstPoint)
//----------------控制从这里开始------------------------------

// //输入三点中的一点,输出能放圈圈的位置列表(能放指大小合适)
// 三点格式   是一个列表   元素是对象   对象有三个属性   大圈中圈小圈
// 大圈属性值有两种,  未知   和  具体的颜色
// [ { '大圈': '未知', '中圈': '蓝色', '小圈': '未知' },
//   { '大圈': '未知', '中圈': '未知', '小圈': '粉色' },
//   { '大圈': '紫色', '中圈': '未知', '小圈': '未知' } ]

let 放置时间=101
let 放置后的间隔时间=101
sleep(1500)
let kk=0
while(1){
    kk=kk+1
    log("循环",kk,"次")
    img=captureScreen()

    //下面是输出点的信息-------------------------
    // //输出屏幕中间九点状态
    nine=ninePointState()
    // customLog39Point(nine)
    // //输出屏幕下方三点状态
    three=threePointState()
    // //log(three)
    customLog39Point(three)
    // exit()
    //---------------以上是输出点位信息----------------------
    for(let i=0;i<3;i++){

        sequenceNumber3=1

        onePointInTheThreePoint=three[sequenceNumber3]
        ////log("onePointInTheThreePoint=",onePointInTheThreePoint)
        if(onePointInTheThreePoint.大圈=="未知" && onePointInTheThreePoint.中圈=="未知" && onePointInTheThreePoint.小圈=="未知"){
            //log("三点中的",sequenceNumber3,"是空点,跳过循环.")
            continue;
        }

        ////log("可能将要操作的点的信息onePointInTheThreePoint=",onePointInTheThreePoint,"\n序号是三点中的",sequenceNumber3,"号点")

        canPut=canYouPutItHere(onePointInTheThreePoint)
        log("大小合适放置canPut=",canPut)

        if(canPut.length==0){
            //log("没有可以放置的点,跳出循环")
            break;
        }else{
            //log("有可以放置的点",canPut)
        }
        //log("可以放的位置是",canPut)
        // exit()
        // [ 1, 2, 5, 6, 7, 8 ]
        // //输入能放圈圈的位置列表,输出合适放的第一个点坐标(合适放是指颜色一样,横竖斜)
        appropriatePut=isItAppropriateToPutItHere(onePointInTheThreePoint,canPut)
        log("颜色和大小都合适放置appropriatePut=",appropriatePut)
        exit()

        if(appropriatePut.length==0){
            ////log("本次没找到圈圈适合颜色的安放位置")
            ////log("大小适合的放置位置是",canPut)
            let max=canPut.length-1
            let rndNum=r=Math.floor(Math.random()*(max+1));
            ////log("大小随机数",rndNum)

            ////log(sequenceNumber3,"将随机放到一个大小合适的位置",canPut[rndNum])
            putCircle(sequenceNumber3,canPut[rndNum])
            sleep(放置后的间隔时间)

            ////log("圈圈放置完毕,大小合适")

            break;

        }else{
            ////log("本次找到了圈圈适合颜色的安放位置")

            let max=appropriatePut.length-1
            let rndNum=r=Math.floor(Math.random()*(max+1));
            ////log("颜色随机数",rndNum)
            ////log(sequenceNumber3,"圈圈这次随机放到",appropriatePut[rndNum],"号位置")
            putCircle(sequenceNumber3,appropriatePut[rndNum])
            sleep(放置后的间隔时间)

            ////log("圈圈放置完毕,颜色合适")
            break;

        }


    }
}


function mismatch(){
    let imgSmall= images.read(imgPath+"不匹配"+".png");
    let p = findImage(captureScreen(), imgSmall,{
        region: [342,833,654,1085],
        threshold: 0.8
    });
    if(p){
        sleep(1500)
    }

}

// NinePoints=[
//     {x:235,y:656,sequenceNumber:1},{x:540,y:655,sequenceNumber:2},{x:844,y:655,sequenceNumber:3},
//     {x:236,y:960,sequenceNumber:4},{x:541,y:962,sequenceNumber:5},{x:844,y:962,sequenceNumber:6},
//     {x:235,y:1264,sequenceNumber:7},{x:540,y:1265,sequenceNumber:8},{x:845,y:1265,sequenceNumber:9}

// ]
//放置圈圈
function putCircle(sequenceNumber3,sequenceNumber9){
    // 先按住圈圈,然后拖放到,序号那个点
    ////log("放置的点位信息:\n三点坐标",sequenceNumber3,"\n九点坐标",sequenceNumber9)
    let coordinate3=ThreePoints[sequenceNumber3]
    let coordinate9=NinePoints[sequenceNumber9]
    ////log("三点",coordinate3)
    ////log("九点",coordinate9)
    let duration=放置时间
    let x1=coordinate3.x
    let y1=coordinate3.y
    let x2=coordinate9.x
    let y2=coordinate9.y
    swipe(x1, y1, x2, y2, duration)
    press(1009,471,3)
    sleep(100)
    mismatch()
}



function isItAppropriateToPutItHere(onePointInTheThreePoint, canPut) {

    log("209行isItAppropriateToPutItHere收到的参数是",onePointInTheThreePoint,canPut)
    // isItAppropriateToPutItHere收到的参数是 { '大圈': '未知', '中圈': '未知', '小圈': '绿色' } [ 0, 6 ]
    let appropriatePositionList=[]
    let 大圈颜色 = onePointInTheThreePoint.大圈
    ////log("大圈颜色是",大圈颜色)
    for (let i = 0; i < canPut.length; i++) {
        let sequenceNumberLists = otherTwo(canPut[i])
        log(canPut[i],"\n","216行isItAppropriateToPutItHere函数中sequenceNumberLists=",sequenceNumberLists)
        // 6 '\n' '216行isItAppropriateToPutItHere函数中sequenceNumberLists=' [ [ 0, 3 ], [ 7, 8 ], [ 2, 4 ] ]
        for (let k = 0; k < sequenceNumberLists; k++) {
            let result = isInArrs(大圈颜色, sequenceNumberLists[k])
            // return [true,canPut(i)];
            appropriatePositionList.push(result)
            // appropriatePositionList.push(canPut(i))
        }
    }
    // appropriatePositionList.push(canPut(i))
    log("appropriatePositionList列表内容是",appropriatePositionList)
    exit()
    ////log("大圈判断结束")
    let 中圈颜色 = onePointInTheThreePoint.中圈
    for (let i = 0; i < canPut.length; i++) {
        let sequenceNumberLists = otherTwo(canPut[i])
        for (let k = 0; k < sequenceNumberLists; k++) {
            let result = isInArrs(中圈颜色, sequenceNumberLists[k])
            // return [true,canPut(i)];
            appropriatePositionList.push(canPut(i))

        }
    }
    let 小圈颜色 = onePointInTheThreePoint.小圈
    for (let i = 0; i < canPut.length; i++) {
        let sequenceNumberLists = otherTwo(canPut[i])
        for (let k = 0; k < sequenceNumberLists; k++) {
            let result = isInArrs(小圈颜色, sequenceNumberLists[k])
            // return [true,canPut(i)];
            appropriatePositionList.push(canPut(i))

        }
    }

    return appropriatePositionList;
}


















// console.info(arr.indexOf('aa'));
function isInArrs(color,sequenceNumberList){
//同时存在于两个数组中返回true,否则返回false
    let colorArr1=colorListExtractFromSequenceNumber(sequenceNumberList[0])
    let colorArr2=colorListExtractFromSequenceNumber(sequenceNumberList[1])

    if(colorArr1.indexOf(color)==-1 || colorArr2.indexOf(color)==-1){
        return false;
    }else{
        return true;
    }
}

//从序号中提取颜色列表
function colorListExtractFromSequenceNumber(sequenceNumber){
    // nine
// [ { '大圈': '未知', '中圈': '蓝色', '小圈': '未知' },
//   { '大圈': '未知', '中圈': '未知', '小圈': '粉色' },
//   { '大圈': '紫色', '中圈': '未知', '小圈': '未知' } ]
    let info=[];
    let point=nine[sequenceNumber];
    if(point.大圈=="未知"){
    }else{
        info.push(point.大圈)
    }
    if(point.中圈=="未知"){
    }else{
        info.push(point.中圈)
    }
    if(point.小圈=="未知"){
    }else{
        info.push(point.小圈)
    }

    return info
}















// 012
// 345
// 678
function otherTwo(num){

    switch (num)
    {
    case 0:
        return [[1,2],[3,6],[4,8]]
    case 1:
        return [[0,2],[4,7]]
    case 2:
        return [[0,1],[5,8],[4,6]]
    case 3:
        return [[0,6],[4,5]]
    case 4:
        return [[1,7],[3,5],[0,8],[2,6]]
    case 5:
        return [[2,8],[3,4]]
    case 6:
        return [[0,3],[7,8],[2,4]]
    case 7:
        return [[1,4],[6,8]]
    case 8:
        return [[2,5],[0,4],[6,7]]
    default:
        toastLog("otherTwo不接受这个数,你写错了")
        alert()
    }


}



function canYouPutItHere(onePointInTheThreePoint){
    let info=[]
    for (let i = 0; i < nine.length; i++) {
        if(canYouPutItHereOne(onePointInTheThreePoint,nine[i])){
            info.push(i);
        }

    }
    return info
}

function canYouPutItHereOne(onePointInTheThreePoint,onePointInTheNinePoint){
    let  big=false
    let  middle=false
    let  small=false
    if(onePointInTheThreePoint.大圈=="未知" || onePointInTheNinePoint.大圈=="未知" ){
        big=true;
    }
    if(onePointInTheThreePoint.中圈=="未知" || onePointInTheNinePoint.中圈=="未知" ){
        middle=true;
    }
    if(onePointInTheThreePoint.小圈=="未知" || onePointInTheNinePoint.小圈=="未知" ){
        small=true;
    }
    if(big==true && middle==true && small==true){
        return true;
    }else{
        return false;
    }
}








function ninePointState(){
    let infoList=[]
    ////////log("NinePoints.length=",NinePoints.length)
    for (let i = 0; i < NinePoints.length; i++) {

        pointCoordinate=NinePoints[i]
        Point=new PointState(pointCoordinate)


        let info={"大圈":Point.bigCircleState.color,"中圈":Point.middleCircleState.color,"小圈":Point.smallCircleState.color}
        infoList.push(info)
    }
    return infoList

}
function threePointState(){
    let infoList=[]
    for (let i = 0; i < ThreePoints.length; i++) {

        pointCoordinate=ThreePoints[i]
        Point=new PointState(pointCoordinate)


        let info={"大圈":Point.bigCircleState.color,"中圈":Point.middleCircleState.color,"小圈":Point.smallCircleState.color}
        infoList.push(info)
    }
    return infoList

}


function customLog39Point(Point){
    let infos="\n"
    for (let i = 0; i < Point.length; i++) {
        infos=infos+(i+1)+"\n"
        for (var prop in Point[i])
        {
            infos+=prop + "=" + Point[i][prop] +"\n";
        }
    }

    log(infos)
}


function ShowTheObject(obj){
    var des = "";
      for(var name in obj){
      des += name + ":" + obj[name] + ";";
       }
    dump(des);
  }



function threePointState(){
    let infoList=[]
    ////////log("ThreePoints.length=",ThreePoints.length)
    for (let i = 0; i < ThreePoints.length; i++) {
        pointCoordinate=ThreePoints[i]
        Point=new PointState(pointCoordinate)

        let info= {"大圈":Point.bigCircleState.color,"中圈":Point.middleCircleState.color,"小圈":Point.smallCircleState.color}
        infoList.push(info)
    }
    return infoList

}


function customLog(Point){
    ////log("\n",Point.pointCoordinate.sequenceNumber,"\n",Point.pointCoordinate.x,",",Point.pointCoordinate.y,"\n",Point.bigCircleState.circleType,"-",Point.bigCircleState.color,"\n",Point.middleCircleState.circleType,"-",Point.middleCircleState.color,"\n",Point.smallCircleState.circleType,"-",Point.smallCircleState.color,"\n\n")

}





function PointState(pointCoordinate){
    this.pointCoordinate = pointCoordinate;
    this.bigCircleState=bigCircleState(pointCoordinate)
    this.middleCircleState=middleCircleState(pointCoordinate)
    this.smallCircleState=smallCircleState(pointCoordinate)
}



//圈圈状态
function CircleState(pointCoordinate,distanceFromTheCenterPoint){
//每个点上有大中小三个圈圈,大中小圈圈有各自的颜色

    // //////////log("CircleState传入的参数是",pointCoordinate,distanceFromTheCenterPoint)

    this.pointCoordinate = pointCoordinate;
    this.distanceFromTheCenterPoint = distanceFromTheCenterPoint;
    this.existence="未知"
    this.color="未知"


    if(bigMiddleSmall[0]==distanceFromTheCenterPoint){
        this.circleType="大圈"
    }else if(bigMiddleSmall[1]==distanceFromTheCenterPoint){
        this.circleType="中圈"
    }else if(bigMiddleSmall[2]==distanceFromTheCenterPoint){
        this.circleType="小圈"
    }else{
        //////////log("CircleState()的参数distanceFromTheCenterPoint数值不对,请检查")
        sleep(2000)
        exit()
    }


    for (let i = 0; i < CircleColors.length; i++) {

        let circleColor=CircleColors[i]["colorValue"]
        // //////////log("122行 从颜色列表中取出的点是",CircleColors[i])

        let p = isColorHereCircle(pointCoordinate,distanceFromTheCenterPoint,circleColor)

        if(p){
            this.existence="存在"
            this.color=CircleColors[i]["colorName"]
            // //////////log("这个圈圈是",this.circleType,"   颜色是",CircleColors[i])
            break;
        }else{
            // //////////log("颜色未知","和其对比的颜色是",CircleColors[i])
        }

    }

}





function bigCircleState(pointCoordinate){
//每个点上有大中小三个圈圈,大中小圈圈有各自的颜色
return new CircleState(pointCoordinate,bigMiddleSmall[0])
}
function middleCircleState(pointCoordinate){
//每个点上有大中小三个圈圈,大中小圈圈有各自的颜色
return new CircleState(pointCoordinate,bigMiddleSmall[1])
}
function smallCircleState(pointCoordinate){
//每个点上有大中小三个圈圈,大中小圈圈有各自的颜色
return new CircleState(pointCoordinate,bigMiddleSmall[2])
}

//输入一个中心点和颜色,输出布尔值,如果这个小小的区域有这个颜色,那么就是真,否则就是假
//圈圈环环的宽度假定为10



// CircleColors=[
//     {colorName:"紫色",colorValue:"#BB30FD"},
//     {colorName:"粉色",colorValue:"#FF76E8"},
//     {colorName:"蓝色",colorValue:"#00C4FE"},
//     {colorName:"绿色",colorValue:"#8BDA40"},
//     {colorName:"橙色",colorValue:"#FF9C00"},
//     {colorName:"红色",colorValue:"#F93A5F"}
// ]
function isColorHereSmall(pointCoordinate,color1){
    //////////log("isColorHereSmall接收到的参数是",pointCoordinate,color1)

    let tolerance=5
    let Threshold=6
    let Region=[
        pointCoordinate.x-tolerance, pointCoordinate.y-tolerance,2*tolerance, 2*tolerance
    ]
    //////////log("Region=",Region)
    let p=false
    for(let k=0;k<color1.length;k++){
        p=images.findColor(img, color1[k], {
            region: Region,
            threshold: Threshold
       });
       if(p){
           break
       }
    }
   //////////log("p=",p)
   color=images.pixel(img, pointCoordinate.x, pointCoordinate.y)
   pointCoordinate.color=colors.toString(color)
   ////log("是否有这个颜色",color1,"实际点位的信息",pointCoordinate)
    if (p) {
        //////////log("返回true")
        return true
    } else {
        //////////log("返回false")
    };

}

//输入   点位   圈圈的半径
//输出      这个半径对应的圆环是否是已知的颜色
function isColorHereCircle(pointCoordinate,radius,color){
    // //////////log("*********************上*****************************88")
    // //////////log("184行isColorHereCircle传入的参数是",pointCoordinate,radius,color)
    let angle=45
    let radian=2*Math.PI/360*angle
    let rightPoint={
        x:Math.round(pointCoordinate.x+Math.abs(Math.cos(radian)*radius)),
        y:Math.round(pointCoordinate.y-Math.abs(Math.sin(radian)*radius))
    }
    radian=2*Math.PI/360*(180-angle)
    let leftPoint={
        x:Math.round(pointCoordinate.x-Math.abs(Math.cos(radian)*radius)),
        y:Math.round(pointCoordinate.y-Math.abs(Math.sin(radian)*radius))
    }
    // //////////log("leftPoint=",leftPoint)
    let circleType="未知"
    if(bigMiddleSmall[0]==radius){
        circleType="大圈"
    }else if(bigMiddleSmall[1]==radius){
        circleType="中圈"
    }else if(bigMiddleSmall[2]==radius){
        circleType="小圈"
    }else{
        // //////////log("CircleState()的参数distanceFromTheCenterPoint数值不对,请检查")
        sleep(2000)
        exit()
    }

    // //////////log(circleType,"isColorHereCircle检测的左点是",leftPoint,"实际检测的左点是",isColorHereSmall(leftPoint,color),"检测的右点是",rightPoint,"实际检测的右点是",isColorHereSmall(rightPoint,color))


    if(isColorHereSmall(leftPoint,color) && isColorHereSmall(rightPoint,color)){
        return true
    }else{
        return false
    }
    // //////////log("***********************下***************************88")

}







