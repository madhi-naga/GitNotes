
module.exports = {
  top: function (data) {
    var list = [];
    var string = "";
    var result;
    data.data.forEach(function (data) {
      let name = data.name.replace(/['"]+/g, '');
      list.push(name);
    })
    console.log(list);
    return list;
  }
};
