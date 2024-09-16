package com.seeder.paymentservice.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDto {
    private int paymentId;

    @NotNull
    @Min(value = 1)
    private int userId;

    @NotNull(message = "Due date can not be null")
    private Date dueDate;

    @NotNull(message = "Status can not be empty")
    private String status;

    @NotNull(message = "expected amount can not be empty")
    @DecimalMin(value = "1.0", message = "Expected amount must be greater than zero")
    private Double expectedAmount;

    @NotNull(message = "outstanding amount can not be empty")
    @DecimalMin(value = "1.0", message = "Outstanding amount must be greater then zero")
    private Double outstandingAmount;
}
