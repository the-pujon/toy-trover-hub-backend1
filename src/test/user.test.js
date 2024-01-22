const request  = require('supertest')
const app = require("../../app")

describe('User API Endpoints', ()=>{
    let userEmail;

    ////Test Case: Create new user
    it('should create new user', async () => {
        const response = await request(app)
        .post("/api/users")
        .send({
            name: 'testUser',
            email:'test@gmail.com',
            password:"123456",
        })

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');
        userEmail = response.body.email;

    })

    //Test Case: Get all users
    it('should get all users', async ()=>{
        const response = await request(app).get('/api/users')
        expect(response.statusCode).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
    })

    //Test Case: Get a single user by email
    it('should get a single user by email', async () => {
        const response = await request(app).get(`/api/users/${userEmail}`)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('email', userEmail)
    })

    //Test Case: Update a user by email
    it('should update a user by email', async () => {
        const response = await request(app).patch(`/api/users/${userEmail}`)
        .send({name : "updatedName"})

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('email', userEmail);
        expect(response.body).toHaveProperty('name', 'updatedName');
    })

    //Test Case: Delete user by email
    it('should delete a user by email', async () => {
        const response = await request(app).delete(`/api/users/${userEmail}`)
        expect(response.statusCode).toBe(204);
    })

    //Test Case: Get jwt
    it('should get jwt token', async()=>{
        const response = await request(app).post("/api/users/jwt")
        expect(response.statusCode).toBe(200)
    })
})