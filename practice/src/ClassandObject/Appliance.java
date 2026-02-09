package ClassandObject;

abstract class Appliance {
    abstract void turnOn();
}

class Fan extends Appliance {
    void turnOn() {
        System.out.println("Fan is ON");
    }
}

class Light extends Appliance {
    void turnOn() {
        System.out.println("Light is ON");
    }
}


