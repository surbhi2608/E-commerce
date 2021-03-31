import axios from 'axios';

const BOOK_RATING_API_BASE_URL = 'http://localhost:8080/Rating';

class BookRatingService {

    fetchRatings() {
        return axios.get(BOOK_RATING_API_BASE_URL);
    }

    fetchRatingById(ratingId) {
        return axios.get(BOOK_RATING_API_BASE_URL + '/' + ratingId);
    }
    
    fetchRatingByBookId(ratingId) {
        return axios.get(BOOK_RATING_API_BASE_URL + '/book/' + ratingId);
    }

    fetchHighRatedBook() {
        return axios.get(BOOK_RATING_API_BASE_URL + '/highRated');
    }
    
    deleteRating(ratingId) {
        return axios.delete(BOOK_RATING_API_BASE_URL + '/' + ratingId);
    }

    addRating(rating) {
        return axios.post(""+BOOK_RATING_API_BASE_URL, rating);
    }

    editRating(rating) {
        return axios.put(BOOK_RATING_API_BASE_URL + '/' + rating.id, rating);
    }
    
}

export default new BookRatingService();