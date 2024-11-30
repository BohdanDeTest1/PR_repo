// export async function mockProfileResponse(page) {
//     await page.route('**/profile', async (route) => {
//         const mockedResponse = {
//             status: "ok",
//             data: {
//                 userId: 157264,
//                 photoFilename: "default-user.png",
//                 name: "Test",
//                 lastName: "Test"
//             }
//         };

//         route.fulfill({
//             status: 200,
//             contentType: 'application/json',
//             body: JSON.stringify(mockedResponse),
//         });
//     });
// }
import { Page } from '@playwright/test';
export async function mockProfileResponse(page: Page) {
    await page.route('**/profile', async (route) => {
        const mockedResponse = {
            status: "ok",
            data: {
                userId: 157264,
                photoFilename: "default-user.png",
                name: "Test",
                lastName: "Test"
            }
        };

        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockedResponse),
        });
    });
}