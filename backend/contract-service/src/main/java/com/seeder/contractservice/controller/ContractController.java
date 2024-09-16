package com.seeder.contractservice.controller;


import com.seeder.contractservice.dto.ContractDTO;
import com.seeder.contractservice.service.ContractService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/contracts")
@Slf4j
public class ContractController {


    private final ContractService contractService;

    public ContractController(ContractService contractService) {
        this.contractService = contractService;
    }

    @GetMapping
    public List<ContractDTO> getAllContracts(@RequestParam(required = false) List<Integer> ids) {
        if (ids.isEmpty()) {
            log.info(">>> Contract Controller : getAllContracts ");
            return contractService.getAllContracts();
        }
        log.info(">>> Contract Controller : getAllContractsByIds " + ids);
        return contractService.getContractsByIds(ids);
    }

}
