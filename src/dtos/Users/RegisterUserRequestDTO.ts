import { UserTypeEnum } from '@enums/UserTypeEnum';

export interface RegisterUserRequestDTO {
  userId: string;
  type: UserTypeEnum;
}
