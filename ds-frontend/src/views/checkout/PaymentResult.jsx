import React from 'react'
import { useLocation } from 'react-router-dom'

const PaymentResult = () => {
  const search = useLocation().search
  const result = new URLSearchParams(search).get('result')
  return <div>{result}</div>
}

export default PaymentResult
