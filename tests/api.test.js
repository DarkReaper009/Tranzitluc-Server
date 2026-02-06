import { describe, it } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from '../src/server.js';

describe('API Tests', () => {
  it('GET /api/contact should return 404', async () => {
    const response = await request(app).get('/api/contact');
    assert.strictEqual(response.status, 404);
  });

  it('POST /api/contact with missing fields should return 400', async () => {
    const response = await request(app).post('/api/contact').send({});
    assert.strictEqual(response.status, 400);
    assert.strictEqual(response.body.error, "All fields are required.");
  });

  it('POST /api/contact with invalid email should return 400', async () => {
    const response = await request(app).post('/api/contact').send({
      departure_city: "A",
      destination_city: "B",
      total_weight: "10",
      phone: "123",
      email: "invalid-email",
      message: "test"
    });
    assert.strictEqual(response.status, 400);
    assert.strictEqual(response.body.error, "Invalid email format.");
  });
});
