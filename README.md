# Single page application that displays a list of GitHub users

Users are fetched using the GitHub Search API because it supports regular pagination. For Users API I would use either _load more_ or _infinite scroll_ approach. Requests are made using `axios` HTTP client. User interface is made with Ant Design Components. `HashRouter` is used to have working router on refresh.

Redux store is used to keep page and page size when user go back from details page. Users list is not in the store. It would be nice, but I had to stop somewhere. 😉 In addition I migth not be up to date with Redux because lately I used just React Context instead. Please let me know if it's any good. 😊

Request are not authenticated thus there is limit of 10 request per minute. Be cool. 😎 Wait one minute if you get the _API rate limit exceeded..._ toast.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
