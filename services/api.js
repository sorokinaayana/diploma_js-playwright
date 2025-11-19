import { ApiClient } from './index.js';

export class Api {
  constructor(request, token) {
    this.request = request;
    this.token = token;
    this.todos = new ApiClient(request, token);
  }

  static async getToken(request) {
    const baseURL = process.env.API_URL || 'https://apichallenges.herokuapp.com';
    const response = await request.post(baseURL + '/challenger');
    const headers = response.headers();
    return headers['x-challenger'];
  }
}
