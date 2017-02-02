const yamlGenerator = require('../');

const dir = 'fixtures/example';

yamlGenerator.generate({
	dir: {
		input: `${dir}/input`,
		output: `${dir}/output`,
	},
	header: '# Auto generated\n',
});
