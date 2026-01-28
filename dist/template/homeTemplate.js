"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeTemplate = void 0;
const homeTemplate = () => {
    var _a;
    const env = (_a = process.env.NODE_DEV) !== null && _a !== void 0 ? _a : "unknown";
    const isProd = env === "production";
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Indonesia Region API</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #04042b;
      color: #e5e7eb;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    .card {
    background: #020617;
    padding: 32px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.4);
    max-width: 520px;
    text-align: center;
    margin: 16px;
    }
    h1{
      color: #38f2f8;
      margin-bottom: 12px;
      font-size: 25px
    }
    .env {
      font-weight: bold;
      color: ${isProd ? "#22c55e" : "#facc15"};
    }
    .doc {
      margin-top: 16px;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>Welcome To Indonesia Region API</h1>
    <p>Server is running in <span class="env">${env}</span> mode</p>
    <p class="doc">
      See documentation:
      <a href="${process.env.DOCUMENTATION}" target="_blank">
        ${process.env.DOCUMENTATION}
      </a>
    </p>
  </div>
</body>
</html>
`;
};
exports.homeTemplate = homeTemplate;
