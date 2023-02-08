export interface NewAdEntity extends Omit<AdEntity,'id'> {
    id?: string;
}

export interface  SimpleAdEntity {
    id:string;
    lat: number;
    lon: number; // coordination  lat i lon

}

export interface AdEntity  extends  SimpleAdEntity{
    name: string,
    description: string;
    price: number;
    url: string;
}