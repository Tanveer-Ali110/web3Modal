import Toast, { toastTypes } from "component/Toast"
import Toast1 from "component/Toast1"

export const toastSuccess = (title?: string, description?: string) => Toast1({ type: toastTypes.success, title, description })

export const toastError = (title: string, description?: string) => Toast1({ type: toastTypes.error, title, description })

export const toastInfo = (title: string, description?: string) => Toast1({ type: toastTypes.info, title, description })

export const toastWarnig = (title: string, description?: string) => Toast1({ type: toastTypes.warning, title, description })