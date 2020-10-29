import { terser } from "rollup-plugin-terser";
import buble from '@rollup/plugin-buble';
import pkg from './package.json';

export default {
    input: "src/index.js",
    output: [
        { file: pkg.main, format: 'cjs', exports: 'auto' },
        { file: pkg.module, format: 'es' }
    ],
    plugins: [
        buble(),
        terser(),
    ],
    external: ["fs", "path"],
}
