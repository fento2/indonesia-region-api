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
        page: 1,
        limit: 10,
        totalPage: expect.any(Number),
      });
    });

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
    it("GET /province/detail?code=19 should return list province", async () => {
      const response = await request.get("/province/detail?code=19");

      expect(response.statusCode).toBe(200);
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

    it("GET /province?search=surabaya", async () => {
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
  });
});
