package ClassandObject;

class Car {
String brand;
 String model;
 String price;
 void display() {
	 System.out.println("brand:"+brand);
	 System.out.println("model:"+model);
	 System.out.println("price:"+price);
 }
 public static void main(String[] args) {
	Car c = new Car();
	c.brand="BMW";
	c.model="BMW M5";
	c.price="2.5cr";
	c.display();
}
}
