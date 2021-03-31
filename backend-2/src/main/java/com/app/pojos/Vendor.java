package com.app.pojos;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

@Entity
@Table(name = "Vendor")
public class Vendor extends BaseEntity {

	@Column(length = 20)
	@NotBlank(message="First name can't be blank!")
	private String firstName;
	
	@Column(length = 20)
	@NotBlank(message="Last name can't be blank!")
	private String lastName;
	
	@Column(length = 10, unique = true)
	@Length(min = 10, max = 10, message = "Invalid Mobile No!")
	@NotBlank(message="Mobile No can't be blank!")
	private String mobileNo;
	
	@Column(length = 30, unique = true, updatable = false)
	@NotBlank(message="Email-Id can't be blank!")
	private String email;
	
	@Column(length = 20)
	@Length(min = 5, max = 20)
	@Pattern(regexp ="((?=.*\\d)(?=.*[A-Z])(?=.*[#@$*]).{5,20})", message="Password is invalid!")
	@NotBlank(message="Mobile No can't be blank!")
	@JsonProperty(access = Access.WRITE_ONLY)
	private String password;
	
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private LocalDate joiningDate;
	
	@Embedded
	private BusinessDetails businessDetails;
	
	@Embedded
	private VendorAddress vendorAddress;
	
	@OneToMany(mappedBy = "vendor", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnoreProperties("vendor")
	@Fetch(FetchMode.JOIN)
	@Basic(optional=true)	
	private Set<Book> books=new HashSet<>();

	public Vendor(@NotBlank(message = "First name can't be blank!") String firstName,
			@NotBlank(message = "Last name can't be blank!") String lastName,
			@Length(min = 10, max = 10, message = "Invalid Mobile No!") @NotBlank(message = "Mobile No can't be blank!") String mobileNo,
			@NotBlank(message = "Email-Id can't be blank!") String email,
			@Pattern(regexp = "((?=.*\\d)(?=.*[A-Z])(?=.*[#@$*]).{5,20})", message = "Password is invalid!") @NotBlank(message = "Mobile No can't be blank!") String password) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.mobileNo = mobileNo;
		this.email = email;
		this.password = password;
	}

	public Vendor() {
		super();
		System.out.println("Vendor Pojo : def constructor!");
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public LocalDate getJoiningDate() {
		return joiningDate;
	}

	public void setJoiningDate(LocalDate joiningDate) {
		this.joiningDate = joiningDate;
	}

	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public BusinessDetails getBusinessDetails() {
		return businessDetails;
	}

	public void setBusinessDetails(BusinessDetails businessDetails) {
		this.businessDetails = businessDetails;
	}

	public VendorAddress getVendorAddress() {
		return vendorAddress;
	}

	public void setVendorAddress(VendorAddress vendorAddress) {
		this.vendorAddress = vendorAddress;
	}

	public Set<Book> getBooks() {
		return books;
	}

	public void setBooks(Set<Book> books) {
		this.books = books;
	}

	@Override
	public String toString() {
		return "Vendor [firstName=" + firstName + ", lastName=" + lastName + ", mobileNo=" + mobileNo + ", email="
				+ email + ", businessDetails=" + businessDetails + "]";
	}
	
}




