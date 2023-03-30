import axios from 'axios';

const getUserData = async (token: string): Promise<any> => {
  const { data } = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`
  );

  return data;
};

export { getUserData };
