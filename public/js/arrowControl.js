//this code simply moves the array according to what instruction it is currently at.


const moveArrowForward = (coutner) => {
    if(coutner % 5 == 0){
        anime({
            targets: '.positionArrow',
            easing: 'easeInOutSine',
            translateY: '-=439px',
            duration:5
        })
    }
    else if(coutner == 1 || (coutner - 1) % 5 == 0){
    anime({
        targets: '.positionArrow',
        easing: 'easeInOutSine',
        translateY: '+=106px',
        
        duration:5
    })
    //('moving 105(FirstTosecond)')
    }
    else{
        anime({
            targets: '.positionArrow',
            easing: 'easeInOutSine',
            translateY: '+=111px',
            duration:5
    })
    ////console.log('moving 112')
}
}