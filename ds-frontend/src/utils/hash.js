import md5 from 'crypto-js/md5'

export const hash = (merchantId, orderId, amount, currency, merchantSecret) => {
  let amountFormated = parseFloat(amount)
    .toLocaleString('en-us', { minimumFractionDigits: 2 })
    .replaceAll(',', '')
  let hashedSecret = md5(merchantSecret).toString().toUpperCase()
  return md5(merchantId + orderId + amountFormated + currency + hashedSecret)
    .toString()
    .toUpperCase()
}
