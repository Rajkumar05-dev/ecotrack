package ClassandObject;

public class Mobile {
	String brand;
	String model;
	double price;

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public void setPrice(double price) {
		if (price > 0) {
			this.price = price;
		} else {
			System.out.println("Invalid price");
		}
	}

	void display() {
		System.out.println("Brand : " + brand);
		System.out.println("Model : " + model);
		System.out.println("Price : " + price);
	}
	public static void main(String[] args) {
		Mobile m = new Mobile();
		m.setBrand("IPHONE");
		m.setModel("IPHONE 17 PRO MAX");
		m.setPrice(13443);
		m.display();
	}
}
