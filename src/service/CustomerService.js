import axios from 'axios';

const CUSTOMER_API_BASE_URL = 'http://localhost:8080/Customer';

class CustomerService {

    fetchCustomers() {
        return axios.get(CUSTOMER_API_BASE_URL);
    }

    fetchCustomerById(custId) {
        return axios.get(CUSTOMER_API_BASE_URL + '/' + custId);
    }

    loginCustomer(customer) {
        return axios.put(CUSTOMER_API_BASE_URL + '/login', customer);
    }

    deleteCustomer(custId) {
        return axios.delete(CUSTOMER_API_BASE_URL + '/' + custId);
    }

    addCustomer(customer) {
        return axios.post(""+CUSTOMER_API_BASE_URL, customer);
    }

    editCustomer(customer) {
        return axios.put(CUSTOMER_API_BASE_URL + '/' + customer.id, customer);
    }

    getOrderId(custId) {
        return axios.get(CUSTOMER_API_BASE_URL + '/orderid/' + custId);
    }

    getAddress(custId) {
        return axios.get(CUSTOMER_API_BASE_URL + '/getAddress/' + custId);
    }

    addAddress(customer) {
        return axios.put(CUSTOMER_API_BASE_URL + '/address/' + customer.id, customer);
    }

}

export default new CustomerService();