---
---

var githubTopRepo = "lauripiispanen/github-top";
var egyptPath = "_data/locations/egypt.yml";
var login = "{{ site.github.owner.login }}"

fetch(`https://api.github.com/repos/${githubTopRepo}/contents/${egyptPath}`)
  .then(response => response.json())
  .then(data => {
    var me = atob(data.content)
      .split("\n\n")
      .find(u => u.includes(login));
    var json = userToJson(me);

    var el1 = document.getElementById("contrib-count");
    el1.innerText = json.contributions;

    var el2 = document.getElementById("gh-rank");
    el2.innerText = `Ranked the ${getNumberWithOrdinal(json.rank)} GitHub User in Egypt`;
  });

function userToJson(user) {
  var formatted = user
    .replace(/  - |    |'/g, '"') // Replace line beginnings/single quotes with double quotes
    .replace(/: /g, '": ') // Replace colons with double quotes
    .replace(/\n/g, ", "); // Replace newlines with commas
  return JSON.parse(`{ ${formatted}} `);
}

function getNumberWithOrdinal(n) {
  var s = ["th", "st", "nd", "rd"];
  var v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
