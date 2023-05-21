import axios from 'axios';

const getDataByCNPJ = async (cnpj: string): Promise<any> => {
  const { data } = await axios.get(
    `https://receitaws.com.br/v1/cnpj/${cnpj.replace(/\D+/g, '')}`
  );

  return data;
};

export { getDataByCNPJ };
