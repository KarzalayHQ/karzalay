const http = require('http');
const { Server } = require('socket.io');

let currentGate = 1;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  let body = '';
  req.on('data', chunk => body += chunk.toString());
  req.on('end', () => {
    let payload = {};
    if (body) {
      try { payload = JSON.parse(body); } catch(e) {}
    }

    res.setHeader('Content-Type', 'application/json');

    if (req.url === '/auth/login' && req.method === 'POST') {
      res.setHeader('Set-Cookie', 'sessionId=mock_session; Path=/; HttpOnly');
      res.writeHead(200);
      res.end(JSON.stringify({ id: '1', name: 'Mock User', email: payload.email, role: 'MEMBER' }));
    } 
    else if (req.url === '/auth/register' && req.method === 'POST') {
      res.writeHead(201);
      res.end(JSON.stringify({ id: '1', name: payload.name, email: payload.email, role: payload.role || 'MEMBER' }));
    }
    else if (req.url === '/auth/me') {
      const cookie = req.headers.cookie;
      if (cookie && cookie.includes('sessionId=mock_session')) {
        res.writeHead(200);
        res.end(JSON.stringify({ id: '1', name: 'Mock User', role: 'MEMBER' }));
      } else {
        res.writeHead(401);
        res.end(JSON.stringify({ error: 'Unauthorized' }));
      }
    }
    else if (req.url === '/auth/logout') {
      res.setHeader('Set-Cookie', 'sessionId=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT');
      res.writeHead(200);
      res.end(JSON.stringify({ success: true }));
    }
    else if (req.url === '/onboarding/status') {
      res.writeHead(200);
      res.end(JSON.stringify({ gate: currentGate, status: currentGate > 3 ? 'completed' : 'pending' }));
    }
    else if (req.url === '/users/me' && req.method === 'PATCH') {
      currentGate = 2;
      res.writeHead(200);
      res.end(JSON.stringify({ success: true }));
    }
    else if (req.url === '/companies') {
      res.writeHead(200);
      res.end(JSON.stringify([
        { id: 'c1', name: 'Google DeepMind', city: 'London' }, 
        { id: 'c2', name: 'Karzalay HQ', city: 'Mumbai' }
      ]));
    }
    else if (req.url === '/applications' && req.method === 'POST') {
      currentGate = 3;
      res.writeHead(200);
      res.end(JSON.stringify({ success: true }));
      
      // Simulate socket event after 2 seconds!
      setTimeout(() => {
        io.emit('application:approved', { companyId: payload.companyId });
      }, 2000);
    }
    else if (req.url === '/standups' && req.method === 'POST') {
      currentGate = 4;
      res.writeHead(200);
      res.end(JSON.stringify({ success: true }));
    }
    else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Not found' }));
    }
  });
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('Frontend connected to socket');
});

server.listen(3001, () => {
  console.log('Mock API & Socket Backend running on http://localhost:3001');
});
