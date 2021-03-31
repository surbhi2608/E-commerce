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

import com.app.dao.VendorRepository;
import com.app.dto.Email;
import com.app.dto.ResponseDTO;
import com.app.dto.ResponseListDTO;
import com.app.pojos.Book;
import com.app.pojos.BusinessDetails;
import com.app.pojos.Vendor;
import com.app.pojos.VendorAddress;
import com.app.service.MailService;

@RestController
@RequestMapping("/Vendor")
@CrossOrigin
public class VendorController {

	@Autowired
	private VendorRepository vendorRepo;
	@Autowired
	private BookController bookControllder;
	@Autowired 
	private MailService mailService;
	
	public VendorController() {
		super();
		System.out.println("In def constructor of "+ getClass().getName());
	}
	
	@GetMapping
	public ResponseEntity<?> getAllVendor() {
		List<Vendor> vendors=vendorRepo.findAll();
		return new ResponseEntity<>(new ResponseListDTO("success","Customer Found",vendors),HttpStatus.OK);
	}
	
	@GetMapping("/{vendorId}")
	public ResponseEntity<?> getVendorByID (@PathVariable int vendorId) {
		Optional<Vendor> optional=vendorRepo.findById(vendorId);
		if(optional.isPresent())
			return new ResponseEntity<>(new ResponseDTO("success","Details Found",optional.get()),HttpStatus.OK);
		
		return new ResponseEntity<>(new ResponseDTO("error","Vendor id not Found",null),HttpStatus.NOT_FOUND);
	}
	
	@PostMapping
	public ResponseEntity<?> addNewVendor(@RequestBody Vendor vendor) {
		
		Email email =new Email();
		email.setDestEmail(vendor.getEmail());
		System.out.println("Mentioned email : " + vendor.getEmail());
		email.setSubject("Vendor Registration successful");
		email.setMessage("Welcome to eBookStore shop! \nEarning should never stop! \nYou have successfully registered as our vendor and logged in in our website. \nPlease Check  Your Login Details Mentioned Below : \nEmail:"+vendor.getEmail()+"\nPassword::"+vendor.getPassword()
		+"\n\n\nGrow your business with us. Best of luck!");
		mailService.sendEmail(email);
		vendor.setJoiningDate(LocalDate.now());
		return new ResponseEntity<>(vendorRepo.save(vendor), HttpStatus.CREATED);
	}

	@PutMapping("/login") 
	public ResponseEntity<?> getVendorByEmailPassword(@RequestBody Vendor details) { 
		System.out.println("Vendor Controller : get login " + details.getEmail() + details.getPassword());
		Optional<Vendor> vendor=vendorRepo.findByEmailAndPassword(details.getEmail(), details.getPassword());
		if(vendor.isPresent()) {
			Vendor tempVendor=vendor.get();
			System.out.println("Saving : cust id : " + tempVendor.getId());
			return new ResponseEntity<>(new ResponseDTO("success","Details Found",tempVendor),HttpStatus.OK);
		}
		return new ResponseEntity<>(new ResponseDTO("error","Vendor not Found",null),HttpStatus.NOT_FOUND);
	}
	
	@PutMapping("/{vendorId}")
	public ResponseEntity<?> updateVendor(@PathVariable int vendorId, @RequestBody Vendor vendor) {
		System.out.println("Update Vendor : " + vendorId);
		Optional<Vendor> optional=vendorRepo.findById(vendorId);
		if(optional.isPresent()) {
			Vendor v=optional.get();
			v.setFirstName(vendor.getFirstName());
			v.setLastName(vendor.getLastName());
			v.setMobileNo(vendor.getMobileNo());
			v.setPassword(vendor.getPassword());
			return new ResponseEntity<>(vendorRepo.save(v), HttpStatus.OK);
		}
		return new ResponseEntity<>(new ResponseDTO("error","Vendor id not Found",null),HttpStatus.NOT_FOUND);
	}
	
	@PutMapping("/business/{vendorId}")
	public ResponseEntity<?> addVendorBusiness(@PathVariable int vendorId, @RequestBody BusinessDetails details) {
		System.out.println("Update Vendor Business : " + vendorId);
		System.out.println("Business : " + details);
		Optional<Vendor> optional=vendorRepo.findById(vendorId);
		if(optional.isPresent()) {
			Vendor v=optional.get();
			v.setBusinessDetails(details);
			return new ResponseEntity<>(vendorRepo.save(v), HttpStatus.CREATED);
		}
		return new ResponseEntity<>(new ResponseDTO("error","Vendor id not Found",null),HttpStatus.NOT_FOUND);
	}
	
	@PutMapping("/address/{vendorId}")
	public ResponseEntity<?> addVendorAddress(@PathVariable int vendorId, @RequestBody VendorAddress address) {
		System.out.println("Update Vendor Address : vendorId : " + vendorId);
		System.out.println("address : " + address);
		Optional<Vendor> optional=vendorRepo.findById(vendorId);
		if(optional.isPresent()) {
			Vendor v=optional.get();
			v.setVendorAddress(address);
			return new ResponseEntity<>(vendorRepo.save(v), HttpStatus.CREATED);
		}
		return new ResponseEntity<>(new ResponseDTO("error","Vendor id not Found",null),HttpStatus.NOT_FOUND);
	}
	
	
	@DeleteMapping("/{vendorId}")
	public ResponseEntity<?> removeVendor(@PathVariable int vendorId) {
		System.out.println("1. Delete vendor : " + vendorId);
		Optional<Vendor> optional=vendorRepo.findById(vendorId);
		if(optional.isPresent()) {
			Vendor vendor=optional.get();
			
			System.out.println("2. v book : ");
			Set<Book> book = vendor.getBooks();
			book.forEach((b) -> {
				bookControllder.removeBook(b.getId());
			});
			System.out.println("3. v doing");
			
			vendorRepo.deleteById(vendorId);
			System.out.println("4. v deleted successfully!");
			return new ResponseEntity<>("Vendor removed successfully!", HttpStatus.OK);
		}
		return new ResponseEntity<>(new ResponseDTO("error","Vendor id not Found",null),HttpStatus.NOT_FOUND);
	}
	
	
}

