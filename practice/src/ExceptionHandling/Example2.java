package ExceptionHandling;

public class Example2 {
	public static void main(String[] args) {
		String name=null;
		try {
			System.out.println(name.length());
		} catch (NullPointerException e) {
			System.out.println("nothinh anything");
		}
	}
}
