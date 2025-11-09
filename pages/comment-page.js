import { BasePage } from './base-page.js';

export class CommentPage extends BasePage {
  constructor(page) {
    super(page);
    this.commentInput = page.getByRole('textbox', { name: 'Write a comment...' });
    this.postCommentButton = page.getByRole('button', { name: 'Post Comment' });
    this.deleteCommentButtons = page.locator('[class*="delete"], [class*="trash"], .mod-options button, .ion-trash-a');
    this.commentsContainer = page.locator('.card').filter({ hasNot: page.locator('form') });
  }

  async addComment(commentText) {
    await this.commentInput.fill(commentText);
    await this.postCommentButton.click();
    // Ждём появления комментария
    await this.commentsContainer.filter({ hasText: commentText }).waitFor({ state: 'visible' });
  }

  async deleteLastComment() {
    const count = await this.deleteCommentButtons.count();
    
    if (count > 0) {
      // Запоминаем текст последнего комментария перед удалением
      const lastComment = this.commentsContainer.last();
      const commentText = await lastComment.textContent();
      
      this.page.once('dialog', dialog => dialog.accept());
      await this.deleteCommentButtons.last().click();
      
      // Ждём исчезновения текста комментария
      await this.commentsContainer.filter({ hasText: commentText }).waitFor({ state: 'detached' });
    }
  }

  async isCommentVisible(commentText) {
    const comment = this.commentsContainer.filter({ hasText: commentText });
    return await comment.isVisible();
  }

  async getCommentsCount() {
    return await this.commentsContainer.count();
  }
}