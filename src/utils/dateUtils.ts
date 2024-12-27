interface ScheduleDates {
  scheduleDateStart: string;
  scheduleDateEnd: string;
}

const parseDecimalTime = (decimalTime: number) => {
  const hours = Math.floor(decimalTime);
  const minutes = Math.round((decimalTime % 1) * 60);
  return { hours, minutes };
};

export const getBookingDuration = (serviceType: string): number => {
  switch (serviceType) {
    case "Standard":
      return 1;
    case "Deep Clean":
      return 2;
    case "Post-Party":
      return 3;
    case "Post-Construciton":
      return 4;

    case "1-3 hours":
      return 1;
    case "3-5 hours":
      return 2;
    case "Half day":
      return 3;
    case "A day":
      return 4;
    default:
      console.warn(`Unknown service type: ${serviceType}`);
      return 0;
  }
};

export const createScheduleDates = (
  dateStr: string,
  startTimeDecimal: number,
  serviceType: string
): ScheduleDates => {
  try {
    const baseDate = new Date(dateStr);
    if (isNaN(baseDate.getTime())) {
      throw new Error("Invalid date string");
    }

    const { hours, minutes } = parseDecimalTime(startTimeDecimal);

    const scheduleDateStart = new Date(baseDate);
    scheduleDateStart.setHours(hours, minutes, 0, 0);

    const durationHours = getBookingDuration(serviceType);
    const scheduleDateEnd = new Date(scheduleDateStart);
    scheduleDateEnd.setHours(scheduleDateStart.getHours() + durationHours);
    scheduleDateEnd.setMinutes(scheduleDateStart.getMinutes());

    if (
      isNaN(scheduleDateStart.getTime()) ||
      isNaN(scheduleDateEnd.getTime())
    ) {
      throw new Error("Invalid date calculation");
    }

    return {
      scheduleDateStart: scheduleDateStart.toISOString(),
      scheduleDateEnd: scheduleDateEnd.toISOString(),
    };
  } catch (error) {
    console.error("Error in createScheduleDates:", error);
    throw error;
  }
};

// export const testScheduleDates = () => {
//   const testCases = [
//     {
//       date: "2024-12-08",
//       time: 9.5,
//       type: "3-5 Hours",
//     },
//     {
//       date: "2024-12-31",
//       time: 8.5,
//       type: "Half day",
//     },
//     {
//       date: "2024-12-25",
//       time: 10,
//       type: "A day",
//     },
//   ];

//   testCases.forEach((test) => {
//     const result = createScheduleDates(test.date, test.time, test.type);
//     console.log(`\nTest case: ${test.date} ${test.time} ${test.type}`);
//     console.log("Start:", result.scheduleDateStart);
//     console.log("End:", result.scheduleDateEnd);
//   });
// };
