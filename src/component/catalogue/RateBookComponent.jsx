import React, { Component } from 'react';
import CatalogueService from "../../service/CatalogueService";
import BookRatingService from "../../service/BookRatingService";
import CustomerService from "../../service/CustomerService";

class RateBookComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            name: '',
            book: '',
            rating: '',
            review: '',
            message: null
        }
        this.saveBookRating = this.saveBookRating.bind(this);
    }

    componentDidMount() {
        this.getBook();
    }

    getBook() {
        if(window.localStorage.getItem("customerId") === 'undefined') {
            this.props.history.push('/loginCustomer');
        }

        let bId = window.localStorage.getItem("bookId");

        CatalogueService.fetchBookById(bId)
            .then((res) => {
                this.setState({book: res.data.data});
                console.log("check : ", this.state.book);
            })
            .catch(error => {
                console.log("Got Error : ", error);
            });

        CustomerService.fetchCustomerById(window.localStorage.getItem("customerId"))
            .then((res) => {
                let customer = res.data.data;
                this.setState({
                    name: customer.firstName+" "+customer.lastName
                });
                console.log("Name : ", this.state.name);
            })
            .catch(error => {
                console.log("Got Error : ", error);
            });
    }

    saveBookRating =  async (e) => {
        e.preventDefault();
        let bookId = window.localStorage.getItem("bookId");

        let rateReview = {book :{id: bookId}, userName: this.state.name, rating: this.state.rating, review: this.state.review};

        BookRatingService.addRating(rateReview)
            .then(res => {
                this.setState({message : 'Book Review added successfully.'});
                console.log("check book id : ", res.data);
                alert("Thanks for feedback!");
                this.props.history.push('/showRateBook');
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

        return(
            <div>

            <div className="vendorAction">
            <button className="vendorAction" onClick={() =>this.accountAction()}>My Account</button>
            <button className="vendorAction" onClick={() =>this.showCart()}>My Cart</button>
            <button className="vendorAction" onClick={() =>this.showOrderHistory()}>Order History</button>
            <button className="vendorAction" onClick={() => this.logout()}>Logout</button>
            </div>

            <div className="login_form">
                
                <h2 className="text-center">Add Your View</h2>

                <div className="card">
                <img className="bookImage" src={`http://localhost:7070/Book/images/${this.state.book.id}`} alt="BookImage"/>
                <p className="bookName">For : {this.state.book.bName}</p>
                <p className="bookFormat">By {this.state.book.author}</p>
                </div>

                <form>
                <div className="form-group">
                    <label>Rate :</label>
                    <input type="number" placeholder="within 1 to 10" name="rating" className="form-control" value={this.state.rating} required onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Comment :</label>
                    <input name="review" className="form-control" value={this.state.review} required onChange={this.onChange}/>
                </div>

                <button className="btn btn-success" onClick={this.saveBookRating}>Save</button>
            </form>
            <p className="form-end"></p>
    </div>
    </div>
        );
    }
}
export default RateBookComponent;