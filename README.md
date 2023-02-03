# mini-html-server
Compact node.js server for HTML/JS/SASS.

It compiles SASS files into one single min css, it also minify and merge all JavaScripts files. Moves everything into a distribution directory and launches a local server at a defined port in gulpfile.js

GULP v11.4.0

# how to use

Install node dependencies
```
npm install
```

To launch just use gulp default task
```
gulp local
```
Customize localhost port in gulpfile.js


Removes the entire distribution folder
```
gulp clean
```