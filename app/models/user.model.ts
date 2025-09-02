import bcrypt from 'bcrypt';
import mongoose, { Document, Schema } from 'mongoose';

export const validRoles = ['admin', 'user'] as const;

export type Role = (typeof validRoles)[number];

// Extend Document to include comparePassword
export interface IUser extends Document {
	_id: string;
	email: string;
	password?: string;
	resetPasswordToken: string;
	resetPasswordTokenExpire: Date;
	roles: Role[];
	createdAt?: Date;
	updatedAt?: Date;
	comparePassword(candidatePassword: string): Promise<boolean>;
}

export const userSchema = new Schema<IUser>(
	{
		email: {
			type: String,
			trim: true,
			lowercase: true,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		resetPasswordToken: {
			type: String,
		},
		resetPasswordTokenExpire: {
			type: Date,
		},
		roles: [
			{
				type: String,
				default: 'user',
				enum: ['admin', 'user'],
			},
		],
	},
	{
		timestamps: true,
		toJSON: {
			transform(doc, ret, options) {
				delete ret.password;
				delete ret.createdAt;
				delete ret.updatedAt;
			},
			versionKey: false,
		},
	},
);

userSchema.pre('save', function (done) {
	if (this.isModified('password') && this.password) {
		try {
			const saltRounds = 10;
			const salt = bcrypt.genSaltSync(saltRounds);
			this.password = bcrypt.hashSync(this.password, salt);
		} catch (err: any) {
			return done(err);
		}
	}
	done();
});

// Custom validation to ensure roles array has at least one value and unique values
userSchema.path('roles').validate(function (roles: Role[]) {
	if (!roles.length) {
		throw new Error('The roles array must have at least one value.');
	}
	const uniqueRoles = new Set(roles);
	if (uniqueRoles.size !== roles.length) {
		throw new Error('Roles must be unique.');
	}
	return true;
}, 'Invalid roles array.');

// Compare given password with the hashed password
userSchema.methods.comparePassword = async function (
	candidatePassword: string,
): Promise<boolean> {
	return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser>('User', userSchema);

export { User };
