#Chat-app

Du behöver installera alla projektets dependencies, vilket behöver göras från både root och client mappen. Från root mappen kör du i terminalen:
```
npm install
cd client
npm install
```

I client/frontend delen kan du använda absoluta importer så du slipper skriva `../../mapp/fil` etc. Oavsett vilken mapp du är i kan du importera genom t.ex. `components/fil.js`, `src/fil.css`.
Dessa finns i `vite.config.js` och `jsconfig.json` i client mappen. Du kan lägga till eller ta bort dessa. 
```
src: "/src"
components: "/src/components"
hooks: "/src/hooks"
service: "/src/service"
utils: "/src/utils"
views: "/src/views"
```

##Du behöver ändra URI till din databas, bestämma en "hemlighet" och eventuellt val av port. Antingen lägger du till dessa direkt i koden men enklast är följande.


>[!TIP]
>
>Skapa en fil i root mappen som heter `.env`. I filen lägg till dessa tre variabler. De ska vara skrivna som nedan, utan "" eller ''
>
>```
>JWT_SECRET_KEY=HärSkriverDuInDinHemlighet
>```
>
>```
>MONGODB_URL=URInFörAttAnslutaTillErMongoDBDatabas
>```
>
>```
>PORT=3000
>```
>
>Du kommer åt dessa variabler genom `process.env` t.ex. `process.env.PORT`, `process.env.JWT_SECRET_KEY`.
>
>För att generera en "hemlighet" kan du använda detta kommando i terminalen:
>
>```
>node -e "console.log(require('crypto').randomBytes(32).toString('hex')"
>```
>

>[!IMPORTANT]
>Lägg sen till .env i .gitignore filen så att den inte delas i ditt repo på github. 





##För att starta upp projektet.


I root mappen kör ett av följande kommandon

`node server.js`  (då behöver du manuellt starta om servern varje gång du gjort ändringar), eller

`node --watch server.js`  (då startar servern om automatiska efter att ändringar gjorts), eller

`nodemon server.js`    (om du använder nodemon, då sköts omstart automatiskt)

I client mappen kör

`npm run dev`

