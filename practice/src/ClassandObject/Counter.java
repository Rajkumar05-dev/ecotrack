package ClassandObject;

public class Counter {
int count=0;
static int  total=0;
Counter(){
	count++;
	total++;
	System.out.println("non static count:"+count);
	System.out.println("static:"+total); 
	
}
public static void main(String[] args) {
	Counter c1 = new Counter();
	Counter c2 = new Counter();
	Counter c3 = new Counter();
}
}
