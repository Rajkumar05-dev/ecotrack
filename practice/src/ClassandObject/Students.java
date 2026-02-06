package ClassandObject;

public class Students {
 String name;
int rollno;
void display() {
	System.out.println("name :" + name);
	System.out.println("Rollno :" + rollno);
}
 public static void main(String[] args) {
Students s1 = new	Students();
s1.name="raj";
s1.rollno=307;
s1.display();
}


}
