import {config, active} from "./data";

export type ViteOptions  = {
    globalName:string
    globalActive:string
    globalData:Record<string, any>
    configTypeName:string
}

type GlobalVariableType = typeof config[typeof active] & {
    $type:typeof active
}

declare module 'vue' {
    export interface ComponentCustomProperties {
        $config:GlobalVariableType
    }
}
declare global {
    const $config:GlobalVariableType
}
