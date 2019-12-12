# aliasjs
aliasjs - aliases for conventional project based names

> Real life case:
>
> I found myself in a situation that I needed to load some configurations based on the node ENV, and there were multiple names for configurations. I was very usefull just to have aliases of `dev`, `develop`, and `development` to `development`, or `stg`, `staging` to `staging` without needing to go change the environment variables.

## Contents
The current implementaiton supports building from an existing `IAliasDictionary` or adding either one value or an entire new `IAliasDictionary`, or reversing the aliases in a key:value manner in the form of `IReverseAliasDictionary`.

IAliasDictionary
```typescript
interface IAliasDictionary {
  [key: string]: Array<string>;
}
```

IReverseAliasDictionary
```typescript
interface IReverseAliasDictionary {
  [key: string]: string;
}
```

## API
The api is quite simple. The main class is the `AliasService` which offers this public methods:
```typescript
class AliasService {
  constructor(initialAliases: IAliasDictionary);
  get(alias: string): string | undefined;
  reverseAlias(): IReverseAliasDictionary;
  pushMultiple(values: IAliasDictionary): boolean;
  push(alias: string, value: string | string[]): boolean;
}
```

### 1. `get(alias: string)`
>  returns either the `string` that was found or `undefined`
### 2. reverseAlias(): IReverseAliasDictionary;
> returns the reverse object dictionary of the aliases
### 3. pushMultiple(values: IAliasDictionary): boolean;
> pushes values from the given `IAliasDictionary` much as the constructor initialization
### 4. push(alias: string, value: string | string[]): boolean;
> pushes key => value pairs in the alias dictionary

## Example

Aliases:
```javascript
const { AliasService } = require("./lib/index");

const aliases = new AliasService({
  development: ["dev", "develop", "development"]
});

console.log(aliases.get("dev")); // it would print out 'development'
```

ReverseAliases:
```javascript
const { AliasService } = require('./lib/index');

const aliases = new AliasService({
  development: ['dev', 'develop', 'development'],
});

const reverseAliases = aliases.reverseAlias();

console.log(reverseAliases);
// it will print
// { 
//   dev: 'development',
//   develop: 'development',
//   development: 'development' 
// }
```

## Instalation
```bash
yarn add aliasjs
# or
npm install aliasjs
```
