import express from 'express';
import authUser from "../middlewares/authUser.js";
import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderStripe } from '../controllers/orderController.js';
import authSeller from '../middlewares/authSeller.js';


const orderRouter = express.Router();

orderRouter.post('/cod' , authUser , placeOrderCOD);
orderRouter.post('/user' , authUser , getUserOrders);
orderRouter.post('/seller' , authSeller , getAllOrders);
orderRouter.post('/stripe' , authUser , placeOrderStripe);



export default orderRouter;