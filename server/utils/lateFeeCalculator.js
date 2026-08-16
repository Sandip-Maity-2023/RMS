/**
 * Calculates late penalty fee based on actual return date versus expected date.
 * Rule: Charges hourly late fee beyond grace period (1 hour). Maximum limit cap applied.
 */
const calculateLateFee = (expectedReturn, actualReturn, hourlyRate = 10, maxLimit = 200) => {
  const expDate = new Date(expectedReturn);
  const actDate = new Date(actualReturn);

  if (actDate <= expDate) return 0;

  const diffInMs = actDate - expDate;
  const diffInHours = Math.ceil(diffInMs / (1000 * 60 * 60));
  
  // 1 Hour Grace Period
  if (diffInHours <= 1) return 0;

  const penaltyHours = diffInHours - 1;
  const calculatedFee = penaltyHours * hourlyRate;

  return Math.min(calculatedFee, maxLimit);
};

module.exports = calculateLateFee;
