import { GetUserProfileByIdResponse } from '@dtos/Users/GetUserProfileByIdResponseDTO';
import { api } from '@services/api';

const getUserProfileByIdService = async (userId: string) => {
  const { data } = await api.get<GetUserProfileByIdResponse>(
    `/users/${userId}`
  );

  return data;
};

export { getUserProfileByIdService };
