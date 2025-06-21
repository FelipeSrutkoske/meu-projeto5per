import { test, expect } from '@playwright/test';

const gerarCPF = () => {
    return Array.from({ length: 11 }, () => Math.floor(Math.random() * 10)).join('');
  };

const BASE_URL = ''; 

test.describe('Cadastro de Usuário', () => {
  test('deve cadastrar um novo usuário com sucesso', async ({ page }) => {
    const CPFTeste = gerarCPF();
    await page.goto(`${BASE_URL}/cadastro`);

    await page.getByPlaceholder('Nome', { exact: true }).fill('Teste');
    await page.getByPlaceholder('Sobrenome', { exact: true }).fill('Usuário');
    await page.getByPlaceholder('Email', { exact: true }).fill(`teste${Date.now()}@exemplo.com`); 
    await page.getByPlaceholder('CPF', { exact: true }).fill(CPFTeste);
    await page.getByPlaceholder('Senha', { exact: true }).fill('Senha@123');
    await page.getByPlaceholder('Confirmar Senha', { exact: true }).fill('Senha@123');

    await page.getByRole('button', { name: 'Cadastrar' }).click();

    await expect(page).toHaveURL(/login/);
  });
});
