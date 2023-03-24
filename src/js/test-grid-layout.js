import NytService from './nyt-api';
const nytService = new NytService();

nytService.query = 'Ukraine';
nytService.fetchByQuery();
