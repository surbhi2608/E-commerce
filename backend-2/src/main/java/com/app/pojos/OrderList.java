package com.app.pojos;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "order_list")
public class OrderList extends BaseEntity{

	//@NotBlank(message = "Ordered qty can not be blank!")
	@Column(columnDefinition = "integer default 0")
	private int orderedQty;
	
	@Column(columnDefinition = "double default 0.0")
	private double listBill;
	
	@ManyToOne
	@JoinColumn(name="b_id")
	@JsonIgnoreProperties("orderList")
	@Fetch(FetchMode.JOIN)
	@Basic(optional=true)
	private Book book;
	
	@ManyToOne
	@JoinColumn(name="o_id")
	@JsonIgnoreProperties("orderList")
	@Fetch(FetchMode.JOIN)
	@Basic(optional=true)
	private Order order;

	public OrderList(@NotBlank(message = "Ordered qty can not be blank!") int orderedQty) {
		super();
		this.orderedQty = orderedQty;
	}

	public OrderList() {
		super();
		System.out.println("Order List : def constructor!");
	}

	public int getOrderedQty() {
		return orderedQty;
	}

	public void setOrderedQty(int orderedQty) {
		this.orderedQty = orderedQty;
	}
	
	public double getListBill() {
		return listBill;
	}

	public void setListBill(double listBill) {
		this.listBill = listBill;
	}

	public Book getBook() {
		return book;
	}

	public void setBook(Book book) {
		this.book = book;
	}

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

	@Override
	public String toString() {
		return "OrderList [orderedQty=" + orderedQty + ", itemBill=" + listBill + "]";
	}

	public double calOrderListBill(Book b) {
		this.listBill=this.orderedQty*b.getSellingPrice();
		System.out.println("OrderQty : "+orderedQty+" Price : "+b.getSellingPrice());
		return listBill;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((book == null) ? 0 : book.hashCode());
		result = prime * result + ((order == null) ? 0 : order.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		OrderList other = (OrderList) obj;
		if (book == null) {
			if (other.book != null)
				return false;
		} else if (!book.equals(other.book))
			return false;
		if (order == null) {
			if (other.order != null)
				return false;
		} else if (!order.equals(other.order))
			return false;
		return true;
	}
	
}
