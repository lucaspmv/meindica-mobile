import { api } from '@services/api';

const increaseServiceProviderActivityViewsService = async (
  serviceProviderId: string
) => {
  await api.patch(`/serviceProviders/${serviceProviderId}`);
};

export { increaseServiceProviderActivityViewsService };
