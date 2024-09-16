package com.seeder.cashkickservice.mapper;

import com.seeder.cashkickservice.dto.CashKickContractDto;
import com.seeder.cashkickservice.entity.CashKickContract;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class CashKickContractMapper {
    private final ModelMapper modelMapper;


    public CashKickContractMapper() {
        this.modelMapper = new ModelMapper();
    }

    public CashKickContract convertDtoToEntity(CashKickContractDto cashKickContractDto){
        return modelMapper.map(cashKickContractDto,CashKickContract.class);
    }

    public CashKickContractDto convertEntityToDto(CashKickContract cashKickContract){
        return modelMapper.map(cashKickContract, CashKickContractDto.class);
    }
}
