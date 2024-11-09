// types/dtos/service.dto.ts
export interface CreateServiceDTO {
  name: string;
  description: string;
  isActive?: boolean;
}

export interface ServiceResponseDTO {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  isActive: boolean;
}

export interface UpdateServiceDTO {
  name?: string;
  description?: string;
  isActive?: boolean;
}