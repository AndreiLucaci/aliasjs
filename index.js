const { AliasService } = require('./lib/index');

const aliases = new AliasService({
  development: ['dev', 'develop', 'development'],
});

const reverseAliases = aliases.reverseAlias();

console.log(reverseAliases);
