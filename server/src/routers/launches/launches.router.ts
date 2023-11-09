import { Router } from "express";
import { httpgetAllLaunches, httpAddNewLauch } from "./launches.controller";

const launchesRouter = Router();

launchesRouter.get("/", httpgetAllLaunches);
launchesRouter.post("/", httpAddNewLauch)

export default launchesRouter;