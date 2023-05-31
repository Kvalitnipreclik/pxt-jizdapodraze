
let whiteLine = 1
class objectos {
    foward: boolean;
    left: boolean;
    right: boolean;

    constructor(b1: boolean, b2: boolean, b3: boolean) {
        this.foward = b1;
        this.left = b2;
        this.right = b3;
    }
}

let arr: objectos[] = [];

arr.push(new objectos(false, false, false));

Sensors.SetLightLevel()
const data:Array<boolean> = []
let objekt:Object<Boolean> = {
    foward: false,
     left: false,
      right: false,
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
    
    
    if (!Foward) {
        PCAmotor.MotorRun(PCAmotor.Motors.M1, 100)
        PCAmotor.MotorRun(PCAmotor.Motors.M4, 100)
    } 
    
    if (!Right){
        PCAmotor.MotorRun(PCAmotor.Motors.M1, 200)
        PCAmotor.MotorRun(PCAmotor.Motors.M4, 70)
    }else if (Right && data[0].foward)
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



