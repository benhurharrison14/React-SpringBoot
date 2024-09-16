package com.seeder.cashkickservice.controller;
import com.seeder.cashkickservice.dto.CashKickContractDto;
import com.seeder.cashkickservice.dto.CashKickDto;
import com.seeder.cashkickservice.entity.CashKick;
import com.seeder.cashkickservice.entity.CashKickContract;
import com.seeder.cashkickservice.exception.CashKickAlreadyExistsException;
import com.seeder.cashkickservice.exception.ErrorResponse;
import com.seeder.cashkickservice.exception.ExceptionHandlers;
import com.seeder.cashkickservice.service.CashKickContractService;
import com.seeder.cashkickservice.service.CashKickContractServiceImpl;
import com.seeder.cashkickservice.service.CashKickService;
import com.seeder.cashkickservice.service.CashKickServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.method.annotation.MethodArgumentConversionNotSupportedException;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest
class CashKickControllerTest {

    private CashKickController cashKickController;

    @MockBean
    private CashKickService cashKickService;

    @MockBean
    private CashKickContractServiceImpl cashKickContractService;

    private MockMvc mockMvc;

    @Autowired
    public CashKickControllerTest(MockMvc mockMvc, CashKickController cashKickController){
        this.mockMvc = mockMvc;
        this.cashKickController = cashKickController;
    }

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }



    @Test
    void testSaveCashKick() {
        CashKickDto cashKickDto = new CashKickDto();
        when(cashKickService.saveCashKick(cashKickDto)).thenReturn(cashKickDto);

        CashKickDto result = cashKickController.saveCashKick(cashKickDto);

        assertEquals(cashKickDto, result);
        verify(cashKickService, times(1)).saveCashKick(cashKickDto);
    }

    @Test
    void testGetCashKicksByEmail() {
        int userId = 1;
        CashKick cashKick = new CashKick(1, "name","status",new Date(), 1.0,1.0,12,new Date(), new Date(), 1);

        List<CashKick> cashKicks = new ArrayList<>();
        cashKicks.add(cashKick);
        when(cashKickService.getCashKick(userId)).thenReturn(cashKicks);

        List<CashKick> result = cashKickController.getCashKicksByEmail(userId);

        assertEquals(cashKicks, result);
        verify(cashKickService, times(1)).getCashKick(userId);
    }

    @Test
    void testGetContractsByCashKickId() {
        int cashKickId = 1;
        List<CashKickContract> cashKickContracts = Collections.singletonList(new CashKickContract());
        when(cashKickContractService.getContractsByCashKickId(cashKickId)).thenReturn(cashKickContracts);

        List<CashKickContract> result = cashKickController.getContractsByCashKickId(cashKickId);

        assertEquals(cashKickContracts, result);
        verify(cashKickContractService, times(1)).getContractsByCashKickId(cashKickId);
    }

    @Test
    void testSaveSelectedContracts() {
        CashKickContractDto cashKickContractDto = new CashKickContractDto();
        when(cashKickContractService.saveSelectedContracts(cashKickContractDto)).thenReturn(cashKickContractDto);

        CashKickContractDto result = cashKickController.saveSelectedContracts(cashKickContractDto);

        assertEquals(cashKickContractDto, result);
        verify(cashKickContractService, times(1)).saveSelectedContracts(cashKickContractDto);
    }

    @Test
    void testSaveCashKick_with_invalid_post_data() throws Exception {
        String payload = "{\"id\": 1, \"name\": \"\", \"email\": \"rajesh@gmail.com\",\"password\":\"$2a$10$TqzNnZa////f4LOAVd4bn.dI5UL/xUWMamUdVPET5fNVkW9ZsAwlW\",\"creditBalance\": 4.35}";

        mockMvc.perform(post("/cashkicks").contentType(MediaType.APPLICATION_JSON).content(payload)).andExpect(status().isBadRequest());

    }

}
