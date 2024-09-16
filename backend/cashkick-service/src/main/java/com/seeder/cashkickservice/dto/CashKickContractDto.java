package com.seeder.cashkickservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CashKickContractDto {
    private int cashContractId;

    private int cashKickId;

    private int contractId;

    private int paymentAmount;
}
