import { isNil, isNumber, isObject, isString, isUndefined } from 'lodash'
import { utils, BigNumberish, BigNumber } from 'ethers'
// import moment, { isDuration, isMoment } from 'moment'
// import momentDurationFormatSetup from 'moment-duration-format'

// momentDurationFormatSetup(moment as any)

// type dateTimeFormats = 'long' | 'short' | 'full' | 'medium'

// export const formatDate = (date: Date | number, dateStyle: dateTimeFormats = 'long') => {
//   const _date = isNumber(date) ? new Date(date) : date
//   return new Intl.DateTimeFormat('en-GB', { dateStyle }).format(_date)
// }

// export const formatDateTime = (
//   date: Date | number,
//   dateStyle: dateTimeFormats = 'long',
//   timeStyle: dateTimeFormats = 'long',
// ) => {
//   const _date = isNumber(date) ? new Date(date) : date
//   return new Intl.DateTimeFormat('en-GB', { dateStyle, timeStyle }).format(_date)
// }

// export const formatDurationUntil = (
//   value: string | number | moment.Moment,
//   until: string | number | moment.Moment = moment(),
//   unix = true,
// ) => {
//   return formatDuration(durationUntil(value, until, unix))
// }
// export const durationUntil = (
//   value: string | number | moment.Moment,
//   until: string | number | moment.Moment = moment(),
//   unix = true,
// ) => {
//   if (isUndefined(value)) return null
//   const momentValue = getMomentValue(value, unix)
//   const momentUntil = getMomentValue(until, unix)
//   return moment.duration(momentValue.diff(momentUntil))
// }
// const getMomentValue = (value: string | number | moment.Moment, unix = false) => {
//   let momentValue = value
//   if (!isMoment(momentValue)) {
//     const numberValue = parseFloat(value.toString())
//     if (Number.isNaN(numberValue) || !Number.isFinite(numberValue)) return null
//     momentValue = unix ? moment.unix(numberValue) : moment(numberValue)
//   }
//   return momentValue
// }
// export const formatDuration = (duration: string | number | moment.Duration, unix = false) => {
//   let momentDuration = duration as moment.Duration
//   if (!isDuration(momentDuration)) {
//     const numberValue = parseFloat(duration.toString())
//     if (Number.isNaN(numberValue) || !Number.isFinite(numberValue)) return null
//     momentDuration = moment.duration(numberValue * (unix ? 1000 : 1))
//   }

//   if (isUndefined(momentDuration)) return null
//   if (momentDuration.years() >= 1) return 'more than a year'
//   if (momentDuration.months() >= 1) return momentDuration.format('M [months]')
//   if (momentDuration.weeks() >= 1) return momentDuration.format('w [weeks]')
//   if (momentDuration.days() >= 1) return momentDuration.format('d [days], h [hours]')
//   return momentDuration.format('h [hours], m [minutes], s [seconds]')
// }

export const formatBN = (value: BigNumberish | BigNumber, decimals = 18, removeTrailingZeros = true) => {
  if (isUndefined(value) || isNil(value)) return ''
  const bn = !isObject(value) ? BigNumber.from(value.toString()) : (value as BigNumber)
  const result = utils.formatUnits(bn, decimals ?? 0)
  return removeTrailingZeros ? parseFloat(result).toString() : result
}

// export const formatCurrencyUS = (input: number | string) => {
//   const numberValue = isString(input) ? parseFloat(input.toString()) : input
//   if (Number.isNaN(numberValue) || !Number.isFinite(numberValue)) return null
//   return numberValue.toLocaleString('en-US', {
//     style: 'currency',
//     currency: 'USD',
//   })
// }

// export const formatBool = (value: boolean) => {
//   return value ? 'Yes' : 'No'
// }

// export const formatMetadataUri = (value: string) => {
//   if (!value || !value?.toLowerCase().startsWith('ipfs:/')) return value
//   const slashIdx = value.indexOf('://') !== -1 ? value.indexOf('://') + 3 : value.indexOf(':/') + 2
//   return `https://ipfs.infura.io/ipfs/${value.substring(slashIdx)}`
// }
