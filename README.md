# Website Builder

## Deployment notes

### Render deployment
1. Create a new Web Service in Render.
2. Point it to this repository.
3. Set the build command to:
   - npm install --prefix server && npm --prefix server run build
4. Set the start command to:
   - npm --prefix server start
5. Add environment variables:
   - PORT=10000
   - JWT_SECRET=your-secret
   - MONGO_URI=your-mongodb-connection-string

The server will serve the React frontend from the built client assets when deployed.
