export interface ICoordinates {
	longitude: number;
	latitude: number;
}

export interface IAddress {
	user: String;
	contact_name: String;
	contact_phone: Date;
	coordinates: ICoordinates;
}
