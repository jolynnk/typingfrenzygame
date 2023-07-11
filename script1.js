var newGuid = (function () {
  var guid = parseInt(Math.random() * 36);
  return function newGuid() {
    return (
      Date.now().toString(36) +
      (guid++ % 36).toString(36) +
      Math.random().toString(36).slice(2, 4)
    );
  };
})();
console.log(newGuid());
