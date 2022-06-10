rm -fr dist
mkdir dist
cd ../..
npm run clean-all
mv package.json package.json.current
cp playground/future/package.json .
npm i
cp ./dist/*umd* ./playground/future/dist

mv package.json.current package.json 
npm run reset