import { parse } from "csv-parse";
import fs from "fs";
import path from "path";

type PlanetType = {
   koi_name: string;
   koi_insol: number;
   koi_pras: number;
   koi_description: string;
}

const habitablePlanets: PlanetType[] = [];

function isPlanetHabitable(planet: PlanetType) {
   return planet['koi_disposition'] === "CONFIRMED"
      && planet['koi_insol'] > 0.36 && planet["koi_insol"] < 1.11
      && planet['koi_prad'] < 1.6;
}


const filePath = path.join(__dirname, "..", "..", "data", "kepler_data.csv")

const readFileUsingStream =() =>{
   return new Promise((resolve, reject)=> {
      fs.createReadStream(filePath)
      .pipe(parse({
         comment: "#",
         columns: true
      }))
      .on("data", (data: PlanetType) => {
         if (isPlanetHabitable(data)) {
            habitablePlanets.push(data)
         }
      })
      .on("error", (err) => {
         console.log(err)
         reject(err)
      })
      .on("end", () => {
         resolve(habitablePlanets);
      })
   })
}

export {
   habitablePlanets,
   readFileUsingStream
};