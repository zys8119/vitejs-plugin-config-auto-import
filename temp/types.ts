import {config, active} from "./data";

export type ViteOptions  = {
    globalName:string
    globalActive:string
    globalData:Record<string, any>
    configTypeName:string
}

type GlobalVariableType = typeof config[typeof active] & {
    <%= configTypeName %>:typeof active
}

declare module 'vue' {
    export interface ComponentCustomProperties {
        <%= globalName %>:GlobalVariableType
    }
}
declare global {
    const <%= globalName %>:GlobalVariableType
}
