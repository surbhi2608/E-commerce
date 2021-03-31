import React, { Component } from 'react';
import CatalogueService from "../../service/CatalogueService";
import OrderListService from "../../service/OrderListService";

class showBookComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            book: '',
            company: '',
            orderedQty: '',
            message: null
        }
        this.reloadBookList = this.reloadBookList.bind(this);
    }

    componentDidMount() {
        this.reloadBookList();
    }

    reloadBookList() {

        let bId = window.localStorage.getItem("bookId");
        CatalogueService.fetchBookById(bId)
            .then((res) => {
                this.setState({
                    book: res.data.data,
                    company: res.data.data.vendor.businessDetails.companyName
                });
                console.log("book : ", this.state.book);
            })
            .catch(error => {
                console.log("Got Error : ", error);
            });
    }

    addToCart(bId) {
        window.localStorage.setItem("bookId", bId);

        if(window.localStorage.getItem("orderId") === 'undefined' ) {
            this.props.history.push('/loginCustomer');
        }

        if(window.localStorage.getItem("customerId") === 'undefined') {
            this.props.history.push('/loginCustomer');
        }

        let oId = window.localStorage.getItem("orderId");
        console.log("order id : ", oId);
        console.log("book id : ", bId);
        console.log("order qty : ", this.state.orderedQty);

        let orderList ={orderedQty: this.state.orderedQty, book:{id: bId}, order:{id: oId}}; 
        
        OrderListService.addOrderList(orderList)
            .then((res) => {
                console.log(res.data);
                this.props.history.push('/showCart');
            })
            .catch(error => {
                console.log("Got Error : ", error);
                this.props.history.push('/loginCustomer');
            });
    }

    showRating(bId) {
        window.localStorage.setItem("bookId", bId);
        console.log("Redirecting to show rating");
        this.props.history.push('/showRateBook');
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

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });
    
    render() {
        let message
            if(window.localStorage.getItem("vendorId") !== 'undefined') {
                    message = <div className="vendorAction">
                    <button className="vendorAction" onClick={() =>this.vendorCatalogue()}>My Catalogue</button>
                    <button className="vendorAction" onClick={() =>this.addBook()}>Add New Book</button>
                    <button className="vendorAction" onClick={() => this.logout()}>Logout</button>
                    </div>
            } else if(window.localStorage.getItem("customerId") !== 'undefined') {
                    message = <div className="vendorAction">
                    <button className="vendorAction" onClick={() =>this.accountAction()}>My Account</button>
                    <button className="vendorAction" onClick={() =>this.showCart()}>My Cart</button>
                    <button className="vendorAction" onClick={() =>this.showOrderHistory()}>Order History</button>
                    <button className="vendorAction" onClick={() => this.logout()}>Logout</button>
                    </div>
            } else {
                message = <div></div>
            }
        return (
            <div>
                <div>{message}</div> 
                {

                    <div>
                    <table className="bookShow">
                    <tr>
                    <td>
                    <img className="onlyBookImage" src={`http://localhost:7070/Book/images/${this.state.book.id}`} alt="BookImage"/>
                    </td>
                    <div className="card">
                    <td >
                    <p className="bookName">{this.state.book.bName}</p>
                    <p className="bookFormat">{this.state.book.format}</p>
                    <p className="bookAuthor">By {this.state.book.author}</p>
                    <p className="bookFormat">Language : {this.state.book.langPublished}</p>
                    <p className="bookFormat">MRP : {this.state.book.mrp} INR</p>
                    <p className="price">Selling price : {this.state.book.sellingPrice} INR</p>
                    <p className="bookFormat">Category : {this.state.book.category}</p>
                    <p className="bookFormat">Publication Year : {this.state.book.publicationYear}</p>
                    <p className="bookFormat">Publisher : {this.state.book.manufacturer}</p>
                    <p className="bookFormat">Seller : {this.state.company}</p>
                    <p className="bookFormat">{this.state.book.description}</p>

                    <form className="qty">
                        <div className="form-group">
                        <label className="bookFormat">Enter Quantity :</label>
                        <input type="number" name="orderedQty" className="form-control" value={this.state.orderedQty} required onChange={this.onChange}/>
                        </div>
                    </form>

                    <button className="btn btn-success" onClick={() => this.addToCart(this.state.book.id)}>Add To Cart</button>
                    <p></p>
                    <button className="btn btn-success" onClick={() => this.showRating(this.state.book.id)}>Show Reviews</button>
                    </td>
                    </div>
                    <p></p>
                    </tr>
                    </table>
                    </div>

                }
            </div>
        );
    }

}

export default showBookComponent;