package com.seeder.paymentservice.exception;

public class PaymentAlreadyExistsException extends RuntimeException{
    public PaymentAlreadyExistsException(String message) {
        super(message);
    }
}
