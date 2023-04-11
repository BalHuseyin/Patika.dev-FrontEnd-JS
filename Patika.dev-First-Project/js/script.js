let Name = prompt("Lütfen Adinizi Giriniz");
if (Boolean(Name) == 1) {
  let users = document.querySelector("#users");
  let dateNow = document.querySelector("#datenow");
  users.innerHTML = `${Name}`;
  dateNow.innerHTML = `${new Date().toLocaleString("tr-TR")}`;
} else {
  users.innerHTML = "Kullanici";
  dateNow.innerHTML = `${new Date().toLocaleString("tr-TR")}`;
}
