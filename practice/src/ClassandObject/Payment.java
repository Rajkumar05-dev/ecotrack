package ClassandObject;

public interface Payment {
 void pay(double amount) ;
}
class UPI implements Payment { 
	public void pay(double amount) {
		System.out.println("Paid:"+amount+"using Upi");
	}
}
class Card implements Payment{
	public void pay(double amount) {
		System.out.println("paid:"+amount+"using card");
	}
}
class PaymentFactory {
    public static Payment getPayment(String type) {
        if (type.equalsIgnoreCase("upi"))
            return new UPI();
        else if (type.equalsIgnoreCase("card"))
            return new Card();
        else
            return null;
    }
}