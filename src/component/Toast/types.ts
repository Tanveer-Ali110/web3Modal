
export enum toastTypes {
    success='success',
    error ='error',
    info='info',
    warning='warning'

}
export interface IToast {
    type:string,
    title: string,
    description: string
}
