import { HttpStatus } from "../src/constants/httpStatus";
import { homeTemplate } from "../src/template/homeTemplate";
import { request } from "./testApp";

describe("API implementation testing", () => {
  //testing
  it("GET / should return welcome message from main route", async () => {
    const response = await request.get("/");

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.text).toBe(homeTemplate());
  });

  it("GET /category should return NOT FOUND for un-exist route", async () => {
    const res = await request.get("/category");
    expect(res.status).toBe(HttpStatus.NOT_FOUND);
  });
});
