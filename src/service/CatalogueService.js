import axios from 'axios';

const BOOK_API_BASE_URL = 'http://localhost:8080/Book';

class CatalogueService {

    fetchBooks() {
        return axios.get(BOOK_API_BASE_URL);
    }

    fetchBookUsingQty() {
        return axios.get(BOOK_API_BASE_URL+ '/qty');
    }

    fetchBookById(bookId) {
        return axios.get(BOOK_API_BASE_URL + '/' + bookId);
    }

    ///vendor/{vendorId}
    fetchBookByVendorId(vendorId) {
        return axios.get(BOOK_API_BASE_URL + '/vendor/' + vendorId);
    }

    fetchBookByOffer() {
        return axios.get(BOOK_API_BASE_URL + '/offers');
    }

    fetchBookByBookName(bName) {
        return axios.get(BOOK_API_BASE_URL + '/bookName/' + bName);
    }

    deleteBook(bookId) {
        return axios.delete(BOOK_API_BASE_URL + '/' + bookId);
    }

    addBook(book) {
        return axios.post(""+BOOK_API_BASE_URL, book);
    }

    addImageToBook(bookId, image) {
        return axios.put(BOOK_API_BASE_URL +'/upload/' + bookId, image);
    }

    editBook(book) {
        return axios.put(BOOK_API_BASE_URL + '/' + book.id, book);
    }
}

export default new CatalogueService();