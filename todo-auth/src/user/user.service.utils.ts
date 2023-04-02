import { UserRepository } from './entity/user.repository';
import { BusinessException } from '../exception/business.exception';

export class UserServiceUtils {
  static async validateEmail(userRepository: UserRepository, email: string) {
    const user = await userRepository.findOneBy({ email });
    if (user != null) {
      throw new BusinessException('이미 존재하는 이메일입니다.', 400);
    }
  }
}
