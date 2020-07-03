const createMap = (data, map) => data.forEach(obj => map.set(obj.id, obj));

module.exports = {
    createMap
};