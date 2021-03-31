import React, { Component } from 'react'
import OrderService from "../../service/OrderService";

class OrderHistoryComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            orders: [],
            message: null
        }
        this.deleteOrder = this.deleteOrder.bind(this);
        this.reloadOrderList = this.reloadOrderList.bind(this);
    }

    componentDidMount() {
        this.reloadOrderList();
    }

    reloadOrderList() {

        if(window.localStorage.getItem("customerId") === 'undefined') {
            this.props.history.push('/loginCustomer');
        }

        let custId = window.localStorage.getItem("customerId");
        OrderService.fetchOrderByCustId(custId)
            .then((res) => {
                console.log("check : ", res);
                this.setState({orders: res.data.data});
            }).catch(error => {
                console.log("Got Error : ",error);
            });
    }

    deleteOrder(orderId) {
        OrderService.deleteOrder(orderId)
           .then(res => {
               this.setState({message : 'Order deleted successfully.'});
               this.setState({orders: this.state.orders.filter(order => order.id !== orderId)});
           }).catch(error => {
            console.log("Got Error : ",error);
        });
    }

    logout() {
        console.log("Redirecting to home : vendor logout");
        window.localStorage.setItem("vendorId", undefined);

        console.log("Redirecting to home : customer logout");
        window.localStorage.setItem("customerId", undefined);

        this.props.history.push('/');
    }

    showOrderHistory() {
        console.log("Redirecting cust Order History");
        this.props.history.push('/custOrderHistory');
    }

    showCart() {
        console.log("Redirecting cust Order History");
        this.props.history.push('/showCart');
    }

    accountAction() {
        console.log("Redirecting cust Order History");
        this.props.history.push('/custAccountDetails');
    }

    render() {
        return (
            <div>
            <div className="vendorAction">
                    <button className="vendorAction" onClick={() =>this.accountAction()}>My Account</button>
                    <button className="vendorAction" onClick={() =>this.showCart()}>My Cart</button>
                    <button className="vendorAction" onClick={() =>this.showOrderHistory()}>Order History</button>
                    <button className="vendorAction" onClick={() => this.logout()}>Logout</button>
            </div>
                <h2 className="text-center">Order Details</h2>

                <div className="historyTable">
                <table>
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Date</th>
                            <th>Total Bill</th>
                            <th>Books</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.orders.map(
                                order =>
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.orderDate}</td>
                                        <td>{order.totalBill} INR</td>
                                        {order.orderList.map(
                                            list => 
                                            <tr className="historyTable th">
                                            <td>{list.book.bName}</td>
                                            <td> - {list.orderedQty} Nos</td>
                                            </tr>
                                        )}
                                        <td>
                                            <button className="btn btn-success" onClick={() => this.deleteOrder(order.id)}> Delete</button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
                </div>
            </div>
        );
    }

}

export default OrderHistoryComponent;