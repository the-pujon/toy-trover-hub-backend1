const request = require('supertest');
const app = require('../../app'); // Replace with the actual path to your Express app

describe('Toy API Endpoints', () => {
    let toyId; // To store the toy ID for testing update and delete

    // Test Case: Create a new toy
    it('should create a new toy', async () => {
        const response = await request(app)
            .post('/api/toys')
            .send({
                name: 'Test Toy',
                sellerName: 'Test Seller',
                sellerEmail: 'test@example.com',
                category: 'Test Category',
                subcategory: 'Test Subcategory',
                inStock: '10',
                description: 'This is a test toy',
                rate: 4,
                feedback: 'Great toy!',
                price: 19.99,
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');
        toyId = response.body._id;
    });

    // Test Case: Get all toys
    it('should get all toys', async () => {
        const response = await request(app).get('/api/toys');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Test Case: Get a single toy by ID
    it('should get a single toy by ID', async () => {
        const response = await request(app).get(`/api/toys/${toyId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id', toyId);
    });

    // Test Case: Update a toy by ID
    it('should update a toy by ID', async () => {
        const response = await request(app)
            .patch(`/api/toys/${toyId}`)
            .send({
                description: 'Updated toy description',
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id', toyId);
        expect(response.body).toHaveProperty('description', 'Updated toy description');
    });

    // Test Case: Delete a toy by ID
    it('should delete a toy by ID', async () => {
        const response = await request(app).delete(`/api/toys/${toyId}`);
        expect(response.statusCode).toBe(204);
    });
});
