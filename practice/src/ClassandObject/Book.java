package ClassandObject;

public class Book {
 int id;
 String bookName;
 int price;
 Book(int id , String bookName,int price){
	 this.id=id;
	 this.bookName=bookName;
	 this.price=price;
 }
 void diplay() {
	 System.out.println("id:"+id);
	 System.out.println("Book Name:"+bookName);
	 System.out.println("Price:"+price);

 }
 public static void main(String[] args) {
	Book b = new Book(101,"coder raj", 399);
	b.diplay();
	
}
}
