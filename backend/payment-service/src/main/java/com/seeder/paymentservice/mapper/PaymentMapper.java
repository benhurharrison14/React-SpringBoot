package com.seeder.paymentservice.mapper;


import com.seeder.paymentservice.dto.PaymentDto;
import com.seeder.paymentservice.entity.PaymentEntity;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class PaymentMapper {

    private final ModelMapper modelMapper;


    public PaymentMapper() {
        this.modelMapper = new ModelMapper();
    }

    public PaymentEntity convertDtoToEntity(PaymentDto paymentDto){
        return modelMapper.map(paymentDto,PaymentEntity.class);
    }

    public PaymentDto convertEntityToDto(PaymentEntity paymentEntity){
        return modelMapper.map(paymentEntity, PaymentDto.class);
    }
}

