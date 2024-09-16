package com.seeder.cashkickservice.service;

import com.seeder.cashkickservice.dto.CashKickContractDto;
import com.seeder.cashkickservice.entity.CashKickContract;

import java.util.List;

public interface CashKickContractService {
    public CashKickContractDto saveSelectedContracts(CashKickContractDto cashKickContractDto);

    public List<CashKickContract> getContractsByCashKickId(int cashKickId);
}
