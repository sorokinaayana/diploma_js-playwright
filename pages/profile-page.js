import { BasePage } from './base-page.js';

export class ProfilePage extends BasePage {
  constructor(page) {
    super(page);
    this.bioInput = page.getByRole('textbox', { name: 'Short bio about you' });
    this.updateButton = page.getByRole('button', { name: 'Update Settings' });
    this.userDropdown = page.locator('.nav-link.dropdown-toggle');
    this.settingsLink = page.locator('[href="#/settings"]');
  }

  async navigateToProfile(username) {
    await this.page.goto('/#/profile/' + username);
  }

  async navigateToEditProfile() {
    // Сначала открываем dropdown пользователя
    await this.userDropdown.click();
    // Затем кликаем на настройки
    await this.settingsLink.click();
  }

  async updateBio(newBio) {
    await this.bioInput.fill(newBio);
    await this.updateButton.click();
  }
}
