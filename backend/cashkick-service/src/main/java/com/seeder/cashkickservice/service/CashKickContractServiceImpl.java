package com.seeder.cashkickservice.service;

import com.seeder.cashkickservice.dto.CashKickContractDto;
import com.seeder.cashkickservice.entity.CashKickContract;
import com.seeder.cashkickservice.exception.CashKickNotFoundException;
import com.seeder.cashkickservice.mapper.CashKickContractMapper;
import com.seeder.cashkickservice.repository.CashKickContractRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CashKickContractServiceImpl implements CashKickContractService{

    private final CashKickContractRepository cashKickContractRepository;


    private final CashKickContractMapper cashKickContractMapper;

    public CashKickContractServiceImpl(CashKickContractRepository cashKickContractRepository, CashKickContractMapper cashKickContractMapper) {
        this.cashKickContractRepository = cashKickContractRepository;
        this.cashKickContractMapper = cashKickContractMapper;
    }

    @Override
    public CashKickContractDto saveSelectedContracts(CashKickContractDto cashKickContractDto) {
        CashKickContract savedContract = cashKickContractRepository.save(cashKickContractMapper.convertDtoToEntity(cashKickContractDto));
        return cashKickContractMapper.convertEntityToDto(savedContract);
    }

    @Override
    public List<CashKickContract> getContractsByCashKickId(int cashKickId) {
        List<CashKickContract> cashKickContractList = cashKickContractRepository.findByCashKickId(cashKickId);
        if(cashKickContractList.isEmpty())
            throw new CashKickNotFoundException("No Contracts found with cashkickid : " + cashKickId);
        return cashKickContractRepository.findByCashKickId(cashKickId);
    }
}
