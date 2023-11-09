import { createServer } from "http";
import app from "./app";
import { readFileUsingStream } from "./models/planets.model";


const PORT = process.env.PORT || 8000;

const server = createServer(app);

readFileUsingStream().then(()=> {
   server.listen(PORT, ()=> { 
      console.log(`listening of PORT ${PORT}...`)
   })
})


