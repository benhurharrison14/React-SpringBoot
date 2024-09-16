package com.seeder.cashkickservice.repository;

import com.seeder.cashkickservice.entity.CashKick;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CashKickRepository extends JpaRepository<CashKick,Integer> {
    List<CashKick> findByUserId(int userId);
    boolean existsByName(String name);
}
