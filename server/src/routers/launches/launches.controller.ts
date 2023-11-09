import { Request, Response } from "express";
import { IncomingLaunchData, isLauchMissionValid, addNewLaunch, convertMapValueToArray } from "../../models/launches.model";


export function httpgetAllLaunches(req: Request, res: Response) {
   return res.status(200).json(convertMapValueToArray())
}


export function httpAddNewLauch(req: Request, res: Response) {
   const launch: IncomingLaunchData = req.body;
   launch.launchDate = new Date(launch.launchDate);
   if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.destination) {
      return res.status(400).json({
         error: "Missing required launch property",
      })
   } else if (isNaN(launch.launchDate.valueOf())) {
      return res.status(400).json({
         error: "Invalid Lauch Date",
      })
   } 
   addNewLaunch(launch)
   return res.status(201).json(launch);
}

