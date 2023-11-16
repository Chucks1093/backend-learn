import request from "supertest";
import app from "../../app";
import { IncomingLaunchData, LaunchType, getLauchFlightNumber } from "../../models/launches.model";

type ChangePropertyType<T, K extends keyof T, NewType> = {
   [P in keyof T]: P extends K ? NewType : T[P];
};


type LaunchWithDateAsString = ChangePropertyType<IncomingLaunchData, 'launchDate', string>;


const postLauchData: LaunchWithDateAsString = {
   mission: "USS Enterprise",
   rocket: "NCC 1701",
   launchDate: "January 5, 2028",
   destination: "Kepler-186 f",
};

const { launchDate, ...launchDataWithoutDate } = postLauchData;
const { mission, ...launchWithMissingProperty } = postLauchData

const responselaunchData: LaunchType = {
   ...postLauchData,
   flightNumber: getLauchFlightNumber(),
   launchDate: new Date(launchDate),
   customer: ['ZTM', 'NASA'],
   upcoming: true,
   success: undefined
};


describe("Test GET/ Launches", () => {
   test("It should respond with 200 success", async () => {
      const response = await request(app)
         .get("/launches")
         .expect("Content-Type", /json/)
         .expect(200);
   })
})

describe("Test POST /launch", () => {
   test("It should respond with 201 created", async () => {
      const response = await request(app)
         .post("/launches")
         .send(postLauchData)
         .expect("Content-Type", /json/)
         .expect(201)

      const requestDate = new Date(postLauchData.launchDate)
      const responseDate = new Date(response.body.launchDate)
      expect(responseDate).toStrictEqual(requestDate)
      expect<LaunchType>({ ...response.body, success: undefined, launchDate: responseDate }).toMatchObject(responselaunchData)
   })

   test("Catch launch with missing property", async () => {
      const response = await request(app).post("/launches")
         .send(launchWithMissingProperty)
         .expect("Content-Type", /json/)
         .expect(400)

      console.log(response.body)

      expect(response.body).toStrictEqual({
         error: "Missing required launch property",
      })
   })

   test("Catch Invalid dates", async () => {
      const response = await request(app).post("/launches").send({ ...launchDataWithoutDate, launchDate: "Robert" })
         .expect("Content-Type", /json/)
         .expect(400)
      expect(response.body).toStrictEqual({
         error: "Invalid Launch Date",
      })
   })
})