const request = require('supertest');
const app = require('../../app'); // Assuming your Express app is in the 'app.js' file

describe('Order API Endpoints', () => {
    let orderId; // To store the order ID for testing update and delete

    // Test Case: Create a new order
    it('should create a new order', async () => {
        const response = await request(app)
            .post('/api/orders')
            .send({
                user: 'testuser',
                products: ['product1', 'product2'],
                shippingDetails: { address: '123 Main St', city: 'Test City' },
                paymentInfo: 'paid',
                status: 'processing',
                totalAmount: 100.0
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');
        orderId = response.body._id;
    });

    // Test Case: Get all orders
    it('should get all orders', async () => {
        const response = await request(app).get('/api/orders');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    // Test Case: Get orders by user email
    it('should get orders by user email', async () => {
        const response = await request(app).get('/api/orders/testuser');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    // Test Case: Update an order by ID
    it('should update an order by ID', async () => {
        const response = await request(app)
            .put(`/api/orders/${orderId}`)
            .send({
                status: 'shipping'
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id', orderId);
        expect(response.body).toHaveProperty('status', 'shipping');
    });

    // Test Case: Delete an order by ID
    it('should delete an order by ID', async () => {
        const response = await request(app).delete(`/api/orders/${orderId}`);
        expect(response.statusCode).toBe(204);
    });

    // Test Case: Delete all orders with the same email
    it('should delete all orders with the same email', async () => {
        const response = await request(app).delete('/api/orders/email/testuser');
        expect(response.statusCode).toBe(204);
    });
});
