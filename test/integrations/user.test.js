/* eslint-disable max-lines-per-function */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { constants } from '../../app/utils';
import { invalidOnboardingObj } from '../fixtures/user.fixture';

const { expect } = chai;
chai.use(chaiHttp);

const {
  SUCCESS,
  FAIL,
  RESOURCE_ADD_SUCCESS,
  AUTH_REQUIRED
} = constants;

describe('User Routes', () => {
  it('should fail to onboard a user\'s data without an authentication token', (done) => {
    chai
      .request(app)
      .post('/api/v1/user')
      .end((err, res) => {
        expect(res.body.status).to.equal(FAIL);
        expect(res.body.message).to.equal(AUTH_REQUIRED);
        done(err);
      });
  });
  it('should fail to onboard a user\'s data and throw a Bad Request Error', (done) => {
    chai
      .request(app)
      .post('/api/v1/user')
      .set({ Authorization: process.env.ACCESS_TOKEN })
      .send(invalidOnboardingObj)
      .end((err, res) => {
        expect(res.body.status).to.equal(FAIL);
        expect(res.body.message).to.equal('Investor presentation must have a valid extension type');
        done(err);
      });
  });
  it('should onboard a user\'s data successfully', (done) => {
    chai
      .request(app)
      .post('/api/v1/user')
      .set({ Authorization: process.env.ACCESS_TOKEN })
      .send({
        ...invalidOnboardingObj,
        investorPresentation: process.env.FILE_URL
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(SUCCESS);
        expect(res.body.message).to.equal(RESOURCE_ADD_SUCCESS('Onboarding data'));
        done(err);
      });
  });
  it('should fail to onboard a user\'s data and throw a Duplicate Entity Error', (done) => {
    chai
      .request(app)
      .post('/api/v1/user')
      .set({ Authorization: process.env.ACCESS_TOKEN })
      .send({
        ...invalidOnboardingObj,
        investorPresentation: process.env.FILE_URL
      })
      .end((err, res) => {
        expect(res.body.status).to.equal(FAIL);
        expect(res.body.message).to.equal('User already onboarded!');
        done(err);
      });
  });
});
