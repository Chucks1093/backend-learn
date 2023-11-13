import { Router } from "express";
import { httpgetAllLaunches, httpAddNewLauch, httpAbortLaunch } from "./launches.controller";

const launchesRouter = Router();

launchesRouter.get("/", httpgetAllLaunches);
launchesRouter.post("/", httpAddNewLauch);
launchesRouter.delete("/:id", httpAbortLaunch)

export default launchesRouter;