package com.seeder.contractservice.controller;

import com.seeder.contractservice.dto.ContractDTO;
import com.seeder.contractservice.service.ContractService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;

class ContractControllerTest {

    private MockMvc mockMvc;

    @Mock
    private ContractService contractService;

    @InjectMocks
    private ContractController contractController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(contractController).build();
    }

    @Test
    void testGetAllContracts() throws Exception {
        List<ContractDTO> contractList = new ArrayList<>();
        ContractDTO contract1 = new ContractDTO(1, "Contract 1", "Type 1", 100.0, 12, "1200.0");
        ContractDTO contract2 = new ContractDTO(2, "Contract 2", "Type 2", 200.0, 24, "4800.0");
        contractList.add(contract1);
        contractList.add(contract2);
        when(contractService.getAllContracts()).thenReturn(contractList);
        mockMvc.perform(get("/contracts")
                        .param("ids", "") // Empty 'ids' parameter
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].contractId", is(1)))
                .andExpect(jsonPath("$[0].name", is("Contract 1")))
                .andExpect(jsonPath("$[0].type", is("Type 1")))
                .andExpect(jsonPath("$[0].perPayment", is(100.0)))
                .andExpect(jsonPath("$[0].termLength", is(12)))
                .andExpect(jsonPath("$[0].paymentAmount", is("1200.0")))
                .andExpect(jsonPath("$[1].contractId", is(2)))
                .andExpect(jsonPath("$[1].name", is("Contract 2")))
                .andExpect(jsonPath("$[1].type", is("Type 2")))
                .andExpect(jsonPath("$[1].perPayment", is(200.0)))
                .andExpect(jsonPath("$[1].termLength", is(24)))
                .andExpect(jsonPath("$[1].paymentAmount", is("4800.0")));
    }

    @Test
    void testGetAllContractsByIds() throws Exception {
        List<Integer> ids = Arrays.asList(1, 2);

        ContractDTO contract1 = new ContractDTO(1, "Contract 1", "Type 1", 100.0, 12, "1200.0");
        ContractDTO contract2 = new ContractDTO(2, "Contract 2", "Type 2", 200.0, 24, "4800.0");
        when(contractService.getContractsByIds(ids)).thenReturn(Arrays.asList(contract1, contract2));
        mockMvc.perform(get("/contracts")
                        .param("ids", "1,2")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].contractId", is(1)))
                .andExpect(jsonPath("$[0].name", is("Contract 1")))
                .andExpect(jsonPath("$[0].type", is("Type 1")))
                .andExpect(jsonPath("$[0].perPayment", is(100.0)))
                .andExpect(jsonPath("$[0].termLength", is(12)))
                .andExpect(jsonPath("$[0].paymentAmount", is("1200.0")))
                .andExpect(jsonPath("$[1].contractId", is(2)))
                .andExpect(jsonPath("$[1].name", is("Contract 2")))
                .andExpect(jsonPath("$[1].type", is("Type 2")))
                .andExpect(jsonPath("$[1].perPayment", is(200.0)))
                .andExpect(jsonPath("$[1].termLength", is(24)))
                .andExpect(jsonPath("$[1].paymentAmount", is("4800.0")));
    }
}
