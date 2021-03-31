package com.app.pojos;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "orders")
public class Order extends BaseEntity {

	@DateTimeFormat(pattern="yyyy-MM-dd")
	private LocalDate orderDate;
	
	@Column(length = 50, columnDefinition = "varchar(50) default 'Not Yet Checked Out!'")
	@NotBlank(message = "Order status can not be blank!")
	private String status;
	
	@Column(columnDefinition = "double default 0.0")
	private double totalBill;
	
	@ManyToOne
	@JoinColumn(name="cu_id", nullable = false)
	@JsonIgnoreProperties("orders")
	@Fetch(FetchMode.JOIN)
	@Basic(optional=true)
	private Customer customer;
	
	@OneToMany(mappedBy = "order" , cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnoreProperties("order")
	@Fetch(FetchMode.JOIN)
	@Basic(optional=true)
	private Set<OrderList> orderList=new HashSet<>();

	public Order(LocalDate orderDate,
			@NotBlank(message = "Order status can not be blank!") String status) {
		super();
		this.orderDate = orderDate;
		this.status = status;
	}

	public Order() {
		super();
		System.out.println("Order Pojo : def constructor!");
	}

	public LocalDate getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(LocalDate orderDate) {
		this.orderDate = orderDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public Set<OrderList> getOrderList() {
		return orderList;
	}

	public void setOrderList(Set<OrderList> orderList) {
		this.orderList = orderList;
	}

	public double getTotalBill() {
		return totalBill;
	}

	public void setTotalBill(double totalBill) {
		this.totalBill = totalBill;
	}

	@Override
	public String toString() {
		return "Order [orderDate=" + orderDate + ", status=" + status + ", totalBill=" + totalBill + "]";
	}
	
	public double calTotalOrderBill(OrderList list) {
		this.totalBill+=list.getListBill();
		return totalBill;
	}
}
