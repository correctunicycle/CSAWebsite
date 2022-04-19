var fs = require("fs");
const getMachineCode = (fileName) => {
    //reads file into string
    var text = fs.readFileSync("./uploads/"+fileName).toString('utf-8');
    //splits file into 2 sections, preceding <_start>: and after start
    

    var testArray = [0,1]
    console.log('length of test array is :')
    console.log(testArray.length)
    var LineByLine = text.split("\n")
    //splits code after start line by line
    y = LineByLine.length -1
    var actualCode = []
    for(let x = 0; x < y; x++){
        console.log(x)
        //splits code into indidual instructions
        var tabByTab = LineByLine[x].split('\t')
        console.log('tab by tab array is :')

        console.log(tabByTab)
        //tablength = tabByTab.length
        actualCode.push(tabByTab[0]+' '+ tabByTab[1])
        
        console.log(tabByTab[0]+' '+ tabByTab[1])
            
    
        

}
    return actualCode
}



module.exports = getMachineCode