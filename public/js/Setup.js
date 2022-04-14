
console.log(instruction1)

//split instructions into individual components
components1 = instruction1.split(' ')
components2 = instruction2.split(' ')
components3 = instruction3.split(' ')
components4 = instruction4.split(' ')
components5 = instruction5.split(' ')


console.log(components1)
//nested array of array of individual instruction components.
componentsArray = [components1, components2,components3,components4,components5]


//instruction type, variable, flag, variable, flag, variable, flag, main memory flag, alu flag, 




var bigArray = []

for(let y = 0;y<=4;y++){

    var tempArray1 = []
for(let x = 0; x<10;x++){
    
    if(typeof componentsArray[y][x] != 'undefined'){
        tempArray1.push(componentsArray[y][x])
        if(x> 0 && x<3 && componentsArray[y][x].indexOf("#")> -1){
            //push 4 on temp array if hash character found in components array
            tempArray1.push(4)
            
        }
        else if(x>0 && x<3){
            //else push 0 for these index's
            tempArray1.push(0)
            
        }
    }
    else{
        //else push zero, which seems to make the preceding else if conditional redundant- this should be tested.
        tempArray1.push(0)
       
    }
}
//push temp array onto big array to create nested arrays, with each array corresponding to each intruction.
bigArray.push(tempArray1)

}



//check for data dependencies and set flags


for(let x = 0;x<bigArray.length;x++){
    
    let variableName = bigArray[x][1]
    //variable name is equal to any variables written to by the instruction
    for(let y = x + 1;y<bigArray.length;y++){
        for(let z = 3; z <=5;z+=2){
                //console.log(' testing element'+ y + z + 'is' + bigArray[y][z]) 
                if(bigArray[y][z] == variableName || bigArray[y][z] == variableName +',' || bigArray[y][z] +',' == variableName){
                    
                    //check if any data dependencies are read by intructions after current instruction, 
                    //sets data dependency flag to 1 if so
                    bigArray[x][2] = 1
                }
            }
        
    }


}
console.log(bigArray)


//initiliase array of just instructions to be used by logic control and pushes
//instructions from component array.

var instructionArray = []
instructionArray.push(components1[0])
instructionArray.push(components2[0])
instructionArray.push(components3[0])
instructionArray.push(components4[0])
instructionArray.push(components5[0])



var pipelineStageArray = [0,0,0,0,0]//increments
var instructionPositionArray = [1,2,3,4,5]//never changes
var stallCountArray = [0,0,0,0,0]
var lastInstructionArray = [0,0,0,0,0]
var clickcounter = 0
var instructionTypeArray = instructionType()
//console.log('instruction type array has been computed to be ' + instructionTypeArray)



//reads instructions and sets flag for instruction type, for use by 
//logic to decide pipeline blocks needed for instructions.

function instructionType(){
    var ITA = []
    var ArrayofDataInstructions = ["ldur","stur","mov","movz","movk"]
    var ArrayofMathsInstructions = ["add","sub","addi","subi","and","ior","eor"]
    for(let x = 0;x<5;x++){
        for(let y =0;y<ArrayofDataInstructions.length;y++){
            ////console.log('comparing instruction '+ bigArray[x][0]+" with " + ArrayofDataInstructions[y])
            if(bigArray[x][0]== ArrayofDataInstructions[y]){
                ITA.push(0)
            }
        }
        for(let y =0;y<=ArrayofMathsInstructions.length;y++){
            if(bigArray[x][0]== ArrayofMathsInstructions[y]){
                ITA.push(1)
            }
        }

    }
    return ITA
    
}


console.table(bigArray)


