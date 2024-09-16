package com.seeder.cashkickservice.service;

import com.seeder.cashkickservice.dto.CashKickContractDto;
import com.seeder.cashkickservice.entity.CashKickContract;
import com.seeder.cashkickservice.exception.CashKickNotFoundException;
import com.seeder.cashkickservice.mapper.CashKickContractMapper;
import com.seeder.cashkickservice.repository.CashKickContractRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.times;

class CashKickContractServiceImplTest {
    @InjectMocks
    private CashKickContractServiceImpl cashKickContractService;

    @Mock
    private CashKickContractRepository cashKickContractRepository;

    @Mock
    private CashKickContractMapper cashKickContractMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSaveSelectedContracts() {
        CashKickContractDto cashKickContractDto = new CashKickContractDto();
        CashKickContract cashKickContract = new CashKickContract();

        when(cashKickContractMapper.convertDtoToEntity(cashKickContractDto)).thenReturn(cashKickContract);
        when(cashKickContractRepository.save(cashKickContract)).thenReturn(cashKickContract);

        CashKickContractDto result = cashKickContractService.saveSelectedContracts(cashKickContractDto);

        verify(cashKickContractMapper, times(1)).convertDtoToEntity(cashKickContractDto);
        verify(cashKickContractRepository, times(1)).save(cashKickContract);
    }

    @Test
    void testGetContractsByCashKickId() {
        int cashKickId = 1;
        CashKickContract contract1 = new CashKickContract(1,1,2,2000);
        CashKickContract contract2 = new CashKickContract(2,1,2,3000);
        List<CashKickContract> contracts = Arrays.asList(contract1, contract2);

        when(cashKickContractRepository.findByCashKickId(cashKickId)).thenReturn(contracts);

        List<CashKickContract> result = cashKickContractService.getContractsByCashKickId(cashKickId);
        verify(cashKickContractRepository, times(2)).findByCashKickId(cashKickId);
    }

    @Test
    void testGetContractsByCashKickId_NoContractsFound() {
        int cashKickId = 1;
        when(cashKickContractRepository.findByCashKickId(cashKickId)).thenReturn(new ArrayList<>());
        assertThrows(CashKickNotFoundException.class, () -> cashKickContractService.getContractsByCashKickId(cashKickId));
    }

    @Test
    void testCovertEntityToDto(){
        CashKickContractMapper cashKickContractMapper1 = new CashKickContractMapper();
        CashKickContract contract1 = new CashKickContract(1,1,2,2000);
        CashKickContractDto cashKickContractDto = new CashKickContractDto(1,1,2,2000);

        CashKickContractDto cashKickContractDto1 = cashKickContractMapper1.convertEntityToDto(contract1);
        assertEquals(cashKickContractDto.getCashContractId(), cashKickContractDto1.getCashContractId());
    }

    @Test
    void testConvertDtoToEntity(){
        CashKickContractMapper cashKickContractMapper1 = new CashKickContractMapper();

        CashKickContract contract1 = new CashKickContract(1,1,2,2000);
        CashKickContractDto cashKickContractDto = new CashKickContractDto(1,1,2,2000);

        CashKickContract cashKickContract = cashKickContractMapper1.convertDtoToEntity(cashKickContractDto);
        assertEquals(contract1.getCashKickId(),cashKickContract.getCashKickId());
    }


}
