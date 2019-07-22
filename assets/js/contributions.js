fetch(
  "https://github-contributions-api.now.sh/v1/YoussefRaafatNasry?format=nested"
)
  .then(response => response.json())
  .then(data => {
    var total = 0;
    Object.keys(data.years).forEach(year => (total += data.years[year].total));
    var el = document.getElementById("contrib-count");
    el.innerText = total;
  });
