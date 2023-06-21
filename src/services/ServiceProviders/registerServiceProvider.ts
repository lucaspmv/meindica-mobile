import { RegisterServiceProviderRequestDTO } from '@dtos/ServiceProviders/RegisterServiceProviderRequestDTO';
import { api } from '@services/api';

const registerServiceProviderService = async (
  params: RegisterServiceProviderRequestDTO & { userId: string }
) => {
  await api.patch('/serviceProviders/register', {
    ...params,
  });
};

export { registerServiceProviderService };
