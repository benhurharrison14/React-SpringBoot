package com.seeder.cashkickservice.mapper;

import com.seeder.cashkickservice.dto.CashKickDto;
import com.seeder.cashkickservice.entity.CashKick;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class CashKickMapper {

    private final ModelMapper modelMapper;


    public CashKickMapper() {
        this.modelMapper = new ModelMapper();
    }

    public CashKick convertDtoToEntity(CashKickDto cashKickDto){
        return modelMapper.map(cashKickDto,CashKick.class);
    }

    public CashKickDto convertEntityToDto(CashKick cashKick){
        return modelMapper.map(cashKick, CashKickDto.class);
    }

}
