export type LaunchType = {
   flightNumber: number;
   mission: string;
   rocket: string;
   launchDate: string;
   destination: string;
   customer: string[];
   upcoming: boolean;
   success: boolean | undefined;
}

export type LaunchData = Omit<LaunchType, "success" | "upcoming" | "customer" | "flightNumber">;

type OutgoingLaunchData = {
   launchDate: FormDataEntryValue | null,
   mission: FormDataEntryValue | null,
   rocket: FormDataEntryValue | null,
   destination: FormDataEntryValue | null
}

const API_URL = 'http://localhost:8000';

async function httpGetPlanets(): Promise<{ kepler_name: string }[]> {
   const resp = await fetch(`${API_URL}/planets`);
   const data: { kepler_name: string }[] = await resp.json();
   return data
   // TODO: Once API is ready.
   // Load planets and return as JSON.
}

async function httpGetLaunches(): Promise<LaunchType[]> {
   // TODO: Once API is ready.
   // Load launches, sort by flight number, and return as JSON.
   const response = await fetch(`${API_URL}/launches`);
   const fetchedLaunches: LaunchType[] = await response.json();
   return fetchedLaunches.sort((a, b) => {
      return a.flightNumber - b.flightNumber;
   })
}

async function httpSubmitLaunch(launch: OutgoingLaunchData): Promise<Response | Pick<Response, "ok">> {
   try {
      return await fetch(`${API_URL}/launches`, {
         method: "post",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(launch)
      })
   } catch (err) {
      return {
         ok: false,
      }
   }
   // TODO: Once API is ready.
   // Submit given launch data to launch system.
}

async function httpAbortLaunch(id: number) {
   // TODO: Once API is ready.
   // Delete launch with given ID.
   try {
      return await fetch(`${API_URL}/launches/${id}`, {
         method: "delete"
      })
   } catch (error) {
      return {
         ok: false
      }
   }
}

export {
   httpGetPlanets,
   httpGetLaunches,
   httpSubmitLaunch,
   httpAbortLaunch,
};