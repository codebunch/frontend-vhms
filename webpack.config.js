const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/**
 * Below code required to fix problem with node versions throwing error Error: error:0308010C:digital envelope routines::unsupported
 * Reference - https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported/72219174#72219174
 */
const crypto = require('crypto')
/**
 * The MD4 algorithm is not available anymore in Node.js 17+ (because of library SSL 3).
 * In that case, silently replace MD4 by the MD5 algorithm.
 */
try {
  crypto.createHash('md4');
} catch (e) {
  console.warn('Crypto "MD4" is not supported anymore by this Node.js version');
  const origCreateHash = crypto.createHash;
  crypto.createHash = (alg, opts) => {
    return origCreateHash(alg === 'md4' ? 'md5' : alg, opts);
  };
}

module.exports = {    
    mode: 'production',
//    mode: 'development',
    watch: true,
    entry:    "./src/index.tsx",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        },
        {
          test: /\.svg$/,
          use: "file-loader",
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: "site.js",
        path: path.resolve(__dirname, "../wwwroot/js"),        
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "../css/site.css" // change this RELATIVE to your output.path!
      })
    ],
        
}