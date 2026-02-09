package ClassandObject;

public class BankAccount {
 
 private double balance;
  public void deposite(double amount) {
	  if(amount>0) {
		  balance+=amount;
		  System.out.println("Deposited: " + amount);
	  }else {
		  System.out.println("Invalid deposit amount");
	  }
  }
  public void withdraw(double amount) {
	  if(amount>0&& amount<=balance) {
		  balance-=amount;
		  System.out.println("Withdraw: " + amount);
	  }else {
		  System.out.println("Insufficient balance or invalid amount");
	  }
  }
   double getBalance() {
	   return balance;
   }
  
  public static void main(String[] args) {
	BankAccount b = new BankAccount();
	b.deposite(20000);
	b.withdraw(5000);
	System.out.println("current balance:"+b.getBalance());
}  
}
