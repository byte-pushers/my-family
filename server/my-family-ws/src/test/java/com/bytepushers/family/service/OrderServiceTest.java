package com.bytepushers.family.service;

import com.bytepushers.family.model.Account;
import com.bytepushers.family.model.Address;
import com.bytepushers.family.model.Merchandise;
import com.bytepushers.family.model.Order;
import com.bytepushers.family.repo.AccountRepository;
import com.bytepushers.family.repo.OrderRepository;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.CustomerCollection;
import com.stripe.model.checkout.Session;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.checkout.SessionCreateParams;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
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
    private TaxService taxService;

    @Mock
    private OrderRepository orderRepository;

    @InjectMocks
    private OrderService orderService;

    @BeforeEach
    public void setUp() throws Exception {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void getOrCreateAccount_CustomerExists_ReturnExistingCustomerId() throws StripeException {

        Customer mockCustomer = mock(Customer.class);
        when(mockCustomer.getId()).thenReturn("existing-customer-id");

        CustomerCollection mockCustomerCollection = mock(CustomerCollection.class);
        when(mockCustomerCollection.getData()).thenReturn(Collections.singletonList(mockCustomer));

        try (MockedStatic<Customer> mockedCustomer = mockStatic(Customer.class)) {
            mockedCustomer.when(() -> Customer.list(any(Map.class))).thenReturn(mockCustomerCollection);

            // Call method
            String customerId = orderService.getOrCreateCustomer("zayan12@gmail.com");

            // Verify and assert
            assertNotNull(customerId);
            assertEquals("existing-customer-id", customerId);
        }
    }

    @Test
    public void getOrCreateCustomer_CustomerDoesNotExist_CreateNewCustomer() throws StripeException {

        Address addressMock = new Address();
        addressMock.setAddressLine1("address line 1");
        addressMock.setAddressLine2("address line 2");
        addressMock.setCity("city");
        addressMock.setState("state");
        addressMock.setCountry("country");
        addressMock.setZipcode("79925");

        // Mock Account
        Account mockAccount = new Account();
        mockAccount.setAddress(addressMock);

        // Mock `accountService.getAccountByEmail()`
        doReturn(mockAccount).when(accountService).getAccountByEmail(anyString());

        OrderService orderServiceSpy = Mockito.spy(orderService);
        ReflectionTestUtils.setField(orderServiceSpy, "accountService", accountService);

        CustomerCollection mockCustomerCollection = mock(CustomerCollection.class);
        when(mockCustomerCollection.getData()).thenReturn(Collections.emptyList());

        Customer mockNewCustomer = mock(Customer.class);
        when(mockNewCustomer.getId()).thenReturn("new-customer-id");

        try (MockedStatic<Customer> mockedCustomer = mockStatic(Customer.class)) {
            mockedCustomer.when(() -> Customer.list(any(Map.class))).thenReturn(mockCustomerCollection);
            mockedCustomer.when(()->Customer.create(any(CustomerCreateParams.class))).thenReturn(mockNewCustomer);

            // Call method
            String customerId = orderServiceSpy.getOrCreateCustomer("zayan12@gmail.com");

            // Verify and assert
            assertNotNull(customerId);
            assertEquals("new-customer-id", customerId);
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

       doReturn(mockAccount).when(accountService).getAccountByEmail("zayan12@gmail.com");

        Account account1 = accountService.getAccountByEmail("zayan12@gmail.com");

        OrderService orderServiceSpy = Mockito.spy(orderService);
        doReturn("customer-id-123").when(orderServiceSpy).getOrCreateCustomer(anyString());
        ReflectionTestUtils.setField(orderServiceSpy, "accountService", accountService);


        List<Order> testOrders = new ArrayList<>();
        testOrders.add(new Order("book", "testing", "new book", 50));
        testOrders.add(new Order("t-shirt", "v-neck", "new t-shirt", 15));

        Session mockSession = mock(Session.class);
        when(mockSession.getUrl()).thenReturn("https://checkout.stripe.com/test-url");

        try (MockedStatic<Session> mockedSession = mockStatic(Session.class)) {
            mockedSession.when(() -> Session.create(any(SessionCreateParams.class))).thenReturn(mockSession);
            String resultUrl = orderServiceSpy.processOrder(testOrders, "zayan12@gmail.com");

            assertNotNull(resultUrl);
           assertEquals("https://checkout.stripe.com/test-url", resultUrl);

        }
    }

    @Test
    public void processOrder_FailedPayment_Test() throws StripeException {

       OrderService orderServiceSpy = Mockito.spy(orderService);

        List<Order> testOrders = new ArrayList<>();
        testOrders.add(new Order("book", "testing", "new book", 50));
        testOrders.add(new Order("t-shirt", "v-neck", "new t-shirt", 15));

        Session mockSession = mock(Session.class);

        try (MockedStatic<Session> mockedSession = mockStatic(Session.class)) {
            mockedSession.when(() -> Session.create(any(SessionCreateParams.class))).thenReturn(mockSession);
            String resultUrl = orderServiceSpy.processOrder(testOrders, "zayan12@gmail.com");

            assertEquals("Account not found", resultUrl);

        }
    }

    @Test
    public void saveOrder_SavesAllProducts() {

        List<Order> mockOrders = Arrays.asList(
                new Order("book", "testing", "new book", 50.0),
                new Order("t-shirt", "v-neck", "new t-shirt", 15.0)
        );

       // when(orderRepository.saveAll(anyList())).thenReturn(mockOrders);

        List<Order> orders = orderService.saveOrder(mockOrders);

        assertNotNull(orders);
        //assertEquals(2, orders.size());
    }
}
