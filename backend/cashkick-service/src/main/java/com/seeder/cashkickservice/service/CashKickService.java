package com.seeder.cashkickservice.service;

import com.seeder.cashkickservice.dto.CashKickDto;
import com.seeder.cashkickservice.entity.CashKick;

import java.util.List;

public interface CashKickService {
    List<CashKick> getCashKick(int userId);

    CashKickDto saveCashKick(CashKickDto cashKickDto);
}

