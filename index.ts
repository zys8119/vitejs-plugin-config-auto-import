import {App} from "vue"
import {defaultConfig, config, active} from "./data"
export const install = (app:App)=>{
    app.config.globalProperties[defaultConfig.globalName] = {
        ...config[active],
        [defaultConfig.configTypeName]:active
    }
}
export default install
