let addToy = false;
const toyCollectionDiv = document.getElementById("toy-collection");

function getToys() {
  return fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toyList => {
      toyList.forEach(toy => {
        renderToy(toy);
      });
    })
}

function renderToy(toy) {
  let toyDiv = document.createElement('div');
  toyDiv.classList.add("card");

  let toyH2 = document.createElement('h2');
  toyH2.innerText = toy.name;

  let toyImg = document.createElement('img');
  toyImg.classList.add("toy-avatar");
  toyImg.src = toy.image;

  let toyLikes = document.createElement('p');
  toyLikes.classList.add("para"+toy.id)
  toyLikes.innerText = toy.likes+" likes";

  let toyButton = document.createElement('button');
  toyButton.classList.add("like-btn");
  toyButton.id = toy.id;
  toyButton.addEventListener('click', likeEvent => {
    likeEvent.preventDefault()
    digestLikeEvent(likeEvent)
  })
  toyButton.innerText = "Like <3"

  toyDiv.append(toyH2);
  toyDiv.append(toyImg);
  toyDiv.append(toyLikes);
  toyDiv.append(toyButton);

  toyCollectionDiv.append(toyDiv);
}

function renderAddToy(){
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', newToyEvent => {
        newToyEvent.preventDefault()
        let newToyName = newToyEvent.target.name.value;
        let newToyImgUrl = newToyEvent.target.image.value;
        if (newToyName && newToyImgUrl) {
          submitNewToyReq(newToyName, newToyImgUrl)
        }
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
}

function submitNewToyReq(name, image) {
  let formData = {
    name,
    image,
    "likes": 0,
  };

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  }

  return fetch("http://localhost:3000/toys",configObj)
    .then(response => response.json())
    .then(toy => renderToy(toy))
    .catch(error => document.body.innerHTML = "<h1>"+error.message+"</h1>");
}

function digestLikeEvent(event) {
  let prevLikesText = document.querySelector(".para"+event.target.id)
  let newLikes = parseInt(prevLikesText.innerText) + 1
  let formData = {
    "likes": newLikes
  }

  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  }

  fetch("http://localhost:3000/toys/"+event.target.id, configObj)
    .then(response => response.json())
    .then(json => prevLikesText.innerText = newLikes + " likes")
}

document.addEventListener("DOMContentLoaded", () => {
  getToys();
  renderAddToy();
});