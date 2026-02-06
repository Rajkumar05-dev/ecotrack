package ClassandObject;

public class Car {
String brand ;
double price;
Car(String brand,double price){
	this.brand=brand;
	this .price=price;			
}
void carDetails() {
	System.out.println(brand);
	System.out.println(price);
}
	public static void main(String[] args) {
		Car c = new Car("BMW", 120000);
		c.carDetails();
		
	}
}
 