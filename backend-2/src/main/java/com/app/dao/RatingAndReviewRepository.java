package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.pojos.RatingAndReview;

public interface RatingAndReviewRepository extends JpaRepository<RatingAndReview, Integer> {

	//@Query("SELECT b FROM Book b WHERE b.offer > 0 and b.quantity > 0")
	//List<Book> searchByOffer();
	
	//qauntity has to check before this
	//select * from book_rating_review r inner join book b on b.id=r.b_id where b.quantity>0 and r.rating > (select avg(rating) from book_rating_review);
	
	//SELECT r FROM RatingAndReview r inner join Book b on b.id=r.b_id r WHERE r.rating > (SELECT AVG(t.rating) FROM RatingAndReview t)
	
	//SELECT r FROM RatingAndReview r WHERE r.rating > (SELECT AVG(b.rating) FROM RatingAndReview b)
	@Query("SELECT r FROM RatingAndReview r inner join Book b on b.id=r.book.id WHERE b.quantity>0 and r.rating > (SELECT AVG(t.rating) FROM RatingAndReview t)")
	List<RatingAndReview> getHighestRatedBook();
	
}
