const yaml = require('js-yaml');
const fs = require('fs');
const get = require('lodash/get');

const getSsmPath = (stage, type) => name => '/' + [stage, 'badger', type, name].join('/');

const getParameterPaths = ({ stage } = {}) => {
  const doc = yaml.safeLoad(fs.readFileSync('oprah.yml', 'utf8'));
  const getKeys = path => Object.keys({ ...get(doc, path) });


  return {
    configPaths: getKeys('config.required').map(getSsmPath(stage, 'config')),
    secretPaths: getKeys('secret.required').map(getSsmPath(stage, 'secret')),
  }
}

module.exports = { getParameterPaths };