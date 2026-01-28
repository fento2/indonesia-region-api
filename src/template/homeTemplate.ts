export const homeTemplate = () => {
  const env = process.env.NODE_DEV ?? "unknown";
  const isProd = env === "production";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Indonesia Region API</title>
  <style>
    body {
      margin: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: radial-gradient(circle at top, #4a5896, #04042b);
      color: #e5e7eb;
      line-height: 1.6;
    }
    .container {
      max-width: 960px;
      margin: 0 auto;
      padding: 48px 20px 80px;
    }
    h1 {
      color: #38f2f8;
      font-size: 36px;
      margin-bottom: 8px;
    }
    h2 {
      color: #38f2f8;
      margin-top: 48px;
      border-bottom: 1px solid #0f172a;
      padding-bottom: 6px;
    }
    p, li {
      color: #cbd5e1;
      font-size: 15px;
    }
    .badge {
      display: inline-block;
      margin-top: 10px;
      padding: 4px 10px;
      border-radius: 999px;
      background: ${isProd ? "#14532d" : "#422006"};
      color: ${isProd ? "#22c55e" : "#facc15"};
      font-size: 12px;
      font-weight: 600;
    }
    .card {
      background: #020617;
      border-radius: 14px;
      padding: 24px;
      margin-top: 20px;
      box-shadow: 0 10px 30px rgba(0,0,0,.4);
    }
    code, pre {
      background: #020617;
      color: #38f2f8;
      border-radius: 10px;
      font-size: 13px;
    }
    pre {
      padding: 16px;
      overflow-x: auto;
    }
    code {
      padding: 4px 8px;
    }
    a {
      color: #38f2f8;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 12px;
      font-size: 14px;
    }
    th, td {
      border-bottom: 1px solid #0f172a;
      padding: 10px;
      text-align: left;
    }
    th {
      color: #38f2f8;
      font-weight: 600;
    }
    .footer {
      margin-top: 80px;
      text-align: center;
      font-size: 13px;
      color: #94a3b8;
    }
  </style>
</head>
<body>
  <div class="container">

    <h1>Welcome To Indonesia Region API</h1>
    <p>
      Public API that provides structured data for 
      <b>provinces</b>, <b>regencies</b>, <b>districts</b>, and <b>villages</b>.
      <br/>
      Free to use for learning, personal projects, and production.
    </p>

    <span class="badge">Server running in ${env} mode</span>

    <div class="card">
      <h2>Try it yourself</h2>
      <p><a href="/province" target="_blank">/province</a></p>
      <code>/province?limit=5&page=1&sortBy=name&sortOrder=asc</code>
    </div>

    <div class="card">
      <h2>Tech Stack</h2>
      <ul>
        <li>Node.js</li>
        <li>Express.js</li>
        <li>Supabase</li>
        <li>Prisma ORM</li>
      </ul>
    </div>

    <div class="card">
      <h2>Base Endpoints</h2>
      <ul>
        <li>/province</li>
        <li>/regency</li>
        <li>/district</li>
        <li>/village</li>
      </ul>
    </div>

    <div class="card">
      <h2>Query Parameters (List)</h2>
      <table>
        <tr><th>Query</th><th>Description</th></tr>
        <tr><td>limit</td><td>Number of data per page (default: 10)</td></tr>
        <tr><td>page</td><td>Page number (default: 1)</td></tr>
        <tr><td>sortBy</td><td>Sort field (name, code, createdAt)</td></tr>
        <tr><td>sortOrder</td><td>asc or desc</td></tr>
        <tr><td>search</td><td>Search by name, code, or postalCode (village)</td></tr>
        <tr><td>type</td><td>Kabupaten or Kota (regency only)</td></tr>
        <tr><td>postalCode</td><td>Village postal code filter</td></tr>
      </table>
    </div>

    <div class="card">
      <h2>Documentation</h2>
      <p>
        Full documentation available here:<br/>
        <a href="${process.env.DOCUMENTATION}" target="_blank">
          ${process.env.DOCUMENTATION}
        </a>
      </p>
    </div>

    <div class="card">
      <h2>Support This Project</h2>
      <p>
        If you find this API useful, please consider giving it a star on GitHub 🌟  
        It really helps the project grow and motivates me to keep improving it.
        <a href="https://github.com/fento2/indonesia-region-api" target="_blank">Github Repository</a>
      </p>
    </div>

    <div class="footer">
      Build by Fento • Indonesia Region API
    </div>

  </div>
</body>
</html>
`;
};
