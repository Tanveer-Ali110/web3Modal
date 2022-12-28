import { ContractTransaction } from 'ethers'
import { toastError } from './toaster'

export const handleTransactionCall = async (call: () => Promise<ContractTransaction>) => {
  try {
    const transaction = await call()
    return handleTransaction(transaction)
  } catch (err: unknown | any) {
    const message = err?.message ?? err?.data?.message ?? 'Check your console for more information'
    toastError('Error processing transaction', message)
    console.error('Error processing transaction message', err)
    return false
  }
}

export const handleTransaction = async (transaction: ContractTransaction) => {
  const receipt = await transaction.wait()
  if (receipt.status === 0) {
    toastError('Error processing transaction', 'Check your console for more information')
    console.error('Error processing transaction', receipt)
  }
  return receipt.status > 0
}