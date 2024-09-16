package com.seeder.cashkickservice.exception;

public class CashKickAlreadyExistsException extends RuntimeException{
    public CashKickAlreadyExistsException(String message) {
        super(message);
    }
}
