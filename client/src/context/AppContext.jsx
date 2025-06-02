import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from 'react-hot-toast';
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({children})=>{

    const currency = import.meta.env.VITE_CURRENCY;

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuerry, setSearchQuerry] = useState({});
    const [initialLoad, setInitialLoad] = useState(true);

    const fetchProducts = async()=>{
        try {
            const {data} = await axios.get('api/product/list')
            if(data.success){
                setProducts(data.products)
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const fetchSeller = async ()=>{
        try {
            const {data} = await axios.get('/api/seller/is-auth');
            if(data.success){
                setIsSeller(true);
            }else{
                setIsSeller(false);
            }
        } catch (error) {
            setIsSeller(false);
        }
    }

    const fetchUser = async ()=>{
        try {
            const {data} = await axios.get('/api/user/is-auth');
            if(data.success){
                setUser(data.user)
                setCartItems(data.user.cartItems)
            }else{
                setUser(null)
            }
        } catch (error) {
            setUser(null)
        }
    }

    

    //add to cart
    const addToCart = (itemId)=>{
        let cartData = structuredClone(cartItems);

        if(cartData[itemId]){
            cartData[itemId] +=1;
        }else{
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success('Added to cart');
    }

    //update cart item quantity
    const updateCartItems = (itemId, quantity)=>{
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success('Cart Updated');

    }

    //remove product from cart
    const removeFromCart = (itemId)=>{
        let cartData = structuredClone(cartItems);

        if(cartData[itemId]){
            cartData[itemId] -=1;
            if(cartData[itemId] === 0){
                delete cartData[itemId];
            }
        }
        toast.success('Removed from cart');
        setCartItems(cartData);

    }

    //cart item count
    const getCartCount = ()=>{
        let count = 0;
        for(const item in cartItems){
            count += cartItems[item]
        }
        return count;
    };

    //cart total amount count
    const getCartAmount = ()=>{
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product)=> product._id === items);
            if(cartItems[items]> 0){
                totalAmount += itemInfo.offerPrice * cartItems[items]
            }
        }
        return Math.floor(totalAmount*100)/100;
    };
    
    //fetcgh all products
    useEffect(() => {
        fetchUser();
        fetchSeller();
        fetchProducts();
    }, []) 

    useEffect(() => {

        const updateCart = async ()=>{
            try {
                const {data} = await axios.post('/api/cart/update' , {cartItems});
                if(!data.success){
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(error.message)
            }
        }

        if (initialLoad) {
            setInitialLoad(false); // ⛔ prevent update on first run
            return;
        }

        // Only update cart if cartItems is not empty and user is present
        if (user && Object.keys(cartItems).length > 0) {
            updateCart();
        }
        
    }, [cartItems,user]);

    const value = {navigate, user , setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, products,
                    currency, cartItems ,addToCart, updateCartItems, removeFromCart, searchQuerry, setSearchQuerry,
                    getCartCount, getCartAmount, axios, fetchProducts, setCartItems}

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = ()=>{
    return useContext(AppContext)
}