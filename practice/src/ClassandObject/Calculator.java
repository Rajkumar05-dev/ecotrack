package ClassandObject;

public class Calculator {
int a;
int b;
 void add(int a,int b){
	 this.a=a;
	 this.b=b;
	System.out.println(a+b);
 }
 public static void main(String[] args) {
	 Calculator c = new Calculator();
	 c.add(12, 23);
}
}
