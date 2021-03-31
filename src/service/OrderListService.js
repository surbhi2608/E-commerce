import axios from 'axios';

const ORDER_LIST_API_BASE_URL = 'http://localhost:8080/OrderList';

class OrderListService {

    fetchOrderLists() {
        return axios.get(ORDER_LIST_API_BASE_URL);
    }

    fetchOrderListById(listId) {
        return axios.get(ORDER_LIST_API_BASE_URL + '/' + listId);
    }

    fetchOrderListByOrderId(orderId) {
        return axios.get(ORDER_LIST_API_BASE_URL + '/order/' + orderId);
    }

    fetchOrderListByBookId(bookId) {
        return axios.get(ORDER_LIST_API_BASE_URL + '/book/' + bookId);
    }
    
    deleteOrderList(listId) {
        return axios.delete(ORDER_LIST_API_BASE_URL + '/' + listId);
    }

    addOrderList(list) {
        return axios.post(""+ORDER_LIST_API_BASE_URL, list);
    }

    editOrderList(list) {
        return axios.put(ORDER_LIST_API_BASE_URL + '/' + list.id, list);
    }
    
}

export default new OrderListService();