import {App} from "vue"
const config = [{"data":{"__$__type":"test"},"globalName":"__$__config","__$__type":"__$__config"},{"data":{"b":"asdasd","c":"阿萨德发生打卡","__$__GGGG":"test"},"globalName":"__$__aaa","__$__GGGG":"__$__aaa"}]
export const install = (app:App)=>{
    JSON.parse(JSON.stringify(config).replace(/__\$__/g,'\$')).forEach(data=>{
        app.config.globalProperties[data.globalName] = data.data
    })
}
export default install
