import { Request, Response } from "express";
import { IncomingLaunchData, addNewLaunch, convertMapValueToArray, abortLaunchById } from "../../models/launches.model";


export function httpgetAllLaunches(req: Request, res: Response) {
   return res.status(200).json(convertMapValueToArray())
}

export function httpAddNewLauch(req: Request, res: Response) {
   const launch: IncomingLaunchData = req.body;
   launch.launchDate = new Date(launch.launchDate);
   if (!launch.mission || !launch.rocket || !launch.destination) {
      return res.status(400).json({
         error: "Missing required launch property",
      })
   } else if (isNaN(launch.launchDate.valueOf())) {
      return res.status(400).json({
         error: "Invalid Launch Date",
      })
   }
   const addedLaunch = addNewLaunch(launch)
   return res.status(201).json(addedLaunch);
}

export function httpAbortLaunch(req: Request, res: Response) {
   const launchId = Number(req.params.id);
   const aborted = abortLaunchById(launchId);
   return aborted ? res.status(200).json(aborted) : res.status(404).json({
      error: "Launch not found"
   })
}