/// <reference path="./main.d.ts"/>

import * as Enumerable from 'linq';
import {IGrouping} from 'linq';

describe("Linq.js tests", function () {
  it("Projection and Filtering Methods", function () {
    expect(Enumerable.from([1,2,3,4]).ToString(",")).toBe("1,2,3,4");
    expect(Enumerable.range(1, 4).Where((item: number) => item > 2).ToString(",")).toBe("3,4");
    expect(Enumerable.range(1, 4).Where("(item) => item > 2").ToString(",")).toBe("3,4");
    expect(Enumerable.range(1, 4).Where("$>2").ToString(",")).toBe("3,4");
    expect(Enumerable.range(1, 4).Select((item: number,index:number) => item+index).ToString(",")).toBe("1,3,5,7");
    expect(Enumerable.range(1, 4).Zip(Enumerable.range(1, 10),  (a: number,b:number) => a-b).ToString(",")).toBe("0,0,0,0");

  });
  it("Join Methods", function () {
    expect(Enumerable.range(1, 4).Join(Enumerable.from(["a", "aaa"]), (l) => l, (r: string) => r.length, (l, r) =>l + ":" + r).ToString(",")).toBe("1:a,3:aaa");
  });
  it("Set Methods", function () {
    expect(Enumerable.range(2, 4, 2).All((item: number) => item % 2 == 0)).toBe(true);
    expect(Enumerable.range(1, 4).Intersect(Enumerable.range(3, 4)).ToString(",")).toBe("3,4");
  });
  it("Ordering Methods", function () {
    expect(Enumerable.from(
      [
        { name: "marcin", age:15},
        { name: "albert", age:51},
        { name: "marcin", age:30},
      ]).OrderBy((p) => p.name).ThenByDescending((p) => p.age).Select((p) => p.name+p.age).ToString(",")).toBe("albert51,marcin30,marcin15");
  });
  it("Grouping Methods", function () {
    expect(Enumerable.from(["a","aa","aaa","a","a","aaa"])
      .GroupBy((item:string) => item.length)
      .Select((g: IGrouping<string>) => { return { key: g.Key(), count: g.Count() }; })
      .OrderBy(g => g.key)
      .Select(g => g.key+":"+g.count)
      .ToString(",")).toBe("1:3,2:1,3:2");
  });
});
