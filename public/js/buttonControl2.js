
var cb = document.getElementById('ForwardingOnOff');
console.log('value of checkbox is:')
console.log(cb.checked);


document.getElementById('ForwardingOnOff').onclick = function(){
    cb = document.getElementById('ForwardingOnOff');
    console.log('value of checkbox is:')
    console.log(cb.checked);
}







        document.getElementById('undo').onclick = function(){
            CurrentPosition = clickcounter % 5 + 1
            

            let select = document.querySelector('.Pipeline'+CurrentPosition+'Row');
            //assign select to html element for current pipeline based on current position

            //if else conditionals remove appropriate html elements and decrements relevant variables depending on current position.
            if(select.lastChild.id == "stallElement"){
                //ghost element might not actually be necessary when creating stall element and was based on legacy
                //implementation of this undo function.
                select.removeChild(select.lastChild);
                select.removeChild(select.lastChild);
                stallCountArray[CurrentPosition -1]--

            }
            else{
            
            select.removeChild(select.lastChild);
            select.removeChild(select.lastChild);
            if(pipelineStageArray[CurrentPosition - 1] > 0){
            pipelineStageArray[CurrentPosition - 1]--
            }
            }
            
            
        }

        document.getElementById('skip').onclick = function(){
            //just moves the arrow forward.
            clickcounter++
             moveArrowForward(clickcounter,1)

        }

document.getElementById('newStall').onclick = function(){
    CurrentPosition = clickcounter % 5 + 1
        if(pipelineStageArray[CurrentPosition - 1] == 5 ){
            //if pipeline is done, do nothing
        }
        else{
                //inserts stall and adjusts various array parameters
                insertImage(pipelineStageArray[CurrentPosition - 1],instructionArray[CurrentPosition - 1],instructionPositionArray[CurrentPosition - 1],1)
                stallCountArray[CurrentPosition - 1]++
                //do you use this array, actually, either of these arrays
                lastInstructionArray[CurrentPosition - 1] = 1
        }

            clickcounter++
            moveArrowForward(clickcounter)
        }

document.getElementById("newProceed").onclick = function(){
    CurrentPosition = clickcounter % 5 + 1
    if(pipelineStageArray[CurrentPosition - 1] == 5 ){}
    else{
        
        pipelineStageArray[CurrentPosition - 1]++
        
        //same thing as stall but insets pipeline block instead.
        insertImage(pipelineStageArray[CurrentPosition - 1],instructionArray[CurrentPosition - 1],instructionPositionArray[CurrentPosition - 1],0)
        insertText(pipelineStageArray[CurrentPosition - 1],instructionArray[CurrentPosition - 1],instructionPositionArray[CurrentPosition - 1],stallCountArray[CurrentPosition - 1])
        //again, do you use this array?
        lastInstructionArray[CurrentPosition - 1] = 0
    }
    clickcounter++
    moveArrowForward(clickcounter)
}

document.getElementById("autoPlay").onclick = function(){
    //autoplay is for the complete pipeline to be generated automatically in one click
    //while last instruction is not done, run automatic pipeline generation.
    for(let x = 0; x<pipelineStageArray.length;x++){
        while(pipelineStageArray[x]<5){
        autoPlay()
        }
    }
   
}


document.getElementById("autoMode").onclick = function(){
    //generates pipeline automatically, but step by step
    autoPlay()

}



const autoPlay = () => {
    
    CurrentPosition = clickcounter % 5 + 1
    if(pipelineStageArray[CurrentPosition - 1] == 5 ){
        //if pipeline done just update flags
        updateFlags(6,instructionPositionArray[CurrentPosition -1]-1)
    }
    
    else if(checkForDataDependencies(pipelineStageArray[CurrentPosition - 1],instructionPositionArray[CurrentPosition -1]-1) == 0 && checkForResourceDependencies(pipelineStageArray[CurrentPosition-1],instructionPositionArray[CurrentPosition -1]-1) == 0 && checkPipelinePosition(instructionPositionArray[CurrentPosition-1],clickcounter) == 0){
        //if functions return appropriate values,
        pipelineStageArray[CurrentPosition - 1]++
        console.log('instruction '+(instructionPositionArray[CurrentPosition -1]-1)+ 'moving to next pipeline stage')
        
        insertImage(pipelineStageArray[CurrentPosition - 1],instructionArray[CurrentPosition - 1],instructionPositionArray[CurrentPosition - 1],0)
        insertText(pipelineStageArray[CurrentPosition - 1],instructionArray[CurrentPosition - 1],instructionPositionArray[CurrentPosition - 1],stallCountArray[CurrentPosition - 1])
        lastInstructionArray[CurrentPosition - 1] = 0
        updateFlags(pipelineStageArray[CurrentPosition-1],instructionPositionArray[CurrentPosition -1]-1)
    }
    else if(checkPipelinePosition(instructionPositionArray[CurrentPosition-1],clickcounter) == 0){
        insertImage(pipelineStageArray[CurrentPosition - 1],instructionArray[CurrentPosition - 1],instructionPositionArray[CurrentPosition - 1],1)
        stallCountArray[CurrentPosition - 1]++
        lastInstructionArray[CurrentPosition - 1] = 1
        updateFlags(7,instructionPositionArray[CurrentPosition -1]-1)
    }
    ////console.table(bigArray)  
    clickcounter++
    moveArrowForward(clickcounter)

    
   
}
