package com.app.pojos;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "book")
public class Book extends BaseEntity {
	
	@Column(length = 100)
	@NotBlank(message = "Book name can not be blank!")
	private String bName;
	
	@Column(length = 80)
	@NotBlank(message = "Book Category field can not be blank!")
	private String category;
	
	@Column(length = 80)
	@NotBlank(message = "Book format can not be blank!")
	private String format;
	
	@Column(length = 50)
	@NotBlank(message = "Book Language field can not be blank!")
	private String langPublished;
	
	@Column(length = 80)
	@NotBlank(message = "Book Manufacturer field can not be blank!")
	private String manufacturer;
	
	@Column(length = 80)
	@NotBlank(message = "Book author field can not be blank!")
	private String author;
	
	@Column(length = 40)
	private String status;
	
	@Column(length = 5)
	@NotBlank(message = "Book published year field can not be blank!")
	private String publicationYear;
	
	//@NotBlank(message = "Book MRP field can not be blank!")
	private double MRP;
	
	//@NotBlank(message = "Book price field can not be blank!")
	private double sellingPrice;
	
	@Column(columnDefinition = "integer default 0")
	private int offer;

	//@NotBlank(message = "Book quantity field can not be blank!")
	@Column(columnDefinition = "integer default 0")
	private int quantity;
	
	@Column(columnDefinition = "integer default 0")
	private int soldBooks;
	
	@Column(length = 600)
	private String description;
	
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private LocalDate uploadingDate;
	
	@Lob
	private byte[] image;
	
	
	@Column(length=50)
	private String fileName;
	
	@ManyToOne
	@JoinColumn(name="v_id", nullable = false)
	@JsonIgnoreProperties("books")
	@Fetch(FetchMode.JOIN)
	@Basic(optional=true)
	private Vendor vendor;
	
	@OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnoreProperties("book")
	@Fetch(FetchMode.JOIN)
	@Basic(optional=true)	
	private Set<OrderList> orderList=new HashSet<>();

	@OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnoreProperties("book")
	@Fetch(FetchMode.JOIN)
	@Basic(optional=true)	
	private Set<RatingAndReview> ratingReview=new HashSet<>();

	public Book(@NotBlank(message = "Book name can not be blank!") String bName,
			@NotBlank(message = "Book Category field can not be blank!") String category,
			@NotBlank(message = "Book format can not be blank!") String format,
			@NotBlank(message = "Book Language field can not be blank!") String langPublished,
			@NotBlank(message = "Book Manufacturer field can not be blank!") String manufacturer,
			@NotBlank(message = "Book author field can not be blank!") String author,
			@NotBlank(message = "Book published year field can not be blank!") String publicationYear,
			@NotBlank(message = "Book MRP field can not be blank!") double mRP,
			@NotBlank(message = "Book price field can not be blank!") double sellingPrice, int offer,
			@NotBlank(message = "Book quantity field can not be blank!") int quantity, String description) {
		super();
		this.bName = bName;
		this.category = category;
		this.format = format;
		this.langPublished = langPublished;
		this.manufacturer = manufacturer;
		this.author = author;
		this.publicationYear = publicationYear;
		MRP = mRP;
		this.sellingPrice = sellingPrice;
		this.offer = offer;
		this.quantity = quantity;
		this.description = description;
	}

	public Book() {
		super();
		System.out.println("Book Pojo : def constructor!");
	}

	public String getbName() {
		return bName;
	}

	public void setbName(String bName) {
		this.bName = bName;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getFormat() {
		return format;
	}

	public void setFormat(String format) {
		this.format = format;
	}

	public String getLangPublished() {
		return langPublished;
	}

	public void setLangPublished(String langPublished) {
		this.langPublished = langPublished;
	}

	public String getManufacturer() {
		return manufacturer;
	}

	public void setManufacturer(String manufacturer) {
		this.manufacturer = manufacturer;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getPublicationYear() {
		return publicationYear;
	}

	public void setPublicationYear(String publicationYear) {
		this.publicationYear = publicationYear;
	}

	public double getMRP() {
		return MRP;
	}

	public void setMRP(double mRP) {
		MRP = mRP;
	}

	public double getSellingPrice() {
		return sellingPrice;
	}

	public void setSellingPrice(double sellingPrice) {
		this.sellingPrice = sellingPrice;
	}

	public int getOffer() {
		return offer;
	}

	public void setOffer(int offers) {
		this.offer = offers;
		double pay=100-offer;
		this.sellingPrice= Math.round((pay/100)*MRP);
	}

	public int getQuantity() {
		return quantity;
	}

	public LocalDate getUploadingDate() {
		return uploadingDate;
	}

	public void setUploadingDate(LocalDate uploadingDate) {
		this.uploadingDate = uploadingDate;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public int getSoldBooks() {
		return soldBooks;
	}

	public void setSoldBooks(int soldBooks) {
		this.soldBooks = soldBooks;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	public Vendor getVendor() {
		return vendor;
	}

	public void setVendor(Vendor vendor) {
		this.vendor = vendor;
	}

	public Set<OrderList> getOrderList() {
		return orderList;
	}

	public void setOrderList(Set<OrderList> orderList) {
		this.orderList = orderList;
	}
	
	public Set<RatingAndReview> getRatingReview() {
		return ratingReview;
	}

	public void setRatingReview(Set<RatingAndReview> ratingReview) {
		this.ratingReview = ratingReview;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "Book [bName=" + bName + ", MRP=" + MRP + ", sellingPrice=" + sellingPrice + ", offer=" + offer
				+ ", quantity=" + quantity + ", soldBooks=" + soldBooks + "]";
	}

	@Override
	public int hashCode() {
		System.out.println("In book hashCode method!");
		final int prime = 31;
		int result = 1;
		result = prime * result + ((author == null) ? 0 : author.hashCode());
		result = prime * result + ((bName == null) ? 0 : bName.hashCode());
		result = prime * result + ((manufacturer == null) ? 0 : manufacturer.hashCode());
		result = prime * result + ((vendor == null) ? 0 : vendor.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		System.out.println("In book equals method!");
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Book other = (Book) obj;
		if (author == null) {
			if (other.author != null)
				return false;
		} else if (!author.equals(other.author))
			return false;
		if (bName == null) {
			if (other.bName != null)
				return false;
		} else if (!bName.equals(other.bName))
			return false;
		if (manufacturer == null) {
			if (other.manufacturer != null)
				return false;
		} else if (!manufacturer.equals(other.manufacturer))
			return false;
		if (vendor == null) {
			if (other.vendor != null)
				return false;
		} else if (!vendor.equals(other.vendor))
			return false;
		return true;
	}
	
	
}
