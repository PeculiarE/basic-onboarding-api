/* eslint-disable import/prefer-default-export */
import faker from 'faker';

export const invalidOnboardingObj = {
  companyName: faker.random.alpha({ count: 3 }),
  yearFounded: faker.lorem.word(),
  location: faker.address.cityName(),
  website: faker.internet.url(),
  industryType: faker.lorem.word(),
  businessModel: faker.lorem.word(),
  fundingRound: faker.lorem.word(),
  financeType: faker.lorem.word(),
  amount: Math.floor(faker.finance.amount(1, 1000000000)),
  investorPresentation: faker.image.imageUrl()
};
