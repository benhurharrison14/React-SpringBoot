package com.seeder.cashkickservice.controller;


import com.seeder.cashkickservice.dto.CashKickContractDto;
import com.seeder.cashkickservice.dto.CashKickDto;
import com.seeder.cashkickservice.entity.CashKick;
import com.seeder.cashkickservice.entity.CashKickContract;
import com.seeder.cashkickservice.service.CashKickContractService;
import com.seeder.cashkickservice.service.CashKickService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cashkicks")
@Slf4j
public class CashKickController {


    private final CashKickService cashKickService;


    private final CashKickContractService cashKickContractService;


    public CashKickController(CashKickService cashKickService, CashKickContractService cashKickContractService) {
        this.cashKickService = cashKickService;
        this.cashKickContractService = cashKickContractService;
    }

    @PostMapping
    public CashKickDto saveCashKick(@Valid @RequestBody CashKickDto cashKickDto){
        log.info(">>> CashKick Controller : saveCashKick "+ cashKickDto);
        return cashKickService.saveCashKick(cashKickDto);
    }

    @GetMapping("/getCashKicks/{userId}")
    public List<CashKick> getCashKicksByEmail(@PathVariable int userId){
        log.info(">>> CashKick Controller : getCashkicks created by user "+ userId);
        return cashKickService.getCashKick(userId);
    }

    @GetMapping("/{cashKickId}")
    public List<CashKickContract> getContractsByCashKickId(@PathVariable int cashKickId){
        log.info(">>> CashKick Controller : getSelectedContracts "+ cashKickId);
        return cashKickContractService.getContractsByCashKickId(cashKickId);
    }

    @PostMapping("/saveSelectedContracts")
    public CashKickContractDto saveSelectedContracts(@RequestBody CashKickContractDto cashKickContractDto){
        log.info(">>> CashKick Controller : saveSelectedContracta "+ cashKickContractDto);
        return cashKickContractService.saveSelectedContracts(cashKickContractDto);
    }
}
