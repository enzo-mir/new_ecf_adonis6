# Setup inertia app with Adonis v6 with React

## Dependency
[@adonisjs/inertia](https://www.npmjs.com/package/@adonisjs/inertia)

## Installation

```shell
# NPM
npm i @adonisjs/inertia

# Yarn
yarn add @adonisjs/inertia

# Pnpm
pnpm add @adonisjs/inertia
```

## Configuration

```shell
# ace command from adonis
node ace configure @adonisjs/inertia
```
And follow the instruction. 
(notice : accept to install the inertia and react packages recommanded)

## Vite configuration

### `vite.config.js`

```shell
import { defineConfig } from 'vite'
import adonisjs from '@adonisjs/vite/client'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [
    adonisjs({
      /**
       * Entrypoints of your application. Each entrypoint will
       * result in a separate bundle.
       */
      entrypoints: ['resources/js/app.js'],

      /**
       * Paths to watch and reload the browser on file change
       */
      reload: ['resources/views/**/*.edge'],
    }),
    react(),
  ],
})
```

## edge configuration 

`/resources/view/home.edge`

```shell
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title> AdonisJS - A fully featured web framework for Node.js </title>
  @viteReactRefresh()
  @vite(['resources/js/app.tsx'])
  @inertiaHead
</head>
<body>
  #Inertia setup
  @inertia()
</body>
</html>
```

The line `@vite(['resources/js/app.tsx'])` will be this entrypoint file.

## Create inertia app

`resources/js/app.tsx`

```shell
import { createInertiaApp } from '@inertiajs/react'
import React from 'react'
import { createRoot } from 'react-dom/client'

createInertiaApp({
  resolve: (name) => {
    #Pages registration './Pages/${name}.tsx' that can be what you want
    const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true })
    return pages[`./Pages/${name}.tsx`]
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})
```

## Routing file

`/start/routes.ts`

```shell
import { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'

router.get('/', ({ inertia }: HttpContext) => {
  const title = 'Hello world with Inertia'
  return inertia.render('home', { title })
})
```

## home page

`/resources/js/Pages/home.tsx`

```shell
import React from 'react'
interface HomeProps {title: string}
const home: React.FunctionComponent<HomeProps> = ({ title }) => {
  return <div>hello ! {title}</div>
}

export default home
```

For more information on adonis/inertia app gon on [aidellev/inertiajs-adonisjs](https://github.com/eidellev/inertiajs-adonisjs)