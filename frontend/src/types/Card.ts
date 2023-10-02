import { ExternalLinks } from "./Admin";

export interface CardProps{
    id:number
    name:string;
    image: string;
    price: number;
    buttonText: string;
    classNames?: string;
    stockQuantity?:number;
    externalSites: ExternalLinks[];
}