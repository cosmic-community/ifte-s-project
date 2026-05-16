export function formatCurrency(amount?: number): string {
  if (amount === undefined || amount === null) return '$0'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(dateString?: string): string {
  if (!dateString) return ''
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateString
  }
}

export function calculateProgress(raised?: number, goal?: number): number {
  if (!raised || !goal || goal === 0) return 0
  return Math.min(Math.round((raised / goal) * 100), 100)
}