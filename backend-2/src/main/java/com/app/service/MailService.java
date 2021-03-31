package com.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.app.dto.Email;


@Service
public class MailService {
	
	private JavaMailSender javaMailSender;

	@Autowired
	public MailService(JavaMailSender javaMailSender) {
		this.javaMailSender = javaMailSender;
	}

	public void sendEmail(Email e) throws MailException {
		
		SimpleMailMessage mail = new SimpleMailMessage();
		mail.setTo(e.getDestEmail());
		mail.setSubject(e.getSubject());
		mail.setText(e.getMessage());
		System.out.println("Recheck : " + e.getDestEmail());
		
		javaMailSender.send(mail);
	}

	
	

}