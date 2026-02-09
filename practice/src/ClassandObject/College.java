package ClassandObject;

class Student {
	int id;
	String name;

	Student(int id, String name) {
this.id=id;
this.name=name;
	}

	void display() {
		System.out.println(id + " " + name);
	}
}

public class College {
	Student[] students;

	College(Student[] students) {
		this.students = students;
	}

	void displayStudents() {
		for (Student s : students) {
			s.display();
		}
	}

}
