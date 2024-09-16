package com.seeder.cashkickservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
@Table(name = "cashkick_contract")
public class CashKickContract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cashContractId;

    private int cashKickId;

    private int contractId;

    private int paymentAmount;
}
