




function checkForDataDependencies(PP, RowNumber){
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
        for(let why = 0;why<=RowNumber;why++){
            for(let y = 0;y<=1;y++){
                ////////console.log('value of row number in for loop is '+why+' testing with variable number '+ y)
                if(bigArray[why][1] == variablesArray[y] || bigArray[why][1] == variablesArray[y]  +',' || bigArray[why][1] +',' == variablesArray[y]){
                    if(bigArray[why][2] == 1){
                        const DataText = document.createElement('DataText'+why)
                        var oneIndex = why + 1
                        console.log('Data dependency found on instruction'+oneIndex)
                        var oneIndex2 = RowNumber+1
                        DataText.innerHTML ='Data Dependency from instruction '+oneIndex+' causing instruction ' + oneIndex2+ ' to stall <br /><br />'
                        document.querySelector('.PipelineLog').appendChild(DataText)
                        //stall due to data dependency on instruction x
                        ////////console.log('data dependency function returning 1')
                        return 1
                    }
                    else if(bigArray[why][2] == 2){
                        console.log('stall prevented due to forwarding')
                        var oneIndex = why + 1
                        const ForText = document.createElement('ForwardingText'+why)
                        ForText.innerHTML ='Forwarding from instruction '+oneIndex+'s ALU output preventing stall <br /><br />'
                        document.querySelector('.PipelineLog').appendChild(ForText)
                        return 0

                        //stall prevented due to data forwarding from alu 
                    }
                    else if(bigArray[why][2] == 3){
                        var oneIndex = why + 1
                        const ForText = document.createElement('ForwardingText'+why)
                        ForText.innerHTML ='instruction '+oneIndex+'s has written to mm, data dependency resolved even if forwarding is off<br /><br />'
                        document.querySelector('.PipelineLog').appendChild(ForText)
                        return 0
                    
                        //stall prevented due to data forwarding from alu 
                    }

                }
            }


}
return 0

}

}


function checkForResourceDependencies(piepo,Ro){
    if(Ro == 0){
        return 0
    }
    else{
    switch(piepo){
        case 0:
            for(let x = 0; x<Ro;x++){
                if(bigArray[x][7]== 1){
                    return 1
                }
            }
            return 0
        break

        case 1:
            for(let x = 0; x<Ro;x++){
                if(bigArray[x][8]== 1){
                    return 1
                }
            }
            return 0
        break

        case 2:
            for(let x = 0; x<Ro;x++){
                if(bigArray[x][9]== 1){
                    return 1
                }
            }
            return 0
        break

        case 3:
            for(let x = 0; x<Ro;x++){
                if(bigArray[x][10]== 1){
                    return 1
                }
            }
            return 0
        break

        case 4:
            for(let x = 0; x<Ro;x++){
                if(bigArray[x][11]== 1){
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
            console.log('checking for data dependency, cb checked is:')
            console.log(cb.checked)
            console.log('this needs to be equal to 1 to enter if conditionasl')
            console.log(instructionTypeArray[RowN])
           if(instructionTypeArray[RowN] == 1 && cb.checked == true){//if maths instruction
               console.log('Going into if conditional')
               bigArray[RowN][2] = 2
           }
           break
       case 5:
        bigArray[RowN][10] = 0
        bigArray[RowN][11] = 1
        if(instructionTypeArray[RowN] == 0){
        bigArray[RowN][2] = 3
    }
    break
    
    case 6:
        bigArray[RowN][11] = 0
        if(instructionTypeArray[RowN] == 1){
        bigArray[RowN][2] = 3
        }
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