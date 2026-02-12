package ExceptionHandling;

import java.util.Scanner;

public class ExceptionHandlinh {
public static void main(String[] args) {
	Scanner sc=new Scanner(System.in);
	System.out.println("Enter a;");
	int a=sc.nextInt();
	System.out.println("Enter b;");
	int b=sc.nextInt();
try {
	int result=a/b;
System.out.println("result:"+result);
} catch (ArithmeticException e) {
	System.out.println("Cannot divide by zero");
}

	
} 
}
