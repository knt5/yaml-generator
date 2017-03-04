# YAML generator

## Installation

```
npm install yaml-generator
```

## Example

```
const yaml = require('yaml-generator');
const dir = 'fixtures/example';
yaml.generate({
	dir: {
		input: `${dir}/input`,
		output: `${dir}/output`,
	},
	header: '# Auto generated\n',
});
```
