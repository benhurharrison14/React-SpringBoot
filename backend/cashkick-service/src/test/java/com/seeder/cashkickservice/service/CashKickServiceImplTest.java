package com.seeder.cashkickservice.service;

import com.seeder.cashkickservice.dto.CashKickDto;
import com.seeder.cashkickservice.entity.CashKick;
import com.seeder.cashkickservice.exception.CashKickAlreadyExistsException;
import com.seeder.cashkickservice.exception.CashKickNotFoundException;
import com.seeder.cashkickservice.exception.ErrorResponse;
import com.seeder.cashkickservice.exception.ExceptionHandlers;
import com.seeder.cashkickservice.mapper.CashKickMapper;
import com.seeder.cashkickservice.repository.CashKickRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class CashKickServiceImplTest {

    @InjectMocks
    private CashKickServiceImpl cashKickService;

    @Mock
    private CashKickRepository cashKickRepository;

    @Mock
    private CashKickMapper cashKickMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetCashKick() {
        int userId = 123;
        List<CashKick> expectedCashKicks = new ArrayList<>();
        expectedCashKicks.add(new CashKick());

        when(cashKickRepository.findByUserId(userId)).thenReturn(expectedCashKicks);
        List<CashKick> resultCashKicks = cashKickService.getCashKick(userId);
        assertEquals(expectedCashKicks.size(), resultCashKicks.size());
    }

    @Test
    void testGetCashKick_NoCashKicksFound() {
        int userId = 123;
        when(cashKickRepository.findByUserId(userId)).thenReturn(new ArrayList<>());
        assertThrows(CashKickNotFoundException.class, () -> cashKickService.getCashKick(userId));
    }

    @Test
    void testSaveCashKick() {
        CashKickDto cashKickDto = new CashKickDto();
        CashKick cashKick = new CashKick();

        when(cashKickMapper.convertDtoToEntity(cashKickDto)).thenReturn(cashKick);
        when(cashKickRepository.save(cashKick)).thenReturn(cashKick);

        CashKickDto result = cashKickService.saveCashKick(cashKickDto);
        verify(cashKickMapper, times(1)).convertDtoToEntity(cashKickDto);
        verify(cashKickRepository, times(1)).save(cashKick);
    }

    @Test
    void testSaveCashKick_DuplicateName() {
        CashKickDto cashKickDto = new CashKickDto();
        cashKickDto.setUserId(1);
        cashKickDto.setRate(12);
        when(cashKickRepository.existsByName(cashKickDto.getName())).thenReturn(true);
        CashKickAlreadyExistsException cashKickAlreadyExistsException = new CashKickAlreadyExistsException("Cash kick already exists");
        ExceptionHandlers exceptionHandlers = new ExceptionHandlers();
        ResponseEntity<ErrorResponse> response = exceptionHandlers.handleCashKickAlreadyExistsException(cashKickAlreadyExistsException);
        assertThrows(CashKickAlreadyExistsException.class, () -> cashKickService.saveCashKick(cashKickDto));
        assertEquals(HttpStatus.FORBIDDEN.value(),response.getStatusCode().value());
    }

    @Test
    void testCashKickNotFoundException(){
        int cashKickId = 1;
        CashKickNotFoundException cashKickGlobalException = new CashKickNotFoundException("No CashKick found with cashKickid : " + cashKickId);
        ExceptionHandlers exceptionHandlers = new ExceptionHandlers();
        ResponseEntity<ErrorResponse> response = exceptionHandlers.handleException(cashKickGlobalException);
        assertEquals(HttpStatus.NOT_FOUND.value(),response.getStatusCode().value());
    }

    @Test
    void testErrorResponse() {
        ErrorResponse errorResponse = new ErrorResponse();
        Long time = System.currentTimeMillis();
        errorResponse.setStatus(404);
        errorResponse.setMessage("Not Found");
        errorResponse.setTimeStamp(time);

        assertEquals(404, errorResponse.getStatus());
        assertEquals("Not Found", errorResponse.getMessage());
        assertEquals(time,errorResponse.getTimeStamp());
    }

    @Test
    void testConvertDtoToEntity() {
        CashKickMapper cashKickMapper1 = new CashKickMapper();
        CashKick cashKick = new CashKick(1, "name","status",new Date(), 1.0,1.0,12,new Date(), new Date(), 1);
        CashKickDto cashKickDto = new CashKickDto(1, "name","status",new Date(), 1.0,1.0,12,new Date(), new Date(), 1);

        CashKick cashKick1 = cashKickMapper1.convertDtoToEntity(cashKickDto);
        assertEquals(cashKick.getCashKickId(), cashKick1.getCashKickId());
    }

    @Test
    void testConvertEntityToDto(){
        CashKickMapper cashKickMapper1 = new CashKickMapper();
        CashKick cashKick = new CashKick(1, "name","status",new Date(), 1.0,1.0,12,new Date(), new Date(), 1);
        CashKickDto cashKickDto = new CashKickDto(1, "name","status",new Date(), 1.0,1.0,12,new Date(), new Date(), 1);

        CashKickDto cashKickDto1 = cashKickMapper1.convertEntityToDto(cashKick);
        assertEquals(cashKickDto.getCashKickId(), cashKickDto1.getCashKickId());
    }
}
