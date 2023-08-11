const lodash = require('lodash')
const {template, merge, omit, get} = lodash
const fs = require('fs')
const path = require('path')
const {readFileSync, writeFileSync} = fs
const {resolve} = path
const optsCache = {}
module.exports = function (options){
    let opts = merge({
        globalName:'$config',
        globalActive:'test',
        globalData:{
            test:{}
        },
        configTypeName:'$type',
    }, options)
    optsCache[opts.globalName] =  opts
    const globalNames = Object.keys(optsCache)
    const define = {}
    const dir = resolve(__filename, '..')
    const dir_data = resolve(dir, 'data.ts')
    const dir_types = resolve(dir, 'types.ts')
    const dir_index = resolve(dir, 'index.ts')
    const temp = resolve(dir, 'temp')
    const temp_data = resolve(temp, 'data.ts')
    const temp_types = resolve(temp, 'types.ts')
    const temp_index = resolve(temp, 'index.ts')
    let temp_data_content = readFileSync(temp_data, 'utf8')
    let temp_types_content = readFileSync(temp_types, 'utf8')
    let temp_index_content = readFileSync(temp_index, 'utf8')
    let temp_data_content2 = ''
    let temp_types_content2 = ''
    globalNames.forEach((globalName, key, arr)=>{
        opts = optsCache[globalName]
        // 复写数据
        temp_data_content2 += template(temp_data_content)({
            ...opts,
            globalData:(function (globalData){
                try {
                    return JSON.stringify(globalData, null, 4)
                }catch (e) {
                    return JSON.stringify({}, null,  4)
                }
            })(opts.globalData),
            globalName:opts.globalName,
            key,
            importStr:key === 0 ? 'import {ViteOptions} from "./types";' : null
        })
        // 复写类型
        temp_types_content2 += template(temp_types_content)({
            ...omit(opts, ['globalData']),
            key,
            importStr:key === 0 ? `import {${arr.map((name,key)=>`config${key}, active${key}`).join(", ")}} from "./data";` : null,
            ViteOptions:key === 0 ? `export type ViteOptions  = {
    globalName:string
    globalActive:string
    globalData:Record<string, any>
    configTypeName:string
}` : null,
            declareGlobal:key === arr.length - 1 ? `declare global {
    ${arr.map((name,key)=>`const ${name}:GlobalVariableType${key}`).join("\n    ")}
}` : null,
            declareModuleVue:key === arr.length - 1 ? `declare module 'vue' {
    export interface ComponentCustomProperties {
        ${arr.map((name,key)=>`${name}:GlobalVariableType${key}`).join("\n        ")}
    }
}` : null
        })
    })
    const getData = function (opts){
        let data = get(get(opts,'globalData', {}),opts.globalActive, {})
        data = Object.prototype.toString.call(data) === '[object Object]' ? data :  {value:data}
        return merge(data, {
            [opts.configTypeName]:opts.globalActive
        })
    }
    writeFileSync(dir_data, temp_data_content2.replace(/\n+/g,'\n'))
    writeFileSync(dir_types, temp_types_content2.replace(/\n+/g,'\n'))
    writeFileSync(dir_index, template(temp_index_content)({
        config:JSON.stringify(Object.values(optsCache).map(e=>({
            data:getData(e),
            globalName:e.globalName,
            [e.configTypeName]:e.globalName
        }))).replace(/(\$)/g,'__$1__')
    }))
    return {
        config(userConfig){
            return merge(userConfig, {
                define:Object.fromEntries(Object.entries(optsCache).map(([k, v])=>[k, getData(v)])),
            })
        }
    }
}
