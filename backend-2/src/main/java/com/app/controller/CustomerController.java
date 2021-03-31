package com.app.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

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
import com.app.dto.Email;
import com.app.dto.ResponseDTO;
import com.app.dto.ResponseListDTO;
import com.app.pojos.Customer;
import com.app.pojos.CustomerAddress;
import com.app.pojos.Order;
import com.app.service.MailService;

@RestController
@RequestMapping("/Customer")
@CrossOrigin
public class CustomerController {

	@Autowired
	private CustomerRepository custRepo;
	@Autowired
	private OrderController orderController;
	@Autowired 
	private MailService mailService;
	
	public CustomerController() {
		super();
		System.out.println("In def constructor of "+ getClass().getName());
	}
	
	//working fine
	@GetMapping
	public ResponseEntity<?> getAllCustomers(){
		List<Customer> customers=custRepo.findAll();
		return new ResponseEntity<>(new ResponseListDTO("success","Customer Found",customers),HttpStatus.OK);
	}
	
	//working fine
	@GetMapping("/{custId}")
	public ResponseEntity<?> getCustomerById(@PathVariable int custId) {
		Optional<Customer> optional=custRepo.findById(custId);
		if(optional.isPresent())
			return new ResponseEntity<>(new ResponseDTO("success","Details Found",optional.get()),HttpStatus.OK);
		
		return new ResponseEntity<>(new ResponseDTO("error","Customer id not Found",null),HttpStatus.NOT_FOUND);
	}
	
	//this is to create only one order for a customer untill he checks out
	@GetMapping("/orderid/{custId}")
	public ResponseEntity<?> getOrderId(@PathVariable int custId) {
		Optional<Customer> optional=custRepo.findById(custId);
		if(optional.isPresent()) {
			Customer cust=optional.get();
			
			List<Order> orders=cust.getOrders();
			for(int i=0; i<orders.size(); i++) {
				if(orders.get(i).getStatus().equals("Not Yet Checked Out!")) {
					return new ResponseEntity<>(new ResponseDTO("success","Details Found",orders.get(i)),HttpStatus.OK);
				} 
			}
			return new ResponseEntity<>(new ResponseDTO("success","Details Found",orderController.newOrder(custId)),HttpStatus.OK);
		}
		return new ResponseEntity<>(new ResponseDTO("error","Customer id not Found",null),HttpStatus.NOT_FOUND);
	}
	
	@PutMapping("/login") 
	public ResponseEntity<?> getCustomerByEmailPassword(@RequestBody Customer custDetails) { 
		System.out.println("Customer Controller : get login " + custDetails.getEmail());
		Optional<Customer> cust=custRepo.findByEmailAndPassword(custDetails.getEmail(), custDetails.getPassword());
		if(cust.isPresent()) {
			Customer c=cust.get();
			this.getOrderId(c.getId());
			return new ResponseEntity<>(new ResponseDTO("success","Details Found",cust.get()),HttpStatus.OK);
		}
		return new ResponseEntity<>(new ResponseDTO("error","Customer not Found",null),HttpStatus.NOT_FOUND);
	}
	
	//working fine
	@PostMapping
	public ResponseEntity<?> addNewCustomer(@RequestBody Customer custDetails) {
		try {
			Email email =new Email();
			email.setDestEmail(custDetails.getEmail());
			System.out.println("Mentioned email : " + custDetails.getEmail());
			email.setSubject("Customer Registration Successful");
			email.setMessage("Welcome to eBookStore shop! \nlearning should never stop! \nYou have successfully registered and logged in in our website. \nPlease Check  Your Login Details Mentioned Below : \nEmail:"+custDetails.getEmail()+"\nPassword::"+custDetails.getPassword()
			+"\n\n\nKeep reading, Happy Shopping!");
			mailService.sendEmail(email);
			custDetails.setJoiningDate(LocalDate.now());
			return new ResponseEntity<>(custRepo.save(custDetails), HttpStatus.CREATED);
		} catch (RuntimeException e) {
			System.out.println("Got Exception!!!\n"+ e.getMessage());
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	//working fine 
	@PutMapping("/{custId}")
	public ResponseEntity<?> updateCustomerDetails(@PathVariable int custId, @RequestBody Customer details) {
		System.out.println("Customer Controller : In update Request");
		Optional<Customer> optional=custRepo.findById(custId);
		if(optional.isPresent()) {
			Customer c=optional.get();
			c.setFirstName(details.getFirstName());
			c.setLastName(details.getLastName());
			c.setMobileNo(details.getMobileNo());
			c.setPassword(details.getPassword());
			return new ResponseEntity<>(custRepo.save(c), HttpStatus.OK);
		}
		return new ResponseEntity<>(new ResponseDTO("error","Customer id not Found",null),HttpStatus.NOT_FOUND);
	}
	
	@PutMapping("/address/{custId}")
	public ResponseEntity<?> addCustomerAddress(@PathVariable int custId, @RequestBody CustomerAddress address) {
		System.out.println("Update Customer Address : custId : " + custId);
		System.out.println("address : " + address);
		Optional<Customer> optional=custRepo.findById(custId);
		if(optional.isPresent()) {
			Customer c=optional.get();
			c.setAddress(address);
			return new ResponseEntity<>(custRepo.save(c), HttpStatus.CREATED);
		}
		return new ResponseEntity<>(new ResponseDTO("error","Customer id not Found",null),HttpStatus.NOT_FOUND);
	}
	
	//working fine
	@DeleteMapping("/{custId}")
	public ResponseEntity<?>  removeCustomerById(@PathVariable int custId) {
		System.out.println("1. Deleteing customer : "+custId);
		Optional<Customer> optional=custRepo.findById(custId);
		if(optional.isPresent()) {
			Customer cust=optional.get();
			
			System.out.println("2. cust -- order side : ");
			List<Order> list = cust.getOrders();
			list.forEach((l) -> {
				orderController.removeOrder(l.getId());
			});
			
			System.out.println("3. Doing : ");
			custRepo.deleteById(custId);
			System.out.println("Customer Deleted Successfully!");
			return new ResponseEntity<>("Customer removed successfully!", HttpStatus.OK);
		}
		return new ResponseEntity<>(new ResponseDTO("error","Customer id not Found",null),HttpStatus.NOT_FOUND);
	}

}
