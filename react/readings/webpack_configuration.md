# Webpack Configuration 

Just like with NPM, we can use a configuration file to setup all our webpack options. 


## `webpack.config.js`

Create a `webpack.config.js`. 

```
module.exports = 
{
    context: __dirname + "/app",
    entry: "./entry",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    }
}
```