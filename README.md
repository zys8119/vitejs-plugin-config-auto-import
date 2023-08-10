# vitejs-plugin-config-auto-import
vite + vue3 配置分类自动导入

## 安装

`npm i vitejs-plugin-config-auto-import`

## 使用

#### Vite

vite.config.ts

```typescript
import {defineConfig} from "vite"
import ConfigAutoImport from "vitejs-plugin-config-auto-import/vite"

export default defineConfig({
    plugins:[
        ConfigAutoImport({
            // globalName:string  //  全局变量字段名称， 默认 $config
            // globalActive:string  // 当前全局类别， 默认 test
            // globalData:Record<string, any>  // 全局数据配置源 默认 {test:{}}
            // configTypeName:string  // 当前类别强制重写类型字段名称， 默认 $type
        })
    ]
    // ....
})
```
#### Vue

> 内置vue3 ComponentCustomProperties ，如需要 ComponentCustomProperties使用请在main注入插件

main.ts

```typescript
import {createApp} from "vue"
import App from "./App.vue"
import ConfigAutoImport from "vitejs-plugin-config-auto-import"
const app = createApp(App)
// ...
app.use(ConfigAutoImport)
app.mount('#app')
```

