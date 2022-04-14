const insertText = (pipelinePosition,instruction,instructionPosition,stallOffset) => {
    //you need to split this stuff up into it's own functions
    
    //const ifText = document.createElement('div')
    //ifText.appendChild(instructionFetch)
    //ifText.style = "position:absolute; left: 210px; top:60px"
    //ifText.style.fontSize = "10px"
    //document.querySelector('.firstRowPipeline').appendChild(ifText)
    //var offset = instruction * whatever the offset value needs to be
    var LeftOffset 
    var topOffset
    //determines offset of instruction on page based on instruction number
    if(instructionPosition == 1){
        LeftOffset =0 
        topOffset = 35
    }
    else{
        LeftOffset = (instructionPosition -1) * 150 
        topOffset = -10
     }
    //determines text position based on pipeline position, instruction offset and any offset due to instruction having stalled
    var textPosition = 210 + (pipelinePosition -1) * 150 + LeftOffset + stallOffset * 150
    switch(pipelinePosition){
        //adds text based on what position instruction is in the pipeline
        case 1:
            const ifText = document.createElement('IFText')
            ifText.innerHTML = "Instruction Fetch <br /> <br /> From: <br /> Instruction <br />Memory <br />"
            ifText.style = "position:absolute; left: "+ textPosition+"px; top:"+topOffset+"px"
            ifText.style.fontSize = "10px"
            document.querySelector('.Pipeline'+instructionPosition+'Row').appendChild(ifText)
            break
        case 2:
            const idText = document.createElement('IDText')
            idText.innerHTML = "Instruction Decode<br /> <br /> Using: <br /><br /> Registers"
            idText.style = "position:absolute; left: "+ textPosition+"px; top:"+topOffset+"px"
            idText.style.fontSize = "9px"
            document.querySelector('.Pipeline'+instructionPosition+'Row').appendChild(idText)
            break
        case 3:
            const ALUText = document.createElement('ALUText')
            ALUText.innerHTML = "<br />          ALU <br /><br /> "
            ALUText.style = "position:absolute; left: "+ textPosition+"px; top:"+topOffset+"px"
            ALUText.style.fontSize = "13px"
            document.querySelector('.Pipeline'+instructionPosition+'Row').appendChild(ALUText)
            break
        case 4:
            if(instructionTypeArray[instructionPosition - 1] == 1){

            }
            else{
            const MEMText = document.createElement('MEMText')
            //need to check if reading or writing
            MEMText.innerHTML = "Writing/Reading<br /> <br /> To: <br /><br /> Main Memory"
            MEMText.style = "position:absolute; left: "+ textPosition+"px; top:"+topOffset+"px"
            MEMText.style.fontSize = "10px"
            document.querySelector('.Pipeline'+instructionPosition+'Row').appendChild(MEMText)
            }
            break
        case 5:
            const RegText = document.createElement('RegText')
            //need to check if reading or writing
            RegText.innerHTML = "Writing/Reading<br /> <br /> To: <br /><br /> Registers"
            RegText.style = "position:absolute; left: "+ textPosition+"px; top:"+topOffset+"px"
            RegText.style.fontSize = "10px"
            document.querySelector('.Pipeline'+instructionPosition+'Row').appendChild(RegText)
            break
    }    
    
}





const insertImage = (pipelinePosition,instruction,instructionPosition,stallFlag) =>{
    //if pp = 3 && instruction doesn't use memory, insert non memory block
    var ZeroedLeft = 168
    var offset
    var upSet
    //sets various offsets for defining the posision of the image, similar to what is done for text.
    //very fiddly to set up all this positioning stuff, would not touch unless absolutely necessary
    if(instructionPosition != 1){upSet = -50 }
    else{upSet = 0}
    if(instructionPosition != 1){
        offset = (instructionPosition - 1) * 150 
    }else{offset = 0}
    var LeftOffset = ZeroedLeft + offset
    //if stall flag is 1 insert stall block
    if(stallFlag == 1){
        const image  = document.createElement('img')
        image.src = "/img/NewStallBlock.png"
        image.style = "position: relative; top:"+upSet+"px; left: "+LeftOffset+ "px; display: inline-block;"
        var x = instructionPosition
        //I can't rememeber why this ghost element is necessary but I think if it's taken away that bad things will happen
        const ghostElement = document.createElement('nothing')
        ghostElement.id = "stallElement"
        document.querySelector('.Pipeline' + x+ 'Row').appendChild(image)
        document.querySelector('.Pipeline' + x+ 'Row').appendChild(ghostElement)
        

    }
    //if pipeline position is 3 insert alu block
    else if(pipelinePosition == 3){
        const image  = document.createElement('img')
    image.src = "/img/ResizedALUBlock.png"
    image.style = "position: relative; top:"+upSet+"px; left: "+LeftOffset+ "px; display: inline-block;"
    var x = instructionPosition

    document.querySelector('.Pipeline' + x+ 'Row').appendChild(image)
    }
    //insert skip if pipeline position is 4 and intruction type means it doesn't use memory 
    else if(pipelinePosition == 4 && instructionTypeArray[instructionPosition - 1] == 1){
        const image  = document.createElement('img')
        image.src = "/img/ResizedSkipBlock.png"
        image.style = "position: relative; top:"+upSet+"px; left: "+LeftOffset+ "px; display: inline-block;"
        var x = instructionPosition

        const ghostElement2 = document.createElement('nothing')
        document.querySelector('.Pipeline' + x+ 'Row').appendChild(image)
        document.querySelector('.Pipeline' + x+ 'Row').appendChild(ghostElement2)
    }
    //if none of the above then just insert normal pipeline block
    else{
    const image  = document.createElement('img')
    image.src = "/img/ResizedPipelineBlock.png"
    //var offset = (instructionPosition - 1) * 90 for when doing the next stage
    image.style = "position: relative; top:"+upSet+"px; left: "+LeftOffset+ "px; display: inline-block;"
    var x = instructionPosition
    ////////console.log(x)
    document.querySelector('.Pipeline' + x+ 'Row').appendChild(image)
    }
    //if pp = 3 && instruction doesn't use memory, insert non memory block
}