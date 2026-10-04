export default function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed"
    });
  }

  let count = 1;

  if (req.method === "GET") {
    count = Number(req.query?.count ?? 1);
  } else {
    count = Number(req.body?.count ?? 1);
  }

  if (!Number.isInteger(count) || count < 1 || count > 100) {
    return res.status(400).json({
      success: false,
      message: "count harus berupa angka 1-100"
    });
  }

  const data = Array.from({ length: count }, (_, i) => ({
    id: `DUMMY-${Date.now()}-${i + 1}`,
    username: `user_${Math.random().toString(36).slice(2, 10)}`,
    password: Math.random().toString(36).slice(2, 12),
    created_at: new Date().toISOString()
  }));

  return res.status(200).json({
    success: true,
    count: data.length,
    data
  });
      }
