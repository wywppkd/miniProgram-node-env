## 利用node + npm实现命令行切换小程序开发环境

* 解决问题
    * 小程序开发过程中需要经常修改不同环境的配置参数(originUrl,blockId等),手动修改较为繁琐(尤其是配置参数较多时)
    * 使用命令行切换不同环境方便开发测试,减少不必要的问题

* 实现思路
    * 1.node的process监听命令行的参数,获取到需要的环境参数("dev" | "build" | "test" | "pre");
    * 2.根据不同环境参数,确定要切换的环境,node的fs读取复制对应配置文件,如"./configs/config.dev.js",并将内容复制到"./dist/config.js"
    * 3.小程序的"app.js"引入"./dist/config.js"配置文件

* 优点
    * 只需要安装node即可, 不依赖打包工具, 第三方插件等

#### 目录介绍
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

***

### 1.初始化
```bash
    $ npm init -y
```
### 2.手动创建配置文件
``` javascript
 - config.dev.js //开发环境
    module.exports = {
        originUrl:"https://www.dev.com"
    }
 - config.pro.js //生产环境
    module.exports = {
        originUrl:"https://www.pro.com"
    }
 - config.test.js //测试环境
    module.exports = {
        originUrl:"https://www.test.com"
    }
 - config.pre.js //预发环境
    module.exports = {
        originUrl:"https://www.pre.com"
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

### 3.修改小程序 "app.js"
```javascript
    import config from './dist/config'
    App({
        globalData: {
            originUrl:config.originUrl,
        }
    })
```

### 4.修改 "package.json"

```json
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
```bash
    $ npm run dev   # 切换到开发环境
    
    $ npm run build # 切换到生产环境
    
    $ npm run test  # 切换到测试环境
    
    $ npm run pre   # 切换到预发环境
```