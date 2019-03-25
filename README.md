# pdep-lunes bitacora

## 🚀 Comienzo rápido

1.  **Empezar a desarrollar.**

    Navega hasta la carpeta/directorio donde clonaste este repo, instala las dependencias e inicia el servidor de desarrollo

    ```sh
    cd bitacora/
    npm install
    gatsby develop
    ```

2.  **Abrí el código fuente y empeza a editar!**

    El servidor de la página esta corriendo en `http://localhost:8000`!

    _Nota: También vas a ver otro link: _`http://localhost:8000/___graphql`_. Esta es una herramienta que podes usar para experimentar queries de data. Podes investigar y aprender un poco mas sobre como usar esta herramienta en [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

    Abrí la carpeta `bitacora` editor de código y modifica el archivo`src/pages/index.js` o crea un nuevo post dentro de la carpeta `content/blog/`. Guarda los cambios y tu navegador se va a refrescar automáticamente!

3.  **Hacer un post.**

    Hay pasos bien detallados [acá](./como-hacer-un-post.md)

## 🧐 Que tiene este proyecto?

Una mirada rápida y a alto nivel de los archivos y directorios que vas a ver en este proyecto.

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md

1.  **`/node_modules`**: Este directorio contiene todos los paquetes de npm (npm packages) que funcionan como dependencias y que son instalados con el comando `npm intall`.

2.  **`/src`**: Este directorio contiene todo el código relacionado con lo que se ve en el front-end del sitio (lo que se ve en el browser) como el header o el template de un post. `src` es una convención para referirse a “source code” (código fuente).

3.  **`.gitignore`**: Este archivo a git que cosas tiene que ignorar y evitar tener en cuenta al momento de trackear cambios.

4.  **`.prettierrc`**: Archivo de configuración de [Prettier](https://prettier.io/). Prettier es una herramienta para mantener el formateo de código de manera consistente.

5.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

6.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

7.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

8.  **`LICENSE`**: Gatsby esta licenciado bajo la licencia MIT .

9.  **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

10. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

11. **`README.md`**: A text file containing useful reference information about your project.

## 💫 Deploy

Deploy to gh-pages using the `deploy` script in **package.json**

```sh
npm run deploy
```
