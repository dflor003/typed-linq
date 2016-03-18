/// <reference path="./main.d.ts"/>

import * as Enumerable from 'linq';
import * as chai from 'chai';
import {IEnumerable} from 'linq';

let expect = chai.expect;

describe('Linq.js tests', function () {
    it('Projection and Filtering Methods', function () {
        expect(Enumerable.from([1, 2, 3, 4]).toJoinedString(',')).to.equal('1,2,3,4');
        expect(Enumerable.range(1, 4).where(item => item > 2).toJoinedString(',')).to.equal('3,4');
        expect(Enumerable.range(1, 4).where('(item) => item > 2').toJoinedString(',')).to.equal('3,4');
        expect(Enumerable.range(1, 4).where('$>2').toJoinedString(',')).to.equal('3,4');
        expect(Enumerable.range(1, 4).select((item, index) => item + index).toJoinedString(',')).to.equal('1,3,5,7');
        expect(Enumerable.range(1, 4).zip(Enumerable.range(1, 10), (a: number, b: number) => a - b).toJoinedString(',')).to.equal('0,0,0,0');

    });

    it('Join Methods', function () {
        let other = Enumerable.from(['a', 'aaa']);
        let actual: IEnumerable<string> = Enumerable
            .range(1, 4)
            .join(other, num => num, str => str.length, (num, len) => num + ':' + len);
        expect(actual.toJoinedString(',')).to.equal('1:a,3:aaa');
    });

    it('Set Methods', function () {
        expect(Enumerable.range(2, 4, 2).all((item: number) => item % 2 == 0)).to.equal(true);
        expect(Enumerable.range(1, 4).intersect(Enumerable.range(3, 4)).toJoinedString(',')).to.equal('3,4');
    });

    it('Ordering Methods', function () {
        expect(Enumerable.from(
            [
                { name: 'marcin', age: 15 },
                { name: 'albert', age: 51 },
                { name: 'marcin', age: 30 },
            ]).orderBy((p) => p.name).thenByDescending((p) => p.age).select((p) => p.name + p.age).toJoinedString(',')).to.equal('albert51,marcin30,marcin15');
    });

    it('Grouping Methods', function () {
        expect(Enumerable.from(['a', 'aa', 'aaa', 'a', 'a', 'aaa'])
            .groupBy((item: string) => item.length)
            .select(g => {
                return { key: g.key(), count: g.count() };
            })
            .orderBy(g => g.key)
            .select(g => g.key + ':' + g.count)
            .toJoinedString(',')).to.equal('1:3,2:1,3:2');
    });

    it('should infer types for from clause', () => {
        let strEnum: IEnumerable<string> = Enumerable.from(['foo', 'bar', 'oops']);
        let filtered: IEnumerable<string> = strEnum.where(x => x.indexOf('o') !== -1);
        let selected: IEnumerable<number> = filtered.select(str => str.length);

        expect(selected.toArray()).to.deep.equal([3, 4])
    });
});
