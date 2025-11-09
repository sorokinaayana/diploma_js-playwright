import { test, expect } from '@playwright/test';
import { ApiClient } from '../../services/index.js';
import { TodoBuilder } from '../../builders/todo.builder.js';

let apiClient;
let token;

test.beforeAll(async ({ request }) => {
  // Получаем токен для всех тестов
  const response = await request.post('https://apichallenges.herokuapp.com/challenger');
  const headers = response.headers();
  token = headers['x-challenger'];
  console.log('Токен: ' + token);
});

test.beforeEach(async ({ request }) => {
  apiClient = new ApiClient(request, token);
});

test.describe('API Todo Tests', () => {
  
  test('GET 1.0 - получение всех задач', async () => {
    const response = await apiClient.getAllTodos();
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(Array.isArray(data.todos)).toBe(true);
    expect(data.todos.length).toBeGreaterThan(0);
    
    const firstTodo = data.todos[0];
    expect(firstTodo).toHaveProperty('id');
    expect(firstTodo).toHaveProperty('title');
    expect(firstTodo).toHaveProperty('doneStatus');
    expect(typeof firstTodo.doneStatus).toBe('boolean');
  });

  test('GET 2.0 - получение задачи по ID', async () => {
    // Сначала создаем задачу
    const testTodo = new TodoBuilder().withTitle('Поиск по ID тест').build();
    const createResponse = await apiClient.createTodo(testTodo);
    const createdTodo = await createResponse.json();

    // Затем ищем по ID
    const response = await apiClient.getTodoById(createdTodo.id);
    expect(response.status()).toBe(200);
    
    const foundData = await response.json();
    expect(foundData.todos).toBeDefined();
    expect(foundData.todos.length).toBe(1);
    
    const foundTodo = foundData.todos[0];
    expect(foundTodo.id).toBe(createdTodo.id);
    expect(foundTodo.title).toBe('Поиск по ID тест');
  });

  test('POST 1.0 - создание задачи со всеми параметрами', async () => {
    const testTodo = new TodoBuilder()
      .withTitle('Тестовая запись для диплома')
      .withDescription('Подробное описание записи для дипломного проекта')
      .withDoneStatus(true)
      .build();

    const response = await apiClient.createTodo(testTodo);
    expect(response.status()).toBe(201);
    
    const createdTodo = await response.json();
    expect(createdTodo.title).toBe('Тестовая запись для диплома');
    expect(createdTodo.description).toBe('Подробное описание записи для дипломного проекта');
    expect(createdTodo.doneStatus).toBe(true);
    expect(createdTodo.id).toBeDefined();
  });

  test('PUT 1.0 - полное обновление задачи', async () => {
    // Создаем задачу для обновления
    const testTodo = new TodoBuilder().withTitle('Начальная запись').build();
    const createResponse = await apiClient.createTodo(testTodo);
    const createdTodo = await createResponse.json();

    // Обновляем задачу
    const updatedData = new TodoBuilder()
      .withTitle('Обновленная запись для диплома')
      .withDescription('Обновленное описание')
      .withDoneStatus(true)
      .build();

    const response = await apiClient.updateTodo(createdTodo.id, updatedData);
    expect(response.status()).toBe(200);
    
    const updatedTodo = await response.json();
    expect(updatedTodo.title).toBe('Обновленная запись для диплома');
    expect(updatedTodo.description).toBe('Обновленное описание');
    expect(updatedTodo.doneStatus).toBe(true);
  });

  test('DELETE 1.0 - удаление задачи', async () => {
    // Создаем задачу для удаления
    const testTodo = new TodoBuilder().withTitle('Задача для удаления').build();
    const createResponse = await apiClient.createTodo(testTodo);
    const createdTodo = await createResponse.json();

    // Удаляем задачу
    const deleteResponse = await apiClient.deleteTodo(createdTodo.id);
    expect(deleteResponse.status()).toBe(200);

    // Проверяем что задача удалена
    const getResponse = await apiClient.getTodoById(createdTodo.id);
    expect(getResponse.status()).toBe(404);
  });
});
