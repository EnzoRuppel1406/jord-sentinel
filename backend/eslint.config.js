import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import globals from 'globals'

export default defineConfig([
    {
        files: ['**/*.js'],

        plugins: {
            js,
        },

        extends: ['js/recommended'],

        languageOptions: {
            // Utiliza a versão mais recente do ECMAScript suportada pelo ESLint
            ecmaVersion: 'latest',

            // O projeto utiliza ES Modules
            sourceType: 'module',

            // Disponibiliza os globais do ambiente Node.js
            globals: {
                ...globals.node,
            },
        },

        rules: {
            // Sempre utilizar === e !==
            eqeqeq: 'error',

            // Exige chaves em estruturas de controle
            curly: ['error', 'all'],

            // Variáveis não utilizadas geram apenas aviso
            'no-unused-vars': 'warn',

            // Permite console.log() durante o desenvolvimento
            'no-console': 'off',
        },
    },
])
