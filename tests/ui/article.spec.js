import { test, expect } from '../fixtures.js'; 
import { TestData } from '../../helpers/test-data.js';
import { allure } from "allure-playwright";
import { CustomAssertions } from '../../helpers/custom-assertions.js';

test.describe('Действия со статьями', () => {
  let userData, articleData;

  test.beforeEach(async ({ app, page }) => {
   
    // Регистрация пользователя
    await app.register.navigate();
    userData = TestData.generateUser();
    await app.register.registerNewUser(userData);
  });

  test('создание статьи', async ({ app }) => {
    await allure.epic("UI Тесты");
    await allure.feature("Управление статьями");
    await allure.story("Создание новой статьи");
    await allure.severity("critical");
    await allure.tag("ui");
    await allure.tag("article");
    
    articleData = TestData.generateArticle();
    
    await app.main.navigateToNewArticle();
    await app.editor.createNewArticle(articleData);
    
    await CustomAssertions.articleShouldHaveCorrectData(app.article, articleData);
  });

  test('редактирование статьи', async ({ app }) => {
    await allure.epic("UI Тесты");
    await allure.feature("Управление статьями");
    await allure.story("Редактирование существующей статьи");
    await allure.severity("high");
    await allure.tag("ui");
    await allure.tag("article");
    
    articleData = TestData.generateArticle();
    const updatedContent = 'Обновлённое содержание ' + Date.now();
    
    await app.main.navigateToNewArticle();
    await app.editor.createNewArticle(articleData);
    
    await app.article.clickEditArticle();
    await app.editor.updateArticleBody(updatedContent);
    
    await CustomAssertions.articleBodyShouldContainText(app.article, updatedContent);
  });

  test('удаление статьи', async ({ app }) => {
    await allure.epic("UI Тесты");
    await allure.feature("Управление статьями");
    await allure.story("Удаление статьи");
    await allure.severity("high");
    await allure.tag("ui");
    await allure.tag("article");
    
    articleData = TestData.generateArticle();
    
    await app.main.navigateToNewArticle();
    await app.editor.createNewArticle(articleData);
    await app.article.deleteArticle();
    await app.main.navigateToUserProfile(userData.username);
    
    await CustomAssertions.articleShouldNotBeVisible(app.main, articleData.title);
  });

  test('добавление и удаление комментария', async ({ app, page }) => {
    await allure.epic("UI Тесты");
    await allure.feature("Управление статьями");
    await allure.story("Работа с комментариями");
    await allure.severity("normal");
    await allure.tag("ui");
    await allure.tag("comment");
    
    articleData = TestData.generateArticle();
    const commentText = TestData.generateComment();
    
    await app.main.navigateToNewArticle();
    await app.editor.createNewArticle(articleData);
    
    await app.comment.commentInput.fill(commentText);
    await app.comment.postCommentButton.click();
    
    await CustomAssertions.commentShouldBeVisible(app.comment, commentText);
    
    page.once('dialog', dialog => dialog.accept());
    await app.comment.deleteCommentButtons.last().click();
    
    await CustomAssertions.commentShouldNotBeVisible(app.comment, commentText);
  });
});
