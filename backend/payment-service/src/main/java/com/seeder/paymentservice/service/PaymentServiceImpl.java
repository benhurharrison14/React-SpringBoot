package com.seeder.paymentservice.service;

import com.seeder.paymentservice.dto.PaymentDto;
import com.seeder.paymentservice.entity.PaymentEntity;
import com.seeder.paymentservice.exception.PaymentAlreadyExistsException;
import com.seeder.paymentservice.exception.PaymentNotFoundException;
import com.seeder.paymentservice.mapper.PaymentMapper;
import com.seeder.paymentservice.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentServiceImpl implements PaymentService {


    private final PaymentRepository paymentRepository;

    private final PaymentMapper paymentMapper;

    @Autowired
    public PaymentServiceImpl(PaymentRepository paymentRepository, PaymentMapper paymentMapper){
        this.paymentRepository = paymentRepository;
        this.paymentMapper = paymentMapper;
    }

    @Override
    public PaymentDto savePayment(PaymentDto paymentDto) {
        if(paymentRepository.existsByDueDate(paymentDto.getDueDate())){
            throw new PaymentAlreadyExistsException("Payment Already Exists!");
        }
        PaymentEntity paymentEntity = paymentMapper.convertDtoToEntity(paymentDto);
        PaymentEntity savedPayment = paymentRepository.save(paymentEntity);
        return paymentMapper.convertEntityToDto(savedPayment);
    }

    @Override
    public List<PaymentDto> getAllPaymentByUserId(int userId) {
        List<PaymentEntity> paymentEntityList = paymentRepository.findAllByUserId(userId);
        if(paymentEntityList.isEmpty()){
            throw new PaymentNotFoundException("No Payment Found With User Id : "+userId);
        }
        return paymentEntityList
                .stream().map(paymentMapper::convertEntityToDto).toList();
    }
}
