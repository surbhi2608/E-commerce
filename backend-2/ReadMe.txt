$1. get by id was not working - solved this -> getmapping("/{x}") should compulsorily match @pathvariable x

$2. update customer is not working - due to -> cascade all and orphan removal of address
	After removing "cascade = CascadeType.ALL, orphanRemoval = true" this it is working fine
	But after doing this in service layer
	c.getAddresses().clear();
	c.getAddresses().addAll(customer.getAddresses());
	instead of 
	c.setAddresses(customer.getAddresses());
	we solved the issue.

3. Duplicate addresses are getting stored for same customer.
	equals and hashcode method is not getting called while adding new address.
	Created new method at customer service side - addCustomerAddress(custId, address);
	and added the address in hashset manually
	so now it updates the address if we send the same address to save again.
	
	Still a problem!!!

$4. Delete address is not working. 
	Removed the address from customer side 
	used remove address method on customer side. 

5. getCustomerByEmailAndPassword - is not working.

$6. at [Source: (PushbackInputStream); line: 4, column: 14] (through reference chain: com.app.pojos.OrderList["book"]->com.app.pojos.Book["id"])]
	
7. duplicate books are getting stored for same vendor.

$8. detached entity passed to persist: com.app.pojos.Book from orderList side
	this is happening because orderlist object should be present before creating books object
	and here we are creating an book's object first and then we are trying to create orderList object.	
	
9. order placed products and in cart products should be different.
	after placing order product table should get modified.	
	
10. after adding new book from vendor side it should send only added book to the front end side.

11. vendor business details are remaining.	