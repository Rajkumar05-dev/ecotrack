package ClassandObject;

public class Rectangle {
int len;
int width;

int area() {
	return len*width;
}
 int perimeter() {
	 return 2*(len+width);
 }
 public static void main(String[] args) {
	Rectangle r = new Rectangle();
	r.len=23;
	r.width=20;
	
	System.out.println("perimeter:"+r.perimeter());
	System.out.println("area:"+r.area());
}
}
	