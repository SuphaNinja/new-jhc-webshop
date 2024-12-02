

export const formatPrice = (oreAmount: number): string => {
    // Convert öre to SEK
    const sekAmount = oreAmount / 100

    // Format the number with thousands separators and two decimal places
    return new Intl.NumberFormat('sv-SE', {
        style: 'currency',
        currency: 'SEK',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(sekAmount)
}