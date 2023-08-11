import {App} from "vue"
const config = [{"data":{"__$__type":"test"},"globalName":"__$__config","__$__type":"__$__config"}]
export const install = (app:App)=>{
    JSON.parse(JSON.stringify(config).replace(/__\$__/g,'\$')).forEach(data=>{
        app.config.globalProperties[data.globalName] = data.data
    })
}
export default install
