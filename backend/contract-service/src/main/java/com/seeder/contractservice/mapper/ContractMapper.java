package com.seeder.contractservice.mapper;

import com.seeder.contractservice.dto.ContractDTO;
import com.seeder.contractservice.entity.Contract;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class ContractMapper {
    private final ModelMapper modelMapper;


    public ContractMapper() {
        this.modelMapper = new ModelMapper();
    }

    public Contract convertDtoToEntity(ContractDTO contractDTO){
        return modelMapper.map(contractDTO,Contract.class);
    }

    public ContractDTO convertEntityToDto(Contract contract){
        return modelMapper.map(contract, ContractDTO.class);
    }

}
