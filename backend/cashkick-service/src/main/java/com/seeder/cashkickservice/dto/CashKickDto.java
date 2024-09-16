package com.seeder.cashkickservice.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CashKickDto {
    private int cashKickId;
    @NotNull
    private String name;
    @NotNull
    private String status;
    @NotNull
    private Date maturity;
    @NotNull
    @DecimalMin(value = "1.0", message = "Total received can not be less than 1.0")
    private Double totalReceived;
    @NotNull
    @DecimalMin(value = "1.0", message = "Total financed can not be less than 1.0")
    private Double totalFinanced;
    @NotNull
    @DecimalMin(value = "1.0", message = "rate can not be less than 1.0")
    private int rate;
    @NotNull
    private Date createdDate;
    @NotNull
    private Date updatedDate;
    @NotNull
    private int userId;

}
