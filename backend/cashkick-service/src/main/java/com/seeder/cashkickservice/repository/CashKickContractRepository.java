package com.seeder.cashkickservice.repository;

import com.seeder.cashkickservice.entity.CashKickContract;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CashKickContractRepository extends JpaRepository<CashKickContract,Integer> {
    public List<CashKickContract> findByCashKickId(int cashKickId);
}
