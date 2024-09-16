package com.seeder.paymentservice.repository;

import com.seeder.paymentservice.entity.PaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface PaymentRepository extends JpaRepository<PaymentEntity,Integer> {
    List<PaymentEntity> findAllByUserId(int userId);

    boolean existsByDueDate(Date dueDate);
}
