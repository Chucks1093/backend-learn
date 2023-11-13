import express from "express";
import planetsRouter from "./routers/planets/planets.router";
import cors from "cors"
import path from "path";
import morgan from "morgan";
import launchesRouter from "./routers/launches/launches.router";

const app = express();

app.use(cors({
   origin: "http://localhost:5173"
}));
app.use(morgan("combined"))

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")))
app.use("/planets", planetsRouter);
app.use("/launches", launchesRouter)
app.get("/test", (_, res)=> {
   const filePath = path.join(__dirname, "..", "coverage", "lcov-report", "index.html")
   res.sendFile(filePath)
})
app.get("/*", (_, res)=>{
   res.sendFile(path.join(__dirname, "..", "public", "index.html"))
})


export default app;