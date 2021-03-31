package com.app.pojos;


import java.time.LocalDate;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "book_rating_review")
public class RatingAndReview extends BaseEntity {

	@Min(value = 1)
	@Max(value = 10, message = "Rating can not be more than 10!")
	private double rating;
	
	@Column(length = 100)
	private String review;
	
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private LocalDate date;
	
	@Column(length = 50)
	private String userName; 
	
	@ManyToOne
	@JoinColumn(name="b_id", nullable = false)
	@JsonIgnoreProperties("ratingReview")
	@Fetch(FetchMode.JOIN)
	@Basic(optional=true)
	private Book book;

	public RatingAndReview(@Min(1) @Max(value = 5, message = "Rating can not be more than 5!") int rating,
			String review) {
		super();
		this.rating = rating;
		this.review = review;
	}

	public RatingAndReview() {
		super();
		System.out.println("RatingAndReview : def constructor");
	}

	public double getRating() {
		return rating;
	}

	public void setRating(double rating) {
		this.rating = rating;
	}

	public String getReview() {
		return review;
	}

	public void setReview(String review) {
		this.review = review;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Book getBook() {
		return book;
	}

	public void setBook(Book book) {
		this.book = book;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	@Override
	public String toString() {
		return "RatingAndReview [rating=" + rating + ", review=" + review + ", date=" + date + "]";
	}

}
