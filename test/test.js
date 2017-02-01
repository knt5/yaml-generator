const yamlGenerator = require('../');

const dir = 'fixtures/example';

yamlGenerator.generate({
	dir: {
		input: `${dir}/input`,
		output: `${dir}/output`,
	},
	main: `${dir}/input/main.yml`,
	header: '# Auto generated\n',
});
