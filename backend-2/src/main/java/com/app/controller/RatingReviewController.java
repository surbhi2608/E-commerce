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

import com.app.dao.BookRepository;
import com.app.dao.RatingAndReviewRepository;
import com.app.dto.ResponseDTO;
import com.app.pojos.Book;
import com.app.pojos.RatingAndReview;

@RestController
@RequestMapping("/Rating")
@CrossOrigin
public class RatingReviewController {

	@Autowired
	private RatingAndReviewRepository ratingRepo;
	@Autowired
	private BookRepository bookRepo;

	public RatingReviewController() {
		super();
		System.out.println("RatingReview Controller : def constructor");
	}
	
	@GetMapping
	public ResponseEntity<?> getAllRating(){
		List<RatingAndReview> ratings=ratingRepo.findAll();
		return ResponseEntity.ok(ratings);
	}
	
	@GetMapping("/{ratingId}")
	public ResponseEntity<?> getRatingByID (@PathVariable int ratingId) {
		Optional<RatingAndReview> optional=ratingRepo.findById(ratingId);
		if(optional.isPresent()) {
			return new ResponseEntity<>(optional.get(), HttpStatus.OK);
		}
		return new ResponseEntity<>(new ResponseDTO("error","Rating id not Found",null),HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/book/{bookId}")
	public ResponseEntity<?> getRatingByBookID (@PathVariable int bookId) {
		Optional<Book> optional=bookRepo.findById(bookId);
		if(optional.isPresent()) {
			Book b=optional.get();
			return new ResponseEntity<>(b.getRatingReview() ,HttpStatus.OK);
		}
		return new ResponseEntity<>(new ResponseDTO("error","Book id not Found",null),HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/highRated")
	public ResponseEntity<?> getHighestRatedBook () {
		System.out.println("1 Getting highest rated book!!!");
		List<RatingAndReview> books=ratingRepo.getHighestRatedBook();
			return new ResponseEntity<>(books ,HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<?> addNewReview (@RequestBody RatingAndReview review) {
		System.out.println("Add new review!!!");
		int bookId = review.getBook().getId();
			Optional<Book> optional=bookRepo.findById(bookId);
			if(optional.isPresent()) {
				Book b=optional.get();
				review.setDate(LocalDate.now());
				b.getRatingReview().add(review);
				return new ResponseEntity<>(bookRepo.save(b), HttpStatus.CREATED);
			}
		return new ResponseEntity<>(new ResponseDTO("error","Vendor id not Found",null),HttpStatus.NOT_FOUND);
	}
	
	@PutMapping("/{ratingId}")
	public ResponseEntity<?> updateRatingByID (@PathVariable int ratingId, @RequestBody RatingAndReview rating) {
		Optional<RatingAndReview> optional=ratingRepo.findById(ratingId);
		if(optional.isPresent()) {
			RatingAndReview r=optional.get();
			r.setRating(rating.getRating());
			r.setReview(rating.getReview());
			r.setDate(LocalDate.now());
			return new ResponseEntity<>(ratingRepo.save(r),HttpStatus.OK);
		}
		return new ResponseEntity<>(new ResponseDTO("error","Vendor id not Found",null),HttpStatus.NOT_FOUND);
	}
	
	@DeleteMapping("/{ratingId}")
	public ResponseEntity<?> removeRating (@PathVariable int ratingId) {
		Optional<RatingAndReview> optional=ratingRepo.findById(ratingId);
		if(optional.isPresent()) {
			ratingRepo.deleteById(ratingId);
			return new ResponseEntity<>("Vendor removed successfully!", HttpStatus.OK);
		}
		return new ResponseEntity<>(new ResponseDTO("error","Vendor id not Found",null),HttpStatus.NOT_FOUND);
	}
	
}
