package ClassandObject;

import java.util.Scanner;

public class User {
	private String username;
	private String password;

	User(String username, String password) {
this.username=username;
this.password=password;
	}
	boolean login(String username, String password) {
		if(this.username.equals(username)&&this.password.equals(password)) {
			return true;
		}else {
			return false;
		}
	}
	@SuppressWarnings("resource")
	public static void main(String[] args) {
		User user = new User("raj kumar", "raj123");
		System.out.println("enter your username");
		Scanner sc = new Scanner(System.in);
		String inputUser=sc.nextLine();
		System.out.println("enter your password");
	
		String inputpass=sc.nextLine();
		if(user.login(inputUser,inputpass)) {
			System.out.println("login successful");
		}else {
			 System.out.println("Login Failed ❌");
		}
		sc.close();
		
	}
}
