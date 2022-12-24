
export enum toastTypes {
    success='success',
    danger ='danger',
    info='info',
    warning='warning'

}
export interface IToast {
    type:string,
    title: string,
    description: string
}
