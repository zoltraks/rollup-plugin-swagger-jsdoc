const swaggerJSDoc = require('swagger-jsdoc');
const fs = require('fs');

export default function swagger(options) {
    return {
        name: 'swagger-jsdoc',
        buildStart() {
            if (!options.definition) {
                throw new Error('You need to provide "definition"');
            }
            if (!options.apis) {
                throw new Error('You need to provide "apis"');
            }
            if (!options.output) {
                throw new Error('You need to provide "output"');
            }
        },
        generateBundle() {
            console.log(`Yahoo from ${__filename}`);
            const output = options.output;
            delete options.output;
            let pretty = false;
            if (options.pretty) {
                pretty = options.pretty;
                delete options.pretty;
            }
            const swaggerSpec = swaggerJSDoc(options);
            const swaggerJson = pretty ? JSON.stringify(swaggerSpec, null, '\t') : JSON.stringify(swaggerSpec); 
            fs.writeFileSync(output, swaggerJson); 
        }
    }
}
