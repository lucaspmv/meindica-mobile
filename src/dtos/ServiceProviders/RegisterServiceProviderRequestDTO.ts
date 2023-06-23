interface RegisterServiceProviderRequestDTO {
  category: string;
  activityName: string;
  cnpj: string;
  phone: string;
  birthday: string;
  state: string;
  city: string;
  description?: string;
  about?: string;
  images?: string[];
}

export { RegisterServiceProviderRequestDTO };
