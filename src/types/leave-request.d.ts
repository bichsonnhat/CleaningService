type LeaveRequest = {
    id: string;
    helperId: string;
    startDatetime: string;
    endDatetime: string;
    availabilityType: string;
    status: "Approved" | "Cancelled" | "Rejected" | "Pending";
    requestReason: string;
    rejectionReason: string;
    approvedById: string;
    approvedBy?: {
        fullName: string
    } ;
    createdAt: string;
    updatedAt: string;
    helper? : {
        user?: {
            fullName: string
        }
    }
}

type LeaveRequestRowProps = {
    id: string;
    startDatetime: string;
    endDatetime: string;
    status: "Approved" | "Cancelled" | "Rejected" | "Pending";
    requestReason: string;
    createdAt: string;
    helper? : {
        user?: {
            fullName: string
        }
    }
    onCheckboxToggle?: (id: string, checked: boolean) => void;
}