// const BASE_URL = "http://192.168.1.19:5001/api/v1"
// const BASE_URL = "http://192.168.1.33:5001/api/v1"
// const BASE_URL = "http://192.0.0.2:5001/api/v1"


// const BASE_URL = "http://192.168.1.218:5001/api/v1"
// const BASE_URL = "http:/api.coinbasket.in/api/v1"
const BASE_URL = "https://coinbasket-backend.onrender.com/api/v1"


export const AuthEndPoint = {
    REGISTER_API : BASE_URL + "/auth/register",
    LOGIN_API : BASE_URL + "/auth/login",
    GET_ALL_USER_API : BASE_URL + "/auth/getalluser",
    SEARCH_USERS_API : BASE_URL + "/auth/search",
    GET_USER_BY_ID : BASE_URL + "/auth/getuserbyid",
    EDIT_USER_BY_ID : BASE_URL + "/auth/updateuser",
    DELETE_USER_BY_ID : BASE_URL + "/auth/deleteuser",
    VENDOR_REGISTER_API : BASE_URL + "/auth/vendorRegister",
    UPDATE_VENDOR_PROFILE_API : BASE_URL + "/auth/updatevendor",
    ADD_TO_CART_API : BASE_URL + "/auth/addtocart",
    REMOVE_FROM_CART_API : BASE_URL + "/auth/removefromcart",
}   


export const CategoryEndPoints = {
    CREATE_CATEGORY_API : BASE_URL + "/category/createcategory",
    GET_CATEGORY_API : BASE_URL + "/category/getcategory",
    GET_PRODUCT_BY_CATEGORY_ID_API : BASE_URL + "/category/getproductcategorybyid"
}


export const WarehouseEndPoints = {
    CREATE_WARE_HOUSE_API : BASE_URL + "/warehouse/createwarehouse",
    GET_WARE_HOUSE_API : BASE_URL + "/warehouse/getwarehouse"
}


export const ProductEndPoints = {
    CREATE_PRODUCT_API : BASE_URL + "/product/createproduct",
    GET_PRODUCT_API : BASE_URL + "/product/getproduct"
}



export const OrderEndPoints = {
    CREATE_ORDER_API : BASE_URL + "/order/createOrder"
}