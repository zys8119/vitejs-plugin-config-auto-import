import {ViteOptions} from "./types";
export const config = {
    "test":{}
}
export const active = 'test'
export const defaultConfig:Partial<ViteOptions> = {
    globalName:'$config',
    configTypeName:'$type',
}
