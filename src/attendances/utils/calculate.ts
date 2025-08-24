import moment from "moment";

export const calculateWorkTime = (clockIn: string, clockOut?: string) => {
  const startWork = moment(clockIn); // employee clock-in
  const officialStart = moment(startWork).set({ hour: 8, minute: 0, second: 0 }); // 8:00 AM
  const workingHours = 9;

  if (!clockOut) {
    return {
      clockIn: startWork.format("YYYY-MM-DD HH:mm:ss"),
      clockOut: null,
      workedHours: 0,
      late: startWork.isAfter(officialStart),
      under: false,
      overtime: false,
    };
  }

  const endWork = moment(clockOut);
  const workedHours = endWork.diff(startWork, "hours", true);

  return {
    clockIn: startWork.format("YYYY-MM-DD HH:mm:ss"),
    clockOut: endWork.format("YYYY-MM-DD HH:mm:ss"),
    workedHours: parseFloat(workedHours.toFixed(2)),
    late: startWork.isAfter(officialStart),
    under: workedHours < workingHours,
    overtime: workedHours > workingHours,
  };

}