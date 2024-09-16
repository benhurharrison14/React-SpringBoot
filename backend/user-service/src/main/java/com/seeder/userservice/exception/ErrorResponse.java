package com.seeder.userservice.exception;

import lombok.*;

    @Getter
    @Setter
    @NoArgsConstructor
    public class ErrorResponse {

        private int status;
        private String message;
        private long timeStamp;
    }

