import { UserRepository } from './entity/user.repository';
import { RpcException } from '@nestjs/microservices';

export class UserServiceUtils {
  static async validateEmail(userRepository: UserRepository, email: string) {
    const user = await userRepository.findOneBy({ email });
    if (user != null) {
      throw new RpcException('이미 존재하는 이메일입니다.');
    }
  }
}
