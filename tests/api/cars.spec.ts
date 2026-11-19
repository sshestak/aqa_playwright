import { test, expect, request, type APIRequestContext } from '@playwright/test';

let apiContext: APIRequestContext;

test.describe('Cars API testing', () => {
  test.beforeAll(async () => {
    apiContext = await request.newContext({
      baseURL: process.env.BASE_URL,
      storageState: 'playwright/.auth/user.json',
      httpCredentials: {
        username: process.env.HTTP_USERNAME!,
        password: process.env.HTTP_PASSWORD!,
      },
    });
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  // 1 positive case: create a car with valid data
  test('Should create a car with valid data', async () => {
    const carData = {
      carBrandId: 1,
      carModelId: 1,
      mileage: 100,
    };

    const response = await apiContext.post('/api/cars', {
      data: carData,
    });

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    expect(responseBody.status).toBe('ok');
    expect(responseBody.data).toMatchObject(carData);
  });

  // 1st negative case: invalid mileage
  test('Should not create a car with negative mileage', async () => {
    const carData = {
      carBrandId: 1,
      carModelId: 1,
      mileage: -100,
    };

    const response = await apiContext.post('/api/cars', {
      data: carData,
    });

    expect(response.status()).toBe(400);
  });

  // 2d negative case: missing required field
  test('Should not create a car without carBrandId', async () => {
    const carData = {
      carModelId: 1,
      mileage: 100,
    };

    const response = await apiContext.post('/api/cars', {
      data: carData,
    });

    expect(response.status()).toBe(400);
  });
});
