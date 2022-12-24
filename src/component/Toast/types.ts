
export enum toastTypes {
    success='success',
    error ='danger',
    info='info',
    warning='warning'

}
export interface IToast {
    type:string,
    title: string,
    description: string
}
