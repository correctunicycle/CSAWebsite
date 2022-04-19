




var dataDependencyCallCounter = 0
function checkForDataDependencies(PP, RowNumber){
    var DataDependencyArray = []
    dataDependencyCallCounter++
    console.table(bigArray)
    ////////console.log('data dependency function called')
    ////////console.log('pp is'+PP)
    ////////console.log('row number is '+RowNumber)
    if(PP < 1 || RowNumber == 0){
        ////////console.log('data dependency function returning 0')
        return 0
    }
    else {
    ////////console.log('running else condition')
    var variablesArray = [bigArray[RowNumber][3],bigArray[RowNumber][5]]
    //console.log('variable array for instruction '+ RowNumber + ' :' +variablesArray)
    for(let why = 0;why<=RowNumber;why++){
        for(let y = 0;y<=1;y++){
            ////////console.log('value of row number in for loop is '+why+' testing with variable number '+ y)
            if(bigArray[why][1] == variablesArray[y] || bigArray[why][1] == variablesArray[y]  +',' || bigArray[why][1] +',' == variablesArray[y]){
                DataDependencyArray.push(why)
                //console.log('data dependency found between instruction '+why+':'+bigArray[why][1]+'instruction '+RowNumber+ variablesArray[y])
            }
        }
    }
            if(DataDependencyArray.length != 0 ){
            for(let ddIndex = 0 ;ddIndex<DataDependencyArray.length;ddIndex++){
                console.log('checking dd indexe: '+ddIndex)
                if(bigArray[DataDependencyArray[ddIndex]][2] == 1){
                    //console.log('data dependency array: '+DataDependencyArray)
                    //console.log('data dependency function returning 1 from instruction '+ddIndex)
                    
                    return 1
                }
                else if(bigArray[DataDependencyArray[ddIndex]][2] == 2 ){
                    console.log('going into forwaring if conditional')
                    var oneIndex = DataDependencyArray[ddIndex] + 1
                    const ForText = document.createElement('ForwardingText'+DataDependencyArray[ddIndex])
                    ForText.innerHTML ='Forwarding from instruction '+oneIndex+'s ALU output preventing stall <br /><br />'
                    document.querySelector('.PipelineLog').appendChild(ForText)
                    return 0
                }
            }
        }
            //console.log('data dependency function returning 0 for instruction '+RowNumber)
            return 0

                   

            }


}



function checkForResourceDependencies(piepo,Ro){
    if(Ro == 0){
        return 0
    }
    else if(checkPipelinePosition(instructionPositionArray[CurrentPosition-1],clickcounter) == 1){
        return 0
    }
    else{
    switch(piepo){
        case 0:
            for(let x = 0; x<Ro;x++){
                if(bigArray[x][7]== 1){
                    const ForText = document.createElement('ResourcweDependencyText'+Ro)
                    ForText.innerHTML ='Structural hazard: Instruction Memory in use, instruction ' +(Ro+1)+ ' stalling <br /><br />'
                    document.querySelector('.PipelineLog').appendChild(ForText)
                    return 1
                }
            }
            return 0
        break

        case 1:
            for(let x = 0; x<Ro;x++){
                if(bigArray[x][8]== 1){
                    const ForText = document.createElement('ResourcweDependencyText'+Ro)
                    ForText.innerHTML ='Structural hazard: Registers in use, instruction ' +(Ro+1)+ ' stalling <br /><br />'
                    document.querySelector('.PipelineLog').appendChild(ForText)
                    return 1
                }
            }
            return 0
        break

        case 2:
            for(let x = 0; x<Ro;x++){
                if(bigArray[x][9]== 1){
                    const ForText = document.createElement('ResourcweDependencyText'+Ro)
                    ForText.innerHTML ='Structural hazard: ALU in use, instruction ' +(Ro+1)+ ' stalling <br /><br />'
                    document.querySelector('.PipelineLog').appendChild(ForText)
                    return 1
                }
            }
            return 0
        break

        case 3:
            for(let x = 0; x<Ro;x++){
                if(bigArray[x][10]== 1){
                    const ForText = document.createElement('ResourcweDependencyText'+Ro)
                    ForText.innerHTML ='Structural hazard: Main Memory in use, instruction ' +(Ro+1)+ ' stalling <br /><br />'
                    document.querySelector('.PipelineLog').appendChild(ForText)
                    return 1
                }
            }
            return 0
        break

        case 4:
            for(let x = 0; x<Ro;x++){
                if(bigArray[x][11]== 1){
                    const ForText = document.createElement('ResourcweDependencyText'+Ro)
                    ForText.innerHTML ='Structural hazard: Instruction Memory in use, instruction ' +(Ro+1)+ ' stalling <br /><br />'
                    document.querySelector('.PipelineLog').appendChild(ForText)
                    return 1
                }
            }
            return 0
        break


    }
}
}





function updateFlags(pipeposit,RowN){
   switch(pipeposit){
       case 1:
           //oh so this is for resource dependencies, 
           //
           bigArray[RowN][7] = 1
           break
       case 2:
           bigArray[RowN][7] = 0 
           bigArray[RowN][8] = 1 
           break
       case 3:
           bigArray[RowN][8] = 0
           bigArray[RowN][9] = 1
           break
       case 4:
           bigArray[RowN][9] = 0
           bigArray[RowN][10] = 1
            
           if(instructionTypeArray[RowN] == 1 && cb.checked == true){//if maths instruction
               console.log('instruction '+RowN +' clearing data dependency flag')
               bigArray[RowN][2] = 2
           }
           break
           case 5:
               bigArray[RowN][10] = 0
               bigArray[RowN][11] = 1
               if(instructionTypeArray[RowN] == 1 && cb.checked == true){//if maths instruction
                   console.log('instruction '+RowN +' clearing data dependency flag')
                   bigArray[RowN][2] = 4
               }
               
        //bigArray[RowN][2] = 3
    
    break
    
    case 6:
        bigArray[RowN][11] = 0
        console.log('instruction '+RowN +' clearing data dependency flag')
        bigArray[RowN][2] = 3
        
        break
        case 7:
            for(let x = 7;x<=11;x++){
                bigArray[RowN][x] = 0
            }
        break



        
   }

}

function checkPipelinePosition(pooosition,clkcnt){
    //////console.log("position value for thing is "+pooosition)
    if(pooosition == 1){
        return 0 
    }
    if (pooosition==2 && clkcnt >5){
        return 0
    }
    if (pooosition==3 && clkcnt >10){
        return 0
    }
    if (pooosition==4 && clkcnt >15){
        return 0
    }
    if (pooosition==5 && clkcnt >20){
        return 0
    }
    else{
        //////console.log('pp check returning 1')
        return 1
    }

}