package com.app.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dao.CustomerRepository;
import com.app.dao.OrderListRepository;
import com.app.dao.OrderRepository;
import com.app.dto.ResponseDTO;
import com.app.pojos.Customer;
import com.app.pojos.Order;
import com.app.pojos.OrderList;

@RestController
@RequestMapping("/Order")
@CrossOrigin
public class OrderController {

	@Autowired
	private OrderRepository orderRepo;
	@Autowired
	private OrderListRepository listRepo;
	@Autowired
	private OrderListController listController;
	@Autowired
	private CustomerRepository custRepo;

	public OrderController() {
		super();
		System.out.println("Order Controller : def constructor");
	}
	
	@GetMapping
	public ResponseEntity<?> getAllOrder() {
		List<Order> orders=orderRepo.findAll();
		return ResponseEntity.ok(orders);
	}
	
	@GetMapping("/{orderId}")
	public ResponseEntity<?> getOrderByID (@PathVariable int orderId) {
		Optional<Order> optional=orderRepo.findById(orderId);
		if(optional.isPresent())
			return new ResponseEntity<>(new ResponseDTO("success","Details Found",optional.get()),HttpStatus.OK);
		
		return new ResponseEntity<>(new ResponseDTO("error","Order id not Found",null),HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/customer/{custId}")
	public ResponseEntity<?> getOrderByCustID (@PathVariable int custId) {
		Optional<Customer> optional=custRepo.findById(custId);
		if(optional.isPresent()) {
			Customer cust=optional.get();
			List<Order> o = cust.getOrders();
			return new ResponseEntity<>(new ResponseDTO("success","Details Found",o),HttpStatus.OK);
		}
		return new ResponseEntity<>(new ResponseDTO("error","Order id not Found",null),HttpStatus.NOT_FOUND);
	}
	
	//creates new order just by input ---> customer id
	@PostMapping
	public ResponseEntity<?> newOrder(@PathVariable int custId) {
		Order order= new Order();
		Optional<Customer> optional=custRepo.findById(custId);
		if(optional.isPresent()) {
			Customer cust=optional.get();
			order.setCustomer(cust);
			order.setOrderDate(LocalDate.now());
		}
		return new ResponseEntity<>(orderRepo.save(order), HttpStatus.CREATED);
	}
	
	//checks order status and places the order
	@PutMapping("/{orderId}")
	public ResponseEntity<?> updateOrder(@PathVariable int orderId, @RequestBody Order order) {
		System.out.println("1. Final order controller : " + orderId +" : "+ order.getStatus());
		Optional<Order> optional=orderRepo.findById(orderId);
		if(optional.isPresent()) {
			Order o=optional.get();
			o.setOrderDate(LocalDate.now());
			o.setStatus(order.getStatus());
			
			if(order.getStatus().equals("Checked Out successfully!")) {
				listController.orderPlaced(o);
				
				if(o.getStatus().equals("Checked Out successfully!")) 
					System.out.println("Order confirmed!");
				else
					return new ResponseEntity<>(new ResponseDTO("error","Can Not place the order",null),HttpStatus.NOT_FOUND);
			}
			
			orderRepo.save(o);
			return new ResponseEntity<>(o, HttpStatus.OK);
		}
		return new ResponseEntity<>(new ResponseDTO("error","Order id not Found",null),HttpStatus.NOT_FOUND);
	}
	
	//to remove order
	@DeleteMapping("/{orderId}")
	public ResponseEntity<?> removeOrder(@PathVariable int orderId) {
		System.out.println("1. Deleting order : ");
		Optional<Order> optional=orderRepo.findById(orderId);
		if(optional.isPresent()) {
			Order order=optional.get();
			
			//check the date
			if(order.getOrderDate().equals(LocalDate.now())) {
			
			System.out.println("2. order ---- list ");
			Set<OrderList> list= order.getOrderList();
			list.forEach((l) -> {
				listController.removeOrderList(l.getId());
			});
			
			order.setStatus("Cancelled!");
			
			System.out.println("3. order ---- cust ");
			Customer cust=order.getCustomer();
			cust.getOrders().remove(order);
			custRepo.save(cust);
			
			System.out.println("Order deleted successfully!");
			return new ResponseEntity<>("Order removed successfully!", HttpStatus.OK);
			} else
				return new ResponseEntity<>(new ResponseDTO("error","Can not cancel the order!",null),HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(new ResponseDTO("error","Order id not Found",null),HttpStatus.NOT_FOUND);
	}
	
	//calculates total order bill & doesn't updates order status
	@PutMapping("/order/{orderId}")
	public ResponseEntity<?> updateTotalBill(@PathVariable int orderId, @RequestBody Order order) {
		System.out.println("Final order controller : " + orderId +" : "+ order.getStatus());
		Optional<Order> optional=orderRepo.findById(orderId);
		if(optional.isPresent()) {
			Order o=optional.get();
			o.setOrderDate(LocalDate.now());
			
			Set<OrderList> list = o.getOrderList();
			o.setTotalBill(0.0);
			list.forEach((orderLists) -> {
				int id=orderLists.getId();
				Optional<OrderList> optionalList=listRepo.findById(id);
				if(optionalList.isPresent()) {
					OrderList tempList=optionalList.get();
					o.calTotalOrderBill(tempList);
				}
			});
			return new ResponseEntity<>(orderRepo.save(o), HttpStatus.OK);
		}
		return new ResponseEntity<>(new ResponseDTO("error","Order id not Found",null),HttpStatus.NOT_FOUND);
	
	}
	
	
}
