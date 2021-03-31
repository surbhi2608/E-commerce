import axios from 'axios';

const VENDOR_API_BASE_URL = 'http://localhost:8080/Vendor';

class VendorService {

    fetchVendors() {
        return axios.get(VENDOR_API_BASE_URL);
    }

    fetchVendorById(vendorId) {
        return axios.get(VENDOR_API_BASE_URL + '/' + vendorId);
    }

    loginVendor(vendor) {
        return axios.put(VENDOR_API_BASE_URL + '/login', vendor);
    }

    deleteVendor(vendorId) {
        return axios.delete(VENDOR_API_BASE_URL + '/' + vendorId);
    }

    addVendor(vendor) {
        return axios.post(""+VENDOR_API_BASE_URL, vendor);
    }

    editVendor(vendor) {
        return axios.put(VENDOR_API_BASE_URL + '/' + vendor.id, vendor);
    }

    addAddress(vendor){
        return axios.put(VENDOR_API_BASE_URL + '/address/' + vendor.id, vendor);
    }

    addBusiness(vendor){
        return axios.put(VENDOR_API_BASE_URL + '/business/' + vendor.id, vendor);
    }

    addBankAccount(vendor){
        return axios.put(VENDOR_API_BASE_URL + '/bank/' + vendor.id, vendor);
    }
}

export default new VendorService();