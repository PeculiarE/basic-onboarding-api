/* eslint-disable max-lines-per-function */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { constants } from '../../app/utils';

const { SUCCESS, FAIL, EMPTY_FILE, INVALID_FILE_TYPE } = constants;

const { expect } = chai;
chai.use(chaiHttp);

const validFilePath = 'test/fixtures/images/valid_file.pdf';
const invalidFilePath = 'test/fixtures/images/invalid_file.png';

describe('Upload Routes', () => {
  it('Should fail to upload a file when no file is selected', (done) => {
    chai.request(app)
      .post('/api/v1/upload')
      .set({ Authorization: process.env.ACCESS_TOKEN })
      .end((err, res) => {
        expect(res.body.status).to.equal(FAIL);
        expect(res.body.message).to.equal(EMPTY_FILE);
        done(err);
      });
  });
  it('Should fail to upload a file with an invalid type', (done) => {
    chai.request(app)
      .post('/api/v1/upload')
      .set({ Authorization: process.env.ACCESS_TOKEN })
      .attach('file', invalidFilePath)
      .end((err, res) => {
        expect(res.body.status).to.equal(FAIL);
        expect(res.body.message).to.equal(INVALID_FILE_TYPE);
        done(err);
      });
  });
  it('Should upload a file successfully', (done) => {
    chai.request(app)
      .post('/api/v1/upload')
      .set({ Authorization: process.env.ACCESS_TOKEN })
      .attach('file', validFilePath)
      .end((err, res) => {
        expect(res.body.status).to.equal(SUCCESS);
        process.env.FILE_URL = res.body.data.url;
        done(err);
      });
  });
});
