linq.js TypeScript Typings
====

The type definitions for [`linq.js`](https://github.com/mihaifm/linq) v3.0.5.

# Installation

To use it in your project, do the following.

1. Install [`linq.js`](https://github.com/mihaifm/linq) v3.0.5 from [`npm`](https://www.npmjs.com/package/linq):
	```bash
	$ npm install linq@3.0.5 --save
	```

2. Install the type definitions using [`typings`](https://github.com/typings/typings):
	```bash
	$ typings install linq --save
	```

3. Import it
	```typescript
	import * as Enumerable from 'linq';
	
	// Then just use it
	let ofDrinkingAge = Enumerable
		.from(people)
		.where(p => p.age >= 21)
		.select(p => ({ name: `${p.firstName} ${p.lastName}`, age: p.age }))
		.toArray();
	```

# FAQ

#### **Q:** I'm not getting any type info for methods chained off an enumerable. Is it broken?

> **A:** Double check your project layout and make sure you have a `tsconfig.json` that is a peer of your `typings` folder. You can also try explicitly adding the `typings` directory to your files list in `tsconfig.json` and you should also double check that it does not explicitly exclude the typings folder. If any of these cases occur, you may not receive full type completion within statements like `.where(...)` and `.select(...)`.

#### **Q:** Do I still need to explicitly define the types within lambdas included in chained methods such as `.where(...)`?

> **A:** No. Type information should flow through the chained methods unless you are afflicted by the issue in the first question in the FAQ.

#### **Q:** The type definitions have lower-case methods but the actual npm package I pulled has upper-case methods. What gives???

> **A:** These typings are for version 3.0.4-beta or greater of the linq.js library. Make sure you've imported the correct version. If you need typings for a lower version, please consult [DefinitelyTyped](http://definitelytyped.org/).

#### **Q:** I've noticed you accidentally got the type signature for method `X` wrong. Can I submit you a pull request to fix it?

> **A:** Absolutely. Pull requests are appreciated. 

# LICENSE

MIT
