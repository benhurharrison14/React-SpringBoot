package com.seeder.paymentservice.service;


import com.seeder.paymentservice.dto.PaymentDto;

import java.util.List;

public interface PaymentService {
    public PaymentDto savePayment(PaymentDto paymentDto);

    public List<PaymentDto> getAllPaymentByUserId(int userId);
}
