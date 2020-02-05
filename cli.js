#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const Mustache = require('mustache');
const argv = process.argv.slice(2);

if (argv.length < 3) {
  console.error('missing argment: yankpast <data.json> <template.mustache> <naming>');
  process.exit(1);
}

const data = require(path.resolve(process.cwd(), argv[0]));
const template = fs.readFileSync(path.resolve(process.cwd(), argv[1]), 'utf8');
const naming = argv[2];

data.map(item => {
  const filename = Mustache.render(naming, item);
  const content = Mustache.render(template, item);
  fs.writeFileSync(path.resolve(process.cwd(), filename), content, 'utf8');
});
