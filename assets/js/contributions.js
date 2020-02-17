function fetchContributions(username, callback) {
  var githubTopRepo = "lauripiispanen/github-top";
  var egyptPath = "_data/locations/egypt.yml";

  fetch(`https://api.github.com/repos/${githubTopRepo}/contents/${egyptPath}`)
    .then(res => res.json())
    .then(data => {
      var decodedContent = atob(data.content);
      var userData = decodedContent.split("\n\n").find(u => u.includes(username));
      var json = userToJson(userData);
      callback({
        ...json,
        ordinal_rank: getNumberWithOrdinal(json.rank)
      });
    });
}

function userToJson(user) {
  var formatted = user
    .replace(/  - |    |'/g, '"')
    .replace(/: /g, '": ')
    .replace(/\n/g, ", ");
  return JSON.parse(`{ ${formatted} }`);
}

function getNumberWithOrdinal(n) {
  var s = ["th", "st", "nd", "rd"];
  var v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
