export const calculateBMI = (height: number, weight: number) => {
  const heightInMeters = height * 0.01
  const bmi = weight / (heightInMeters * heightInMeters)
  return Math.round(bmi * 100) / 100
}
