package ClassandObject;

// Employee class
class Employee {
    int id;
    String name;

    Employee(int id, String name) {
        this.id = id;
        this.name = name;
    }
}

// Printer class
class Printer {
    void printEmployee(Employee e) {
        System.out.println("Employee ID   : " + e.id);
        System.out.println("Employee Name : " + e.name);
    }
}

// Main class (ENTRY POINT)

