import { ExternalLinks } from "./Admin";

export interface CardProps{
    id:number
    name:string;
    image: string;
    sellingPrice: number;
    actualPrice: number;
    buttonText: string;
    classNames?: string;
    stockQuantity?:number;
    externalSites: ExternalLinks[];
}