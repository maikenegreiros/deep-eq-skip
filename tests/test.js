const expect = require('chai').expect;

const deepEqSkip = require('../index');

const INPUT_JSON = {
  'name': 'deep-eq-skip',
  'author': 'Arshad Kazmi',
  'repository': {
    'url': 'https://github.com/arshadkazmi42/deep-eq-skip',
    'language': 'js'
  }
};

const EXPECTED_JSON = {
  'name': 'deep-equal-skip',
  'author': 'Arshad Kazmi',
  'repository': {
    'url': 'https://github.com/arshadkazmi42/deep-equal-skip',
    'language': 'js'
  }
};


describe('validates nested jsons', () => {
  it('should be equal json', () => {
    const isEqual = deepEqSkip(INPUT_JSON, EXPECTED_JSON, ['name', 'url']);
    expect(isEqual).to.equal(true);
  });
  it('should not be equal json', () => {
    const isEqual = deepEqSkip(INPUT_JSON, EXPECTED_JSON, []);
    expect(isEqual).to.equal(false);
  });
  it('should be equal json arrays', () => {
    const isEqual = deepEqSkip([INPUT_JSON, INPUT_JSON], [EXPECTED_JSON, EXPECTED_JSON], ['name', 'url']);
    expect(isEqual).to.equal(true);
  });
  it('should not be equal json arrays', () => {
    const isEqual = deepEqSkip([INPUT_JSON, INPUT_JSON], [EXPECTED_JSON, EXPECTED_JSON], []);
    expect(isEqual).to.equal(false);
  });
  it('should not be equal object and array', () => {
    const isEqual = deepEqSkip([{'name': '1'}], {'name': '1'}, []);
    expect(isEqual).to.equal(false);
  });
});

describe('validates empty objects', () => {
  it('should throw Error while passing an empty array', () => {
    const fn = deepEqSkip.bind(null, [], EXPECTED_JSON);
    expect(fn).to.throw(Error, `Expected ${JSON.stringify(EXPECTED_JSON)} found ${JSON.stringify([])}`);
  });
  it('should throw Error while passing an empty object', () => {
    const fn = deepEqSkip.bind(null, {}, EXPECTED_JSON);
    expect(fn).to.throw(Error, `Expected ${JSON.stringify(EXPECTED_JSON)} found ${JSON.stringify({})}`);
  });
  it('should throw Error while passing a non empty array', () => {
    const fn = deepEqSkip.bind(null, INPUT_JSON, []);
    expect(fn).to.throw(Error, `Expected ${JSON.stringify([])} found ${JSON.stringify(INPUT_JSON)}`);
  });
  it('should throw Error while passing a non empty object', () => {
    const fn = deepEqSkip.bind(null, INPUT_JSON, {});
    expect(fn).to.throw(Error, `Expected ${JSON.stringify({})} found ${JSON.stringify(INPUT_JSON)}`);
  });
});

describe('validates flat data', () => {
  it('should be equal arrays', () => {
    const isEqual = deepEqSkip([1, 2, 3], [1, 2, 3]);
    expect(isEqual).to.equal(true);
  });
  it('should be equal strings', () => {
    const isEqual = deepEqSkip('deep-eq-skip', 'deep-eq-skip');
    expect(isEqual).to.equal(true);
  });
  it('should not be equal strings', () => {
    const isEqual = deepEqSkip('deep-eq-skip', 'deep-equal-skip');
    expect(isEqual).to.equal(false);
  });
});
