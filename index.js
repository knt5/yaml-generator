const fs = require('fs');
const path = require('path');

const glob = require('glob');
const yaml = require('js-yaml');
const deepAssign = require('deep-assign');

module.exports = {
	generate
};

function generate(config) {
	let nodeNames = new Set();
	
	let dirs = glob.sync(`${config.dir.input}/*/`);
	for (dir of dirs) {
		let name = path.basename(dir);
		
		let typeDirs = glob.sync(`${dir}/*/`);
		for (typeDir of typeDirs) {
			let typeName = path.basename(typeDir);
			
			let nodeFiles = glob.sync(`${typeDir}/*.yml`);
			for (nodeFile of nodeFiles) {
				let nodeName = path.basename(nodeFile, '.yml');
				let nodeDoc = loadYaml(nodeFile);
				
				// Check node name duplication
				if (!nodeNames.has(nodeName)) {
					nodeNames.add(nodeName)
				} else {
					throw new Error('ERROR: node name duplication');
				}
				
				// Reload ymls
				// !! deepAssign() breaks argument objects every time
				let mainDoc = loadYaml(config.main);
				let doc = loadYaml(`${dir}/${name}.yml`);
				let typeDoc = loadYaml(`${dir}/${name}-${typeName}.yml`);
				
				// Deep Object.assign()
				// !! Array will be merged as Object by deepAssign()
				console.log(mainDoc, doc, typeDoc, nodeDoc);
				let result = deepAssign(mainDoc, doc, typeDoc, nodeDoc);
				
				// Write
				if (result !== null) {
					fs.writeFileSync(
						`${config.dir.output}/${nodeName}.yml`,
						config.header + yaml.safeDump(result)
					);
				}
			}
		}
	}
}

function loadYaml(filePath) {
	return yaml.safeLoad(fs.readFileSync(filePath));
}
