package ClassandObject;

public class Calculator {
int a;
int b;
int add(int a,int b) {
	return a+b;
}
int sub(int a,int b) {
	return a-b;
}
int mul(int a,int b) {
	return a*b;
}
int div(int a,int b) {
	return a/b;
}
public static void main(String[] args) {
	Calculator c = new Calculator();
	System.out.println(c.mul(45, 78));
}

}
