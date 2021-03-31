package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.pojos.Book;

public interface BookRepository extends JpaRepository<Book, Integer>{

	@Query("from Book b where b.quantity > 0")
	List<Book> findByUsingQty();
	
	@Query("SELECT b FROM Book b WHERE b.bName=bName")
	List<Book> searchByBookName(@Param("bName") String bName);
	
	@Query("SELECT b FROM Book b WHERE b.offer > 0")
	List<Book> searchByOffer();
	
}
