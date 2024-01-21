// test/payment.test.js
const request = require('supertest');
const app=require('../../app');
//const app = require('../'); // Replace with the path to your Express app file

describe('Payment API', () => {
  let paymentId;

  // Test case for creating a payment
it('should create a new payment', async () => {
    const res = await request(app)
      .post('/api/payments')
      .send({
        userId: 'exampleUserId',
        orderId: 'exampleOrderId',
        sessionId: 'exampleSessionId',
        email: 'example@example.com',
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('payment');
    paymentId = res.body.payment._id;
  },10000); // Set the timeout to 10 seconds (10000 ms)

  // Test case for getting all payments
  it('should get all payments', async () => {
    const res = await request(app).get('/api/payments');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('payments');
    expect(Array.isArray(res.body.payments)).toBe(true);
  });

  // Test case for getting payment by email
  it('should get payment by email', async () => {
    const res = await request(app).get('/api/payments/email/example@example.com');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('payment');
  });

  // Test case for getting payment by ID
  it('should get payment by ID', async () => {
    const res = await request(app).get(`/api/payments/id/${paymentId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('payment');
  });

  // Test case for deleting payment by ID
  it('should delete payment by ID', async () => {
    const res = await request(app).delete(`/api/payments/id/${paymentId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Payment deleted successfully');
  });
});
