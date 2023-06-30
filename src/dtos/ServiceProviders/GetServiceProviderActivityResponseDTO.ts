interface GetServiceProviderActivityResponseDTO {
  name: string;
  activityName: string;
  publicName?: string;
  about?: string;
  description?: string;
  images: {
    id: string;
    base64: string;
  }[];
  state: string;
  city: string;
  phone: string;
  views: number;
}

export { GetServiceProviderActivityResponseDTO };
