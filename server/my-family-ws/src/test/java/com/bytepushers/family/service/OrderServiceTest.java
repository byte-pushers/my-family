package com.bytepushers.family.service;

import com.bytepushers.family.model.Account;
import com.bytepushers.family.model.Address;
import com.bytepushers.family.model.Order;
import com.bytepushers.family.repo.AccountRepository;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.CustomerCollection;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class OrderServiceTest {

    @Mock
    private AccountService accountService;

    @Mock
    private ApiService apiService;

    @Mock
    private Account account;

    @Mock
    private Address address;

    @Mock
    private Customer customer;

    @Mock
    private Order order;

    @Mock
    private AccountRepository accountRepository;

    @InjectMocks
    private OrderService orderService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void getOrCreateAccount_Test() throws StripeException {

        List<Customer> mockCustomers = new ArrayList<>();
        mockCustomers.add(customer);

        CustomerCollection customerCollectionMock = mock(CustomerCollection.class);
        when(customerCollectionMock.getData()).thenReturn(mockCustomers);

        try (MockedStatic<Customer> customerMockedStatic = mockStatic(Customer.class)) {
            customerMockedStatic.when(() -> Customer.list(anyMap())).thenReturn(customerCollectionMock);
            when(customer.getId()).thenReturn("existing-customer-id");

            String customerId = orderService.getOrCreateCustomer("zayan12@gmail.com");

            assertNotNull(customerId);
            assertEquals(mockCustomers.get(0).getId(), customerId);
        }
    }

    @Test
    public void processOrder_SuccessfulPayment_Test() throws StripeException {

        Address addressMock = new Address();
        addressMock.setAddressLine1("address line 1");
        addressMock.setAddressLine2("address line 2");
        addressMock.setCity("city");
        addressMock.setState("state");
        addressMock.setCountry("country");
        addressMock.setZipcode("79925");

        Account mockAccount = new Account();
        mockAccount.setEmail("zayan12@gmail.com");
        mockAccount.setFirstName("Zayan");
        mockAccount.setLastName("Doe");
        mockAccount.setAddress(addressMock);

        when(accountRepository.findByEmail("zayan12@gmail.com")).thenReturn(Optional.of(mockAccount));

        when(apiService.getStripeApiKey()).thenReturn("test_stripe_api_key");

       doReturn(mockAccount).when(accountService).getAccountByEmail("zayan12@gmail.com");

        when(account.getEmail()).thenReturn("zayan12@gmail.com");

        Account account1 = accountService.getAccountByEmail("zayan12@gmail.com");

        OrderService orderServiceSpy = spy(orderService);
        doReturn("customer-id-123").when(orderServiceSpy).getOrCreateCustomer(anyString());


        List<Order> testOrders = new ArrayList<>();
        testOrders.add(new Order("book", "testing", "new book", 50));
        testOrders.add(new Order("t-shirt", "v-neck", "new t-shirt", 15));

        Session mockSession = mock(Session.class);
        when(mockSession.getUrl()).thenReturn("https://checkout.stripe.com/test-url");

        try (MockedStatic<Session> mockedSession = mockStatic(Session.class)) {
            mockedSession.when(() -> Session.create(any(SessionCreateParams.class))).thenReturn(mockSession);
            String resultUrl = orderServiceSpy.processOrder(testOrders);

            assertNotNull(resultUrl);
            assertEquals("https://checkout.stripe.com/test-url", resultUrl);

        }
    }
}
