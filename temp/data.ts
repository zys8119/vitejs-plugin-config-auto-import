<%= importStr %>
export const config<%= key %> = <%= globalData %>
export const active<%= key %> = '<%= globalActive %>'
export const defaultConfig<%= key %>:Partial<ViteOptions> = {
    globalName:'<%= globalName %>',
    configTypeName:'<%= configTypeName %>',
}
