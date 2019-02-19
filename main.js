const process = require('process')
const fs = require('fs') //文件读取和写入
const arr = process.argv // 命令行参数[]
//遍历命令行参数
for (var i = 0; i < arr.length; i++) {
    if(arr[i]=='dev'){
        //如果参数中有dev,则将config.dev.js复制并重命名为config.js
        let read = fs.readFileSync('./configs/config.dev.js','utf-8')
        fs.writeFile('./dist/config.js',read,'utf-8',err => {
            if(err){
                console.log('切换开发环境失败')
            }
            console.log('切换开发环境成功')
        })
        break
    }else if(arr[i]=='build'){
        //如果参数中有build,则将config.pro.js复制并重命名为config.js
        let read = fs.readFileSync('./configs/config.pro.js','utf-8')
        fs.writeFile('./dist/config.js',read,'utf-8',err => {
            if(err){
                console.log('切换生产环境失败')
            }
            console.log('切换生产环境成功')
        })
        break
    }else if(arr[i]=='test'){
        //如果参数中有build,则将config.test.js复制并重命名为config.js
        let read = fs.readFileSync('./configs/config.test.js','utf-8')
        fs.writeFile('./dist/config.js',read,'utf-8',err => {
            if(err){
                console.log('切换测试环境失败')
            }
            console.log('切换测试环境成功')
        })
        break
    }else if(arr[i]=='pre'){
        //如果参数中有build,则将config.pre.js复制并重命名为config.js
        let read = fs.readFileSync('./configs/config.pre.js','utf-8')
        fs.writeFile('./dist/config.js',read,'utf-8',err => {
            if(err){
                console.log('切换预发环境失败')
            }
            console.log('切换预发环境成功')
        })
        break
    }
}