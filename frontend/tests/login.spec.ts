import { test, expect } from '@playwright/test';

const HOST = '';

test.describe('Fluxo de login', () => {
  test('Navbar aparece e navega para Login', async ({ page }) => {
    await page.goto(HOST + '/');
    await expect(page.locator('nav')).toBeVisible();
    await page.getByRole('link', { name: /login/i }).click();
    await expect(page).toHaveURL(/.*login/i);
    await expect(page.locator('form')).toBeVisible();
  });
  
  // tentativa de login com email e senha do banco
  test('Realiza tentativa de login', async ({ page }) => {
    await page.goto(HOST + '/login');
    await page.getByPlaceholder(/email/i).fill('donomar@gmail.com');
    await page.getByPlaceholder(/senha/i).fill('Donomar@123');
    await page.getByRole('button', { name: /entrar|login/i }).click();
    
    // redireciona para a pagina de catalogo
    await expect(page).toHaveURL(/\/catalogoCaminhao$/);
  });
});
