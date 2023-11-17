# Route Finder!

An easy to use project that allows users to search origin and destination, and display it on a map.

This project was bootstrapped with Create React App

## Frameworks and libraries employed

1. **ReactJS**. One of the most popular JS libraries. It makes frontend easier and streamlined, not to mention the plethora of libraries that provide added functionality.
2. **Bootstrap**, for responsive and streamlined styling. The library is extremely to use and very versatile, offering a lot of options for developing various designs that are suited for all sorts of devices.
3. **Typescript** making the project strongly typed and reducing inevitable bugs that would have caused issues at runtime. Not to mention it works extremely well with Eslint, thus killing two birds with one stone.
4. **Axios** for making API calls and handling error states.
5. **Jest and React Testing Library** for better integration and unit testing. RTL provides lots of functionalities to test individual hooks as well as states, which made is useful for this project.
6. **React Google Maps** is a relatively new library and acts as a React wrapper for Google Maps JavaScript Api. This allowed me to streamline a lot of the API interactions.

## Structure

The bulk of this project exists within `./src/` folder. Here you can find the project broken into various folders:

```shell
├───public
└───src
    ├───App
    ├───components
    │   ├───Alert
    │   ├───Map
    │   └───Sidebar
    ├───context
    ├───definitions
    ├───helpers
    ├───hooks
    └───tests
        ├───__mocks__
        └───__snapshots__
```

## Running the application

Please make sure you have the prequisites installed:

- node: v16.13.1
- yarn: v1.22.5

This project does not use `npm` for package management, attempting to use it to install libraries may lead to errors.

Before running the application make sure the `.env` variables have been set up correctly. Provide the endpoint for the API to `REACT_APP_ENDPOINT` without any trailing slashes.

A Google API ID is needed to run this project.

### Getting a google API ID

1. Navigate to `https://console.cloud.google.com/` and create a new project.
2. In the sidepanel, select API and services > Credentials.
3. Click Create Credentials > API Key, and set the restrictions as needed. Save this generated key.
4. In the search bar at the top, search `Maps JavaScript Api`. An option should appear for the Marketplace, select it.
5. In the newly opened page, enable the API.

You can now use the generated in the project. Set it as `REACT_APP_GOOGLE_API_ID` value in `.env`

### Commands

```shell
git clone https://github.com/sankomil/map-frontend.git
cd map-frontend
yarn
```

Once all packages have been installed, run the application:

```shell
yarn start
```

Tests:

```shell
yarn test
```

Test coverage can be seen with:

```shell
yarn test:ci
```

TypeScript checking:

```shell
yarn tsc-noEmit
```

The project can be built for production with:

```shell
yarn build
```

### Docker

The root directory of this project also contains a Dockerfile. This can be used to deploy a production build and to see the result as well as the coverage of the tests.

#### Test coverage

```shell
docker build --target test -t map-frontend-test:latest .
docker run map-frontend-test:latest
```

#### Production deployment

```shell
docker build -t map-frontend:latest .
docker run -p 3000:3000 map-frontend:latest
```
