package com.seeder.contractservice.exception;

public class ContractsNotFoundException extends RuntimeException{
    public ContractsNotFoundException(String message){
        super(message);
    }
}
