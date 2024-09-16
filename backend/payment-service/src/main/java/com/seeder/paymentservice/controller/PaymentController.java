package com.seeder.paymentservice.controller;

import com.seeder.paymentservice.dto.PaymentDto;
import com.seeder.paymentservice.service.PaymentService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/payments")
public class PaymentController {
    private final PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService){
        this.paymentService = paymentService;
    }

    @PostMapping
    public ResponseEntity<PaymentDto> createPayment(@Valid @RequestBody PaymentDto paymentDto){
        log.info(">>> Payment Controller : Saving a new Payment "+paymentDto);
        return ResponseEntity.ok(paymentService.savePayment(paymentDto));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<PaymentDto>> getPaymentByUserId(@PathVariable int userId){
        log.info(" >>> Payment Controller : Getting All Payment for user Id : "+userId);
        return ResponseEntity.ok(paymentService.getAllPaymentByUserId(userId));
    }

}
