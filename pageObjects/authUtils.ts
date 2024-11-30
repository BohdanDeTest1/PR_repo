import { APIRequestContext } from '@playwright/test';
import testData from '../fixtures/testData2.json';
export async function loginAndGetAuth(request: APIRequestContext) {
    const authResponse = await request.post('/api/auth/signin', {
        data: {
            email: testData.validUser.email,
            password: testData.validUser.password,
            remember: false,
        },
    });

    if (!authResponse.ok()) {
        throw new Error(`Authentication failed with status: ${authResponse.status()}`);
    }

    return authResponse;
}