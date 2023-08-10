const lodash = require('lodash')
const {template, merge, omit} = lodash
const fs = require('fs')
const path = require('path')
const {readFileSync, writeFileSync} = fs
const {resolve} = path
module.exports = function (options){
    const opts = merge({
        globalName:'$config',
        globalActive:'test',
        globalData:{
            test:{}
        },
        configTypeName:'$type',
    }, options)
    const dir = resolve(__filename, '..')
    const dir_data = resolve(dir, 'data.ts')
    const dir_types = resolve(dir, 'types.ts')
    // 复写数据
    const temp = resolve(dir, 'temp')
    const temp_data = resolve(temp, 'data.ts')
    let temp_data_content = readFileSync(temp_data, 'utf8')
    temp_data_content = template(temp_data_content)({
        ...opts,
        globalData:(function (globalData){
            try {
                return JSON.stringify(globalData, null, 4)
            }catch (e) {
                return JSON.stringify({}, null,  4)
            }
        })(opts.globalData)
    })
    writeFileSync(dir_data, temp_data_content)
    // 复写类型
    const temp_types = resolve(temp, 'types.ts')
    let temp_types_content = readFileSync(temp_types, 'utf8')
    temp_types_content = template(temp_types_content)(omit(opts, ['globalData']))
    writeFileSync(dir_types, temp_types_content)
    return {
        config(userConfig){
            return merge(userConfig, {
                define:{
                    [opts.globalName]:{
                        ...opts.globalData[opts.globalActive],
                        [opts.configTypeName]:opts.globalActive
                    },
                },
            } )
        }
    }
}
