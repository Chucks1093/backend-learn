import {useCallback, useEffect, useState } from "react";

import {
   httpGetLaunches,
   httpSubmitLaunch,
   httpAbortLaunch,
} from './requests';

import { LaunchType } from "./requests";
type soundType = () => Promise<void>

function useLaunches(onSuccessSound: soundType, onAbortSound: soundType, onFailureSound: soundType) {
   const [launches, saveLaunches] = useState<LaunchType[]>([]);
   const [isPendingLaunch, setPendingLaunch] = useState(false);

   const getLaunches = useCallback(async () => {
      const fetchedLaunches = await httpGetLaunches();
      saveLaunches(fetchedLaunches);
   }, []);

   useEffect(() => {
      getLaunches();
   }, [getLaunches]);

   const submitLaunch = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setPendingLaunch(true);
      const data = new FormData(e.currentTarget);
      const launchDate = data.get("launch-day");
      const mission = data.get("mission-name");
      const rocket = data.get("rocket-name");
      const destination = data.get("planets-selector");
      const response = await httpSubmitLaunch({
         launchDate,
         mission,
         rocket,
         destination,
      });


      // TODO: Set success based on response.
      const success = response.ok;
      if (success) {
         getLaunches();
         setTimeout(() => {
            setPendingLaunch(false);
            onSuccessSound();
         }, 800);
      } else {
         onFailureSound();
         setTimeout(() => {
            setPendingLaunch(false)
         }, 800);
      }
   }, [getLaunches, onSuccessSound, onFailureSound]);

   const abortLaunch = useCallback(async (id:number) => {
      const response = await httpAbortLaunch(id);

      // TODO: Set success based on response.
      const success = response.ok;
      if (success) {
         getLaunches();
         onAbortSound();
      } else {
         onFailureSound();
      }
   }, [getLaunches, onAbortSound, onFailureSound]);

   return {
      launches,
      isPendingLaunch,
      submitLaunch,
      abortLaunch,
   };
}

export default useLaunches;