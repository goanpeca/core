/*
 * Copyright (c) 2023-2025 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

import { ulid } from 'ulid';

export const asArray = (obj: any) => {
  if (Array.isArray(obj)) {
    return obj;
  }
  return [obj];
};

export const asDisplayName = (givenName: string, familyName: string) => {
  return givenName
    ? familyName
      ? givenName + ' ' + familyName
      : givenName
    : (familyName ?? '');
};

export const namesAsInitials = (firstName: string, lastName: string) => {
  return ((firstName || ' ').charAt(0) + (lastName || ' ').charAt(0))
    .toLocaleUpperCase()
    .trim();
};

export const newUlid = () => {
  return ulid();
};
