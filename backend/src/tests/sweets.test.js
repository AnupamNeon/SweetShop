import request from 'supertest';
import app from '../src/app.js';
import User from '../src/models/User.js';
import Sweet from '../src/models/Sweet.js';

describe('Sweets API', () => {
  let userToken;
  let adminToken;
  let userId;
  let adminId;

  beforeEach(async () => {
    // Create regular user
    const userRes = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'regularuser',
        email: 'user@example.com',
        password: 'password123'
      });
    userToken = userRes.body.data.token;
    userId = userRes.body.data._id;

    // Create admin user
    const admin = await User.create({
      username: 'adminuser',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin'
    });
    adminId = admin._id;

    const adminRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@example.com',
        password: 'password123'
      });
    adminToken = adminRes.body.data.token;
  });

  describe('POST /api/sweets', () => {
    it('should create a new sweet successfully', async () => {
      const res = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'Chocolate Bar',
          category: 'chocolate',
          price: 2.99,
          quantity: 100,
          description: 'Delicious milk chocolate'
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('Chocolate Bar');
      expect(res.body.data.category).toBe('chocolate');
      expect(res.body.data.price).toBe(2.99);
      expect(res.body.data.quantity).toBe(100);
    });

    it('should fail without authentication', async () => {
      const res = await request(app)
        .post('/api/sweets')
        .send({
          name: 'Chocolate Bar',
          category: 'chocolate',
          price: 2.99
        });

      expect(res.status).toBe(401);
    });

    it('should fail with invalid category', async () => {
      const res = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'Test Sweet',
          category: 'invalid-category',
          price: 1.99
        });

      expect(res.status).toBe(400);
    });

    it('should fail with missing required fields', async () => {
      const res = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'Test Sweet'
        });

      expect(res.status).toBe(400);
    });

    it('should fail with duplicate sweet name', async () => {
      await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'Unique Sweet',
          category: 'candy',
          price: 1.99
        });

      const res = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'Unique Sweet',
          category: 'candy',
          price: 2.99
        });

      expect(res.status).toBe(400);
      expect(res.body.message).toContain('already exists');
    });
  });

  describe('GET /api/sweets', () => {
    beforeEach(async () => {
      // Create sample sweets
      await Sweet.create([
        { name: 'Candy Cane', category: 'candy', price: 1.5, quantity: 50, createdBy: userId },
        { name: 'Lemon Drop', category: 'candy', price: 0.99, quantity: 100, createdBy: userId },
        { name: 'Chocolate Truffle', category: 'chocolate', price: 3.99, quantity: 25, createdBy: userId }
      ]);
    });

    it('should get all sweets', async () => {
      const res = await request(app)
        .get('/api/sweets')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(3);
      expect(res.body.data).toHaveLength(3);
    });

    it('should paginate results', async () => {
      const res = await request(app)
        .get('/api/sweets?page=1&limit=2')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(res.body.count).toBe(2);
      expect(res.body.page).toBe(1);
      expect(res.body.pages).toBe(2);
    });
  });

  describe('GET /api/sweets/search', () => {
    beforeEach(async () => {
      await Sweet.create([
        { name: 'Milk Chocolate', category: 'chocolate', price: 2.99, quantity: 50, createdBy: userId },
        { name: 'Dark Chocolate', category: 'chocolate', price: 4.99, quantity: 30, createdBy: userId },
        { name: 'Gummy Bears', category: 'candy', price: 1.99, quantity: 100, createdBy: userId },
        { name: 'Lollipop', category: 'candy', price: 0.5, quantity: 200, createdBy: userId }
      ]);
    });

    it('should search by name', async () => {
      const res = await request(app)
        .get('/api/sweets/search?name=chocolate')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(res.body.count).toBe(2);
      expect(res.body.data.every(s => s.name.toLowerCase().includes('chocolate'))).toBe(true);
    });

    it('should filter by category', async () => {
      const res = await request(app)
        .get('/api/sweets/search?category=candy')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(res.body.count).toBe(2);
      expect(res.body.data.every(s => s.category === 'candy')).toBe(true);
    });

    it('should filter by price range', async () => {
      const res = await request(app)
        .get('/api/sweets/search?minPrice=1&maxPrice=3')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.every(s => s.price >= 1 && s.price <= 3)).toBe(true);
    });

    it('should combine multiple filters', async () => {
      const res = await request(app)
        .get('/api/sweets/search?category=chocolate&minPrice=3')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(res.body.count).toBe(1);
      expect(res.body.data[0].name).toBe('Dark Chocolate');
    });
  });

  describe('GET /api/sweets/:id', () => {
    let sweetId;

    beforeEach(async () => {
      const sweet = await Sweet.create({
        name: 'Test Sweet',
        category: 'candy',
        price: 1.99,
        quantity: 50,
        createdBy: userId
      });
      sweetId = sweet._id.toString();
    });

    it('should get a sweet by ID', async () => {
      const res = await request(app)
        .get(`/api/sweets/${sweetId}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('Test Sweet');
    });

    it('should return 404 for non-existent sweet', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const res = await request(app)
        .get(`/api/sweets/${fakeId}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(404);
    });

    it('should return 400 for invalid ID format', async () => {
      const res = await request(app)
        .get('/api/sweets/invalidid')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(400);
    });
  });

  describe('PUT /api/sweets/:id', () => {
    let sweetId;

    beforeEach(async () => {
      const sweet = await Sweet.create({
        name: 'Original Sweet',
        category: 'candy',
        price: 1.99,
        quantity: 50,
        createdBy: userId
      });
      sweetId = sweet._id.toString();
    });

    it('should update a sweet successfully', async () => {
      const res = await request(app)
        .put(`/api/sweets/${sweetId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'Updated Sweet',
          price: 2.99
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('Updated Sweet');
      expect(res.body.data.price).toBe(2.99);
    });

    it('should return 404 for non-existent sweet', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const res = await request(app)
        .put(`/api/sweets/${fakeId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ name: 'Updated' });

      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/sweets/:id', () => {
    let sweetId;

    beforeEach(async () => {
      const sweet = await Sweet.create({
        name: 'Delete Me',
        category: 'candy',
        price: 1.99,
        quantity: 50,
        createdBy: userId
      });
      sweetId = sweet._id.toString();
    });

    it('should allow admin to delete a sweet', async () => {
      const res = await request(app)
        .delete(`/api/sweets/${sweetId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      // Verify deletion
      const checkRes = await request(app)
        .get(`/api/sweets/${sweetId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(checkRes.status).toBe(404);
    });

    it('should not allow regular user to delete a sweet', async () => {
      const res = await request(app)
        .delete(`/api/sweets/${sweetId}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(403);
      expect(res.body.message).toContain('Admin');
    });

    it('should return 404 for non-existent sweet', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const res = await request(app)
        .delete(`/api/sweets/${fakeId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(404);
    });
  });
});