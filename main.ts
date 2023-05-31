
let whiteLine = 1
let historie = {
            Foward: false,
            Left: false,
        Right: false 
}


Sensors.SetLightLevel()
const data:Array<object> = []
let objekt = {
    Foward: false,
     Left: false,
      Right: false,
 }
let zamek = false
//kolo 67mm

const pinF = DigitalPin.P15
const pinL = DigitalPin.P14
const pinR = DigitalPin.P13

pins.setPull(pinF, PinPullMode.PullNone)
pins.setPull(pinL, PinPullMode.PullNone)
pins.setPull(pinR, PinPullMode.PullNone)


function motory (){




}



basic.forever(function () {
if (zamek){

    let Foward = (whiteLine ^ pins.digitalReadPin(pinF)) == 0 ? false : true
    let Left = (whiteLine ^ pins.digitalReadPin(pinL)) == 0 ? false : true
    let Right = (whiteLine ^ pins.digitalReadPin(pinR)) == 0 ? false : true
    objekt.Foward = Foward
    objekt.Left = Left
    objekt.Right = Right
    
    historie = data.pop()
    if (!Foward) {
        PCAmotor.MotorRun(PCAmotor.Motors.M1, 100)
        PCAmotor.MotorRun(PCAmotor.Motors.M4, 100)
    } 
    
    if (!Right){
        PCAmotor.MotorRun(PCAmotor.Motors.M1, 200)
        PCAmotor.MotorRun(PCAmotor.Motors.M4, 70)
    }else if (Right && historie.Foward)
    if (!Left) {
        PCAmotor.MotorRun(PCAmotor.Motors.M4, 200)
        PCAmotor.MotorRun(PCAmotor.Motors.M1, 70)
    }

    data.push(objekt)

 if( data.length > 10){
     data.shift()
 }
     basic.pause(50)
}



  
})

input.onButtonPressed(Button.AB, function() {
    PCAmotor.MotorStopAll()
    
})

input.onButtonPressed(Button.A, function () {
    if(zamek){
        zamek = false
    }else{
        zamek = true
    }

})



