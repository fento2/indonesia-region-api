import { HttpStatus } from "../src/constants/httpStatus";
import { request } from "./testApp";

describe("feture regency", () => {
  describe("en-point regency", () => {
    it("GET /regency should return list regency", async () => {
      const response = await request.get("/regency");

      expect(response.status).toBe(HttpStatus.OK);

      expect(response.body.result.message).toBe("list regencies success");

      expect(Array.isArray(response.body.result.data)).toBe(true);

      expect(response.body.result.data[0]).toMatchObject({
        code: expect.any(String),
        name: expect.any(String),
        type: expect.any(String),
      });
      expect(response.body.result.meta).toMatchObject({
        total: expect.any(Number),
        page: expect.any(Number),
        limit: expect.any(Number),
        totalPage: expect.any(Number),
      });
    });
    //query page,limit
    it("GET /regency should return list regency", async () => {
      const response = await request.get("/regency?page=1&limit=5");

      expect(response.status).toBe(HttpStatus.OK);

      expect(response.body.result.message).toBe("list regencies success");

      expect(Array.isArray(response.body.result.data)).toBe(true);

      expect(response.body.result.data[0]).toMatchObject({
        code: expect.any(String),
        name: expect.any(String),
        type: expect.any(String),
      });

      expect(response.body.result.meta).toMatchObject({
        total: expect.any(Number),
        page: 1,
        limit: 5,
        totalPage: expect.any(Number),
      });
    });
  });
});
