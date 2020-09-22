module.exports = async function ArrayIncludes(array, object) {
  if (array.includes(object)) {
    return true;
  }

  return false;
};
