let addToy = false;
toyUrl = 'http://localhost:3000/toys'
const toyCollection = document.querySelector('#toy-collection')



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
  })

getToys(toyUrl)

  function getToys(url) {
    fetch(url)
    .then(resp => resp.json())
    .then(data => data.forEach(makeToy))
  }


function makeToy(toy) {
  const cardDiv = document.createElement('div')
  const toysName = document.createElement('h2')
  const toyImg = document.createElement('img')
  const p = document.createElement('p')
  const btn = document.createElement('button')
  cardDiv.className = 'card'
  toyImg.className = 'toy-avatar'
  toysName.innerHTML = toy.name
  toyImg.src = toy.image
  p.innerHTML = `${toy.likes} likes`
  btn.id = `${toy.id}` 
  btn.textContent = 'Like'
  btn.className = 'like-btn'
  toyCollection.append(cardDiv)
  cardDiv.append(toysName, toyImg, p, btn)
}

let inputName = document.querySelectorAll('.input-text')[0]
let inputImg = document.querySelectorAll('.input-text')[1]
let toyForm = document.querySelector('.add-toy-form')

toyForm.addEventListener('submit', renderToy)

function renderToy(e) {
  e.preventDefault()

  fetch(toyUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: inputName.value, 
      image: inputImg.value,
      likes: 0
    })
  }) 
  .then(res => res.json())
  .then(data => makeToy(data))
 }

toyCollection.addEventListener('click', (e) => {
   if(e.target.className === 'like-btn'){
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
  })
}) // End of DOMContentLoaded















































