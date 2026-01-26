import { HttpStatus } from "../src/constants/httpStatus";
import { request } from "./testApp";

describe("API implementation testing", () => {
  //testing
  it("GET / should return welcome message from main route", async () => {
    const response = await request.get("/");

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.text).toEqual(
      `Welcome to Indonesia Region API running in ${process.env.NODE_DEV}`,
    );
  });

  it("GET /category should return NOT FOUND for un-exist route", async () => {
    const res = await request.get("/category");
    expect(res.status).toBe(HttpStatus.NOT_FOUND);
  });
});
