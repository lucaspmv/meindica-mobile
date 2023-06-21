import { api } from '@services/api';
import { GetServiceProviderResponseDTO } from '@dtos/ServiceProviders/getServiceProviderResponseDTO';

const getServiceProvidersService = async (): Promise<
  GetServiceProviderResponseDTO[]
> => {
  const { data } = await api.get<GetServiceProviderResponseDTO[]>(
    '/serviceProviders/'
  );

  return data;
};

export { getServiceProvidersService };
