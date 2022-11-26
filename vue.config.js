const path = require('path');

module.exports ={
    configureWebpack: {
        resolve:{
            alias:{
                comp: path.resolve(__dirname, 'src/components'),
                icons: path.resolve(__dirname, 'src/components/icons'),
                views: path.resolve(__dirname, 'src/views')
            }
        }
    }
}