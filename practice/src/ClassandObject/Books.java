package ClassandObject;

public class Books {
int id;
String name;
String author;
Books(int id,String n,String a){
	this.id=id;
	this.name=n;
	this.author=a;
}
 void display() {
	 System.out.println("ID:"+id);
	 System.out.println("NAME:"+name);
	 System.out.println("AUTHOR:"+author);
 }
 public static void main(String[] args) {
	Books b = new Books(101, "The coder", "raj.k.c");
b.display();
 }
}
