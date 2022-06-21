# Cooking VUE

A cooking UI based on time-management cooking games.
Create the **utensils** that are present in your fictional kitchen.
Create the **ingredients** that will be cooked, as well as the half-cooked and final byproducts.
Create **recipes** by creating the individual **steps** necessary to transform the raw ingredient into a fully cooked byproduct.

# Repositories

- Main repo: https://gitlab.com/egarciadececa/cooking-vue
- Backup repo: https://github.com/daxadal/cooking-vue

# Availability

_(This server is not currently being served on the Internet)_

# Previous steps

_This app needs to be connected to the [Cooking API](https://gitlab.com/egarciadececa/cooking-api) project.
Check its [availability](https://gitlab.com/egarciadececa/cooking-api/#availability) beforehand, or execute it locally._

Modify the `.env` with the server URL.

# Installation and execution

To run the app, first you have to install the dependencies:

```bash
npm ci
```

The app can be started using **one** of the following commands:

```bash
npm run serve # Hot-reloads for development
npm run build # Minifies for production
```

By default, the app is available at `http://localhost:8080`.

# Lint

Project can be linted using the following command:

```bash
npm run lint
```
