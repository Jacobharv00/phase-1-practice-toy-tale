let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn")
  const toyForm = document.querySelector(".container") 
 
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  })

// Globals
const toyCollection = document.querySelector('#toy-collection') // Div element where all toys live
const toyUrl = 'http://localhost:3000/toys'
const addToyForm = document.querySelector('.add-toy-form')



// Get Request
fetch(toyUrl)
.then(resp => resp.json())
.then(toys => {
  let toysHTML = toys.map(toy => {
    return `<div class="card">
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn" id="${toy.id}">Like</button>
    <br>
    <button class="delete-btn" id="${toy.id}">Delete</button>
  </div>`
   })
   toyCollection.innerHTML = toysHTML.join('')
})


// Create a new toy and POST Request
addToyForm.addEventListener('submit', (e) => {
  e.preventDefault()
  let toyName = e.target.name.value
  let toyImg = e.target.image.value

fetch(toyUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({
    name: toyName,
    image: toyImg,
    likes: 0
  })
})
.then(resp => resp.json())
.then(newToy => {
    let newToyHTML = `
      <div class="card">
        <h2>${newToy.name}</h2>
        <img src="${newToy.image}" class="toy-avatar" />
        <p>${newToy.likes} Likes </p>
        <button class="like-btn" id="${newToy.id}">Like</button>
        <br>
        <button class="delete-btn" id="${newToy.id}">Delete</button>
      </div>`
      toyCollection.innerHTML += newToyHTML
  })
})

toyCollection.addEventListener('click', (e) => {
    if (e.target.className === 'like-btn') {
      let currentLikes = parseInt(e.target.previousElementSibling.innerText)
      let newLikes = currentLikes + 1
      e.target.previousElementSibling.innerText = newLikes + ' Likes'

      fetch(`http://localhost:3000/toys/${e.target.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          likes: newLikes
        })
      })
    }
    if (e.target.className === 'delete-btn') {
      fetch(`http://localhost:3000/toys/${e.target.id}`, {
        method: 'DELETE'
      })
      .then(resp => {
        e.target.parentElement.remove()
      })
    }
  })
}) // End of DOMContentLoaded








































































