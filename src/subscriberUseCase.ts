// ↓useCaseはRepositoryのことを知ってはならない
// import * as subscriberRepository from './subscriberRepository';
import { subscriberable } from './subscriberEntity';
import { QueryResult } from 'pg';

export const getAllSubscribersUseCase = async (
  getAllSubscribers: () => Promise<QueryResult> // 高階関数でDI
): Promise<subscriberable[]> => {
  const data = await getAllSubscribers();
  return data.rows;
};

export const saveSubscriberUseCase = async (
  createSubscriber: (values: string[]) => Promise<any>,
  reqBody: any
) => {
  const values = [reqBody.name, reqBody.email, reqBody.zipcode];
  return createSubscriber(values);
};
