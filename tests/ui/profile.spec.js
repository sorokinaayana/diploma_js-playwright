import { test, expect } from '../fixtures.js'; 
import { TestData } from '../../helpers/test-data.js';
import { allure } from "allure-playwright";
import { CustomAssertions } from '../../helpers/custom-assertions.js';

test.describe('Действия с профилем', () => {
  let userData;

  test.beforeEach(async ({ app }) => {
    await app.register.navigate();
    userData = TestData.generateUser();
    await app.register.registerNewUser(userData);
  });

  test('редактирование био в профиле', async ({ app }) => {
    await allure.epic("UI Тесты");
    await allure.feature("Управление профилем");
    await allure.story("Изменение био в профиле");
    await allure.severity("normal");
    await allure.tag("ui");
    await allure.tag("profile");
    
    const newBio = 'Тестовое био ' + Date.now();
    
    await app.profile.navigateToProfile(userData.username);
    await app.profile.navigateToEditProfile();
    await app.profile.updateBio(newBio);
    
    await CustomAssertions.bioShouldHaveValue(app.profile, newBio);
  });
});
