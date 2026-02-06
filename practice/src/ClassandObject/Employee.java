package ClassandObject;

public class Employee {
     String name;
    String salary;
   void display() {
	 System.out.println(name +" "+salary);

	}
   public static void main(String[] args) {
	Employee e = new Employee();
	e.name="raj";
	e.salary="2cr";
	e.display();
	Employee e1 = new Employee();
	e1.name="tyw";
			e1.salary="1.5cr";
			e1.display();
					
}
}
