import {config0, active0} from "./data";
export type ViteOptions  = {
    globalName:string
    globalActive:string
    globalData:Record<string, any>
    configTypeName:string
}
type GlobalVariableType0 = typeof config0[typeof active0] & {
    $type:typeof active0
    value?:any
}
declare module 'vue' {
    export interface ComponentCustomProperties {
        $config:GlobalVariableType0
    }
}
declare global {
    const $config:GlobalVariableType0
}
