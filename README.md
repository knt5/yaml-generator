# yaml-generator

YAML generator

## Example

```
const yamlGenerator = require('yaml-generator');

const dir = 'fixtures/example';

yamlGenerator.generate({
	dir: {
		input: `${dir}/input`,
		output: `${dir}/output`,
	},
	header: '# Auto generated\n',
});
```
