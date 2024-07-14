import { Cart, CartItem } from "./cart.model";

export interface Client {
    id: number;
    name: string;
    company: string;
    username: string;
    email: string;
    address: string;
    zip: string;
    state: string;
    country: string;
    phone: string;
    photo?: string;
    password?: string,
    cart?: CartItem[];
    // payment?: Payment;
    codeCard?: string;
    termCard?: string;
    cvv?: string;
}

export interface Payment {
    codeCard: string;
    termCard: string;
    cvv: string;
}
