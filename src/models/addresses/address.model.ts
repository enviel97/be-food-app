import mongoose, { Document, Schema } from 'mongoose';
import { IAddress } from './address.interface';

export interface IAddressModel extends IAddress, Document {}

const CoordinatesSchema = new Schema(
	{
		longitude: { type: Number, required: true },
		latitude: { type: Number, required: true }
	},
	{ _id: false }
);

const AddressSchema = new Schema(
	{
		user: { type: String, required: true, index: true },
		coordinates: { type: CoordinatesSchema, required: true },
		contact_name: { type: String, required: true },
		contact_phone: { type: String, required: true }
	},
	{ timestamps: true }
);

export default mongoose.model<IAddressModel>('Address', AddressSchema);
