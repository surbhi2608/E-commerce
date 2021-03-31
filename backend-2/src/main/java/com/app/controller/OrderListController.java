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

import com.app.dao.BookRepository;
import com.app.dao.OrderListRepository;
import com.app.dao.OrderRepository;
import com.app.dto.ResponseDTO;
import com.app.pojos.Book;
import com.app.pojos.Order;
import com.app.pojos.OrderList;

@RestController
@RequestMapping("/OrderList")
@CrossOrigin
public class OrderListController {

	@Autowired
	private OrderListRepository listRepo;
	@Autowired
	private BookRepository bookRepo;
	@Autowired
	private OrderRepository finalOrderRepo;
	@Autowired 
	private OrderController finalOrderController;
	
	public OrderListController() {
		super();
		System.out.println("OrderList Controller : def constructor");
	}
	
	@GetMapping
	public ResponseEntity<?> getAllOrderList() {
		List<OrderList> ordersList=listRepo.findAll();
		return ResponseEntity.ok(ordersList);
	}
	
	@GetMapping("/{orderListId}")
	public ResponseEntity<?> getOrderListByID (@PathVariable int orderListId) {
		Optional<OrderList> optional=listRepo.findById(orderListId);
		if(optional.isPresent())
			return new ResponseEntity<>(new ResponseDTO("success","Details Found",optional.get()),HttpStatus.OK);
		
		return new ResponseEntity<>(new ResponseDTO("error","OrderList id not Found",null),HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/book/{bookId}")
	public ResponseEntity<?> getOrderListByBookID (@PathVariable int bookId) {
		Optional<Book> optional=bookRepo.findById(bookId);
		if(optional.isPresent()) {
			Book book=optional.get();
			return new ResponseEntity<>(new ResponseDTO("success","Details Found", book.getOrderList()),HttpStatus.OK);
		}
		return new ResponseEntity<>(new ResponseDTO("error","OrderList id not Found",null),HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/order/{orderId}")
	public ResponseEntity<?> getOrderListByOrderID (@PathVariable int orderId) {
		System.out.println("get Order List By Order ID : " + orderId);
		Optional<Order> optionalOrder=finalOrderRepo.findById(orderId);
		if(optionalOrder.isPresent()) {
			Order finalOrder=optionalOrder.get();
			return new ResponseEntity<>(new ResponseDTO("success","Details Found",finalOrder.getOrderList()),HttpStatus.OK);
		}
		return new ResponseEntity<>(new ResponseDTO("error","OrderList id not Found",null),HttpStatus.NOT_FOUND);
	}
	
	@PostMapping
	public ResponseEntity<?> newOrderList(@RequestBody OrderList order) {
		System.out.println("New order list creating : "+order.getOrderedQty());
		int bookId=order.getBook().getId();
		Optional<Book> optional=bookRepo.findById(bookId);
		if(optional.isPresent()) {
			Book b= optional.get();
			order.calOrderListBill(b);
			
			int finalOrderId=order.getOrder().getId();
			Optional<Order> optionalOrder=finalOrderRepo.findById(finalOrderId);
			if(optionalOrder.isPresent()) {
				Order tempOrder=optionalOrder.get();
				if(tempOrder.getStatus().equals("Checked Out successfully!")) {
					return new ResponseEntity<>("Order id is invalid!", HttpStatus.OK);	
				}
				tempOrder.setOrderDate(LocalDate.now());
				tempOrder.calTotalOrderBill(order);
				tempOrder.getOrderList().add(order);
				return new ResponseEntity<>(finalOrderRepo.save(tempOrder), HttpStatus.CREATED);	
			} else
				return new ResponseEntity<>(new ResponseDTO("error","Order id not Found",null),HttpStatus.NOT_FOUND);
		} else
			return new ResponseEntity<>(new ResponseDTO("error","Book id not Found",null),HttpStatus.NOT_FOUND);
	}
	
	@PutMapping("/{orderId}")
	public ResponseEntity<?> updateOrderList(@PathVariable int orderId, @RequestBody OrderList order) {
		Optional<OrderList> optional=listRepo.findById(orderId);
		if(optional.isPresent()) {
			OrderList o=optional.get();
			o.setOrderedQty(order.getOrderedQty());
			
			int bookId=order.getBook().getId();
			Optional<Book> optionalBook=bookRepo.findById(bookId);
			if(optionalBook.isPresent()) {
				Book b= optionalBook.get();
				o.calOrderListBill(b);
				listRepo.save(o);
				finalOrderController.updateTotalBill(o.getOrder().getId(), o.getOrder());
				return new ResponseEntity<>(o, HttpStatus.CREATED);	
			} else
				return new ResponseEntity<>(new ResponseDTO("error","Book id not Found",null),HttpStatus.NOT_FOUND);
		
		} else
			return new ResponseEntity<>(new ResponseDTO("error","OrderList id not Found",null),HttpStatus.NOT_FOUND);
	}
	
	@DeleteMapping("/{orderId}")
	public ResponseEntity<?> removeOrderList(@PathVariable int orderId) {
		System.out.println("1. Remove order list : " + orderId);
		Optional<OrderList> optional=listRepo.findById(orderId);
		if(optional.isPresent()) {
			OrderList list=optional.get();
			
			int bookId =list.getBook().getId();
			Optional<Book> oBook=bookRepo.findById(bookId);
			if(oBook.isPresent()) {
				Book book=oBook.get();
				book.setQuantity(book.getQuantity()+list.getOrderedQty());
				book.setSoldBooks(book.getSoldBooks()-list.getOrderedQty());
				book.getOrderList().remove(list);
				bookRepo.save(book);
			}
			
			Order o= list.getOrder();
			o.getOrderList().remove(list);
			list.setOrder(null);
			finalOrderRepo.save(o);
			
			listRepo.delete(list);
			
			System.out.println("5. Done!");
			return new ResponseEntity<>("OrderList removed successfully!", HttpStatus.OK);
		}
		return new ResponseEntity<>(new ResponseDTO("error","OrderList id not Found",null),HttpStatus.NOT_FOUND);
	}
	
	public ResponseEntity<?> orderPlaced(Order order) {
		
		Set<OrderList> list=order.getOrderList();
		System.out.println("Order placed : " + order.getId() +" size :" + list.size() );
		
		list.forEach((orderLists) -> {
			
			int id=orderLists.getId();
			Optional<OrderList> optional=listRepo.findById(id);
			if(optional.isPresent()) {
				OrderList tempList=optional.get();
				
				int bookId=tempList.getBook().getId();
				System.out.println("Book id : "+bookId);
				Optional<Book> optionalBook=bookRepo.findById(bookId);
				if(optionalBook.isPresent()) {
					Book b= optionalBook.get();
					
					int qty=b.getQuantity()-tempList.getOrderedQty();
					if(qty < 0) {
						b.setStatus("Book Out Of Stock!");
						order.setStatus("Can not place order!");
						System.out.println("Order cancelled!");
					} else {
						b.setQuantity(qty);
						System.out.println("Sold books : " + b.getSoldBooks());
					}
					bookRepo.save(b);
				}
			}
		});
		return new ResponseEntity<>(order.getStatus(), HttpStatus.OK);
	}
	
}
