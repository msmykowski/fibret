const helpers = {
  compact(array) {
    return array.filter(Boolean);
  },
  
  compactObj(obj) {
    Object.keys(obj).forEach(key => obj[key] === undefined && delete obj[key]);
    return obj;
  }
};

module.exports = helpers;
