# mini-html-server
Compact node.js server for HTML/JS/SASS.

node@11.4.0
npm@6.7.0

It can compiles SASS files into one single css, it also minify and merge all JavaScripts files. 
Moves everything into a local directory and launches a local server

It uses browser-sync for livereload, it be configured for sync navigation and interaction between multiple browsers

Can also build minified or non minified version of your code

After that just move into a server


# how to use

Install node dependencies
```
npm install
```

To launch just use
```
npm run dev
```
By default it runs at http://localhost:3030 
Customize localhost port in gulpfile.js


To build use
```
npm run build
```

To build minified version
```
npm run build-min
```


Removes the entire local folder
```
npm run clean
```

Removes the entire build folder
```
npm run prebuild
```