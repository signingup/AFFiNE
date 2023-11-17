import { test } from '@affine-test/kit/playwright';
import { openHomePage } from '@affine-test/kit/utils/load-page';
import {
  clickNewPageButton,
  clickPageMoreActions,
  getBlockSuiteEditorTitle,
  waitForEditorLoad,
} from '@affine-test/kit/utils/page-logic';
import { expect } from '@playwright/test';

test('Duplicate page should work', async ({ page }) => {
  await openHomePage(page);
  await waitForEditorLoad(page);
  await clickNewPageButton(page);
  const title = getBlockSuiteEditorTitle(page);
  await title.pressSequentially('test');
  await clickPageMoreActions(page);
  const duplicateButton = page.getByTestId('editor-option-menu-duplicate');
  await duplicateButton.click({ delay: 100 });
  const title2 = getBlockSuiteEditorTitle(page);
  await expect(title2).toHaveText('test(1)', { timeout: 1000 });
});
