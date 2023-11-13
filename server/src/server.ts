import { createServer } from "http";
import app from "./app";
import { readFileUsingStream } from "./models/planets.model";
import operatingSystem from "os";



const PORT = process.env.PORT || 8000;

const server = createServer(app);

readFileUsingStream().then(()=> {
   server.listen(PORT, ()=> { 
      console.log(`Operating system is : ${operatingSystem.cpus().length}`)
      console.log(`listening of PORT ${PORT}...`)
   })
})

