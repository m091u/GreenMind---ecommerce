import { createContext, useState, useContext} from "react";
import {authContext} from "./auth.context";
import axios from "axios";

const API_URL = "http://localhost:4000";

const CartContext = createContext();

function CartProviderWrapper(props){

}

export { CartProviderWrapper, CartContext };