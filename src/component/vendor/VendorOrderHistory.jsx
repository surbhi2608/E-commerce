import React, { Component } from 'react';
import OrderListService from "../../service/OrderListService";

class VendorOrderHistory extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
            orders: [],
            message: null
        }
        this.loadVendor = this.loadVendor.bind(this);
    }

    componentDidMount() {
        this.loadVendor();
    }

    loadVendor() {

        if(window.localStorage.getItem("vendorId") === 'undefined') {
            this.props.history.push('/loginVendor');
        }

        let bId =window.localStorage.getItem("bookId");
        console.log("book id : ", bId);

        OrderListService.fetchOrderListByBookId(bId)
            .then((res) => {
                console.log("check : ", res);
                this.setState({orders: res.data.data});
            })
            .catch(error => {
                console.log("Got Error : ", error);
                });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    logout() {
        console.log("Redirecting to home : vendor logout");
        window.localStorage.setItem("vendorId", undefined);

        console.log("Redirecting to home : customer logout");
        window.localStorage.setItem("customerId", undefined);

        this.props.history.push('/');
    }

    addBook() {
        console.log("Redirecting to add new book");
        this.props.history.push('/addNewBook');
    }

    vendorCatalogue() {
        console.log("Redirecting to edit account");
        this.props.history.push('/showVendorCatalogue');
    }

    vendorAccount() {
        console.log("Redirecting to edit account");
        this.props.history.push('/vendorAccountDetails');
    }

    render() {
        return (
            <div>

            <div className="vendorAction">
                    <button className="vendorAction" onClick={() =>this.vendorAccount()}>My Account</button>
                    <button className="vendorAction" onClick={() =>this.vendorCatalogue()}>My Catalogue</button>
                    <button className="vendorAction" onClick={() =>this.addBook()}>Add New Book</button>
                    <button className="vendorAction" onClick={() => this.logout()}>Logout</button>
            </div>

            <h2 className="text-center">Order Details</h2>
                <div className="vendorHistoryTable">
                <table>
                    <thead>
                        <tr>
                            <th>Book Id</th>
                            <th>Book Name</th>
                            <th>Order Id</th>
                            <th>Order Date</th>
                            <th>Selling Price</th>
                            <th>Ordered Qty</th>
                            <th>Order Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.orders.map(
                                order =>
                                    <tr key={order.id}>
                                        <td>#0100{order.book.id}</td>
                                        <td>{order.book.bName}</td>
                                        <td>#0040{order.id}</td>
                                        <td>{order.order.orderDate}</td>
                                        <td>{order.book.sellingPrice} Rs.</td>
                                        <td>{order.orderedQty} Nos.</td>
                                        <td>{order.order.status}</td>
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

export default VendorOrderHistory;