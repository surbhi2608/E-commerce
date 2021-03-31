import axios from 'axios';

const ORDER_API_BASE_URL = 'http://localhost:8080/Order';

class OrderService {

    fetchOrders() {
        return axios.get(ORDER_API_BASE_URL);
    }

    fetchOrderById(orderId) {
        return axios.get(ORDER_API_BASE_URL + '/' + orderId);
    }

    fetchOrderByCustId(custId) {
        return axios.get(ORDER_API_BASE_URL + '/customer/' + custId);
    }
    
    deleteOrder(orderId) {
        return axios.delete(ORDER_API_BASE_URL + '/' + orderId);
    }

    addOrder(order) {
        return axios.post(""+ORDER_API_BASE_URL, order);
    }

    editOrder(order) {
        return axios.put(ORDER_API_BASE_URL + '/' + order.id, order);
    }
    
}

export default new OrderService();