/* eslint-disable max-lines-per-function */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { constants } from '../../app/utils';
import {
  invalidUserObj,
  validUserObj,
  duplicateUserObj,
  validLoginObj,
  invalidLoginObj,
} from '../fixtures/auth.fixture';

const { expect } = chai;
chai.use(chaiHttp);

const {
  DB_CONSTRAINTS: { user_info_email_key },
  SUCCESS,
  FAIL,
  RESOURCE_CREATE_SUCCESS,
  INVALID_CREDENTIALS,
  LOGIN_SUCCESS,
} = constants;

describe('Auth Routes', () => {
  it('should fail to create a user and throw a Bad Request Error', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(invalidUserObj)
      .end((err, res) => {
        expect(res.body.status).to.equal(FAIL);
        expect(res.body.message).to.equal('Email is a required field');
        done(err);
      });
  });
  it('should create a user successfully', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(validUserObj)
      .end((err, res) => {
        expect(res.body.status).to.equal(SUCCESS);
        expect(res.body.message).to.equal(RESOURCE_CREATE_SUCCESS('User'));
        done(err);
      });
  });
  it('should fail to create a user and throw a Duplicate Entity Error', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(duplicateUserObj)
      .end((err, res) => {
        expect(res.body.status).to.equal(FAIL);
        expect(res.body.message).to.equal(user_info_email_key);
        done(err);
      });
  });
  it('should fail to login a user and throw an Invalid Credentials error', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(invalidLoginObj)
      .end((err, res) => {
        expect(res.body.status).to.equal(FAIL);
        expect(res.body.message).to.equal(INVALID_CREDENTIALS);
        done(err);
      });
  });
  it('should login user successfully', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(validLoginObj)
      .end((err, res) => {
        expect(res.body.status).to.equal(SUCCESS);
        expect(res.body.message).to.equal(LOGIN_SUCCESS);
        process.env.ACCESS_TOKEN = `Bearer ${res.body.data.token}`;
        done(err);
      });
  });
});
