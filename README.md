Hi there! 👋  
I just made an Indonesia Region API that provides structured data for provinces, regencies, districts, and villages.

This API is built to help developers easily access Indonesian administrative region data for learning purposes, personal projects, or production use.

> Public Indonesia Region API for provinces, regencies, districts, and villages.
> Free to use for learning, personal projects, and production.

## Tech Stack

Node Js, Express Js, Supabase, Prisma ORM

## Installation

Follow these steps to run the project locally:

1. Clone this repository
2. Install dependencies
   ```bash
   npm install
   ```
3. running project
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` – run in development mode
- `npm run build` – build project
- `npm run start` – run production build
- `npm run test` - testing project
- `npm run seed` - seeding data

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

1. Connect to Supabase via connection pooling
   `DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?pgbouncer=true"`

2. Direct connection to the database. Used for migrations
   `DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"`

3. port
   `PORT=8000`

4. node env
   `NODE_DEV="development"`

5. documentation link
   `DOCUMENTATION="https://github.com/fento2/indonesia-region-api/tree/main#api-reference"`

# API Reference

Try it yourself:
https://indonesia-region-api.vercel.app/province

## 1. Get List

All list endpoints (`province`, `regency`, `district`, `village`) use the same query format and response structure.  
You only need to change the endpoint name

---

Base endpoints:

- `/province`
- `/regency`
- `/district`
- `/village`

#### Query Parameters

| Query        | Type   | Required | Description                                                                                                |
| ------------ | ------ | -------- | ---------------------------------------------------------------------------------------------------------- |
| `limit`      | number | No       | Number of data per page (default: 10)                                                                      |
| `page`       | number | No       | Page number (default: 1)                                                                                   |
| `sortBy`     | string | No       | Field used for sorting (ex: `name`, `createdAt`, `code`)                                                   |
| `sortOrder`  | string | No       | Sort direction: `asc` or `desc` (default: `asc`)                                                           |
| `search`     | string | No       | Search data by keyword (can search by `name` or `code`. For `village`, it can also search by `postalCode`) |
| `type`       | string | No       | Filter regency by type. Allowed values: `Kabupaten` or `Kota`. (Only available on `regency` endpoint)      |
| `postalCode` | string | No       | Filter village by postal code. Only available on `village` endpoint.                                       |

### Example Request:

```http
  GET https://indonesia-region-api.vercel.app/province?limit=5&page=1&sortBy=name&sortOrder=asc&search=sulawesi
```

##### Response body:

```json
{
  "result": {
    "message": "list province success",
    "data": [
      {
        "id": "68f11fce-1a05-45f2-a4e3-14945f28a81b",
        "code": "76",
        "name": "Sulawesi Barat",
        "createdAt": "2026-01-27T13:43:37.034Z",
        "updatedAt": "2026-01-27T13:43:37.034Z"
      },
      {
        "id": "76cb35f8-a7dd-407b-ad75-a6a3033e5137",
        "code": "73",
        "name": "Sulawesi Selatan",
        "createdAt": "2026-01-27T13:43:36.592Z",
        "updatedAt": "2026-01-27T13:43:36.592Z"
      },
      {
        "id": "cdf699a2-43c4-4e8d-9003-61607a17d790",
        "code": "72",
        "name": "Sulawesi Tengah",
        "createdAt": "2026-01-27T13:43:36.448Z",
        "updatedAt": "2026-01-27T13:43:36.448Z"
      },
      {
        "id": "090bbfa4-624e-43d2-af4f-6cd9f2804614",
        "code": "74",
        "name": "Sulawesi Tenggara",
        "createdAt": "2026-01-27T13:43:36.741Z",
        "updatedAt": "2026-01-27T13:43:36.741Z"
      },
      {
        "id": "5c33be24-ef96-47ba-b031-38877b640522",
        "code": "71",
        "name": "Sulawesi Utara",
        "createdAt": "2026-01-27T13:43:36.302Z",
        "updatedAt": "2026-01-27T13:43:36.302Z"
      }
    ],
    "meta": {
      "total": 5,
      "page": 1,
      "limit": 5,
      "totalPage": 1
    },
    "documentation": "See documentation: https://github.com/fento2/indonesia-region-api"
  }
}
```

---

## 2. Get Detail

All detail endpoints (`/province/detail`, `/regency/detail`, `/district/detail`, `/village/detail`) use the same query format and response structure.  
You only need to change the endpoint name.

---

Base endpoints:

- `/province/detail`
- `/regency/deatail`
- `/district/detail`
- `/village/detail`

#### Query Parameters

| Query     | Type   | Required | Description                               |
| --------- | ------ | -------- | ----------------------------------------- |
| `code`    | string | Yes      | Unique region code (example: `11`)        |
| `include` | string | Yes      | Related data to include (comma separated) |

#### Include Options

- **Province** → `regencies`, `districts`, `villages`
- **Regency** → `province`, `districts`, `villages`
- **District** → `regency`, `province`, `villages`
- **Village** → `district`, `regency`, `province`

---

### Example Request:

```http
  GET https://indonesia-region-api.vercel.app/village/detail?code=8102192005&include=district,regency,province
```

##### Response body:

```json
{
  "result": {
    "message": "detail village code: 8102192005 success",
    "data": {
      "id": "b976d2a6-4b6a-4443-8925-7fc4793f8310",
      "districtId": "2b1951f4-a567-409f-b8ec-a6e0d15dae34",
      "code": "8102192005",
      "name": "Elaar Lamagorang",
      "postalCode": "97626",
      "createdAt": "2026-01-27T17:43:48.886Z",
      "updatedAt": "2026-01-27T17:43:48.886Z",
      "district": {
        "id": "2b1951f4-a567-409f-b8ec-a6e0d15dae34",
        "regencyId": "4fcb43e7-6021-4dba-9265-9c6fb95bf252",
        "code": "810219",
        "name": "Kei Kecil Timur Selatan",
        "createdAt": "2026-01-27T14:03:30.998Z",
        "updatedAt": "2026-01-27T14:03:30.998Z",
        "regency": {
          "id": "4fcb43e7-6021-4dba-9265-9c6fb95bf252",
          "provinceId": "0d60ea76-c367-4bbd-b495-eda948a4b766",
          "code": "8102",
          "name": "Maluku Tenggara",
          "type": "Kabupaten",
          "createdAt": "2026-01-27T13:44:57.786Z",
          "updatedAt": "2026-01-27T13:44:57.786Z",
          "province": {
            "id": "0d60ea76-c367-4bbd-b495-eda948a4b766",
            "code": "81",
            "name": "Maluku",
            "createdAt": "2026-01-27T13:43:37.176Z",
            "updatedAt": "2026-01-27T13:43:37.176Z"
          }
        }
      }
    },
    "documentation": "See documentation: https://github.com/fento2/indonesia-region-api"
  }
}
```

⭐ Support This Project

If you find this project useful, please consider giving it a star on GitHub 🌟
It helps the project grow and motivates me to keep improving it.
