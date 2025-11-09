import { BasePage } from './base-page.js';

export class CommentPage extends BasePage {
  constructor(page) {
    super(page);
    this.commentInput = page.getByRole('textbox', { name: 'Write a comment...' });
    this.postCommentButton = page.getByRole('button', { name: 'Post Comment' });
    this.deleteCommentButtons = page.locator('[class*="delete"], [class*="trash"], .mod-options button, .ion-trash-a');
    this.commentsContainer = page.locator('.card').filter({ hasNot: page.locator('form') });
    this.commentByText = (text) => this.commentsContainer.filter({ hasText: text }); // Локатор в конструкторе
  }

  async addComment(commentText) {
    await this.commentInput.fill(commentText);
    await this.postCommentButton.click();
  }

  async deleteLastComment() {
    const count = await this.deleteCommentButtons.count();
    
    if (count > 0) {
      this.page.once('dialog', dialog => dialog.accept());
      await this.deleteCommentButtons.last().click();
    }
  }

  async isCommentVisible(commentText) {
    return await this.commentByText(commentText).isVisible();
  }

  async getCommentsCount() {
    return await this.commentsContainer.count();
  }
}
