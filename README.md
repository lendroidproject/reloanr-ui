# portal-ui
Portal UI for allowances, creating, and viewing loan offers

## how to install?

> `npm install`

> `yarn` (If you are using [yarn](https://yarnpkg.com/en/))

## scripts

> `start`: `webpack-dev-server`

> `dist`: `webpack`

> `watch`: `webpack --progress --watch`

> `dev`: `webpack-dev-server --open`

## how to run?

> `npm start` (`yarn start`) : [http://localhost:8080](http://localhost:8080)

## how to build dist?

> `npm run dist` (`yarn dist`)

## how to work with `lendroid`

> check on [LendroidJS](https://github.com/lendroidproject/lendroid-js)

## test with `lendroid`

1. Clone both repository - `reloanr-ui` and `lendroid-js`
2. Update `package.json` in `reloanr-ui` as following
```
live : "lendroid": "2.3.0-beta.1"
test : "lendroid": "../lendroid-js"
```
3. Install with `npm install` or `yarn` (use NPM for `lendroid-js` and use Yarn for `reloanr-ui`)
4. `yarn start` on `reloanr-ui`
5. Update on `reloanr-ui` will be updated by hot-loading
6. Update on `lendroid-js` need follow steps
```
$ > tsc
$ > cp -rf ./dist ../portal-ui/node_modules/lendroid/
```

### You can do other features like `test`, `watch` and others regarding package.json or you can modify as you need