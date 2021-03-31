package com.app.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.customException.ResourceNotFoundException;
import com.app.dao.BookRepository;
import com.app.dao.VendorRepository;
import com.app.dto.ResponseDTO;
import com.app.pojos.Book;
import com.app.pojos.OrderList;
import com.app.pojos.RatingAndReview;
import com.app.pojos.Vendor;

@RestController
@RequestMapping("/Book")
@CrossOrigin
public class BookController {

	@Autowired
	private BookRepository bookRepo;
	@Autowired
	private VendorRepository vendorRepo;
	@Autowired
	private OrderListController listController;
	@Autowired
	private RatingReviewController ratingController;

	public BookController() {
		super();
		System.out.println("Book Controller : def constructor");
	}

	@GetMapping("/qty")
	public ResponseEntity<?> getAllBooksUsingQty() {
		List<Book> books = bookRepo.findByUsingQty();
		return ResponseEntity.ok(books);
	}

	@GetMapping
	public ResponseEntity<?> getAllBooks() {
		List<Book> books = bookRepo.findAll();
		return ResponseEntity.ok(books);
	}

	@GetMapping("/{bookId}")
	public ResponseEntity<?> getBookByID(@PathVariable int bookId) {
		System.out.println("Controller : Book Id : " + bookId);
		Optional<Book> optional = bookRepo.findById(bookId);
		if (optional.isPresent())
			return new ResponseEntity<>(new ResponseDTO("success", "Details Found", optional.get()), HttpStatus.OK);

		return new ResponseEntity<>(new ResponseDTO("error", "Book id not Found", null), HttpStatus.NOT_FOUND);
	}

	@GetMapping("/bookName/{bName}")
	public ResponseEntity<?> getBookByName(@PathVariable String bName) {
		System.out.println("Controller : Book Id : " + bName);
		List<Book> books = bookRepo.searchByBookName(bName);
		return ResponseEntity.ok(books);
	}

	@GetMapping("/offers")
	public ResponseEntity<?> getOfferedBook() {
		System.out.println("Controller : Offered Books ");
		List<Book> books = bookRepo.searchByOffer();
		return ResponseEntity.ok(books);
	}

	@GetMapping("/vendor/{vendorId}")
	public ResponseEntity<?> getBookByVendorID(@PathVariable int vendorId) {
		System.out.println("Controller : vendor Id : " + vendorId);
		Optional<Vendor> optional = vendorRepo.findById(vendorId);
		if (optional.isPresent()) {
			Vendor v = optional.get();
			return new ResponseEntity<>(new ResponseDTO("success", "Details Found", v.getBooks()), HttpStatus.OK);
		}
		return new ResponseEntity<>(new ResponseDTO("error", "Book id not Found", null), HttpStatus.NOT_FOUND);
	}

	// Adding duplicate values of book in hashSet
	// MultipartFile
	@PostMapping
	public ResponseEntity<?> addNewBook(@RequestBody Book book) {
		int vendorId = book.getVendor().getId();
		System.out.println("In book controller : " + vendorId);
		Optional<Vendor> optional = vendorRepo.findById(vendorId);
		if (optional.isPresent()) {
			Vendor v = optional.get();
			book.setUploadingDate(LocalDate.now());
			v.getBooks().add(book);
			vendorRepo.save(v);
			return new ResponseEntity<>(book, HttpStatus.CREATED);
		}
		return new ResponseEntity<>(new ResponseDTO("error", "Vendor id not Found", null), HttpStatus.NOT_FOUND);
	}

	@PutMapping(value = "/upload/{bookId}", consumes = { "multipart/form-data" })
	public ResponseEntity<?> addImageToBook(@PathVariable int bookId, @RequestParam("myFile") MultipartFile imageFile) {

		System.out.println("1. Book id : " + bookId);
		System.out.println("2. uploading image name : " + imageFile.getOriginalFilename());
		System.out.println("3. name : " + imageFile.getName());
		System.out.println("4. size : " + imageFile.getSize());
		System.out.println("4. size : " + imageFile);

		try {
			Optional<Book> optional = bookRepo.findById(bookId);
			if (optional.isPresent()) {

				Book b = optional.get();

				b.setImage(imageFile.getBytes());
				b.setFileName(imageFile.getOriginalFilename());

				bookRepo.save(b);

				System.out.println("6. Done!!!");
				return new ResponseEntity<>(b.getImage(), HttpStatus.CREATED);
			}
			return new ResponseEntity<>(new ResponseDTO("error", "Book id not Found", null), HttpStatus.NOT_FOUND);

		} catch (Exception e) {
			System.out.println("Caused Error : ");
			e.printStackTrace();
		}
		return new ResponseEntity<>(new ResponseDTO("error", "Book id not Found", null), HttpStatus.NOT_FOUND);
	}

	@GetMapping("/images/{bookId}")
	public ResponseEntity<byte[]> getFile(@PathVariable Integer bookId) {
		System.out.println("in get file " + bookId);
		Book b = bookRepo.findById(bookId).orElseThrow(() -> new ResourceNotFoundException("book not found"));

		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + b.getFileName() + "\"")
				.body(b.getImage());

	}

	@PutMapping("/{bookId}")
	public ResponseEntity<?> updateBookDetails(@PathVariable int bookId, @RequestBody Book details) {
		System.out.println("Book Controller : In update Request : book Id : " + bookId);
		Optional<Book> optional = bookRepo.findById(bookId);
		if (optional.isPresent()) {
			Book b = optional.get();
			b.setbName(details.getbName());
			b.setAuthor(details.getAuthor());
			b.setCategory(details.getCategory());
			b.setDescription(details.getDescription());
			b.setFormat(details.getFormat());
			b.setLangPublished(details.getLangPublished());
			b.setManufacturer(details.getManufacturer());
			b.setOffer(details.getOffer());
			b.setPublicationYear(details.getPublicationYear());
			b.setQuantity(details.getQuantity());
			return new ResponseEntity<>(bookRepo.save(b), HttpStatus.OK);
		}
		return new ResponseEntity<>(new ResponseDTO("error", "Book id not Found", null), HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/{bookId}")
	public ResponseEntity<?> removeBook(@PathVariable int bookId) {
		System.out.println("1 Delete book :" + bookId);
		Optional<Book> optional = bookRepo.findById(bookId);
		if (optional.isPresent()) {
			Book book = optional.get();

			System.out.println("2. list side --- ");
			Set<OrderList> list = book.getOrderList();
			list.forEach((l) -> {
				listController.removeOrderList(l.getId());
			});

			System.out.println("3. rating side --- ");
			Set<RatingAndReview> rate = book.getRatingReview();
			rate.forEach((r) -> {
				ratingController.removeRating(r.getId());
			});

			System.out.println("4. vendor side --- ");
			Vendor v = book.getVendor();
			v.getBooks().remove(book);
			vendorRepo.save(v);

			System.out.println("5 Doing ");
			bookRepo.delete(book);

			System.out.println("6 Book deleted successfully!");
			return new ResponseEntity<>("Book removed successfully!", HttpStatus.OK);
		}
		return new ResponseEntity<>(new ResponseDTO("error", "Book id not Found", null), HttpStatus.NOT_FOUND);

	}

}
