package com.learn.ecotrack;

public class Order {
	  public String processOrder(String productId, int quantity, double amount) {
	        if (productId == null || productId.isBlank()) {
	            throw new NullPointerException("Product ID is required");
	        }

	        if (quantity <= 0) {
	            throw new IllegalArgumentException("Quantity must be greater than zero");
	        }

	        if (amount <= 0) {
	            throw new ArithmeticException("Amount must be positive");
	        }

	        if (quantity > 100) {
	            throw new RuntimeException("Bulk orders are not allowed");
	        }

	        return "Order placed successfully";
	    }
}
