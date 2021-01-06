function fetchContributions(username, callback) {
  var githubTopRepo = "lauripiispanen/github-top";
  var egyptPath = "_data/locations/egypt.yml";

  fetch(`https://api.github.com/repos/${githubTopRepo}/contents/${egyptPath}`)
    .then(res => res.json())
    .then(data => {
      var decodedContent = atob(data.content);
      var userData = decodedContent
        .split("\n\n")
        .find(u => u.includes(username));
      var json = yamlToJson(userData);
      if (json.rank > 20) return;
      callback({
        ...json,
        ordinal_rank: getNumberWithOrdinal(json.rank)
      });
    });
}

function yamlToJson(yaml) {
  var data = yaml
    .replace(/  - |    |"/g, "")
    .split(/\n/g)
    .map(x => `"${x.replace(/: /g, '":"')}"`);
  return JSON.parse(`{ ${data.join(",")} }`);
}

function getNumberWithOrdinal(n) {
  var s = ["th", "st", "nd", "rd"];
  var v = parseInt(n) % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
