import React, { Component } from 'react';
import OrderService from "../../service/OrderService";
import OrderListService from "../../service/OrderListService";

//all remaining show cart's books - which is in orderlist

class ShowCartComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            totalBill: '',
            orderList: [],
            book: '',
            message: null
        }
        this.reloadCartList = this.reloadCartList.bind(this);
    }

    componentDidMount() {
        this.reloadCartList();
    }

    reloadCartList() {

        if(window.localStorage.getItem("customerId") === 'undefined') {
            this.props.history.push('/loginCustomer');
        }

        let oId = window.localStorage.getItem("orderId");

        OrderService.fetchOrderById(oId)
            .then((res) => {
                console.log("response : ", res);
                this.setState({
                    orderList: res.data.data.orderList,
                    totalBill: res.data.data.totalBill,
                });
                console.log("order list : ", this.state.orderList);
                console.log("total bill : ",this.state.totalBill);
            })
            .catch(error => {
                console.log(error);
            });
    }

    showDetails(bId) {
        window.localStorage.setItem("bookId", bId);
        console.log("Show book!", bId);
        this.props.history.push('/showBook');
    }

    removeBook(listId) {
        console.log("Remove book from cart! id : ", listId);
        OrderListService.deleteOrderList(listId)
            .then((res) => {
                console.log("order list deleted!");
                this.setState({orderList: this.state.orderList.filter(list => list.id !== listId)});
                console.log("response : ", res);
            })
            .catch(error => {
                console.log(error);
            });
    }

    orderConfirmed(){

        if(window.localStorage.getItem("orderId") === 'undefined' ) {
            this.props.history.push('/loginCustomer');
        }
        
        let oId = window.localStorage.getItem("orderId");
        console.log("Order confirmed! : ", oId);

        let orderConfirmed={id: oId, status: "Checked Out successfully!"};

        OrderService.editOrder(orderConfirmed)
            .then((res) => {
                console.log("order confirmed!");
                console.log("response : ", res);
                alert("Thank you for shopping with us! \n Have a great day!");
                window.localStorage.setItem("orderId", undefined);
                this.props.history.push('/custOrderHistory');
            })
            .catch(error => {
                console.log(error);
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

            <h2 className="text-center">Your Cart</h2>
                <div className="impNote">
                    <p>Please Note : </p>
                    <ul>
                        <li>Payment Mode : Cash On Delivery (cod)</li>
                        <li>Check your address details before placing the order.</li>
                    </ul>  
                </div>
                
                <div className="row">
                {
                this.state.orderList.map(
                    (list) => {  
                    return(
                    <div className="gapCard">
                    <div className="card">
                    <img className="bookImage" src={`http://localhost:7070/Book/images/${list.book.id}`} alt="bookImage"/>
                    <p className="bookName">{list.book.bName}</p>
                    <p>Quantity : {list.orderedQty}</p>
                    <p>Book Price : {list.book.sellingPrice} INR</p>
                    <p>Total price : {list.listBill}</p>
                    <button onClick={() => this.showDetails(list.book.id)}>Show details</button>
                    <p></p>
                    <button onClick={() => this.removeBook(list.id)}>Remove from cart</button>
                    </div>
                    </div>
                )
                })
                }
                </div>

                <div className="pageGapMaker"></div>

                <div className="totalBill">
                <p>Cart Total Bill : {this.state.totalBill} Rs.</p>
                <button onClick={() => this.orderConfirmed()}>Order Confirm</button>
                </div>
               
            </div>
        );
    }

}

export default ShowCartComponent;