package com.seeder.contractservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContractDTO {

    private int contractId;

    private String name;

    private String type;

    private double perPayment;

    private int termLength;

    private String paymentAmount;
}