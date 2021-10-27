# Working With Context

## Working Version

Here is a [working version](https://xn0b1.csb.app/) of the app so you have a reference of the base functionality that you are being asked to implement.

<img src="https://i.imgur.com/nKZWv5c.png" width=500/>

## Starter CodeSandbox

Here is our [Starter CodeSandbox](https://codesandbox.io/s/usecontext-lab-themes-starter-iuq8m?file=/src/App.js)

1. Go to the starter code on CodeSandBox
2. On CodeSandBox page navigate to the top left corner
3. Click the menu bar and go File/Export to Zip
4. Unzip the folder and open up your terminal - navigate inside the folder just downloaded
5. `npm install`
7. `code .`
8. `npm start`

## Instructions

For this exercise you will do the following:

### App Component

- Examine the working live solution and look over the Components in React DevTools
- import `createContext`
- create and export an instance of `createContext`
- set up a `context.Provider`
- provide the data via the `context.Provider`

#### Child Components That Need Context

- import the `useContext`
- import the `context` from App
- instantiate `useContext` to use the imported `context` from App
- configure the elements to use the theme

#### Click Event

- Add a click event to the `Toggle Themes` button that will allow the user to toggle between the themes

#### Solution

Here is the [Solution](https://codesandbox.io/s/usecontext-lab-themes-solution-xn0b1?file=/src/App.js:515-665)
