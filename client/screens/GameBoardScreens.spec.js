const { expect } = require('chai');

describe('Ranker function', () => {
  it('It properly maps the inout to the output range', () => {
    const ranker = (n = (score / possiblePoints) * 100) => {
      return [2.5, 5, 10, 15, 25, 40, 55, 75]
        .concat(n)
        .sort((a, b) => a - b)
        .indexOf(n);
    };
    expect(ranker(2)).to.deep.equal(0);
    expect(ranker(4)).to.deep.equal(1);
    expect(ranker(5)).to.deep.equal(1);
    expect(ranker(7)).to.deep.equal(2);
    expect(ranker(10)).to.deep.equal(2);
    expect(ranker(13)).to.deep.equal(3);
    expect(ranker(15)).to.deep.equal(3);
    expect(ranker(23)).to.deep.equal(4);
    expect(ranker(25)).to.deep.equal(4);
    expect(ranker(35)).to.deep.equal(5);
    expect(ranker(40)).to.deep.equal(5);
    expect(ranker(49)).to.deep.equal(6);
    expect(ranker(55)).to.deep.equal(6);
    expect(ranker(70)).to.deep.equal(7);
    expect(ranker(75)).to.deep.equal(7);
    expect(ranker(76)).to.deep.equal(8);
  });
});
