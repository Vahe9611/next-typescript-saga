export interface Product {
    id: string | number;
    model: string;
    name: string;
    price: number | string;
    special: string;
    description: string;
    image: string;
    sizes: Array<string>;
    size?: string;
    count?: number;
};
