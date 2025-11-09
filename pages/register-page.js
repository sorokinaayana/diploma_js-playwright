import { BasePage } from './base-page.js';

export class RegisterPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = page.getByRole('textbox', { name: 'Your Name' });
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.signUpButton = page.getByRole('button', { name: 'Sign up' });
  }

  async navigate() {
    await this.page.goto('/#/register'); // ← используем относительный путь
  }

  async registerNewUser(userData) {
    await this.usernameInput.fill(userData.username);
    await this.emailInput.fill(userData.email);
    await this.passwordInput.fill(userData.password);
    await this.signUpButton.click();
    
    await this.page.waitForURL('/#'); 
    return userData;
  }
}