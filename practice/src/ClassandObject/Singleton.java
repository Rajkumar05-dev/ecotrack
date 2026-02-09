package ClassandObject;

public class Singleton {
	private static Singleton obj;
 private Singleton() {
	 System.out.println("Singleton object created");
 }
 public static Singleton getObject() {
	 if(obj==null) {
		 obj=new Singleton();
	 }
	 return obj;
 }
 void Show() {
	  System.out.println("This is a Singleton class");
 }
 public static void main(String[] args) {
	Singleton s = new Singleton();
	Singleton s1 = new Singleton();
	s.getObject();
	s1.getObject();
	s.Show();
	s1.Show();
	System.out.println(obj==obj);
	
}
}