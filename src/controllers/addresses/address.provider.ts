import { logError } from '../../config/logger_helper';
import Provider from '../../config/provider';
import { AddressModel, UserModel } from '../../models';
import { IAddress } from '../../models/addresses/address.interface';

class AddressProvider extends Provider<IAddress> {
	private userModel = UserModel;
	constructor() {
		super(AddressModel);
	}

	public async create(data: IAddress): Promise<IAddress> {
		try {
			const _user = await this.userModel.findById(data.user);
			if (!_user) throw Error('User is undefine');
			const model = new AddressModel({ ...data });
			const [_user1, _address] = await Promise.all([
				!_user.address &&
					this.userModel.findByIdAndUpdate(data.user, {
						$set: { address: model._id }
					}),
				model.save()
			]);
			return _address;
		} catch (error) {
			throw logError({
				message: 'Create address failure',
				error
			});
		}
	}

	public async setDefaultAddress(
		userId: String,
		addressId: String
	): Promise<boolean> {
		try {
			const result = await this.userModel.findByIdAndUpdate(
				userId,
				{ $set: { address: addressId } },
				{ strict: false, strictQuery: false }
			);
			return result != null;
		} catch (error) {
			throw logError({
				message: 'Something wrong when set default address',
				error
			});
		}
	}

	public async deleteAddress(
		user: String,
		addressId: String
	): Promise<IAddress | null> {
		try {
			const [resetUser, deleteAddress] = await Promise.all([
				this.userModel.findOneAndUpdate(
					{ user, address: addressId },
					{ $set: { address: '' } }
				),
				AddressModel.findByIdAndDelete(addressId)
			]);
			return deleteAddress;
		} catch (error) {
			throw logError({
				message: 'Something wrong when remove address',
				error
			});
		}
	}
}

export default new AddressProvider();
