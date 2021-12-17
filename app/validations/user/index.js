/* eslint-disable import/prefer-default-export */
import Joi from 'joi';
import { helpers } from '../../utils';

const { ValidationHelper:
  { stringCheck, numberCheck, fileCheck }
} = helpers;

export const onboardingSchema = Joi.object({
  companyName: stringCheck('Company name', 2),
  yearFounded: stringCheck('Year founded'),
  location: stringCheck('Location'),
  website: stringCheck('Website'),
  industryType: stringCheck('Industry type'),
  businessModel: stringCheck('Business model'),
  fundingRound: stringCheck('Funding round'),
  financeType: stringCheck('Finance type'),
  amount: numberCheck('Amount'),
  investorPresentation: fileCheck('Investor presentation'),
});
