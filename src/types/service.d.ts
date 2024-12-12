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
  onRowClick: (id: string) => void;
  onCheckboxToggle?: (id: string, checked: boolean) => void;
  isLoading?: boolean;
};

type DetailServiceRowProps = {
  id: string;
  serviceTypeId: string;
  title: string;
  additionalPrice: number;
  multiplyPrice: number;
  serviceType?: {
    name: string;
  };
  onRowClick: (id: string) => void;
  onCheckboxToggle?: (id: string, checked: boolean) => void;
  isLoading?: boolean;
};

type ServiceDetail = {
  id: string;
  serviceTypeId: string;
  title: string;
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
