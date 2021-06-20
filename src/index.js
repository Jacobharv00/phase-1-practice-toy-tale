let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn")
  const toyForm = document.querySelector(".container") 
  const toyCollection = document.querySelector('#toy-collection') // Div element where all toys live
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  })

// Get Request to fetch all the toys
fetch('http://localhost:3000/toys')
.then(resp => resp.json())
.then(toys => {
  let toysData = toys.map(function(toy) {
    return `
    <div class="card">
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn" id="${toy.id}">Like <3</button>
  </div> `
  })
  toyCollection.innerHTML = toysData.join('')
})

// EventListener for the form & POST Request
toyForm.addEventListener('submit', (e) => {
  e.preventDefault()
  let toyName = e.target.name.value
  let toyImg = e.target.image.value

fetch('http://localhost:3000/toys', {
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
  let newToyEl = `
  <div class="card">
  <h2>${newToy.name}</h2>
  <img src="${newToy.image}" class="toy-avatar" />
  <p>${newToy.likes} Likes </p>
  <button class="like-btn" id="${newToy.id}">Like <3</button>
</div> `
toyCollection.innerHTML += newToyEl 
  })
})

// Event Listener for like button and PATCH Request
toyCollection.addEventListener('click', (e) => {
  if(e.target.className === 'like-btn') {
    let currentLikes = parseInt(e.target.previousElementSibling.innerText) // Take a string a make it a number
    let newLikes = currentLikes + 1 // add number to number
    e.target.previousElementSibling.innerText = newLikes + ' likes' // add the string 'likes' after updated number
    //console.log(e.target.id) // each toys id to be passed to PATCH Request
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
})


}) // End of DOMContentLoaded








































































