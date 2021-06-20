

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

document.addEventListener('DOMContentLoad', fetchToys());

function fetchToys(){
  fetch("http://localhost:3000/toys");
  .then(response => response.json);
  .then(json => createCard(json))
}

function createCard(json){
  const = toysCollection = getElementById('toy-collection');
  for (const toy of json) {
    let MyCollection = document.createElement('div')
    MyCollection.className = "card"
    createName(toy, newDiv)
    createPhoto(toy, newDiv)
    totalLikes(toy, newDiv)
    addButton(toy, newDiv)
    toysCollection.appendChild(newDiv)
}
}

