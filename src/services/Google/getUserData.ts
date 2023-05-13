import axios from 'axios';

import { GetUserDataResponseDTO } from '@dtos/Google/GetUserDataResponseDTO';

const getUserData = async (token: string) => {
  const { data } = await axios.get<GetUserDataResponseDTO>(
    `https://www.googleapis.com/userinfo/v2/me`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return data;
};

export { getUserData };
