const chai = require('chai');
const chaiHttp = require('chai-http');
const axios = require('axios');
const mockAdapter = require('axios-mock-adapter');
const app = require('../server/app');

// connect mock adapter
const mock = new mockAdapter(axios);

mock
	.onGet('http://www.omdbapi.com/?i=tt3896198&apikey=8730e0e')
	.replyOnce(200, { "Title": "Guardians of the Galaxy Vol. 2" })

const expect = chai.expect;
chai.use(chaiHttp);

describe("server module", () => {
  it("GET /?i=tt3896198 responds with movie data", (done) => {
	  chai.request(app)
      .get('/?i=tt3896198')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(err).to.be.null;
        expect(res.body.Title).to.equal('Guardians of the Galaxy Vol. 2');
        done();
    })
	});

	it("Second GET /?i=tt3896198 responds with movie data, without hitting OMDb", (done) => {
	  chai.request(app)
      .get('/?i=tt3896198')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(err).to.be.null;
        expect(res.body.Title).to.equal('Guardians of the Galaxy Vol. 2');
        done();
    })
	});
});
