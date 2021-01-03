import * as subscriberRepository from './subscriberRepository';
import { subscriberable } from './subscriberEntity';
import { QueryResult } from 'pg';

export const getAllSubscribersUseCase = async (): Promise<subscriberable[]> => {
  const data: QueryResult = await subscriberRepository.getAllSubscribers();
  console.log('usecase', data);
  return data.rows;
};
