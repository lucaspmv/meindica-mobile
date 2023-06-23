import { UserTypeEnum } from '@enums/UserTypeEnum';

export interface RegisterUserTypeRequestDTO {
  userId: string;
  type: UserTypeEnum;
}
