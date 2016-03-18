/// <reference path="./main.d.ts"/>

import * as Enumerable from 'linq';

describe("Linq.js tests", function () {
    it("Projection and Filtering Methods", function () {
        let x = Enumerable.from([1, 2, 3, 4]).toJoinedString(",");
        expect(x).toBe("1,2,3,4");
        expect(Enumerable.range(1, 4).where(item => item > 2).toJoinedString(",")).toBe("3,4");
        expect(Enumerable.range(1, 4).where("(item) => item > 2").toJoinedString(",")).toBe("3,4");
        expect(Enumerable.range(1, 4).where("$>2").toJoinedString(",")).toBe("3,4");
        expect(Enumerable.range(1, 4).select((item, index) => item + index).toJoinedString(",")).toBe("1,3,5,7");
        expect(Enumerable.range(1, 4).zip(Enumerable.range(1, 10), (a: number, b: number) => a - b).toJoinedString(",")).toBe("0,0,0,0");

    });
    it("Join Methods", function () {
        let other = Enumerable.from(["a", "aaa"]);
        let actual = Enumerable
            .range(1, 4)
            .join(other, num => num, str => str.length, (num, len) => num + ":" + len).toJoinedString(",");
        expect(actual).toBe("1:a,3:aaa");
    });
    it("Set Methods", function () {
        expect(Enumerable.range(2, 4, 2).all((item: number) => item % 2 == 0)).toBe(true);
        expect(Enumerable.range(1, 4).intersect(Enumerable.range(3, 4)).toJoinedString(",")).toBe("3,4");
    });
    it("Ordering Methods", function () {
        expect(Enumerable.from(
            [
                { name: "marcin", age: 15 },
                { name: "albert", age: 51 },
                { name: "marcin", age: 30 },
            ]).orderBy((p) => p.name).thenByDescending((p) => p.age).select((p) => p.name + p.age).toJoinedString(",")).toBe("albert51,marcin30,marcin15");
    });
    it("Grouping Methods", function () {
        expect(Enumerable.from(["a", "aa", "aaa", "a", "a", "aaa"])
            .groupBy((item: string) => item.length)
            .select(g => {
                return { key: g.key(), count: g.count() };
            })
            .orderBy(g => g.key)
            .select(g => g.key + ":" + g.count)
            .toJoinedString(",")).toBe("1:3,2:1,3:2");
    });
});
