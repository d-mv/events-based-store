import { generateId, buildIntArray } from '@mv-d/toolbelt';

import { Data } from '../store';

const mapperString = (i: number): Data<string> => ({
  i,
  id: generateId(),
  values: [new Date().toString()],
});

const mapperDate = (i: number): Data<Date> => ({
  i,
  id: generateId(),
  values: [new Date(), new Date(), new Date(), new Date(), new Date()],
});

const mapperFn = (withDate: boolean): ((i: number) => Data) =>
  withDate ? mapperDate : mapperString;

export function makeItems(withDate: false): Data<string>[];
export function makeItems(withDate: true): Data<Date>[];
export function makeItems(withDate: boolean = false): Data[] {
  return buildIntArray(1000).map(mapperFn(withDate));
}
