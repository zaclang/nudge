const yaml = require('js-yaml');
const fs = require('fs');
const get = require('lodash/get');

const CONFIG_PATH = './oprah.yml';

const getParameterPaths = ({ stage } = {}) => {
  const doc = yaml.safeLoad(fs.readFileSync(CONFIG_PATH, 'utf8'));

  const getKeys = path => Object.keys({ ...get(doc, path) });

  const getPathsByType = type => getKeys(type+'.required').map(
    name => '/' + [stage, 'badger', type, name].join('/')
  );

  return {
    configPaths: getPathsByType('config'),
    secretPaths: getPathsByType('secret')
  }
}

module.exports = { getParameterPaths };