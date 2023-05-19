import { api } from '@services/api';

import { RegisterUserRequestDTO } from '@dtos/Users/RegisterUserRequestDTO';

const registerService = async (params: RegisterUserRequestDTO) => {
  await api.patch('/users/register', {
    ...params,
    type: params.type.toLocaleUpperCase(),
  });
};

export { registerService };
