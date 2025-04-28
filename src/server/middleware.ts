import { sendDiscoveryCallEmail } from './email';

export const discoveryCallMiddleware = async (req: any, res: any, next: any) => {
  if (req.method === 'POST' && req.url === '/api/discovery-call') {
    try {
      let body = '';
      req.on('data', (chunk: any) => {
        body += chunk.toString();
      });

      req.on('end', async () => {
        try {
          const formData = JSON.parse(body);
          const result = await sendDiscoveryCallEmail(formData);
          
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true }));
        } catch (error) {
          console.error('Error processing request:', error);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Failed to process request' }));
        }
      });
    } catch (error) {
      console.error('Error handling request:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Internal server error' }));
    }
  } else {
    next();
  }
}; 