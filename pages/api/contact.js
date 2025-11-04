export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phone, message } = req.body || {}
    console.log('Contact API received:', { name, email, phone, message })
    // In a real app: validate and send to DB or email service
    return res.status(200).json({ ok: true, message: 'Received' })
  } else {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ ok: false, message: 'Method not allowed' })
  }
}