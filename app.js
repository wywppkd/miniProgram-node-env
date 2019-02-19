// 小程序的app.js
import config from './dist/config'
App({
    globalData:{
        domainName:config.domainName
    }
})