import { api } from '@services/api';

import { GetServiceProviderActivityResponseDTO } from '@dtos/ServiceProviders/GetServiceProviderActivityResponseDTO';

const getServiceProviderActivityDetailsService = async (
  serviceProviderId: string
): Promise<GetServiceProviderActivityResponseDTO> => {
  const { data } = await api.get<GetServiceProviderActivityResponseDTO>(
    `/serviceProviders/${serviceProviderId}`
  );

  return data;
};

export { getServiceProviderActivityDetailsService };
