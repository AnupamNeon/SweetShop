import request from 'supertest';
import app from '../src/app.js';
import User from '../src/models/User.js';
import Sweet from '../src/models/Sweet.js';

describe('Inventory API', () => {
  let userToken;
  let adminToken;
  let userId;
  let adminId;
  let testSweet;

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

    // Create test sweet
    testSweet = await Sweet.create({
      name: 'Test Sweet',
      category: 'candy',
      price: 1.99,
      quantity: 100,
      createdBy: userId
    });
  });

  describe('POST /api/sweets/:id/purchase', () => {
    it('should successfully purchase a sweet', async () => {
      const res = await request(app)
        .post(`/api/sweets/${testSweet._id}/purchase`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ quantity: 5 });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.sweet.remainingQuantity).toBe(95);
      expect(res.body.data.purchase.quantity).toBe(5);
      expect(res.body.data.purchase.totalPrice).toBe(9.95);
    });

    it('should fail with insufficient stock', async () => {
      const res = await request(app)
        .post(`/api/sweets/${testSweet._id}/purchase`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ quantity: 150 });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('Insufficient stock');
    });

    it('should fail with zero quantity', async () => {
      const res = await request(app)
        .post(`/api/sweets/${testSweet._id}/purchase`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ quantity: 0 });

      expect(res.status).toBe(400);
    });

    it('should fail with negative quantity', async () => {
      const res = await request(app)
        .post(`/api/sweets/${testSweet._id}/purchase`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ quantity: -5 });

      expect(res.status).toBe(400);
    });

    it('should return 404 for non-existent sweet', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const res = await request(app)
        .post(`/api/sweets/${fakeId}/purchase`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ quantity: 5 });

      expect(res.status).toBe(404);
    });

    it('should fail without authentication', async () => {
      const res = await request(app)
        .post(`/api/sweets/${testSweet._id}/purchase`)
        .send({ quantity: 5 });

      expect(res.status).toBe(401);
    });

    it('should handle exact stock purchase', async () => {
      const res = await request(app)
        .post(`/api/sweets/${testSweet._id}/purchase`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ quantity: 100 });

      expect(res.status).toBe(200);
      expect(res.body.data.sweet.remainingQuantity).toBe(0);
    });
  });

  describe('POST /api/sweets/:id/restock', () => {
    it('should allow admin to restock a sweet', async () => {
      const res = await request(app)
        .post(`/api/sweets/${testSweet._id}/restock`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ quantity: 50 });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.sweet.previousQuantity).toBe(100);
      expect(res.body.data.sweet.addedQuantity).toBe(50);
      expect(res.body.data.sweet.newQuantity).toBe(150);
    });

    it('should not allow regular user to restock', async () => {
      const res = await request(app)
        .post(`/api/sweets/${testSweet._id}/restock`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ quantity: 50 });

      expect(res.status).toBe(403);
      expect(res.body.message).toContain('Admin');
    });

    it('should fail with zero quantity', async () => {
      const res = await request(app)
        .post(`/api/sweets/${testSweet._id}/restock`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ quantity: 0 });

      expect(res.status).toBe(400);
    });

    it('should fail with negative quantity', async () => {
      const res = await request(app)
        .post(`/api/sweets/${testSweet._id}/restock`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ quantity: -10 });

      expect(res.status).toBe(400);
    });

    it('should return 404 for non-existent sweet', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const res = await request(app)
        .post(`/api/sweets/${fakeId}/restock`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ quantity: 50 });

      expect(res.status).toBe(404);
    });
  });

  describe('GET /api/inventory/low-stock', () => {
    beforeEach(async () => {
      // Create sweets with various quantities
      await Sweet.create([
        { name: 'Low Stock 1', category: 'candy', price: 1, quantity: 5, createdBy: userId },
        { name: 'Low Stock 2', category: 'candy', price: 1, quantity: 8, createdBy: userId },
        { name: 'Normal Stock', category: 'candy', price: 1, quantity: 50, createdBy: userId },
        { name: 'High Stock', category: 'candy', price: 1, quantity: 200, createdBy: userId }
      ]);
    });

    it('should allow admin to get low stock items', async () => {
      const res = await request(app)
        .get('/api/inventory/low-stock?threshold=10')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(2);
      expect(res.body.threshold).toBe(10);
      expect(res.body.data.every(s => s.quantity <= 10)).toBe(true);
    });

    it('should use default threshold if not provided', async () => {
      const res = await request(app)
        .get('/api/inventory/low-stock')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.threshold).toBe(10);
    });

    it('should not allow regular user to access low stock', async () => {
      const res = await request(app)
        .get('/api/inventory/low-stock')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(403);
    });
  });

  describe('Inventory Integration Tests', () => {
    it('should correctly update stock after multiple purchases', async () => {
      // First purchase
      await request(app)
        .post(`/api/sweets/${testSweet._id}/purchase`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ quantity: 30 });

      // Second purchase
      await request(app)
        .post(`/api/sweets/${testSweet._id}/purchase`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ quantity: 20 });

      // Check remaining stock
      const res = await request(app)
        .get(`/api/sweets/${testSweet._id}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.body.data.quantity).toBe(50);
    });

    it('should correctly update stock after purchase and restock', async () => {
      // Purchase
      await request(app)
        .post(`/api/sweets/${testSweet._id}/purchase`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ quantity: 80 });

      // Restock by admin
      await request(app)
        .post(`/api/sweets/${testSweet._id}/restock`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ quantity: 100 });

      // Check current stock
      const res = await request(app)
        .get(`/api/sweets/${testSweet._id}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.body.data.quantity).toBe(120);
    });
  });
});