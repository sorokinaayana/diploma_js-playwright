import { BasePage } from './base-page.js';

export class CommentPage extends BasePage {
  constructor(page) {
    super(page);
    this.commentInput = page.getByRole('textbox', { name: 'Write a comment...' });
    this.postCommentButton = page.getByRole('button', { name: 'Post Comment' });
    this.deleteCommentButtons = page.locator('[class*="delete"], [class*="trash"], .mod-options button, .ion-trash-a');
    this.commentsContainer = page.locator('.card').filter({ hasNot: page.locator('form') });
  }
}
