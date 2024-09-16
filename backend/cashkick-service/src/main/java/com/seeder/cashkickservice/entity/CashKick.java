package com.seeder.cashkickservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="cash_kick")
public class CashKick {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cashKickId;

    private String name;

    private String status;

    private Date maturity;

    private Double totalReceived;

    private Double totalFinanced;

    private int rate;

    private Date createdDate;

    private Date updatedDate;

    private int userId;
}
