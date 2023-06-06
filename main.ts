let whiteLine = 1

const data: Array<any> = [
    {
        foward: false,
        left: false,
        right: false

    }
]
bluetooth.startUartService()

bluetooth.onBluetoothDisconnected(function(){

    basic.showIcon(IconNames.Sad)

})

bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function(){



})
let smerjizdy:number = 1
let zamek = false
//kolo 67mm

let speeindwex = 130
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

let orientaceKrizovatkyT: number



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
                zatacky = 0.4
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

        if (data.length > 20) {
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
       
    }else{
        motory(-0.5, 0)
        basic.pause(50)
        switch (smerjizdy) {
            case 1:
                motory(0, 1)
                basic.pause(50)
                break;
            case 2:
                motory(1, 0)
                basic.pause(50)
                break;
            case 3:
                motory(0, -1)
                basic.pause(50)
                break;
            default:
            // code block
        }


    }
}

function krizovatkaT(){
    switch (orientaceKrizovatkyT) {
        case 1:
           
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


//chat gpt
function calculateMode(objectArray: any[]): [number, number, number] {
    const countMap: <string, number> = {
        forward0: 0,
        forward1: 0,
        left0: 0,
        left1: 0,
        right0: 0,
        right1: 0,
    };

    for (const obj of objectArray) {
        countMap[`forward${obj.forward}`]++;
        countMap[`left${obj.left}`]++;
        countMap[`right${obj.right}`]++;
    }

    let maxCount = 0;
    let mode: [number, number, number] = [0, 0, 0];

    for (const key in countMap) {
        if (countMap[key] > maxCount) {
            maxCount = countMap[key];
            mode = key.split('').map((value) => parseInt(value, 10)) as [number, number, number];
        }
    }

    return mode;
}