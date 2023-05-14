import { LoginUserRequestDTO } from '@dtos/Users/LoginUserRequestDTO';

import { LoginUserResponseDTO } from '@dtos/Users/LoginUserResponseDTO';
import { api } from '@services/api';

const loginService = async (
  user: LoginUserRequestDTO
): Promise<LoginUserResponseDTO> => {
  const { data } = await api.post<LoginUserResponseDTO>('/users/login', user);

  return data;
};

export { loginService };
