# PROYECTECA - React + TypeScript + Vite

Este proyecto es el cliente de una aplicación cliente-servidor desarrollada con React, TypeScript y Vite. Utiliza Bootstrap para el diseño de la interfaz y está configurado con ESLint para mantener la calidad del código.

## Descripción

PROYECTECA es una aplicación frontend que proporciona una interfaz de usuario responsiva y moderna, construida con las mejores prácticas de desarrollo. El proyecto incluye una serie de bibliotecas y herramientas para facilitar el desarrollo, como React Router, Axios, Styled Components, entre otros.

## Estructura del Proyecto

- **React + TypeScript**: Componentes modulares y tipados para asegurar un código robusto y mantenible.
- **Vite**: Herramienta de desarrollo rápida con soporte para HMR (Hot Module Replacement).
- **Bootstrap**: Framework de CSS para un diseño responsivo y moderno.
- **ESLint**: Herramienta de análisis estático para encontrar y arreglar problemas en el código.

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar los siguientes comandos:

- **`npm run start`**: Inicia el servidor de desarrollo con Vite. El proyecto se ejecutará en `http://localhost:3000` por defecto.
- **`npm run build`**: Construye la aplicación para producción en la carpeta `dist`.
- **`npm run lint`**: Ejecuta ESLint para verificar y corregir problemas en el código.
- **`npm run preview`**: Previsualiza la aplicación de producción después de ser construida.

## Dependencias Principales

- **`react`**: Biblioteca para construir interfaces de usuario.
- **`react-dom`**: Proporciona métodos específicos del DOM que emparejan con la biblioteca `react`.
- **`react-router-dom`**: Enrutador dinámico para aplicaciones React.
- **`axios`**: Cliente HTTP para realizar solicitudes a servidores.
- **`bootstrap`**: Framework CSS para diseñar la UI.
- **`styled-components`**: Biblioteca para escribir CSS en JavaScript.
- **`react-pdf`**: Herramienta para visualizar PDFs en React.


## Dependencias de Desarrollo

- **`typescript`**: Lenguaje de programación con tipado estático.
- **`vite`**: Herramienta de desarrollo frontend.
- **`eslint`**: Herramienta de análisis estático de código.
- **`@typescript-eslint/eslint-plugin`**: Plugin ESLint para TypeScript.
- **`@vitejs/plugin-react`**: Plugin de Vite para soporte de React con Fast Refresh.

## Instalación

1. Clona este repositorio:
    ```bash
    git clone https://github.com/AlbertoCastre/Proyecteca.git
    ```

2. Navega al directorio del proyecto:
    ```bash
    cd nombre-del-repositorio
    ```

3. Instala las dependencias:
    ```bash
    npm install
    # o
    yarn install
    ```

## Configuración de ESLint

El proyecto viene preconfigurado con ESLint para garantizar un código limpio y libre de errores comunes. Para expandir la configuración y habilitar reglas conscientes de tipos, sigue estos pasos:

1. Configura la propiedad `parserOptions` en el archivo `.eslintrc.js`:

    ```js
    export default {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: __dirname,
      },
    }
    ```

2. Reemplaza `plugin:@typescript-eslint/recommended` con `plugin:@typescript-eslint/recommended-type-checked` o `plugin:@typescript-eslint/strict-type-checked`.

3. Opcionalmente, añade `plugin:@typescript-eslint/stylistic-type-checked`.

4. Instala y configura `eslint-plugin-react`:

    ```bash
    npm install eslint-plugin-react --save-dev
    ```

    ```js
    extends: [
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
    ],
    ```

## Licencia

Este proyecto está bajo la licencia [MIT](./LICENSE).

---

Gracias por contribuir y utilizar ProyectoCA. Si tienes alguna pregunta o sugerencia, no dudes en abrir un issue o contactarnos.
