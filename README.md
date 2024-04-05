I projektets root mapp och client mappen, kör npm install.

--- Tips! ---
Skapa en fil i root mappen som heter .env
I filen:
JWT_SECRET_KEY=HärSkriverDuInDinHemlighet
MONGODB_URL=uriFörAttAnslutaTillErDatabas
PORT=3000

Du kommer åt dessa variabler genom t.ex. process.env.PORT, process.env.JWT_SECRET_KEY

För att generera en "hemlighet" kan du använda detta kommando i terminalen:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

Lägg sen till .env i .gitignore filen så att den inte delas i ditt repo på github. 



I client/frontend delen kan du använda absoluta importer så du slipper skriva ../../mapp/fil etc. Oavsett vilken mapp du är i kan du importera genom t.ex. components/fil.js, src/fil.css.
Dessa finns i vite.config.js och jsconfig.json i client mappen. Du kan lägga till eller ta bort dessa. 
src: "/src"
components: "/src/components"
hooks: "/src/hooks"
service: "/src/service"
utils: "/src/utils"
views: "/src/views"



För att starta
I root mappen kör: node --watch server.js eller nodemon server.js om du har nodemon
I client mappen kör: npm run dev
