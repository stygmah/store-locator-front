import { User } from './User.model';

export class NewUserForm extends User {
    password: string;
    confirmPassword: string;
}
