import request from "supertest";
import app from "../routes/route";

describe("testing /api/cars/list-available", () => {
   it("it should return 200 without filtering", async () => {
     await request(app)
       .get("/api/cars/list-available")
       .expect("Content-Type", "application/json; charset=utf-8")
       .expect(200)
       .then((response) => {
         expect(response.body.message).toBe("Success Get All Cars Available");
         expect(response.body.total).toBeGreaterThanOrEqual(0);
         expect(response.body.data.cars).toBeInstanceOf(Array);
       });
   });

  it("it should return 200 with filtering", async () => {
    const typeDriver: string = "With Driver";
    const date: string = "2024-01-01";
    const pickTime: string = "06:00";
    const totalPassenger: string = "4";

    await request(app)
      .get(
        `/api/cars/list-available?typeDriver=${typeDriver}&date=${date}&pickTime=${pickTime}&totalPassenger=${totalPassenger}`
      )
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBe("Success Get Filter All Cars Available");
        expect(response.body.total).toBeGreaterThanOrEqual(0);
        expect(response.body.data.cars).toBeInstanceOf(Array);
      });
  });

  it("it should return 404 filtering not found", async () => {
    const typeDriver2: string = "With Driver";
    const date2: string = "2025-01-01";
    const pickTime2: string = "06:00";
    const totalPassenger2: string = "4";

    await request(app)
      .get(`/api/cars/list-available?typeDriver=${typeDriver2}&date=${date2}&pickTime=${pickTime2}&totalPassenger=${totalPassenger2}`)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(404)
      .then((response) => {
        expect(response.body.message).toBe("Data not found");
        expect(response.body.data).toBeInstanceOf(Object);
      });
  });
});
