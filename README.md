# ⚡ Universal JS, HMR and SSR ⚡

### 🗒 Note:

This project is intended as an _example_ app for using Hot Module Reloading and Server Sider rendering with
Express, React, Redux and React Router.

> Video walkthrough here: https://www.dropbox.com/s/1vrlqqkridz2jew/zoom_0.mp4

### Setup
`npm install`

For Development (HMR)

`npm run dev`

For Production (SSR)

`npm run build && npm run prod`


### What is it?

*Universal JS: -*
JavaScript that can run on both the server and client (or any other JS platform for that matter) !

*Hot Module Reloading: -*
Replaces modules that have been changed in real time while preserving the state.

*Server Side Rendering: -*
Renders Pages on the initial for fast page loads and search engine optimization

### Why?

Incredibly Productive

Extremely Flexible

Blazing Fast

... And its just plain cool 😎

### How?

The Basic setup goes like this...

An express server to handle requests, render the page and handle all our file requests.

Webpack to bundle everything up listen for files changes and hot reload them to the client.

We will be using React, Redux and React Router to match url requests, and render the state to html that we can then send back to the client.

![hmr-ssr](https://cloud.githubusercontent.com/assets/2454928/18360529/39573fe2-75b3-11e6-8a06-75bc2664e98d.gif)
