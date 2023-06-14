let whiteLine = 1
let sparovan: number
radio.setFrequencyBand(0)
radio.setGroup(1)
radio.setTransmitPower(7)




let stranaOtace = 2
//zatacka o 90 stupnu
function zatackaPravehoUhlu() {
    motory(0, stranaOtace)
    basic.pause(350)
}
const data: Array<any> = [
    {
        foward: false,
        left: false,
        right: false

    }
]
input.onButtonPressed(Button.B, function () {
    bezCary()
})
radio.onReceivedNumber(function (receivedNumber: number) {

    if (receivedNumber === 24) {
        sparovan = RadioPacketProperty.SerialNumber

        basic.showLeds(`
    # # # # #
    # # . # #
    # . # . #
    # . . . #
    # # # # #
    `)
    } else if (RadioPacketProperty.SerialNumber === sparovan) {
        smerjizdy = receivedNumber


        basic.showLeds(`
    . . . . .
    . . . # .
    # . # . .
    . # . . .
    . . . . .
    `)
    }



})



let spatnyMotor = 215 / 255
let smerjizdy: number = 1
let zamek = false
//kolo 67mm

let speeindwex = 160
let rovne: number
let zatacky: number
function motory(rovne: number, zatacky: number) {

    let motorM1 = rovne - zatacky
    let motorM4 = (rovne + zatacky)





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

        let ultrasonic = ping(DigitalPin.P2, DigitalPin.P1)



        //modus
        let fowardModus = 0
        let rightModus = 0
        let leftModus = 0


        for (let i = 0; i < data.length - 1; i++) {
            fowardModus = fowardModus + data[i].foward
            leftModus = leftModus + data[i].left
            rightModus = rightModus + data[i].right

            if (fowardModus > (data.length - 1) * 0.7) { fowardModus = 1 } else { fowardModus = 0 }
            if (leftModus > (data.length - 1) * 0.7) { leftModus = 1 } else { leftModus = 0 }
            if (rightModus > (data.length - 1) * 0.7) { rightModus = 1 } else { rightModus = 0 }
        }



        //krizovatka
        if (!Left && !Right && !Foward) {
            if (leftModus === 0 && rightModus === 0) {
                krizovatkaX()
            }



        }
        console.log(ultrasonic)
        if (ultrasonic < 5) {
            if (ultrasonic != 0)
                objetPrekazku()

        }



        if (!Right) {
            rovne = 0
            zatacky = -0.6
            motory(rovne, zatacky)
        } else if (!Right && !Foward) {
            rovne = 0.8
            zatacky = -0.4
            motory(rovne, zatacky)
        }
        if (!Left) {
            rovne = 0
            zatacky = 0.6
            motory(rovne, zatacky)
        } else if (!Left && !Foward) {
            rovne = 0.8
            zatacky = 0.4
            motory(rovne, zatacky)
        }
        if (!Foward) {
            rovne = 1
            zatacky = 0
            motory(rovne, zatacky)
        }


        if (Left && Right && Foward) {
            if (leftModus === 1) {
                rovne = 1.2
                zatacky = -0.4
                motory(rovne, zatacky)
            } else if (rightModus === 1) {
                rovne = 1.2
                zatacky = 0.4
                motory(rovne, zatacky)
            } else if (fowardModus === 1) {
                bezCary()
            }
        }

        //mánévry



        motory(rovne, zatacky)






        data.push(objekt)

        if (data.length > 20) {
            data.shift()
        }
        basic.pause(20)
    }




})

//ultrazvuk
function ping(trig: DigitalPin, echo: DigitalPin, maxCmDistance = 500): number {
    pins.setPull(trig, PinPullMode.PullNone)
    pins.digitalWritePin(trig, 0)
    control.waitMicros(2)
    pins.digitalWritePin(trig, 1)
    control.waitMicros(10)
    pins.digitalWritePin(trig, 0)


    const a = pins.pulseIn(echo, PulseValue.High, maxCmDistance * 58)
    let sosCoef = 1 / ((331 + 0.607 * (25 - 4)) / 10000 / 2)
    return Math.round(a / sosCoef)

}


function objetPrekazku() {
    basic.showLeds(`
            . . # . .
            . . # . .
            . . # . .
            . . . . .
            . . # . .
            `)
    zatackaPravehoUhlu()

    let ultrasonic = ping(DigitalPin.P2, DigitalPin.P1)
    basic.pause(100)
    if (ultrasonic < 5) {
        stranaOtace = 2
        basic.showLeds(`
        . . # . .
        . . . # . 
        # # # # #
        . . . # .
        . . # . .
        `)
        manevrObjetiprekazdky()


    } else {
        zatackaPravehoUhlu()
        zatackaPravehoUhlu()
        stranaOtace = -2
        basic.showLeds(`
        . . # . .
        . # . . . 
        # # # # #
        . # . . .
        . . # . .
        `)
        manevrObjetiprekazdky()
    }



}

function manevrObjetiprekazdky() {
    motory(1, 0)
    basic.pause(1500)
    zatackaPravehoUhlu()
    motory(1, 0)
    basic.pause(1500)
    zatackaPravehoUhlu()
    motory(1, 0)
    basic.pause(1500)
    stranaOtace = stranaOtace * -1
    zatackaPravehoUhlu()


}





//krizovatkaX
function krizovatkaX() {
    let Foward = (whiteLine ^ pins.digitalReadPin(pinF)) == 0 ? false : true
    let Left = (whiteLine ^ pins.digitalReadPin(pinL)) == 0 ? false : true
    let Right = (whiteLine ^ pins.digitalReadPin(pinR)) == 0 ? false : true
    basic.showIcon(IconNames.Heart)
    switch (smerjizdy) {
        case 1:

            while (Left) {
                motory(0.7, 1)
                Left = (whiteLine ^ pins.digitalReadPin(pinL)) == 0 ? false : true
            }
            break;
        case 2:
            motory(1, 0)
            basic.pause(100)
            break;
        case 3:
            stranaOtace = -2
            zatackaPravehoUhlu()

            motory(1, 0)
            basic.pause(250)
            break
        default:
        // code block
    }



}
//krizovatkaT

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
function bezCary() {

    basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    . . # . .
    . . # . .
    `)
    let Foward = (whiteLine ^ pins.digitalReadPin(pinF)) == 0 ? false : true
    let Left = (whiteLine ^ pins.digitalReadPin(pinL)) == 0 ? false : true
    let Right = (whiteLine ^ pins.digitalReadPin(pinR)) == 0 ? false : true
    motory(2, 0)
    basic.pause(1000)
    if (!Left || !Right || !Foward) {

    } else {
        zatackaPravehoUhlu()
        zatackaPravehoUhlu()
        motory(2, 0)
        basic.pause(1000)
    }
}