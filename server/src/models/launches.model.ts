export type LaunchType = {
   flightNumber: number;
   mission: string;
   rocket: string;
   launchDate: Date;
   destination: string;
   customer: string[];
   upcoming: boolean;
   success: boolean | undefined;
}

export type IncomingLaunchData =Omit<LaunchType, "success" | "upcoming" | "customer" | "flightNumber">;

const launches = new Map<number, LaunchType>()


let latestFlightNumber = 100;

// const launch = {
//    flightNumber: 100,
//    mission: "Kepler Exploratin X",
//    rocket: "Explorer Is1",
//    launchDate: new Date('December 27, 2030'),
//    destination: "Kepler-442 b",
//    customer: ['ZTM', 'NASA'],
//    upcoming: true,
//    success: true
// };

// launches.set(launch.flightNumber, launch);

export function convertMapValueToArray() {
   return Array.from(launches.values())
}

export function addNewLaunch(launch: IncomingLaunchData) {
   latestFlightNumber++;
   launches.set(latestFlightNumber, Object.assign(launch, {
      upcoming: true,
      success: undefined,
      customer: ["ZTM", "NASA"],
      flightNumber: latestFlightNumber
   }))
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

export default launches;