import { faker } from '@faker-js/faker';

export class TodoBuilder {
  constructor() {
    this.data = {
      title: faker.lorem.words(3), 
      description: faker.lorem.sentence(),
      doneStatus: false
    };
  }

  withTitle(title = faker.lorem.words(3)) { 
    this.data.title = title;
    return this;
  }

  withDescription(description = faker.lorem.sentence()) {
    this.data.description = description;
    return this;
  }

  withDoneStatus(doneStatus = false) {
    this.data.doneStatus = doneStatus;
    return this;
  }

  build() {
    return this.data;
  }
}
