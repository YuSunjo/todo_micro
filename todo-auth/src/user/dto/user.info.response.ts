import { User } from '../entity/user.entity';

export class UserInfoResponse {
  id: number;
  email: string;
  name: string;

  constructor(id: number, email: string, name: string) {
    this.id = id;
    this.email = email;
    this.name = name;
  }

  static of(user: User) {
    return new UserInfoResponse(user.id, user.email, user.name);
  }
}
