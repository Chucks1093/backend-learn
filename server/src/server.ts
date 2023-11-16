import { createServer } from "http";
import app from "./app";
import { readFileUsingStream } from "./models/planets.model";


const PORT = process.env.PORT || 8000;

const server = createServer(app);

async function startServer() {
   const data = await readFileUsingStream();
   server.listen(PORT, ()=> {
      console.log(`listening of PORT ${PORT}...`)
   })
}
startServer();



