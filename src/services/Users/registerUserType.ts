import { api } from '@services/api';

import { RegisterUserTypeRequestDTO } from '@dtos/Users/RegisterUserTypeRequestDTO';

const registerUserTypeService = async (params: RegisterUserTypeRequestDTO) => {
  await api.patch('/users/registerType', {
    ...params,
    type: params.type.toLocaleUpperCase(),
  });
};

export { registerUserTypeService };
