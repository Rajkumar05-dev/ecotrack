package ExceptionHandling;

public class Example1 {
public static void main(String[] args) {
	int [] arr= {1,2,3};
	try {
		System.out.println(arr[2]);
	} catch (ArrayIndexOutOfBoundsException e) {

	 System.out.println("Invalid index accessed");
	}
}
}
