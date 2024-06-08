export function formatDateToDDMMYY(dobString: string): string {
  const dob: Date = new Date(dobString)
  const year: string = dob.getFullYear().toString().padStart(4, "0")
  const month: string = String(dob.getMonth() + 1).padStart(2, "0")
  const day: string = String(dob.getDate()).padStart(2, "0")
  return `${day}/${month}/${year}`
}
