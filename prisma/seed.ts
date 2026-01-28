import dotenv from "dotenv";
dotenv.config();
import path from "path";
import fs from "fs";
import { prisma } from "../src/configs/prisma";

import { csv } from "csvtojson";
import { RegencyType } from "../generated/prisma";

//convert to json
const convert = async () => {
  const files = [
    {
      csv: "provinces.csv",
      json: "provinces.json",
    },
    {
      csv: "districts.csv",
      json: "districts.json",
    },
    {
      csv: "regencies.csv",
      json: "regencies.json",
    },
    {
      csv: "villages.csv",
      json: "villages.json",
    },
  ];

  for (const file of files) {
    const csvPath = path.join(__dirname, "..", "data", "csv", file.csv);
    const jsonPath = path.join(__dirname, "..", "data", "json", file.json);

    const jsonArray = await csv().fromFile(csvPath);

    fs.writeFileSync(jsonPath, JSON.stringify(jsonArray, null, 2));
  }
};

convert();

const loadJSON = (file: string) => {
  const filePath = path.join(__dirname, "..", "data", "json", file);
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

//main seeding
const seed = async () => {
  const provinces = loadJSON("provinces.json");
  const regencies = loadJSON("regencies.json");
  const districts = loadJSON("districts.json");
  const villages = loadJSON("villages.json");

  //provinces
  for (const p of provinces) {
    await prisma.provinces.upsert({
      where: {
        code: p.code,
      },
      update: {},
      create: {
        code: p.code,
        name: p.province,
      },
    });
  }
  console.log("provinces inserted");

  //regencies
  for (const r of regencies) {
    const province = await prisma.provinces.findUnique({
      where: { code: r.province_code },
    });
    if (!province) {
      console.log("Province not found:", r.province_code);
      continue;
    }

    await prisma.regencies.upsert({
      where: { code: r.code },
      update: {},
      create: {
        code: r.code,
        name: r.regency,
        type: r.type as RegencyType,
        provinceId: province.id,
      },
    });
  }

  console.log("regencies inserted");

  //districts
  for (const d of districts) {
    const regency = await prisma.regencies.findUnique({
      where: {
        code: d.regency_code,
      },
    });

    if (!regency) {
      console.log("regency not found:", d.regency_code);
      continue;
    }

    await prisma.districts.upsert({
      where: {
        code: d.code,
      },
      update: {},
      create: {
        code: d.code,
        name: d.district,
        regencyId: regency.id,
      },
    });
  }
  console.log("districts inserted");

  //villages

  for (const v of villages) {
    const district = await prisma.districts.findUnique({
      where: {
        code: v.district_code,
      },
    });

    if (!district) {
      console.log("district not found:", v.district_code);
      continue;
    }

    await prisma.villages.upsert({
      where: {
        code: v.code,
      },
      update: {},
      create: {
        code: v.code,
        name: v.village,
        postalCode: v.postal_code,
        districtId: district.id,
      },
    });
  }
  console.log("villages inserted");

  console.log("Seeding done.");
};

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
