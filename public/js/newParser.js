var fs = require("fs");
const getMachineCode = (fileName) => {
    //reads file into string
    var text = fs.readFileSync("./uploads/"+fileName).toString('utf-8');
    //splits file into 2 sections, preceding <_start>: and after start
    var textByLine = text.split("<_start>:")
    y = textByLine.length
    console.log(y)

    
    var LineByLine = textByLine[1].split("\n")
    //splits code after start line by line
    y = LineByLine.length
    var actualCode = []
    for(let x = 0; x < y; x++){
        //splits code into indidual instructions
        var tabByTab = LineByLine[x].split('\t')
        console.log(tabByTab)
        tablength = tabByTab.length
        for(let b = 0; b < tablength; b++){
            if(b == 1){
            actualCode.push(tabByTab[b+1]+' '+ tabByTab[b+2])
            //console.log(tabByTab[b+1]+' '+ tabByTab[b+2])
            
         }
        }

}
    return actualCode
}



module.exports = getMachineCode