package ClassandObject;


class Students {
 
	String name;
	int age;
	void display() {
		System.out.println("name:"+name);
		System.out.println("age:"+age);
	}
	
	public static void main(String[] args) {
		Students s = new Students();
		s.name="raj";
		s.age=21;
		s.display();
		System.out.println("___________________________");
		Students s1 = new Students();
		s1.name="Raj chauhan";
		s1.age=21;
		s1.display();
	}
}

