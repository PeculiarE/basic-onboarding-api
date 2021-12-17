/* eslint-disable max-lines-per-function */
import { expect } from 'chai';
import { constants } from '../../app/utils';
import { randomResource } from '../fixtures/constants.fixture';

const { RESOURCE_ADD_ERROR_STATUS,
  RESOURCE_CREATE_ERROR_STATUS,
  RESOURCE_FETCH_ERROR_STATUS } = constants;

describe('Basic Constants Functions', () => {
  it('ADD_ERROR_STATUS', () => {
    const data = RESOURCE_ADD_ERROR_STATUS(randomResource);
    expect(data).to.equal(`${randomResource.toUpperCase()}_ADD_ERROR`);
  });
  it('FETCH_ERROR_STATUS', () => {
    const data = RESOURCE_FETCH_ERROR_STATUS(randomResource);
    expect(data).to.equal(`${randomResource.toUpperCase()}_FETCH_ERROR`);
  });
  it('CREATE_ERROR_STATUS', () => {
    const data = RESOURCE_CREATE_ERROR_STATUS(randomResource);
    expect(data).to.equal(`${randomResource.toUpperCase()}_CREATE_ERROR`);
  });
});
