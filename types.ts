import {config0, active0, config1, active1} from "./data";
export type ViteOptions  = {
    globalName:string
    globalActive:string
    globalData:Record<string, any>
    configTypeName:string
}
type GlobalVariableType0 = typeof config0[typeof active0] & {
    $type:typeof active0
}
type GlobalVariableType1 = typeof config1[typeof active1] & {
    $GGGG:typeof active1
}
declare module 'vue' {
    export interface ComponentCustomProperties {
        $config:GlobalVariableType0
        $aaa:GlobalVariableType1
    }
}
declare global {
    const $config:GlobalVariableType0
    const $aaa:GlobalVariableType1
}
