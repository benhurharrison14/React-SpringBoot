package com.seeder.cashkickservice.service;

import com.seeder.cashkickservice.dto.CashKickDto;
import com.seeder.cashkickservice.entity.CashKick;
import com.seeder.cashkickservice.exception.CashKickAlreadyExistsException;
import com.seeder.cashkickservice.exception.CashKickNotFoundException;
import com.seeder.cashkickservice.mapper.CashKickMapper;
import com.seeder.cashkickservice.repository.CashKickRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CashKickServiceImpl implements CashKickService{


    private final CashKickRepository cashKickRepository;


    private final CashKickMapper cashKickMapper;

    public CashKickServiceImpl(CashKickRepository cashKickRepository, CashKickMapper cashKickMapper) {
        this.cashKickRepository = cashKickRepository;
        this.cashKickMapper = cashKickMapper;
    }

    @Override
    public List<CashKick> getCashKick(int userId) {
        List<CashKick> cashKicks = cashKickRepository.findByUserId(userId);
        if(cashKicks.isEmpty())
            throw new CashKickNotFoundException("No cashkicks found with userId : " + userId);
        return cashKicks;
    }

    @Override
    public CashKickDto saveCashKick(CashKickDto cashKickDto) {
        if(cashKickRepository.existsByName(cashKickDto.getName())){
            throw new CashKickAlreadyExistsException("CashKick already exists");
        }
        CashKick cashKick = cashKickRepository.save(cashKickMapper.convertDtoToEntity(cashKickDto));
        return cashKickMapper.convertEntityToDto(cashKick);
    }
}
