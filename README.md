# Simone

A frontend for the docker daemon. Demo there: https://dev.charlyghislain.com/simone
To connect to a daemon over tcp, you need to bind the docker daemon to a tcp port and proxify requests to add the CORS headers.
The api-cors-headers option provided by the docker daemon does not seem to handle credentials.
  
  Header set Access-Control-Allow-Origin your-origin
  Header set Access-Control-Allow-Headers Authorization
  Header set Access-Control-Allow-Credentials true

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.29.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to GitHub Pages

Run `ng github-pages:deploy` to deploy to GitHub Pages.

## Further help

To get more help on the `angular-cli` use `ng help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
