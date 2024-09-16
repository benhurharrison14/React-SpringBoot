package com.seeder.contractservice.service;

import com.seeder.contractservice.dto.ContractDTO;
import com.seeder.contractservice.entity.Contract;
import com.seeder.contractservice.exception.ContractsNotFoundException;
import com.seeder.contractservice.mapper.ContractMapper;
import com.seeder.contractservice.repository.ContractRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ContractServiceImplTest {

    @InjectMocks
    private ContractServiceImpl contractService;

    @Mock
    private ContractRepository contractRepository;

    @Mock
    private ContractMapper contractMapper;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllContracts() {
        Contract contract1 = new Contract();
        contract1.setContractId(1);
        contract1.setName("Contract 1");

        Contract contract2 = new Contract();
        contract2.setContractId(2);
        contract2.setName("Contract 2");

        List<Contract> contracts = new ArrayList<>();
        contracts.add(contract1);
        contracts.add(contract2);

        when(contractRepository.findAll()).thenReturn(contracts);
        when(contractMapper.convertEntityToDto(any()))
                .thenReturn(new ContractDTO(1, "Contract 1", "Type 1", 100.0, 12, "1200.0"))
                .thenReturn(new ContractDTO(2, "Contract 2", "Type 2", 150.0, 24, "3600.0"));

        List<ContractDTO> contractDTOs = contractService.getAllContracts();

        assertEquals(2, contractDTOs.size());
        assertEquals("Contract 1", contractDTOs.get(0).getName());
        assertEquals("Contract 2", contractDTOs.get(1).getName());
    }

    @Test
    void testGetAllContractsNoContractsFound() {
        when(contractRepository.findAll()).thenReturn(new ArrayList<>());
        assertThrows(ContractsNotFoundException.class, () -> contractService.getAllContracts());
    }

    @Test
    void testGetContractsByIds() {
        Contract contract1 = new Contract();
        contract1.setContractId(1);
        contract1.setName("Contract 1");

        Contract contract2 = new Contract();
        contract2.setContractId(2);
        contract2.setName("Contract 2");

        List<Contract> contracts = new ArrayList<>();
        contracts.add(contract1);
        contracts.add(contract2);
        when(contractRepository.findAllById(Arrays.asList(1, 2))).thenReturn(contracts);
        when(contractMapper.convertEntityToDto(any()))
                .thenReturn(new ContractDTO(1, "Contract 1", "Type 1", 100.0, 12, "1200.0"))
                .thenReturn(new ContractDTO(2, "Contract 2", "Type 2", 150.0, 24, "3600.0"));

        List<ContractDTO> contractDTOs = contractService.getContractsByIds(Arrays.asList(1, 2));

        assertEquals(2, contractDTOs.size());
        assertEquals("Contract 1", contractDTOs.get(0).getName());
        assertEquals("Contract 2", contractDTOs.get(1).getName());
    }

    @Test
    void testGetContractsByIdsNoContractsFound() {
        when(contractRepository.findAllById(Arrays.asList(3, 4)))
                .thenReturn(new ArrayList<>());
        assertThrowsContractsNotFoundExceptionForIds(Arrays.asList(3, 4));
    }
    private void assertThrowsContractsNotFoundExceptionForIds(List<Integer> ids) {
        assertThrows(ContractsNotFoundException.class, () -> contractService.getContractsByIds(ids));
    }

    @Test
    void testConvertDtoToEntity(){
        ContractMapper contractMapper1 = new ContractMapper();
        ContractDTO contractDTO = new ContractDTO(1, "Contract 1", "Type 1", 100.0, 12, "1200.0");
        Contract contract = new Contract(1, "Contract 1", "Type 1", 100.0, 12, "1200.0");

        Contract contract1 = contractMapper1.convertDtoToEntity(contractDTO);
        assertEquals(contract.getContractId(),contract1.getContractId());
    }

    @Test
    void testConvertEntityToDto(){
        ContractMapper contractMapper1 = new ContractMapper();
        ContractDTO contractDTO = new ContractDTO(1, "Contract 1", "Type 1", 100.0, 12, "1200.0");
        Contract contract = new Contract(1, "Contract 1", "Type 1", 100.0, 12, "1200.0");

        ContractDTO contractDTO1 = contractMapper1.convertEntityToDto(contract);
        assertEquals(contractDTO.getContractId(),contractDTO1.getContractId());
    }
}
