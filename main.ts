
let whiteLine:number


Sensors.SetLightLevel()


Sensors.OnLightDrop(function() {
    
})


const pinF = DigitalPin.P15
const pinL = DigitalPin.P14
const pinR = DigitalPin.P13

pins.setPull(pinF, PinPullMode.PullNone)
pins.setPull(pinL, PinPullMode.PullNone)
pins.setPull(pinR, PinPullMode.PullNone)


basic.forever(function () {

let c = (whiteLine ^ pins.digitalReadPin(pinF)) ==0 ? false : true






    basic.pause(200)
})