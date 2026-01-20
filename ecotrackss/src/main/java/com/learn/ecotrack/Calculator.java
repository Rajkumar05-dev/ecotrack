package com.learn.ecotrack;

public class Calculator {
	

	    // Arithmetic methods
	    public int add(int a, int b) {
	        return a + b;
	    }

	    public int subtract(int a, int b) {
	        return a - b;
	    }

	    public int multiply(int a, int b) {
	        return a * b;
	    }

	    public int divide(int a, int b) {
	        if (b == 0) {
	            throw new IllegalArgumentException("Cannot divide by zero");
	        }
	        return a / b;
	    }

	    public int modulus(int a, int b) {
	        if (b == 0) {
	            throw new IllegalArgumentException("Cannot mod by zero");
	        }
	        return a % b;
	    }

	    public int square(int a) {
	        return a * a;
	    }

	    public int cube(int a) {
	        return a * a * a;
	    }

	    public int max(int a, int b) {
	        return Math.max(a, b);
	    }

	    public int min(int a, int b) {
	        return Math.min(a, b);
	    }

	    public int power(int base, int exponent) {
	        return (int) Math.pow(base, exponent);
	    }

	    // Boolean (true/false) related methods
	    public boolean isEven(int a) {
	        return a % 2 == 0;
	    }

	    public boolean isPositive(int a) {
	        return a > 0;
	    }

	    public boolean isGreater(int a, int b) {
	        return a > b;
	    }

	    public boolean isEqual(int a, int b) {
	        return a == b;
	    }

	    public boolean isZero(int a) {
	        return a == 0;
	    }
	    
	    
	    
	    
	    
	}


