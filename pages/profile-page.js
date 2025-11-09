import { BasePage } from './base-page.js';

export class ProfilePage extends BasePage {
  constructor(page) {
    super(page);
    this.bioInput = page.getByRole('textbox', { name: 'Short bio about you' });
    this.updateButton = page.getByRole('button', { name: 'Update Settings' });
    this.editProfileLink = page.getByRole('link', { name: 'Edit Profile Settings' });
  }

  async navigateToProfile(username) {
    await this.page.goto(`https://realworld.qa.guru/#/profile/${username}`);
  }

  async navigateToEditProfile() {
    await this.editProfileLink.click();
  }

  async updateBio(newBio) {
    await this.bioInput.fill(newBio);
    await this.updateButton.click();
  }
}