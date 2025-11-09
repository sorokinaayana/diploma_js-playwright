import { test, expect } from '@playwright/test';
import { RegisterPage, ProfilePage } from '../../pages/index.js';
import { TestData } from '../../helpers/test-data.js';
import { allure } from "allure-playwright";

test.describe('Действия с профилем', () => {
  let registerPage, profilePage;
  let userData;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    profilePage = new ProfilePage(page);
    
    await registerPage.navigate();
    userData = TestData.generateUser();
    await registerPage.registerNewUser(userData);
  });

  test('редактирование био в профиле', async () => {
    await allure.epic("UI Тесты");
    await allure.feature("Управление профилем");
    await allure.story("Изменение био в профиле");
    await allure.severity("normal");
    await allure.tag("ui");
    await allure.tag("profile");
    
    await profilePage.navigateToProfile(userData.username);
    await profilePage.navigateToEditProfile();
    
    const newBio = 'Тестовое био ' + Date.now();
    await profilePage.updateBio(newBio);
    
    await expect(profilePage.bioInput).toHaveValue(newBio);
  });
});
