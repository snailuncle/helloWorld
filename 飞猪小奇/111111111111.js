p = findImage(img, imgSmallTop, {
    region: [障碍物的寻找区域[0], 障碍物的寻找区域[1], 障碍物的寻找区域[2]-障碍物的寻找区域[0], 障碍物的寻找区域[3]-障碍物的寻找区域[1]],
    threshold: 0.9
});
if(p){
    log("找到了",objectNameBottom,"它的坐标是",p)
}else{
    log("没找到",objectNameBottom);
}
