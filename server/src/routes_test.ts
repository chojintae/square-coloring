import * as assert from 'assert';
import * as httpMocks from 'node-mocks-http';
import { save, reset, list_names, load } from './routes';


describe('routes', function() {  // If you use res.json in the code, then you check it in the test using res._getJSONData()

  // TODO: add tests for your routes
  it('save and load', function() {
    const req1 = httpMocks.createRequest({method: 'POST', url: 'api/save', body: {contents: 'square1'}, query: {name: 'square_name1'}});
    const res1 = httpMocks.createResponse();
    save(req1, res1)

    const req2 = httpMocks.createRequest({method: 'GET', url: 'api/load', query: {name: 'square_name1'}});
    const res2 = httpMocks.createResponse();
    load(req2, res2)

    assert.strictEqual(res1._getStatusCode(), 200)
    assert.strictEqual(res2._getStatusCode(), 200)
    assert.deepStrictEqual(res2._getJSONData().contents, 'square1') // or, without .contents

  })

  it('list_names', function() {
    const req1 = httpMocks.createRequest({method: 'GET', url: 'api.list_names'});
    const res1 = httpMocks.createResponse();
    list_names(req1, res1);

    assert.strictEqual(res1._getStatusCode(), 200);
    assert.deepStrictEqual(res1._getJSONData().names, ['square_name1']); // or, without .names

    reset()
  })

  it('save and load', function() {
    const req1 = httpMocks.createRequest({method: 'POST', url: 'api/save', body: {contents: 'square1'}, query: {name: 'square_name1'}});
    const res1 = httpMocks.createResponse();
    save(req1, res1)

    const req2 = httpMocks.createRequest({method: 'POST', url: 'api/save', body: {contents: 'square2'}, query: {name: 'square_name2'}});
    const res2 = httpMocks.createResponse();
    save(req2, res2)

    const req3 = httpMocks.createRequest({method: 'GET', url: 'api/load', query: {name: 'square_name2'}});
    const res3 = httpMocks.createResponse();
    load(req3, res3)

    assert.strictEqual(res1._getStatusCode(), 200)
    assert.strictEqual(res2._getStatusCode(), 200)
    assert.strictEqual(res3._getStatusCode(), 200)
    assert.deepStrictEqual(res3._getJSONData().contents, 'square2') // or, without .contents

  })

  it('list_names', function() {
    const req1 = httpMocks.createRequest({method: 'GET', url: 'api.list_names'});
    const res1 = httpMocks.createResponse();
    list_names(req1, res1);

    assert.strictEqual(res1._getStatusCode(), 200);
    assert.deepStrictEqual(res1._getJSONData().names, ['square_name1', 'square_name2']); // or, without .names

    reset()
  })

});
