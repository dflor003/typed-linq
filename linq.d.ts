declare module linqjs {
    let Utils: {
        createLambda(expression: any): (...params: any[]) => any;
        createEnumerable<T>(getEnumerator: () => IEnumerator<T>): IEnumerable<T>;
        createEnumerator<T>(initialize: () => void, tryGetNext: () => boolean, dispose: () => void): IEnumerator<T>;
        extendTo(type: any): void;
    };

    function constructor<T>(getEnumerator: () => IEnumerator<T>): IEnumerable<T>;

    function choice<T>(...params: T[]): IEnumerable<T>;
    function choice<T>(params: T[] | ArrayLike<T>): IEnumerable<T>;

    function cycle<T>(...params: T[]): IEnumerable<T>;
    function cycle<T>(params: T[] | ArrayLike<T>): IEnumerable<T>;

    function empty<T>(): IEnumerable<T>;

    function from<T>(): IEnumerable<T>;
    function from<T>(obj: IEnumerable<T>): IEnumerable<T>;
    function from(obj: string): IEnumerable<string>;
    function from(obj: number): IEnumerable<number>;
    function from<T>(obj: T[] | ArrayLike<T>): IEnumerable<T>;
    function from<T>(obj: { [name: string]: T; }): IEnumerable<KeyValuePair<string, T>>;
    function from(obj: Object): IEnumerable<PropertyValue>;

    function make<T>(element: T): IEnumerable<T>;

    function matches(input: string, pattern: RegExp): IEnumerable<string>;
    function matches(input: string, pattern: string, flags?: string): IEnumerable<string>;

    function range(start: number, count: number, step?: number): IEnumerable<number>;
    function rangeDown(start: number, count: number, step?: number): IEnumerable<number>;
    function rangeTo(start: number, to: number, step?: number): IEnumerable<number>;
    function repeat<T>(element: T, count?: number): IEnumerable<T>;
    function repeatWithFinalize<T>(initializer: () => T, finalizer: (elem: T) => void): IEnumerable<T>;
    function generate<T>(func: () => T, count?: number): IEnumerable<T>;
    function toInfinity(start?: number, step?: number): IEnumerable<number>;
    function toNegativeInfinity(start?: number, step?: number): IEnumerable<number>;
    function unfold<T>(seed: T, func: (value: T) => T): IEnumerable<T>;
    function defer<T>(enumerableFactory: () => IEnumerable<T>): IEnumerable<T>;

    interface IEnumerable<T> {
        getEnumerator(): IEnumerator<T>;

        // Extension Methods
        traverseBreadthFirst(func: (element: any) => IEnumerable<T>, resultSelector?: (element: any, nestLevel: number) => any): IEnumerable<any>;
        traverseDepthFirst(func: (element: any) => IEnumerable<T>, resultSelector?: (element: any, nestLevel: number) => any): IEnumerable<any>;
        flatten(): IEnumerable<T>;
        pairwise<V>(selector: (prev: T, current: T) => V): IEnumerable<V>;

        scan<V>(func: (prev: T, current: T) => V): IEnumerable<V>;
        scan<V>(seed: V, func: (prev: T, current: T) => V): IEnumerable<V>;

        select<V>(selector: (element: T, index?: number) => V): IEnumerable<V>;

        selectMany(): IEnumerable<PropertyValue>;
        selectMany<V>(collectionSelector: (elem: T, index?: number) => V[]): IEnumerable<V>;
        selectMany<V>(collectionSelector: (elem: T, index?: number) => ArrayLike<V>): IEnumerable<V>;
        selectMany<V>(collectionSelector: (elem: T, index?: number) => IEnumerable<V>): IEnumerable<V>;
        selectMany(collectionSelector: (elem: T, index?: number) => Object): IEnumerable<PropertyValue>;
        selectMany<U, V>(collectionSelector: (elem: T, index?: number) => U[], resultSelector: (outer: T, inner: U) => V): IEnumerable<V>;
        selectMany<U, V>(collectionSelector: (elem: T, index?: number) => ArrayLike<U>, resultSelector: (outer: T, inner: U) => V): IEnumerable<V>;
        selectMany<U, V>(collectionSelector: (elem: T, index?: number) => IEnumerable<U>, resultSelector: (outer: T, inner: U) => V): IEnumerable<V>;
        selectMany<V>(collectionSelector: (elem: T, index?: number) => Object, resultSelector: (outer: T, inner: Object) => V): IEnumerable<V>;

        where(predicate: (elem: T, index?: number) => boolean): IEnumerable<T>;
        where(expression: string): IEnumerable<T>;
        choose<V>(selector: (elem: T, index?: number) => V): IEnumerable<V>;
        ofType<V extends NewableClass>(type: V): IEnumerable<V>;

        zip<U, V>(second: U[] | ArrayLike<U> | IEnumerable<U>, resultSelector: (first: T, second: U, index?: number) => V): IEnumerable<V>;
        zip<V>(second: Object, resultSelector: (first: T, second: PropertyValue, index?: number) => V): IEnumerable<V>;
        zip(...params: any[]): IEnumerable<any>; // last one is selector

        merge<U, V>(second: U[] | ArrayLike<U> | IEnumerable<U>, resultSelector: (first: T, second: U, index?: number) => V): IEnumerable<V>;
        merge<V>(second: Object, resultSelector: (first: T, second: PropertyValue, index?: number) => V): IEnumerable<V>;
        merge(...params: any[]): IEnumerable<any>; // last one is selector

        join<TOther, TKey, TResult>(inner: IEnumerable<TOther>, outerKeySelector: (elem: T) => TKey, innerKeySelector: (elem: TOther) => TKey, resultSelector: (outer: T, inner: TOther) => TResult, compareSelector?: (elem: TKey) => any): IEnumerable<TResult>;
        join<TOther, TKey, TResult>(inner: TOther[], outerKeySelector: (elem: T) => TKey, innerKeySelector: (elem: TOther) => TKey, resultSelector: (outer: T, inner: TOther) => TResult, compareSelector?: (elem: TKey) => any): IEnumerable<TResult>;
        join<TOther, TKey, TResult>(inner: ArrayLike<TOther>, outerKeySelector: (elem: T) => TKey, innerKeySelector: (elem: TOther) => TKey, resultSelector: (outer: T, inner: TOther) => TResult, compareSelector?: (elem: TKey) => any): IEnumerable<TResult>;
        join<TKey, TResult>(inner: Object, outerKeySelector: (elem: T) => TKey, innerKeySelector: (inner: PropertyValue) => TKey, resultSelector: (outer: T, inner: PropertyValue) => TResult, compareSelector?: (elem: TKey) => any): IEnumerable<TResult>;

        groupJoin<K, U, V>(inner: U[] | ArrayLike<U> | IEnumerable<U>, outerKeySelector: (elem: T) => K, innerKeySelector: (elem: U) => K, resultSelector: (outer: T, inner: U) => V, compareSelector?: (elem: K) => any): IEnumerable<V>;
        groupJoin<K, V>(inner: Object, outerKeySelector: (elem: T) => K, innerKeySelector: (inner: PropertyValue) => K, resultSelector: (outer: T, inner: PropertyValue) => V, compareSelector?: (elem: K) => any): IEnumerable<V>;

        all(predicate: (elem: T) => boolean): boolean;
        any(predicate?: (elem: T) => boolean): boolean;
        isEmpty(): boolean;

        concat(...sequences: T[]): IEnumerable<T>;
        concat(sequences: T[] | ArrayLike<T> | IEnumerable<T>): IEnumerable<T>;

        insert(index: number, second: T[] | ArrayLike<T> | IEnumerable<T>): IEnumerable<T>;
        alternate(alternateValue: T | T[] | ArrayLike<T> | IEnumerable<T>): IEnumerable<T>;

        contains(value: T): boolean;
        contains<V>(value: V, compareSelector: (elem: T) => V): boolean;

        defaultIfEmpty(defaultValue?: T): IEnumerable<T>;
        distinct(compareSelector?: (elem: T) => any): IEnumerable<T>;
        distinctUntilChanged(compareSelector: (elem: T) => any): IEnumerable<T>;

        except(second: T[] | ArrayLike<T> | IEnumerable<T>, compareSelector?: (elem: T) => any): IEnumerable<T>;
        intersect(second: T[] | ArrayLike<T> | IEnumerable<T>, compareSelector?: (elem: T) => any): IEnumerable<T>;
        sequenceEqual(second: T[] | ArrayLike<T> | IEnumerable<T>, compareSelector?: (elem: T) => any): IEnumerable<T>;
        union(second: T[] | ArrayLike<T> | IEnumerable<T>, compareSelector?: (elem: T) => any): IEnumerable<T>;
        orderBy(keySelector: (elem: T) => any): IOrderedEnumerable<T>;
        orderByDescending(keySelector: (elem: T) => any): IOrderedEnumerable<T>;
        reverse(): IEnumerable<T>;
        shuffle(): IEnumerable<T>;
        weightedSample(weightSelector: (elem: T) => number): IEnumerable<T>;

        groupBy<K>(keySelector: (elem: T) => K): IEnumerable<IGrouping<K, T>>;
        groupBy<K, V>(keySelector: (elem: T) => K, elementSelector: (elem: T) => V): IEnumerable<IGrouping<K, V>>;
        groupBy<K, U, V>(keySelector: (elem: T) => K, elementSelector: (element: T) => U, resultSelector: (key: K, group: IGrouping<K, U>) => V, compareSelector?: (elem: K) => any): IEnumerable<V>;

        partitionBy<K>(keySelector: (elem: T) => K): IEnumerable<IGrouping<K, T>>;
        partitionBy<K, V>(keySelector: (elem: T) => K, elementSelector: (elem: T) => V): IEnumerable<V>;
        partitionBy<K, U, V>(keySelector: (elem: T) => K, elementSelector: (element: T) => U, resultSelector: (key: K, group: IEnumerable<U>) => V, compareSelector?: (elem: K) => any): IEnumerable<V>;

        buffer(count: number): IEnumerable<T>;

        aggregate<V>(func: (prev: V, current: T) => V): V;
        aggregate<U, V>(func: (prev: U, current: T) => U, resultSelector?: (elem: U) => V): V;
        aggregate<V>(seed: V, func: (prev: V, current: T) => V): V;
        aggregate<U, V>(seed: U, func: (prev: U, current: T) => U, resultSelector?: (elem: U) => V): V;

        average(selector?: (elem: T) => number): number;
        sum(selector?: (elem: T) => number): number;
        count(predicate?: (elem: T, index?: number) => boolean): number;

        max(selector?: (elem: T) => number): number;
        max(selector?: (elem: T) => string): string;

        min(selector?: (elem: T) => number): number;
        min(selector?: (elem: T) => string): string;

        maxBy(keySelector: (elem: T) => number): T;
        maxBy(keySelector: (elem: T) => string): T;

        minBy(keySelector: (elem: T) => number): T;
        minBy(keySelector: (elem: T) => string): T;

        elementAt(index: number): T;
        elementAtOrDefault(index: number, defaultValue?: T): T;
        first(predicate?: (elem: T, index?: number) => boolean): T;
        firstOrDefault(predicate?: (elem: T, index?: number) => boolean, defaultValue?: T): T;
        last(predicate?: (elem: T, index?: number) => boolean): T;
        lastOrDefault(predicate?: (elem: T, index?: number) => boolean, defaultValue?: T): T;
        single(predicate?: (elem: T, index?: number) => boolean): T;
        singleOrDefault(predicate?: (elem: T, index?: number) => boolean, defaultValue?: T): T;
        skip(count: number): IEnumerable<T>;
        skipWhile(predicate: (elem: T, index?: number) => boolean): IEnumerable<T>;
        take(count: number): IEnumerable<T>;
        takeWhile(predicate: (elem: T, index?: number) => boolean): IEnumerable<T>;
        takeExceptLast(count?: number): IEnumerable<T>;
        takeFromLast(count: number): IEnumerable<T>;
        indexOf(item: T): number;
        indexOf(predicate: (elem: T, index?: number) => boolean): number;
        lastIndexOf(item: T): number;
        lastIndexOf(predicate: (elem: T, index?: number) => boolean): number;
        asEnumerable(): IEnumerable<T>;
        cast<V>(): IEnumerable<V>;
        toArray(): T[];

        toLookup<K>(keySelector: (elem: T) => K): Lookup<K, T>;
        toLookup<K, V>(keySelector: (elem: T) => K, elementSelector?: (elem: T) => V, compareSelector?: (elem: K) => any): Lookup<K, V>;

        toObject(keySelector: (elem: T) => string): { [name: string]: T; };
        toObject<V>(keySelector: (elem: T) => string, elementSelector?: (elem: T) => V): { [name: string]: V; };

        toDictionary<K>(keySelector: (elem: T) => K): Dictionary<K, T>;
        toDictionary<K, V>(keySelector: (elem: T) => K, elementSelector?: (elem: T) => V, compareSelector?: (elem: K) => any): Dictionary<K, V>;

        toJSONString(replacer: string[] | ((elem: T, index?: number) => string), space?: string | number): string;
        toJoinedString(separator?: string, selector?: (elem: T, index?: number) => any): string;

        doAction(action: (elem: T, index?: number) => void): IEnumerable<T>;
        doAction(action: (elem: T, index?: number) => boolean): IEnumerable<T>;

        forEach(action: (elem: T, index?: number) => void): void;
        forEach(action: (elem: T, index?: number) => boolean): void;

        write(separator?: string, selector?: (elem: T) => any): void;
        writeLine(selector?: (elem: T) => any): void;
        force(): void;
        letBind<V>(func: ((source: IEnumerable<T>) => V[]) | ((source: IEnumerable<T>) => ArrayLike<V>) | ((source: IEnumerable<T>) => IEnumerable<V>)): IEnumerable<V>;
        share(): IDisposableEnumerable<T>;
        memoize(): IDisposableEnumerable<T>;
        catchError(handler: (exception: any) => void): IEnumerable<T>;
        finallyAction(finallyAction: () => void): IEnumerable<T>;
        log(selector?: (elem: T) => void): IEnumerable<T>;
        trace(message?: string, selector?: (elem: T) => void): IEnumerable<T>;
    }

    type NewableClass = { new (): NewableClass; }

    interface IOrderedEnumerable<T> extends IEnumerable<T> {
        createOrderedEnumerable(keySelector: (element: T) => any, descending: boolean): IOrderedEnumerable<T>;
        thenBy(keySelector: (element: T) => any): IOrderedEnumerable<T>;
        thenByDescending(keySelector: (element: T) => any): IOrderedEnumerable<T>;
    }

    interface IDisposableEnumerable<T> extends IEnumerable<T> {
        dispose(): void;
    }

    interface IEnumerator<T> {
        current(): T;
        moveNext(): boolean;
        dispose(): void;
    }

    interface ArrayLike<V> {
        length: number;
        [x: number]: V;
    }

    class Dictionary<K, T> {
        constructor(compareSelector?: (elem: K) => any);

        count(): number;

        add(key: K, value: T): void;

        remove(key: K): void;

        contains(key: K): boolean;

        clear(): void;

        get(key: K): T;

        set(key: K, value: T): boolean;

        toEnumerable(): IEnumerable<T>;
    }

    class Lookup<K, T> {
        constructor(dictionary: Dictionary<K, T[]>);

        count(): number;

        get(key: K): IEnumerable<T>;

        contains(key: K): boolean;

        toEnumerable(): IEnumerable<KeyValuePair<K, T>>;
    }

    interface IGrouping<K, T> extends IEnumerable<T> {
        key(): K;
    }

    interface KeyValuePair<K, V> {
        key: K;
        value: V;
    }

    interface PropertyValue extends KeyValuePair<string, any> {
    }

}

export = linqjs;
