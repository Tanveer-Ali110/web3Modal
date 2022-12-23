import Toast, { toastTypes } from "component/Toast"
import Example from "component/Toast1"


export const toastSuccess = (title?: string, description?: string) => {
    return Example({ title: "title" })
}
// export const toastSuccess = (title: string, description?: string) => {
//     return Toast({ type: toastTypes.success, title, description })
// }
export const toastError = (title: string, description?: string) => {
    return Toast({ type: toastTypes.error, title, description })
}
// export const toastInfo = (title: string, description?: string) => {
//     return Toast({ type: toastTypes.info, title, description })
// }
// export const toastWarnig = (title: string, description?: string) => {
//     return Toast({ type: toastTypes.warning, title, description })
// }