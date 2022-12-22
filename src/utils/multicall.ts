import { AbiItem } from 'web3-utils'
import { Interface } from '@ethersproject/abi'
import { web3NoAccount } from 'utils/getRpcUrl'
import MultiCallAbi from 'config/contract/abi/multicall.json'
import { getMulticallAddress } from 'utils/addressHelpers'
import { BytesLike, Contract } from 'ethers'

export interface Call {
  address: string // Address of the contract
  name: string // Function name on the contract (example: balanceOf)
  params?: any[] // Function params
}

export const nestedMulticall = async (abi: any[], nestedCalls: Call[][], flat = true): Promise<any[][]> => {
  const calls: Call[] = nestedCalls.flat()
  const callResults = await multicall(abi, calls, flat)

  const allRes: any[][] = []
  return nestedCalls.reduce((acc, res) => [...acc, callResults.splice(0, res.length)], allRes)
}

export const multicall = async (abi: any[], calls: Call[], flat = true): Promise<any[]> => {
  const multi= new Contract(getMulticallAddress(),MultiCallAbi,web3NoAccount)
  const itf = new Interface(abi)

  const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
  const { returnData } = await multi.aggregate(calldata)
  const res = returnData.map((call: BytesLike, i: string | number) => itf.decodeFunctionResult(calls[i].name, call))
  return flat ? res.flat() : res
}
