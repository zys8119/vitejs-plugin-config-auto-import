<%= importStr %>

<%= ViteOptions %>

type GlobalVariableType<%= key %> = typeof config<%= key %>[typeof active<%= key %>] & {
    <%= configTypeName %>:typeof active<%= key %>
}

<%= declareModuleVue %>

<%= declareGlobal  %>
