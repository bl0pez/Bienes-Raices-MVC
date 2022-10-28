import path from 'path';

export default {
    mode: 'development',
    entry:{
        mapa: './src/mapa.js',
        addImage: './src/addImage.js',
    },
    output:{
        filename: '[name].js',
        path: path.resolve('public', 'js'),
    },
}