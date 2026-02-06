package ClassandObject;


class Student{
	int id;
	String name;
	Student(int id,String name){
		this.id=id;
		this.name=name;
	}
	
	class Printer {
		void StudentPrinter(Student s) {
			   System.out.println("ID: " + s.id);
		        System.out.println("Name: " + s.name);
		}
	}
}
public class PrinterandStudents {
public static void main(String[] args) {
	Student student = new Student(102, "raj");

}
}
