# rollup-plugin-swagger-jsdoc

[![Build Status](https://travis-ci.org/zoltraks/rollup-plugin-swagger-jsdoc.svg?branch=main)](https://travis-ci.org/zoltraks/rollup-plugin-swagger-jsdoc)

Rollup plugin to generate a *swagger.json* file from ``JSDoc`` comments using **swagger-jsdoc** library.

## Install

```
npm install --save-dev rollup-plugin-swagger-jsdoc
```

## Usage

```js
// rollup.config.js
import swagger from 'rollup-plugin-swagger-jsdoc';

export default {
    // ...
    plugins: [
        swagger({
            definition: {
                // Specification (optional, defaults to swagger: '2.0')
                openapi: '3.0.0',
                info: {
                    // Title (required)
                    title: 'My API',
                    // Version (required)
                    version: '1.0.0',
                },
            },
            // Path to the API docs
            apis: ['src/routes/**/*.js'],
            // Pretty format output JSON 
            pretty: true,
            // Output swagger.json file
            output: 'public/swagger.json'
        })
    ]
}
```

## How to document your API

For details, see [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) documentation and [OpenAPI](https://swagger.io/specification/) specification.

In a nutshell your API is documented using ``JSDoc`` comments with ``@swagger`` section in ``YAML`` format.

The following example was taken from [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) library.

```js
/**
 * @swagger
 *
 * /login:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
app.post('/login', (req, res) => {
  // Your implementation comes here ...
});
```

## Example application

Here is quick example of simple **express** application using [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express) library to provide Swagger UI.

You need to install **express** and **swagger-ui-express** via npm. Swagger UI will be served at **/swagger** location in this example.

```js
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const port = process.env.PORT || 8080;
 
const swaggerOptions = {
  swaggerOptions: {
    // Path to exposed swagger.json file
    url: '/swagger.json'
  }
}
 
// Expose Swagger UI
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(null, swaggerOptions));
// Expose generated swagger.json during build
app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, function(err) { 
    if (!err) {
        console.log(`Server listening on port: ${port}`);
    }
});
```
