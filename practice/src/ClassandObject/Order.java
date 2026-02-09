package ClassandObject;

public interface Order {
 void placeOrder();
}
abstract class OnlineOrder implements Order{
	void  connectServer(){
	
		        System.out.println("Connecting to server...");
	}
}
class AmazonOrder extends OnlineOrder{
	public void placeOrder() {
		connectServer();
		 System.out.println("Order placed on Amazon");
	}
}