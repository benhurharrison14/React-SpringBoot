package com.seeder.contractservice.service;

import com.seeder.contractservice.dto.ContractDTO;
import com.seeder.contractservice.entity.Contract;
import com.seeder.contractservice.exception.ContractsNotFoundException;
import com.seeder.contractservice.mapper.ContractMapper;
import com.seeder.contractservice.repository.ContractRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContractServiceImpl implements ContractService{

    private final ContractRepository contractRepository;


    private final ContractMapper contractMapper;

    public ContractServiceImpl(ContractRepository contractRepository, ContractMapper contractMapper) {
        this.contractRepository = contractRepository;
        this.contractMapper = contractMapper;
    }

    @Override
    public List<ContractDTO> getAllContracts() {
        List<Contract> contractList = contractRepository.findAll();
        if (contractList.isEmpty()){
            throw new ContractsNotFoundException("No Contracts available");
        }
        return contractList.stream()
                .map(this::entityToDto)
                .toList();
    }

    @Override
    public List<ContractDTO> getContractsByIds(List<Integer> ids) {
        List<Contract> contractList = contractRepository.findAllById(ids);
        if (contractList.isEmpty()) {
            throw new ContractsNotFoundException("No Contracts found with the provided IDs");
        }
        return contractList.stream()
                .map(this::entityToDto)
                .toList();
    }


    private ContractDTO entityToDto(Contract contract) {
        return contractMapper.convertEntityToDto(contract);
    }

}
