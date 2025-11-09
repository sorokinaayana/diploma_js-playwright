import { faker } from '@faker-js/faker';

export class TestData {
  static generateUser() {
    const timestamp = Date.now();
    return {
      username: faker.person.firstName().toLowerCase() + '_' + timestamp,
      email: faker.internet.email(),
      password: faker.internet.password()
    };
  }

  static generateArticle() {
    const timestamp = Date.now();
    return {
      title: faker.lorem.words(3) + ' ' + timestamp,
      description: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(2),
      tags: [faker.lorem.word(), 'autotest']
    };
  }

  static generateComment() {
    return faker.lorem.sentence();
  }
}
