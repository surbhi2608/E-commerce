package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Length;

@Embeddable
public class BusinessDetails {

	@Column(length = 10, unique = true)
	@Length(min = 10, max = 10)
	@NotBlank(message = "PAN no can not be blank!")
	private String PAN_No;
	
	@Column(length = 15, unique = true)
	@Length(min = 15, max = 15)
	@NotBlank(message = "GST no can not be blank!")
	private String GST_NO;
	
	@Column(length = 30)
	@NotBlank(message = "Vendor company name can not be blank!")
	private String companyName;
	
	public BusinessDetails(@Length(min = 10, max = 10) @NotBlank(message = "PAN no can not be blank!") String pAN_No,
			@Length(min = 15, max = 15) @NotBlank(message = "GST no can not be blank!") String gST_NO,
			@NotBlank(message = "Vendor company name can not be blank!") String companyName) {
		super();
		PAN_No = pAN_No;
		GST_NO = gST_NO;
		this.companyName = companyName;
	}

	public BusinessDetails() {
		super();
		System.out.println("BusinessDetails pojo : def constructor");
	}

	public String getPAN_No() {
		return PAN_No;
	}

	public void setPAN_No(String pAN_No) {
		PAN_No = pAN_No;
	}

	public String getGST_NO() {
		return GST_NO;
	}

	public void setGST_NO(String gST_NO) {
		GST_NO = gST_NO;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	@Override
	public String toString() {
		return "BusinessDetails [PAN_No=" + PAN_No + ", GST_NO=" + GST_NO + ", companyName=" + companyName + "]";
	}
	
}
