package com.bytepushers.family.controller;

import com.bytepushers.family.model.Order;
import com.bytepushers.family.service.AccountService;
import com.bytepushers.family.service.ApiService;
import com.bytepushers.family.service.OrderService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.springframework.mock.http.server.reactive.MockServerHttpRequest.post;

@WebMvcTest(PaymentController.class)
@AutoConfigureMockMvc(addFilters = false)
@ExtendWith(MockitoExtension.class)
public class PaymentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private OrderService orderService;

    @MockBean
    private ApiService apiService;

    @MockBean
    private AccountService accountService;

    @Test
    public void paymentTest_ReturnsPaymentURL() throws Exception {
        List<Order> Orders = Arrays.asList(
                new Order("book","testing", "new book", 50.0),
                new Order("t-shirt", "v-neck", "new t-shirt", 15.0)
        );

        given(apiService.getStripeApiKey()).willReturn("sk_test_12345");

        given(orderService.processOrder(anyList(), anyString()))
                .willReturn("your payment has successfully completed with id: " +"https://checkout.stripe.com/test-url");

       ResultActions response = mockMvc.perform(MockMvcRequestBuilders.get("/api/payments")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(Orders))
                                .header("X-API-Version", "1.0.0")
                                .param("email", "test@gmail.com"));
       response.andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void createOrderAndReturnsOrder() throws Exception {
        List<Order> Orders = Arrays.asList(
                new Order("book","testing", "new book", 50.0),
                new Order("t-shirt", "v-neck", "new t-shirt", 15.0)
        );

        given(orderService.saveOrder(anyList())).willReturn(Orders);

        ResultActions response = mockMvc.perform(MockMvcRequestBuilders.post("/api/orders")
                                    .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(Orders))
                .header("X-API-Version", "1.0.0"));
        response.andExpect(MockMvcResultMatchers.status().isCreated());
        response.andExpect(MockMvcResultMatchers.content().json(objectMapper.writeValueAsString(Orders)));
    }
}
