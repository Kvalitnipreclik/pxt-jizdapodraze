let whiteLine = 1

radio.setFrequencyBand(0)
radio.setGroup(1)
radio.setTransmitPower(7)


const data: Array<any> = [
    {
        foward: false,
        left: false,
        right: false

    }
]

radio.onReceivedNumber(function(receivedNumber: number) {
    smerjizdy = receivedNumber

    basic.showLeds(`
    . . . . .
    . . . # .
    # . # . .
    . # . . .
    . . . . .
    `)
})

  
let stranaOtace = 2
let spatnyMotor = 215 / 255
let smerjizdy:number = 1
let zamek = false
//kolo 67mm

let speeindwex = 150
let rovne: number
let zatacky: number
function motory(rovne:number, zatacky:number ) {
    
        let motorM1 = rovne + zatacky
    let motorM4 = rovne - zatacky
    




    PCAmotor.MotorRun(PCAmotor.Motors.M1, motorM1 * speeindwex)
    PCAmotor.MotorRun(PCAmotor.Motors.M4, motorM4 * speeindwex * spatnyMotor)

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

let orientaceKrizovatkyT: number


// hlavni rozhodovaní
basic.forever(function () {
    if (zamek) {
        let Foward = (whiteLine ^ pins.digitalReadPin(pinF)) == 0 ? false : true
        let Left = (whiteLine ^ pins.digitalReadPin(pinL)) == 0 ? false : true
        let Right = (whiteLine ^ pins.digitalReadPin(pinR)) == 0 ? false : true

  
        objekt.foward = Foward
        objekt.left = Left
        objekt.right = Right
//modus
let fowardModus = 0
let rightModus = 0
let leftModus = 0


for(let i = 0; i < data.length - 1; i++){
    fowardModus = fowardModus + data[i].foward
    leftModus = leftModus + data[i].left
    rightModus = rightModus + data[i].right

    if (fowardModus > (data.length - 1) * 0.7) { fowardModus = 1 } else { fowardModus = 0}
    if (leftModus > (data.length - 1) * 0.7) { leftModus = 1 } else { leftModus = 0 }
    if (rightModus > (data.length - 1) * 0.7) { rightModus = 1 } else { rightModus = 0 }
}







//krizovatka
        if (!Left && !Right && !Foward) {
            krizovatkaX()


        } else if (!Left && !Foward) {

        } else if (!Right && !Foward) {

        }
        if (!Left && !Right && !Foward){

        }


//zatacky
        if (!Right) {
            rovne = 1
            zatacky = -0.2
            motory(rovne, zatacky)
        } else if (Right && data[data.length - 1].right === false) {
            rovne = 1
            zatacky = -0.8
            motory(rovne, zatacky)
        }
        if (!Left) {
            rovne = 1
            zatacky = 0.2
            motory(rovne, zatacky)
        } else if (Left && data[data.length - 1].left === false) {
            rovne = 1
            zatacky = 0.8
            motory(rovne, zatacky)
        }
        if (Left && Right && Foward) {
            if (data[data.length - 1].left === false) {
                rovne = 1.2
                zatacky = -0.4
                motory(rovne, zatacky)
            } else if (data[data.length - 1].right === false) {
                rovne = 1.2
                zatacky = 0.4
                motory(rovne, zatacky)
            } else if (data[data.length - 1].foward === false){
                bezCary()
            }

        }

//mánévry



        motory(rovne, zatacky)
      



 

        data.push(objekt)

        if (data.length > 20) {
            data.shift()
        }
        basic.pause(50)
    }




})


//zatacka o 90 stupnu
function zatackaPravehoUhlu(){
    motory(0, stranaOtace)
    basic.pause(500)
}
//krizovatkaX
function krizovatkaX (){
    
        basic.showIcon(IconNames.Heart)
        switch (smerjizdy) {
            case 1:
                motory(1, 0)
                basic.pause(200)
                stranaOtace = 2
                zatackaPravehoUhlu()
                
                motory(1, 0)
                basic.pause(500)
                break;
            case 2:
                motory(1, 0)
                basic.pause(200)
                break;
            case 3:
                motory(1, 0)
                basic.pause(200)
                stranaOtace = -2
                zatackaPravehoUhlu()

                motory(1, 0)
                basic.pause(500)
                break
            default:
            // code block
        }


    
}
//krizovatkaT
function krizovatkaT(){
    switch (orientaceKrizovatkyT) {
        case 1:
           motory(0, 1)
           basic.pause(50)
            motory(1, 0)
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
//sos tlacitko
input.onButtonPressed(Button.AB, function () {
    PCAmotor.MotorStopAll()

})
//zamek
input.onButtonPressed(Button.A, function () {
    if (zamek) {
        zamek = false
    } else {
        zamek = true
    }

})
// konec cary nebo preruseni
function bezCary(){
    let Foward = (whiteLine ^ pins.digitalReadPin(pinF)) == 0 ? false : true
    let Left = (whiteLine ^ pins.digitalReadPin(pinL)) == 0 ? false : true
    let Right = (whiteLine ^ pins.digitalReadPin(pinR)) == 0 ? false : true
    motory(1,0)
    basic.pause(2000)
    if (!Left || !Right || !Foward){
        
    }else {
        zatackaPravehoUhlu()
        zatackaPravehoUhlu()
        motory(1, 0)
        basic.pause(2000)
    }
}


function prekazka(){


    
}
//chat gpt

// interface ObjectValues {
//     forward: 0 | 1;
//     left: 0 | 1;
//     right: 0 | 1;
// }

// function calculateMode(objectArray: Object[]): [number, number, number] {
//     const countMap:any = {
//         forward0: 0,
//         forward1: 0,
//         left0: 0,
//         left1: 0,
//         right0: 0,
//         right1: 0,
//     };

//     for (const obj of objectArray) {
//         countMap[`forward${obj.forward}`]++;
//         countMap[`left${obj.left}`]++;
//         countMap[`right${obj.right}`]++;
//     }

//     let maxCount = 0;
//     let mode: [number, number, number] = [0, 0, 0];

//     for (const key in countMap) {
//         if (countMap.hasOwnProperty(key) && countMap[key] > maxCount) {
//             maxCount = countMap[key];
//             mode = key.split('').map((value) => parseInt(value, 10)) as [number, number, number];
//         }
//     }

//     return mode;
// }