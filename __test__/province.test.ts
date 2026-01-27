import { HttpStatus } from "../src/constants/httpStatus";
import { request } from "./testApp";

describe("feature province test", () => {
  describe("end-point /province", () => {
    it("GET /province should return list province", async () => {
      const response = await request.get("/province");

      expect(response.statusCode).toBe(200);
      expect(response.body.result.message).toBe("list province success");

      expect(Array.isArray(response.body.result.data)).toBe(true);
      expect(response.body.result.data.length).toBeGreaterThan(0);

      expect(response.body.result.data[0]).toMatchObject({
        id: expect.any(String),
        code: expect.any(String),
        name: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });

      expect(response.body.result.meta).toMatchObject({
        total: expect.any(Number),
        page: expect.any(Number),
        limit: expect.any(Number),
        totalPage: expect.any(Number),
      });
    });

    //query page, limit
    it("GET /province?page=1limit=5", async () => {
      const response = await request.get("/province?page=1&limit=5");

      expect(response.statusCode).toBe(200);
      expect(response.body.result.message).toBe("list province success");

      expect(Array.isArray(response.body.result.data)).toBe(true);
      expect(response.body.result.data.length).toBeGreaterThan(0);

      expect(response.body.result.data[0]).toMatchObject({
        id: expect.any(String),
        code: expect.any(String),
        name: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });

      expect(response.body.result.meta).toMatchObject({
        total: expect.any(Number),
        page: 1,
        limit: 5,
        totalPage: expect.any(Number),
      });
    });

    //query search
    it("GET /province?page=1&limit=5&search=maluku", async () => {
      const response = await request.get(
        "/province?page=1&limit=5&search=maluku",
      );

      expect(response.statusCode).toBe(200);
      expect(response.body.result.message).toBe("list province success");

      expect(Array.isArray(response.body.result.data)).toBe(true);
      expect(response.body.result.data.length).toBeGreaterThan(0);

      expect(response.body.result.data[0]).toMatchObject({
        id: expect.any(String),
        code: expect.any(String),
        name: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });

      expect(response.body.result.meta).toMatchObject({
        total: expect.any(Number),
        page: 1,
        limit: 5,
        totalPage: expect.any(Number),
      });
    });

    //query search, sortBy, sortOrder
    it("GET /province?page=1&limit=5&sortBy=name&sortOrder=asc", async () => {
      const response = await request.get(
        "/province?page=1&limit=5&search=maluku",
      );

      expect(response.statusCode).toBe(200);
      expect(response.body.result.message).toBe("list province success");

      expect(Array.isArray(response.body.result.data)).toBe(true);
      expect(response.body.result.data.length).toBeGreaterThan(0);

      expect(response.body.result.data[0]).toMatchObject({
        id: expect.any(String),
        code: expect.any(String),
        name: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });

      expect(response.body.result.meta).toMatchObject({
        total: expect.any(Number),
        page: 1,
        limit: 5,
        totalPage: expect.any(Number),
      });
    });
  });

  describe("GET /province/detail", () => {
    //query code
    it("GET /province/detail?code=19 should return list province", async () => {
      const response = await request.get("/province/detail?code=19");

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body.result.message).toBe(
        `detail province code: 19 success`,
      );

      expect(response.body.result.data).toMatchObject({
        id: expect.any(String),
        code: expect.any(String),
        name: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });

    //query code & include
    it("GET /province/detail?code=19&include=regencies,districts,villages should return list province", async () => {
      const response = await request.get(
        "/province/detail?code=19&include=regencies,districts,villages",
      );
      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.body.result.message).toBe(
        `detail province code: 19 success`,
      );

      expect(response.body.result.data).toMatchObject({
        id: expect.any(String),
        code: expect.any(String),
        name: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        regencies: expect.any(Array),
      });

      expect(Array.isArray(response.body.result.data.regencies)).toBe(true);

      expect(response.body.result.data.regencies[0]).toMatchObject({
        id: expect.any(String),
        provinceId: expect.any(String),
        code: expect.any(String),
        name: expect.any(String),
        type: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        districts: expect.any(Array),
      });

      expect(
        Array.isArray(response.body.result.data.regencies[0].districts),
      ).toBe(true);

      expect(response.body.result.data.regencies[0].districts[0]).toMatchObject(
        {
          id: expect.any(String),
          regencyId: expect.any(String),
          code: expect.any(String),
          name: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          villages: expect.any(Array),
        },
      );

      expect(
        Array.isArray(
          response.body.result.data.regencies[0].districts[0].villages,
        ),
      ).toBe(true);

      expect(
        response.body.result.data.regencies[0].districts[0].villages[0],
      ).toMatchObject({
        id: expect.any(String),
        districtId: expect.any(String),
        code: expect.any(String),
        name: expect.any(String),
        postalCode: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });

    //query id
    it("GET /province/detail?id=69d124ff-704f-42bb-837d-b3d60d66b06f", async () => {
      const response = await request.get(
        "/province/detail?id=69d124ff-704f-42bb-837d-b3d60d66b06f",
      );

      expect(response.statusCode).toBe(HttpStatus.OK);

      expect(response.body.result.data).toMatchObject({
        id: expect.any(String),
        code: expect.any(String),
        name: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });

    //query id, include
    it("GET /province/detail?id=69d124ff-704f-42bb-837d-b3d60d66b06f&include=regencies,districts,villages", async () => {
      const response = await request.get(
        "/province/detail?id=69d124ff-704f-42bb-837d-b3d60d66b06f&include=regencies,districts,villages",
      );

      expect(response.statusCode).toBe(HttpStatus.OK);

      expect(response.body.result.data).toMatchObject({
        id: expect.any(String),
        code: expect.any(String),
        name: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        regencies: expect.any(Array),
      });

      expect(Array.isArray(response.body.result.data.regencies)).toBe(true);

      expect(response.body.result.data.regencies[0]).toMatchObject({
        id: expect.any(String),
        provinceId: expect.any(String),
        code: expect.any(String),
        name: expect.any(String),
        type: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        districts: expect.any(Array),
      });

      expect(
        Array.isArray(response.body.result.data.regencies[0].districts),
      ).toBe(true);

      expect(response.body.result.data.regencies[0].districts[0]).toMatchObject(
        {
          id: expect.any(String),
          regencyId: expect.any(String),
          code: expect.any(String),
          name: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          villages: expect.any(Array),
        },
      );

      expect(
        Array.isArray(
          response.body.result.data.regencies[0].districts[0].villages,
        ),
      ).toBe(true);

      expect(
        response.body.result.data.regencies[0].districts[0].villages[0],
      ).toMatchObject({
        id: expect.any(String),
        districtId: expect.any(String),
        code: expect.any(String),
        name: expect.any(String),
        postalCode: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });
  });
});
