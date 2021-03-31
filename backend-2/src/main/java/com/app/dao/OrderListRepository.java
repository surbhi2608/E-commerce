package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.OrderList;

public interface OrderListRepository extends JpaRepository<OrderList, Integer> {

}
