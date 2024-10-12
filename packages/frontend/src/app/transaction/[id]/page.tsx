import React from 'react'
import TransactionDetails from './components/TransactionsDetails'

const TransactionPage = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <div>
      <TransactionDetails {...{ id }} />
    </div>
  )
}

export default TransactionPage