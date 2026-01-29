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
        "code": "76",
        "name": "Sulawesi Barat"
      },
      {
        "code": "73",
        "name": "Sulawesi Selatan"
      },
      {
        "code": "72",
        "name": "Sulawesi Tengah"
      },
      {
        "code": "74",
        "name": "Sulawesi Tenggara"
      },
      {
        "code": "71",
        "name": "Sulawesi Utara"
      }
    ],
    "meta": {
      "total": 5,
      "page": 1,
      "limit": 5,
      "totalPage": 1
    },
    "documentation": "See documentation: https://github.com/fento2/indonesia-region-api/tree/main#api-reference"
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
| `include` | string | No       | Related data to include (comma separated) |

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
      "code": "8102192005",
      "name": "Elaar Lamagorang",
      "postalCode": "97626",
      "district": {
        "code": "810219",
        "name": "Kei Kecil Timur Selatan",
        "regency": {
          "code": "8102",
          "name": "Maluku Tenggara",
          "type": "Kabupaten",
          "province": {
            "code": "81",
            "name": "Maluku"
          }
        }
      }
    },
    "documentation": "See documentation: https://github.com/fento2/indonesia-region-api/tree/main#api-reference"
  }
}
```

⭐ Support This Project

If you find this project useful, please consider giving it a star on GitHub 🌟
It helps the project grow and motivates me to keep improving it.
