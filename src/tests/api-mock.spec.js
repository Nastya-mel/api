import { test, expect } from '@playwright/test';

test.describe('Тестирование API запросов и перехвата данных', () => {

  test('Успешный перехват запроса и подстановка мок-данных', async ({ page }) => {
     
    await page.route('**/todos/1', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 999,
          title: 'Моканый курс от Playwright',
          completed: false
        }),
      });
    });

     
    await page.goto('/');

     
    const taskTitle = page.locator('#task-title');
    await expect(taskTitle).toHaveText('Моканый курс от Playwright');
    
     
    await expect(page.locator('#data-content')).toBeVisible();
  });

  test('Обработка ошибки 403 Forbidden и отображение уведомления', async ({ page }) => {
     
    await page.route('**/todos/1', async (route) => {
      await route.fulfill({
        status: 403,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Forbidden' }),
      });
    });

     
    await page.goto('/');

    const errorMessage = page.locator('#error-message');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Ошибка 403: Доступ к ресурсу ограничен.');
    await expect(page.locator('#data-content')).not.toBeVisible();
  });

});
