const axios = require("axios");
const app = require("../src/app"); // Make sure to export your Express app in your server file

let server;
const PORT = 3000;
const baseURL = `http://localhost:${PORT}`;

beforeAll((done) => {
    server = app.listen(PORT, done);
});

afterAll((done) => {
    server.close(done);
});

describe("Math Operations E2E Tests", () => {
    test("Health Check", async () => {
        const response = await axios.get(`${baseURL}/health`);
        expect(response.status).toBe(200);
        expect(response.data).toBe("Server is healthy");
    });

    test("Addition", async () => {
        const response = await axios.post(`${baseURL}/add`, { a: 5, b: 3 });
        expect(response.data.result).toBe(8);
    });

    test("Subtraction", async () => {
        const response = await axios.post(`${baseURL}/subtract`, { a: 5, b: 3 });
        expect(response.data.result).toBe(2);
    });

    test("Multiplication", async () => {
        const response = await axios.post(`${baseURL}/multiply`, { a: 5, b: 3 });
        expect(response.data.result).toBe(15);
    });

    test("Division", async () => {
        const response = await axios.post(`${baseURL}/divide`, { a: 6, b: 3 });
        expect(response.data.result).toBe(2);
    });

    test("Division by zero", async () => {
        try {
            await axios.post(`${baseURL}/divide`, { a: 6, b: 0 });
        } catch (error) {
            expect(error.response.status).toBe(400);
        }
    });

    test("Power", async () => {
        const response = await axios.post(`${baseURL}/power`, { base: 2, exponent: 3 });
        expect(response.data.result).toBe(8);
    });

    test("Square root", async () => {
        const response = await axios.post(`${baseURL}/sqrt`, { number: 9 });
        expect(response.data.result).toBe(3);
    });

    test("Square root of negative number", async () => {
        try {
            await axios.post(`${baseURL}/sqrt`, { number: -1 });
        } catch (error) {
            expect(error.response.status).toBe(400);
        }
    });
});
