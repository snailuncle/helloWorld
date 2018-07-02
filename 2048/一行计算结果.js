gridNumsCurrent=[
  0,0,4,2,
  0,2,4,2,
  4,2,16,4,
  0,4,16,4,
              ]
gridsNumLog(gridNumsCurrent)

// exit()

result=swipeUp(gridNumsCurrent)
// log("result=",result)
log(result)


function swipeUp(){


  let gridColumns1=mergeNumsUp(gridColumns[0])
  let gridColumns2=mergeNumsUp(gridColumns[1])
  let gridColumns3=mergeNumsUp(gridColumns[2])
  let gridColumns4=mergeNumsUp(gridColumns[3])


  let result=[]
  for(let i=0;i<4;i++){
  result.push(gridColumns1[i])
  result.push(gridColumns2[i])
  result.push(gridColumns3[i])
  result.push(gridColumns4[i])
  }


  return Math.max.apply(null,result)
}
function swipeDown(gridNumsCurrent){


  let gridColumns1=mergeNumsDown(gridColumns[0])
  let gridColumns2=mergeNumsDown(gridColumns[1])
  let gridColumns3=mergeNumsDown(gridColumns[2])
  let gridColumns4=mergeNumsDown(gridColumns[3])

  let result=[]
  for(let i=0;i<4;i++){
  result.push(gridColumns1[i])
  result.push(gridColumns2[i])
  result.push(gridColumns3[i])
  result.push(gridColumns4[i])
  }


  return Math.max.apply(null,result)

}

function swipeLeft(gridNumsCurrent){


  let gridRows1=mergeNumsLeft(gridRows[0])
  let gridRows2=mergeNumsLeft(gridRows[1])
  let gridRows3=mergeNumsLeft(gridRows[2])
  let gridRows4=mergeNumsLeft(gridRows[3])

  let result=[].concat(gridRows1,gridRows2,gridRows3,gridRows4)
  return Math.max.apply(null,result)

}
function swipeRight(gridNumsCurrent){

  let gridRows1=mergeNumsRight(gridRows[0])
  let gridRows2=mergeNumsRight(gridRows[1])
  let gridRows3=mergeNumsRight(gridRows[2])
  let gridRows4=mergeNumsRight(gridRows[3])

  let result=[].concat(gridRows1,gridRows2,gridRows3,gridRows4)
  return Math.max.apply(null,result)

}


function mergeNumsLeft(nums){

  //判断有几位有效数字
  let count=0
  for(var i=0;i<4;i++){
    if(nums[i]!=0){
      count++;
    }
  }
  // log("有"+count+"位有效数字")
  switch(count)
  {
    case 0:
      numMerge=[0,0,0,0]
      break;
    case 1:
      for(var i=0;i<4;i++){
        if(nums[i]!=0){
          numMerge=[nums[i],0,0,0]
          break;
        }
      }
      break;
    case 2:
      numMerge=[]
      for(var i=0;i<4;i++){
        if(nums[i]!=0){
          numMerge.push(nums[i])
        }
        if(numMerge.length==2){
          break;
        }
      }
      if(numMerge[0]==numMerge[1]){
        numMerge=[numMerge[0]*2,0,0,0]
      }else{
        numMerge=[numMerge[0],numMerge[1],0,0]
      }
      break;
    case 3:
      numMerge=[]
      for(var i=0;i<4;i++){
        if(nums[i]==0){
          nums.splice(i,1);
          break;
        }
      }

      if(nums[0]==nums[1]){
        // log("case 3 nums[0]==nums[1]=",nums[0])
        numMerge=[nums[0]*2,nums[2],0,0]
        // log(numMerge)
      }else if(nums[1]==nums[2]){
        numMerge=[nums[0],nums[1]*2,0,0]
      }else{
        numMerge=[nums[0],nums[1],nums[2],0]
      }
      break;
    case 4:
      if(nums[0]==nums[1]){
        if(nums[2]==nums[3]){
          numMerge=[nums[0]*2,nums[2]*2,0,0]
        }else{
          numMerge=[nums[0]*2,nums[2],nums[3],0]
        }
      }else if(nums[2]==nums[1]){
        numMerge=[nums[0],nums[1]*2,nums[3],0]
      }else{
        if(nums[2]==nums[3]){
          numMerge=[nums[0],nums[1],nums[2]*2]
        }else{
          numMerge=nums
        }
      }
      break;
    default:
      log("有效数字个数错误,必须是0,1,2,3,4的其中一种")
  }
  return numMerge;
}

function mergeNumsRight(nums){

  //判断有几位有效数字
  let count=0
  for(var i=0;i<4;i++){
    if(nums[i]!=0){
      count++;
    }
  }
  // log("有"+count+"位有效数字")
  switch(count)
  {
    case 0:
      numMerge=[0,0,0,0]
      break;
    case 1:
      for(var i=0;i<4;i++){
        if(nums[i]!=0){
          numMerge=[0,0,0,nums[i]]
          break;
        }
      }
      break;
    case 2:
      numMerge=[]
      for(var i=0;i<4;i++){
        if(nums[i]!=0){
          numMerge.push(nums[i])
        }
        if(numMerge.length==2){
          break;
        }
      }
      if(numMerge[0]==numMerge[1]){
        numMerge=[0,0,0,numMerge[0]*2]
      }else{
        numMerge=[0,0,numMerge[0],numMerge[1]]
      }
      break;
    case 3:
      numMerge=[]
      for(var i=0;i<4;i++){
        if(nums[i]==0){
          nums.splice(i,1);
          break;
        }
      }

      if(nums[2]==nums[1]){
        // log("case 3 nums[0]==nums[1]=",nums[0])
        numMerge=[0,0,nums[0],nums[2]*2]
        // log(numMerge)
      }else if(nums[1]==nums[0]){
        numMerge=[0,0,nums[0]*2,nums[2]]
      }else{
        numMerge=[0,nums[0],nums[1],nums[2]]
      }
      break;
    case 4:
      if(nums[2]==nums[3]){
        if(nums[0]==nums[1]){
          numMerge=[0,0,nums[0]*2,nums[2]*2]
        }else{
          numMerge=[0,nums[0],nums[1],nums[3]*2]
        }
      }else if(nums[2]==nums[1]){
        numMerge=[0,nums[0],nums[1]*2,nums[3]]
      }else{
        if(nums[0]==nums[1]){
          numMerge=[0,nums[0]*2,nums[1],nums[2]]
        }else{
          numMerge=nums
        }
      }
      break;
    default:
      log("有效数字个数错误,必须是0,1,2,3,4的其中一种")
  }
  return numMerge;
}

function mergeNumsUp(nums){
  return mergeNumsLeft(nums)
}
function mergeNumsDown(nums){
  return mergeNumsRight(nums)
}















