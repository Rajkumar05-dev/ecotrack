package ExceptionHandling;

public class Exception3 {
public static void main(String[] args) {
	
	try {
		int []arr= {1,2,3,4};
		int a=10/3;
		System.out.println(arr[5]);
	} catch (ArithmeticException e) {
		  System.out.println("Math error");
	}catch (ArrayIndexOutOfBoundsException  e) {
		  System.out.println("Array error");
	} catch (Exception e) {
        System.out.println("General error");
    }
}
}
