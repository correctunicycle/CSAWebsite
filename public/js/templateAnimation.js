

console.log('you are getting to here though right?')

const box2 = () =>{
    setTimeout(function() {
        console.log('are you actually getting to this function.')
        console.log(document)
        var textbox = document.getElementById('text2')
        textbox.style.display = 'block'

    
    },2500);
    }
    const box1 = () =>{
        setTimeout(function() {
            console.log('are you actually getting to this function.')
            console.log(document)
            var textbox = document.getElementById('text1')
            textbox.style.display = 'block'
    
        
        },500);
        }

        const box3 = () =>{
            setTimeout(function() {
                console.log('are you actually getting to this function.')
                console.log(document)
                var textbox = document.getElementById('text3')
                textbox.style.display = 'block'
        
            
            },5500);
            }

            const box4 = () =>{
                setTimeout(function() {
                    console.log('are you actually getting to this function.')
                    console.log(document)
                    var textbox = document.getElementById('text4')
                    textbox.style.display = 'block'
            
                
                },9500);
                }

    
document.addEventListener('readystatechange', function() {
        if (document.readyState === "complete") {
          box2();
          box1();
          box3();
          box4();
        }
    })

