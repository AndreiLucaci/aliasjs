import { Objs } from 'minobjs';

export interface IAliasDictionary {
  [key: string]: string[];
}

export interface IReverseAliasDictionary {
  [key: string]: string;
}

export class AliasService {
  private aliases: IAliasDictionary = {};

  constructor(initialAliases: IAliasDictionary) {
    this.internalSafePushMultiValue(initialAliases);
  }

  public get(alias: string) {
    return Object.keys(this.aliases).find(key => this.aliases[key].find(x => x === alias));
  }

  public reverseAlias(): IReverseAliasDictionary {
    return Object.keys(this.aliases).reduce(
      (acc: IReverseAliasDictionary, key) =>
        this.aliases[key].reduce((tmpAcc, val: string) => {
          tmpAcc[val] = key;
          return tmpAcc;
        }, acc),
      {},
    );
  }

  public pushMultiple(values: IAliasDictionary) {
    return this.internalSafePushMultiValue(values);
  }

  public push(alias: string, value: string | string[]) {
    return this.internalSafePushValue(alias, value);
  }

  private checkIntegrityValue(alias: string) {
    if (!this.aliases[alias]) {
      this.aliases[alias] = [];
    }

    return true;
  }

  private checlIntegrityObject(alias: IAliasDictionary) {
    return !new Objs().isEmpty(alias);
  }

  private internalSafePushValue(alias: string, value: string | string[]) {
    return this.checkIntegrityValue(alias) && this.internalPushValue(alias, value);
  }

  private internalSafePushMultiValue(alias: IAliasDictionary) {
    return this.checlIntegrityObject(alias) && this.internalPushObject(alias);
  }

  private internalPushValue(alias: string, value: string | string[]) {
    if (Array.isArray(value) && value.length > 0) {
      this.aliases[alias] = [...this.aliases[alias], ...value];
    } else {
      this.aliases[alias].push(value as string);
    }

    return true;
  }

  private internalPushObject(alias: IAliasDictionary) {
    return Object.keys(alias)
      .map(key => {
        return this.internalSafePushValue(key, alias[key]);
      })
      .every(x => x);
  }
}
