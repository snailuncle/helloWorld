



function manhattanDistanceGrid(result){
  var compareObj = function (prop) {
    return function (obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop];
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
            val1 = Number(val1);
            val2 = Number(val2);
        }
        if (val1 > val2) {
            return -1;
        } else if (val1 < val2) {
            return 1;
        } else {
            return 0;
        }
    }
  }

  let resultWithPositon=[]
  for(let i=0;i<16;i++){
    let serialNumber=i
    let value=result[i]
    resultWithPositon.push({serialNumber:serialNumber,value:value})
  }
  log("\n",resultWithPositon)

  resultWithPositon.sort(compareObj("value"))
  let manhattanDistance=0
  for(let i=0;i<6;i++){
    manhattanDistance=manhattanDistance+manhattanDistanceP(resultWithPositon[i])*(i+1)
    log("manhattanDistance=",manhattanDistance)

  }
  return manhattanDistance

}


function manhattanDistanceP(p2){
  log("63行manhattanDistanceP的参数p2=",p2)
  if(p2.value==0){
    return 0
  }
// |x1-x2|+|y1-y2|
  let p1=12
  let x1=3
  let y1=0
  let x2=Math.floor(p2.serialNumber/4)
  let y2=p2.serialNumber%4
  log("x1=",x1,"y1=",y1,"x2=",x2,"y2=",y2)
  let distance=Math.abs(x1-x2)+Math.abs(y1-y2)
  log("71行distance=",distance)
  return distance
}
function manhattanDistanceP1P2(p1,p2){
// |x1-x2|+|y1-y2|
  let x1=Math.floor(p1.serialNumber/4)
  let y1=p1.serialNumber%4
  let x2=Math.floor(p2.serialNumber/4)
  let y2=p2.serialNumber%4
  let distance=Math.abs(x1-x2)+Math.abs(y1-y2)
  return distance
}

