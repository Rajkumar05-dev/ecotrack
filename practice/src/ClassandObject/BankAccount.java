package ClassandObject;

public class BankAccount {
 private String accountNumber;
  private double balance;
 BankAccount(String accountNumber, double balance){
	  this.accountNumber=accountNumber;
	  this.balance=balance;
  }
 void deposit(double amount) {
	 if(amount>0) {
		 balance+=amount;
		 System.out.println("Deposited:"+amount);
	 }else {
		 System.out.println("Invalid deposit amount");
	 }
 }
 void withdraw(double amount) {
	 if(amount>0&&amount<=balance) {
		 balance-=amount;
		 System.out.println("withdraw:"+amount);
	 }else {
		 System.out.println("Invalid or insufficient balance");
	 }
 }
  public String getAccountNumber() {
	  return accountNumber;
  }
  public double getBalance() {
	  return  balance;
  }
 public static void main(String[] args) {
	BankAccount bank = new BankAccount("123443567786", 344567687);

	bank.deposit(5000);
	bank.withdraw(1500000);
	System.out.println("Account No: " + bank.getAccountNumber());
    System.out.println("Current Balance: " + bank.getBalance());
}
}
