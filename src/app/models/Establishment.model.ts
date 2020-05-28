export class Establishment {
    _id?: string;
    name: string;
    address: string;
    country: string;
    city: string;
    phone?: string;
    email?: string;
    website?: string;
    description?: string;
    imageUrl?: string;
    categories?: string[];
    owner?: string;
    geolocationActive?: boolean;
    lat?: string;
    lon?: string;
}