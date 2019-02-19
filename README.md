> 目录介绍
```
│  main.js              //node脚本
│  package.json         
│
├─configs               
│      config.dev.js    //开发环境配置文件
│      config.pre.js    //预发环境配置文件
│      config.pro.js    //生产环境配置文件
│      config.test.js   //测试环境配置文件
│
└─dist
        config.js       //小程序app.js引入的的配置文件
```

## 利用node + npm实现命令行切换小程序开发环境
> node的process监听命令行的参数,判断需要切换的环境;
> node的fs读取需要的配置文件```./configs/config.xxx.js```,并将内容写入到```./dist/config.js```
> 小程序的```app.js```引入```./dist/config.js```配置文件

### 1.初始化
    ```
        $ npm init -y
    ``` 
### 2.手动创建配置文件
    ```
     - config.dev.js //开发环境
        module.exports = {
            domainName:"www.dev.com"
        }
     - config.pro.js //生产环境
        module.exports = {
            domainName:"www.pro.com"
        }
     - config.test.js //测试环境
        module.exports = {
            domainName:"www.test.com"
        }
     - config.pre.js //预发环境
        module.exports = {
            domainName:"www.pre.com"
        }
     - main.js //node脚本
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
                    }else{
                        console.log('切换开发环境成功')
                    }
                })
                break
            }else if(arr[i]=='build'){
                //如果参数中有build,则将config.pro.js复制并重命名为config.js
                let read = fs.readFileSync('./configs/config.pro.js','utf-8')
                fs.writeFile('./dist/config.js',read,'utf-8',err => {
                    if(err){
                        console.log('切换生产环境失败')
                    }else{
                        console.log('切换生产环境成功')
                    }
                })
                break
            }else if(arr[i]=='test'){
                //如果参数中有build,则将config.test.js复制并重命名为config.js
                let read = fs.readFileSync('./configs/config.test.js','utf-8')
                fs.writeFile('./dist/config.js',read,'utf-8',err => {
                    if(err){
                        console.log('切换测试环境失败')
                    }else{
                        console.log('切换测试环境成功')
                    }
                })
                break
            }else if(arr[i]=='pre'){
                //如果参数中有build,则将config.pre.js复制并重命名为config.js
                let read = fs.readFileSync('./configs/config.pre.js','utf-8')
                fs.writeFile('./dist/config.js',read,'utf-8',err => {
                    if(err){
                        console.log('切换预发环境失败')
                    }else{
                        console.log('切换预发环境成功')
                    }
                })
                break
            }
        }
    ```

### 3.修改小程序```app.js```
    ```
        import config from './dist/config'
        App({
            globalData: {
                domainName:config.domainName,
            }
        })
    ```
### 4.修改```package.json```
    ```
        {
          "scripts": {
            "dev": "node ./main.js dev",
            "build": "node ./main.js build",
            "test": "node ./main.js test",
            "pre": "node ./main.js pre"
          }
        }
    ```
### 5.执行脚本
    ```
        - npm run dev   //切换到开发环境
        - npm run build //切换到生产环境
        - npm run test  //切换到测试环境
        - npm run pre   //切换到预发环境
    ```