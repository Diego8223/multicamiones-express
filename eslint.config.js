import js from '@eslint/js';
import globals from 'globals';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  // Configuración base para todos los archivos
  {
    ignores: [
      'dist/**',
      '.vite/**',
      'node_modules/**',
      '*.config.js',
      'render.yaml'
    ]
  },
  
  // Configuración JavaScript base
  js.configs.recommended,
  
  // Configuración recomendada para React
  {
    ...reactRecommended,
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  },
  
  // React Hooks
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      'react-hooks': reactHooks
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    }
  },
  
  // React Refresh (para Vite)
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      'react-refresh': reactRefresh
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ]
    }
  },
  
  // Reglas personalizadas
  {
    files: ['**/*.{js,jsx}'],
    rules: {
      'no-unused-vars': [
        'error', 
        { 
          varsIgnorePattern: '^_', 
          argsIgnorePattern: '^_' 
        }
      ],
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/prop-types': 'off',
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'quotes': ['error', 'single', { avoidEscape: true }],
      'semi': ['error', 'always'],
      'indent': ['error', 2, { SwitchCase: 1 }],
      'object-curly-spacing': ['error', 'always'],
      'react/jsx-indent': ['error', 2],
      'react/jsx-indent-props': ['error', 2],
      'react/jsx-tag-spacing': ['error', {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'never'
      }],
      'react/self-closing-comp': ['error', {
        component: true,
        html: true
      }]
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
];