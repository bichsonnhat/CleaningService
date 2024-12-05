export interface IBookingResponse {
    id: string,
    customerId: string,
    helperId: string,
    serviceTypeId: string,
    location: string,
    scheduledStartTime: Date,
    scheduledEndTime: Date,
    status: string,
    cancellationReason: string,
    totalPrice: number,
    paymentStatus: string,
    paymentMethod: string,
    serviceType: {
      name: string,
    }
}

export interface IUserResponse {
    id: string,
    gender: string,
    fullName: string,
    dateOfBirth: Date,
    identifyCard: string,
    address: string,
    phoneNumber: string,
    createdAt: Date,
    updatedAt: Date,
    status: string,
    numberOfViolations: number,
}

export interface IServiceCategoryResponse {
    id: string,
    name: string,
    description: string,
    createdAt: Date,
    isActive: boolean,
}
