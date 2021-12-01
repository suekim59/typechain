#Typechain

Learning Typescript by making a Blockchain with it

1. Typescript is superset of JS.
   JS is popular since it doesn't have strict rules. It is easy to use and to adjust in the ways we want.
   but not good for a big project or minimizing bugs. 

2. package.json 파일에 추가 필요
    "repository" : "https://git..."

3. npm install typescript --save-dev
   or yarn add global typescript

4. tsconfig.js -> giving options to decide how TS is changed to JS

5. tsc or npx tsc

6. npx tsc-watch --dev
   npm install tsc-watch --save-dev
   => This is for changing js files if there is any change on ts files.

7. Class Vs Interface
  : class can be included in JS file, but Interface can't.
So interface is more secure than class, however, if you work with react, node, express I have to use class.


8. npm install crypto-js
   npm i --save-dev @types/crypto-js