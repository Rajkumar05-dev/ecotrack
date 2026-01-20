package com.learn.ecotrack;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class EcotrackssApplicationTests {

	@Test
	void contextLoads() {
		
	}
	
	private Calculator calculator;
	
	@BeforeEach
	void setUp(){
		calculator=new Calculator();  
	
	}
	
    @Test
	void testAdd() {
		 int result = calculator.add(19, 10);
		 assertEquals(29, result);
	}
    @Test
     void testSub() {
    	assertEquals(9,calculator.subtract(19, 10));
     }
	 
    @Test
    void testDiv() {
    	assertEquals(3,calculator.divide(6, 2));
    	assertEquals(6,calculator.divide(6, 1));
    	assertThrows(IllegalArgumentException.class, ()->{
    		calculator.divide(6, 0);
    	});

    }
     private Order order;
      @BeforeEach// for multiple times use
     void setUP() {
    	 order=new Order();
     }
      @Test
    void  testProcessorder(){
    	  
    	  assertThrows(NullPointerException.class,()->order.processOrder(null, 20, 20000));
    	  assertThrows(NullPointerException.class,()->order.processOrder("", 20, 20000));
    	  assertThrows(IllegalArgumentException.class,()->order.processOrder("p1", -8, 78));
    	  assertThrows(ArithmeticException.class,()->order.processOrder("p1", 20, -4000));
assertEquals("Order placed successfully", order.processOrder("p1", 15, 2500));
    	  
      }
      @Test
      void  testIsEven() {
    	  assertTrue(calculator.isEven(8));
    	  assertFalse(calculator.isEven(8));
    	  
      }
}
