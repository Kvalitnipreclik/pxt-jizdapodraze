let whiteLine = 1

const data: Array<any> = [
    {
        foward: false,
        left: false,
        right: false

    }
]

let orientaceKrizovatkyT:number
let zamek = false
//kolo 67mm

let speeindwex = 150
let rovne: number
let zatacky: number
function motory(rovne:number, zatacky:number ) {
    
        let motorM1 = rovne + zatacky
    let motorM4 = rovne - zatacky
    




    PCAmotor.MotorRun(PCAmotor.Motors.M1, motorM1 * speeindwex)
    PCAmotor.MotorRun(PCAmotor.Motors.M4, motorM4 * speeindwex)

}



let stav = 0
let objekt = {
    foward: false,
    left: false,
    right: false

}
const pinF = DigitalPin.P15
const pinL = DigitalPin.P14
const pinR = DigitalPin.P13

pins.setPull(pinF, PinPullMode.PullNone)
pins.setPull(pinL, PinPullMode.PullNone)
pins.setPull(pinR, PinPullMode.PullNone)





basic.forever(function () {
    if (zamek) {
        let Foward = (whiteLine ^ pins.digitalReadPin(pinF)) == 0 ? false : true
        let Left = (whiteLine ^ pins.digitalReadPin(pinL)) == 0 ? false : true
        let Right = (whiteLine ^ pins.digitalReadPin(pinR)) == 0 ? false : true

  
        objekt.foward = Foward
        objekt.left = Left
        objekt.right = Right


        if (!Foward) {
            rovne = 1
            zatacky = 0
        }

        if (!Right) {
            rovne = 1
            zatacky = -0.2
         
        } else if (Right && data[data.length - 1].right === false) {
            rovne = 1
            zatacky = -0.1
        }
        if (!Left) {
            rovne = 1
            zatacky = 0.2
        } else if (Right && data[data.length - 1].left === false) {
            rovne = 1
            zatacky = 0.1
        }

        if (Left && Right && Foward) {
            if (data[data.length - 1].left === false) {
                rovne = 1.2
                zatacky = -0.4
            } else if (data[data.length - 1].right === false) {
                rovne = 1.2
                zatacky = +0.4
            }

        }

//mánévry
        if  (!Left && !Right && !Foward) {
            krizovatkaX
         

        } else if( !Left && !Foward){

        } else if (!Right && !Foward) {

        }



    motory(rovne, zatacky)

        data.push(objekt)

        if (data.length > 10) {
            data.shift()
        }
        basic.pause(20)
    }




})


function krizovatkaX (){
    motory(0.5,0)
    basic.pause(50)
    let Foward = (whiteLine ^ pins.digitalReadPin(pinF)) == 0 ? false : true
    if (Foward){
        krizovatkaT()
        orientaceKrizovatkyT = 1
    }
}

function krizovatkaT(){
    switch (orientaceKrizovatkyT) {
        case 1:
            // code block
            break;
        case 2:
            // code block
            break;
        case 3:
            // code block
            break;
        default:
        // code block
    }
}

input.onButtonPressed(Button.AB, function () {
    PCAmotor.MotorStopAll()

})

input.onButtonPressed(Button.A, function () {
    if (zamek) {
        zamek = false
    } else {
        zamek = true
    }

})