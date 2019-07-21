let projects = document.getElementsByClassName("project");
console.log(projects)

setTimeout(function () {
  for (var i = 0; i < projects.length; i++) {
    projects[i].classList.remove("preShow")
  }
}, 2000);