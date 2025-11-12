import { expect } from '@playwright/test';

export class CustomAssertions {
  static async articleShouldHaveCorrectData(articlePage, articleData) {
    await expect(articlePage.articleTitle).toHaveText(articleData.title);
    await expect(articlePage.articleBody).toContainText(articleData.body);
  }

  static async articleBodyShouldContainText(articlePage, expectedText) {
    await expect(articlePage.articleBody).toContainText(expectedText);
  }

  static async articleShouldNotBeVisible(mainPage, articleTitle) {
    await expect(mainPage.articlePreviews.filter({ hasText: articleTitle })).toBeHidden();
  }

  static async commentShouldBeVisible(commentPage, commentText) {
    await expect(commentPage.commentsContainer.filter({ hasText: commentText })).toBeVisible();
  }

  static async commentShouldNotBeVisible(commentPage, commentText) {
    await expect(commentPage.commentsContainer.filter({ hasText: commentText })).toBeHidden();
  }

  static async bioShouldHaveValue(profilePage, expectedBio) {
    await expect(profilePage.bioInput).toHaveValue(expectedBio);
  }
}
