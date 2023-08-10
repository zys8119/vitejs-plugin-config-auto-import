import {ViteOptions} from "./types";
export const config = <%= globalData %>
export const active = '<%= globalActive %>'
export const defaultConfig:Partial<ViteOptions> = {
    globalName:'<%= globalName %>',
    configTypeName:'<%= configTypeName %>',
}
