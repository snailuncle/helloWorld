gridNumsCurrent=[
  4,2,4,2,
  2,64,8,32,
  16,32,16,4,
  2,8,4,2,
              ]

let gridRows=new Array()
gridRows[0]=[gridNumsCurrent[0],gridNumsCurrent[1],gridNumsCurrent[2],gridNumsCurrent[3]]
gridRows[1]=[gridNumsCurrent[4],gridNumsCurrent[5],gridNumsCurrent[6],gridNumsCurrent[7]]
gridRows[2]=[gridNumsCurrent[8],gridNumsCurrent[9],gridNumsCurrent[10],gridNumsCurrent[11]]
gridRows[3]=[gridNumsCurrent[12],gridNumsCurrent[13],gridNumsCurrent[14],gridNumsCurrent[15]]

let gridColumns=new Array()
gridColumns[0]=[gridNumsCurrent[0],gridNumsCurrent[4],gridNumsCurrent[8],gridNumsCurrent[12]]
gridColumns[1]=[gridNumsCurrent[1],gridNumsCurrent[5],gridNumsCurrent[9],gridNumsCurrent[13]]
gridColumns[2]=[gridNumsCurrent[2],gridNumsCurrent[6],gridNumsCurrent[10],gridNumsCurrent[14]]
gridColumns[3]=[gridNumsCurrent[3],gridNumsCurrent[7],gridNumsCurrent[11],gridNumsCurrent[15]]


//可以滑动的方向
//需要满足两个条件之一
//第一种 在滑动的方向上有相同的紧挨着的数字
//第二种 在滑动的方向上存在数字,并且数字的滑动方向有空格
result=directionCanSwipe()
log(result)

function directionCanSwipe(){
  let direction=[]
  if(canSwipeUp()){
    direction.push('up')
  }
  if(canSwipeDown()){
    direction.push('down')
  }
  if(canSwipeLeft()){
    direction.push('left')
  }
  if(canSwipeRight()){
    direction.push('Right')
  }
  return direction
}




function canSwipeUp(){
  if(hasSpace(gridNumsCurrent,"up")){
    return true;
  }
  for(var i=0;i<4;i++){
    if(hasSameNum(gridColumns[i])){
      return true;
    }
  }
  return false
}
function canSwipeDown(){
  if(hasSpace(gridNumsCurrent,"down")){
    return true;
  }
  for(var i=0;i<4;i++){
    if(hasSameNum(gridColumns[i])){
      return true;
    }
  }
  return false
}
function canSwipeLeft(){
  if(hasSpace(gridNumsCurrent,"Left")){
    return true;
  }
  for(var i=0;i<4;i++){
    if(hasSameNum(gridRows[i])){
      return true;
    }
  }
  return false
}
function canSwipeRight(){
  if(hasSpace(gridNumsCurrent,"Right")){
    return true;
  }
  for(var i=0;i<4;i++){
    if(hasSameNum(gridRows[i])){
      return true;
    }
  }
  return false
}


//第一种 在滑动的方向上有相同的紧挨着的数字
function hasSameNum(numArr){
  let count=0
  let nums=[]
  for(var i=0;i<4;i++){
    if(numArr[i]!=0){
      nums.push(numArr[i])
      count++;
    }
  }
  let numCase=numArr.length
  switch(count)
  {
    case 0:
      return false;
      break;
    case 1:
      return false;
      break;
    case 2:
      if(nums[0]==nums[1]){
        return true;
      }else{
        return false;
      }
      break;
    case 3:
      if(nums[0]==nums[1] || nums[1]==nums[2]){
        return true;
      }else{
        return false;
      }
      break;
    case 4:
      if(nums[0]==nums[1] || nums[1]==nums[2] || nums[2]==nums[3]){
        return true;
      }else{
        return false;
      }
      break;
    default:
      return false;
  }
}


//第二种 在滑动的方向上存在数字,并且数字的滑动方向有空格
function hasSpace(gridNumsCurrent,direction){
  let zeros=[]
  let count=0
  for(let i=0;i<16;i++){
    if(gridNumsCurrent[i]==0){
      zeros.push(i)
      count++;
    }
  }
  if(count==0){
    return false;
  }

  switch(direction)
  {
    case "up":
      for(let i=0;i<count;i++){
        for(let k=0;k<3;k++){

          if(zeros[i]+4*k<16 && gridNumsCurrent[zeros[i]+4*k]!=0){
            return true;
          }
        }
      }
      return false;
      break;
    case "down":
      for(let i=0;i<count;i++){
        for(let k=0;k<3;k++){

          if(zeros[i]-4*k<16 && gridNumsCurrent[zeros[i]-4*k]!=0){
            return true;
          }
        }
      }
      return false;

      break;
    case "left":
      for(let i=0;i<count;i++){
        for(let k=0;k<3;k++){

          if(zeros[i]-1-k>=0 && gridNumsCurrent[zeros[i]-1-k]!=0){
            return true;
          }
        }
      }
      return false;

      break;
    case "right":
      for(let i=0;i<count;i++){
        for(let k=0;k<3;k++){

          if(zeros[i]+1+k<16 && gridNumsCurrent[zeros[i]+1+k]!=0){
            return true;
          }
        }
      }
      return false;

      break;
    default:
      return false;
  }
}

