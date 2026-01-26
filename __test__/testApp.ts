import App from "../src/app";
import supertest from "supertest";

export const appTest = new App().app;
export const request = supertest(appTest);
