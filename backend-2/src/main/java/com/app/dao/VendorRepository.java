package com.app.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Vendor;

public interface VendorRepository extends JpaRepository<Vendor, Integer> {

	Optional<Vendor> findByEmailAndPassword(String email, String password);

}
