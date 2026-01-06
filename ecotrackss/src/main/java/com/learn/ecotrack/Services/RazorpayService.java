package com.learn.ecotrack.Services;

import com.razorpay.Order;
import com.razorpay.RazorpayException;


public interface RazorpayService {
Order createOrder(Double amount ) throws RazorpayException;
	
	boolean verifyPayment(String orderId, String paymentId, String signature) throws RazorpayException;
}
