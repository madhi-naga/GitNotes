
module.exports = {
    top: function(data){ 
  var list = [];
  var string = "";
  var result;
    data.items.forEach(function (track, index) {
      list.push(index+1 + " ");
      list.push(track.name);
      list.push("<br>");
  
      string.concat(track.name);
  
     var newlist = list.join(",");
     result = newlist.replace(/,/g, '');
     
      // Removing all the commas
      console.log(result);
  
  
    }
  )
  return result;
  }
  };
  