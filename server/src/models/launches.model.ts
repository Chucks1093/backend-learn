export type LaunchType = {
   flightNumber: number;
   mission: string;
   rocket: string;
   launchDate: Date;
   destination: string;
   customer: string[];
   upcoming: boolean;
   success: boolean | undefined;
};

export type IncomingLaunchData = Omit<LaunchType, "success" | "upcoming" | "customer" | "flightNumber">;

const launches = new Map<number, LaunchType>()



// const launch = {
//    flightNumber: 100,
//    mission: "Kepler Exploratin X",
//    rocket: "Explorer Is1",
//    launchDate: new Date('December 27, 2030'),
//    destination: "Kepler-442 b",
//    customer: ['ZTM', 'NsASA'],
//    upcoming: true,
//    success: true
// };


export function getLauchFlightNumber() { return launches.size === 0 ? 1 : launches.size * 100 };

export function convertMapValueToArray() {
   return Array.from(launches.values())
}

export function addNewLaunch(launch: IncomingLaunchData) {
   const newLaunch =  Object.assign(launch, {
      upcoming: true,
      success: undefined,
      customer: ["ZTM", "NASA"],
      flightNumber: getLauchFlightNumber()
   })
   launches.set(newLaunch.flightNumber, newLaunch);
   return newLaunch
}

export function isLauchMissionValid(launch: IncomingLaunchData): boolean {
   let isValid = true;
   launches.forEach((value) => {
      if ((launch["mission"] == value["mission"]) && (launch["destination"] == value["destination"]) && value.success == true) {
         console.log(value)
         isValid = false;
      }
   })
   return isValid;
}

export function abortLaunchById(launchId: number) {
   const aborted = launches.get(launchId);
   if (aborted) {
      aborted.upcoming = false;
      aborted.success = false;
   }
   return aborted;
}

export function launchExits(launchId: number) {
   return launches.has(launchId)
}

export default launches;