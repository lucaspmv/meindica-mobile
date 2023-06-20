import { api } from '@services/api';

import { RegisterServiceProviderRequestDTO } from '@dtos/Users/RegisterServiceProviderRequestDTO';

const registerServiceProviderService = async (
  params: RegisterServiceProviderRequestDTO & { userId: string }
) => {
  await api.patch('/serviceProviders/register', {
    ...params,
  });
};

export { registerServiceProviderService };
