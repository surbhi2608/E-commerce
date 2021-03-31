package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Length;

@Embeddable
public class VendorAddress {
	
	@Column(length = 30)
	@NotBlank(message="State can't be blank")
	private String state;
	
	@Column(length = 30)
	@NotBlank(message="City can't be blank")
	private String city;
	
	@Column(length = 500)
	@NotBlank(message="Address can't be blank")
	private String area;
	
	@Column(length = 6)
	@NotBlank(message="Pincode can't be blank")
	@Length(min = 6, max = 6, message = "Invalid Pin code!")
	private String pincode;
	
	@Column(length = 500)
	private String description;

	public VendorAddress(@NotBlank(message = "State can't be blank") String state,
			@NotBlank(message = "City can't be blank") String city,
			@NotBlank(message = "Address can't be blank") String area,
			@NotBlank(message = "Pincode can't be blank") @Length(min = 6, max = 6, message = "Invalid Pin code!") String pincode,
			String description) {
		super();
		this.state = state;
		this.city = city;
		this.area = area;
		this.pincode = pincode;
		this.description = description;
	}

	public VendorAddress() {
		super();
		System.out.println("Vendor address : def constructor!");
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public String toString() {
		return "VendorAddress [state=" + state + ", city=" + city + ", area=" + area + ", pincode=" + pincode + "]";
	}
	
}
