/**
 * Health / test controller – used for the MVP test route.
 */
export function getHealth(req, res) {
  res.json({
    ok: true,
    message: 'Whoowhoo Travels API is running',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development',
  });
}
