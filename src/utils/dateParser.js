const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
]

export const dateParser = dateString => {
  if (dateString === null) return ''
  const [day, month, year] = dateString.split('-')
  return `${day} de ${months[month - 1]}, ${year}`
}

export const getYearAsNumber = dateString => {
  const [DD, MM, YYYY] = dateString.split('-')
  return parseInt(YYYY)
}