import { UserTypeEnum } from '@enums/UserTypeEnum';

export interface LoginUserResponseDTO {
  userId: string;
  userType?: UserTypeEnum;
}
