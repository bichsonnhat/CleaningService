type ServiceType = {
  id: string;
  name: string;
  description?: string;
  categoryId: string;
  basePrice: number;
  isActive?: boolean;
  createdAt?: string;
  category?: {
    name: string;
  };
};

type ServiceTypeRowProps = {
  id: string;
  name: string;
  description?: string;
  basePrice: number;
  category?: {
    name: string;
  };
};

type DetailServiceRowProps = {
  id: string;
  serviceTypeId: string;
  title: number;
  additionalPrice: number;
  multiplyPrice: number;
  serviceType?: {
    name: string;
  };
};

type DetailService = {
  id: string;
  serviceTypeId: string;
  title: number;
  additionalPrice: number;
  multiplyPrice: number;
  serviceType?: {
    name: string;
  };
};

type ServiceCategory = {
  id: string;
  name: string;
  description?: string;
  isActive?: boolean;
  createdAt?: string;
};
