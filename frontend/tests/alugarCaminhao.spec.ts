import { test, expect } from '@playwright/test';

test('alugar caminhao', async ({ page }) => {

  const hoje = new Date();
  const dataInicio = new Date(hoje);
  dataInicio.setDate(hoje.getDate() + 1);

  const dataFim = new Date(hoje);
  dataFim.setDate(hoje.getDate() + 5);

  const formatarData = (data: Date) => data.toISOString().split('T')[0];

  await page.goto('http://localhost:5173/alugarCaminhao/5');

  await page.fill('input[name="idusuario"]', '1');
  await page.fill('input[name="dataInicio"]', formatarData(dataInicio));
  await page.fill('input[name="dataFim"]', formatarData(dataFim));

  // Verifica se os campos automáticos/readOnly existem
  await expect(page.locator('input[name="idcaminhao"]')).toBeVisible();
  await expect(page.locator('input[name="valorTotal"]')).toBeVisible();

  // Submete o formulário
  await page.click('button[type="submit"]');

  // Verifica se continua na página de aluguel (ajuste se necessário)
  await expect(page).toHaveURL(/catalogoCaminhao/);
});
