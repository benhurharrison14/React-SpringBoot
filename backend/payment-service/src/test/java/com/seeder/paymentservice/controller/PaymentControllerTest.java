package com.seeder.paymentservice.controller;

import static org.junit.jupiter.api.Assertions.*;

import com.seeder.paymentservice.dto.PaymentDto;
import com.seeder.paymentservice.service.PaymentService;
import com.seeder.paymentservice.service.PaymentServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest
class PaymentControllerTest {

    @MockBean
    private PaymentServiceImpl paymentService;

    private MockMvc mockMvc;

    @Autowired
    public PaymentControllerTest(MockMvc mockMvc){
        this.mockMvc = mockMvc;
    }

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }



    @Test
    void testCreatePayment() throws Exception {
        String payload = "{" +
                "\"paymentId\": \"0\"," +
                "\"dueDate\": \"2023-10-09\"," +
                "\"status\": \"upcoming\"," +
                "\"expectedAmount\": 12.0," +
                "\"outstandingAmount\": 1200000," +
                "\"userId\": 1" +
                "}";
        mockMvc.perform(post("/payments").contentType(MediaType.APPLICATION_JSON).content(payload)).andExpect(status().isOk());

    }

    @Test
    void testCreatePayemnt_InvalidData() throws Exception {

        String payload = "{" +
                "\"paymentId\": \"0\"," +
                "\"dueDate\": \"2023-10-09\"," +
                "\"status\": \"upcoming\"," +
                "\"expectedAmount\": 0.0," +
                "\"outstandingAmount\": 1200000," +
                "\"userId\": 1" +
                "}";
        mockMvc.perform(post("/payments").contentType(MediaType.APPLICATION_JSON).content(payload)).andExpect(status().isBadRequest());
    }

    @Test
    void  testGetPaymentByUserId() throws Exception {
        int userId = 1;
        PaymentDto paymentDto = new PaymentDto(1, 1, new Date(), "", 1.2, 1.2);
        List<PaymentDto> paymentDtoList = new ArrayList<>();
        paymentDtoList.add(paymentDto);
        when(paymentService.getAllPaymentByUserId(userId)).thenReturn(paymentDtoList);

        mockMvc.perform(get("/payments/1").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
    }
}
