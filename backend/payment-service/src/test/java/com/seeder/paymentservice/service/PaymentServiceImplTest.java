package com.seeder.paymentservice.service;


import com.seeder.paymentservice.dto.PaymentDto;
import com.seeder.paymentservice.entity.PaymentEntity;
import com.seeder.paymentservice.exception.ErrorResponse;
import com.seeder.paymentservice.exception.ExceptionHandler;
import com.seeder.paymentservice.exception.PaymentAlreadyExistsException;
import com.seeder.paymentservice.exception.PaymentNotFoundException;
import com.seeder.paymentservice.mapper.PaymentMapper;
import com.seeder.paymentservice.repository.PaymentRepository;
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

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class PaymentServiceImplTest {

    @Mock
    private PaymentRepository paymentRepository;

    @Mock
    private PaymentMapper paymentMapper;

    @InjectMocks
    private PaymentServiceImpl paymentService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testSavePayment() {
        PaymentDto paymentDto = new PaymentDto();
        paymentDto.setDueDate(new Date());

        PaymentEntity paymentEntity = new PaymentEntity();
        when(paymentMapper.convertDtoToEntity(paymentDto)).thenReturn(paymentEntity);
        when(paymentRepository.existsByDueDate(paymentDto.getDueDate())).thenReturn(false);
        when(paymentRepository.save(paymentEntity)).thenReturn(paymentEntity);
        when(paymentMapper.convertEntityToDto(paymentEntity)).thenReturn(paymentDto);
        PaymentDto savedPayment = paymentService.savePayment(paymentDto);

        assertNotNull(savedPayment);
        assertEquals(paymentDto, savedPayment);
        verify(paymentRepository, times(1)).existsByDueDate(paymentDto.getDueDate());
        verify(paymentRepository, times(1)).save(paymentEntity);

        when(paymentRepository.existsByDueDate(paymentDto.getDueDate())).thenReturn(true);
        assertThrows(PaymentAlreadyExistsException.class, () -> {
            paymentService.savePayment(paymentDto);
        });
        verify(paymentRepository, times(2)).existsByDueDate(paymentDto.getDueDate());
        verify(paymentRepository, times(1)).save(paymentEntity);
    }


    @Test
    void testGetAllPaymentByUserId() {
        int userId = 1;
        List<PaymentEntity> paymentEntityList = new ArrayList<>();

        when(paymentRepository.findAllByUserId(userId)).thenReturn(paymentEntityList);

        assertThrows(PaymentNotFoundException.class, () -> {
            paymentService.getAllPaymentByUserId(userId);
        });

        verify(paymentRepository, times(1)).findAllByUserId(userId);

        PaymentEntity samplePaymentEntity = new PaymentEntity();
        paymentEntityList.add(samplePaymentEntity);

        when(paymentRepository.findAllByUserId(userId)).thenReturn(paymentEntityList);
        List<PaymentDto> result = paymentService.getAllPaymentByUserId(userId);

        assertNotNull(result);
        assertFalse(result.isEmpty());
        verify(paymentRepository, times(2)).findAllByUserId(userId);
    }


    @Test
    void testPaymentAlreadyExistsException(){
        PaymentAlreadyExistsException GlobalException =new PaymentAlreadyExistsException("This CashKick already exists");
        ExceptionHandler exceptionHandlers = new ExceptionHandler();
        ResponseEntity<ErrorResponse> response = exceptionHandlers.paymentAlreadyExistException(GlobalException);
        assertEquals(HttpStatus.FORBIDDEN.value(),response.getStatusCode().value());
    }
    @Test
    void testPaymentNotFoundException(){
        int userId=1;
        PaymentNotFoundException GlobalException = new PaymentNotFoundException("No CashKick found with cashKickid : " + userId);
        ExceptionHandler exceptionHandlers = new ExceptionHandler();
        ResponseEntity<ErrorResponse> response = exceptionHandlers.paymentsNotFoundException(GlobalException);
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
        PaymentMapper paymentMapper = new PaymentMapper();
        PaymentDto paymentDto = new PaymentDto();
        paymentDto.setPaymentId(1);
        paymentDto.setUserId(123);
        paymentDto.setDueDate(new Date());

        PaymentEntity paymentEntity = paymentMapper.convertDtoToEntity(paymentDto);

        assertEquals(paymentDto.getPaymentId(), paymentEntity.getPaymentId());
        assertEquals(paymentDto.getUserId(), paymentEntity.getUserId());
        assertEquals(paymentDto.getDueDate(), paymentEntity.getDueDate());
    }

    @Test
    void testConvertEntityToDto() {
        PaymentMapper paymentMapper = new PaymentMapper();
        PaymentEntity paymentEntity = new PaymentEntity();
        paymentEntity.setPaymentId(1);
        paymentEntity.setUserId(123);
        paymentEntity.setDueDate(new Date());

        PaymentDto paymentDto = paymentMapper.convertEntityToDto(paymentEntity);

        assertEquals(paymentEntity.getPaymentId(), paymentDto.getPaymentId());
        assertEquals(paymentEntity.getUserId(), paymentDto.getUserId());
        assertEquals(paymentEntity.getDueDate(), paymentDto.getDueDate());
    }
}
