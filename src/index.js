
let addToy = false;

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

  const toyCollection = document.querySelector('#toy-collection');
  const form = document.querySelector('.add-toy-form')

  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(toys =>{
    toys.forEach(toy =>{
      //debugger
      toyCollection.innerHTML += toyIndex(toy)
    })
  })

  function toyIndex(toy){
    return `<div class='card'>
      <h2>${toy.name}</h2>
      <img src=${toy.image} class='toy-avatar'>
      <p>${toy.likes} likes</p>
      <button class='like-btn' data-id=${toy.id}>Like</button>
    </div>`
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = {
      name: event.target['name'].value,
      image: event.target['image'].value,
      likes: 0
    }

    event.target.reset()

    const reqObj = {
      method: 'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify(formData)
    }

    fetch('http://localhost:3000/toys', reqObj) 
    .then(resp => resp.json())
    .then(toy => {
      console.log(toy)
      toyCollection.innerHTML += toyIndex(toy)
    })
  })

  function increaseLikes() {
    toyCollection.addEventListener('click', function(event){
      if (event.target.className === 'like-btn'){
         let likeCount = event.target.previousElementSibling.innerText.split(' ');
         likeCount = likeCount[0] 
         //debugger 
        const formData = {
          likes: ((parseInt(likeCount) )+ 1) 
        }
    
        const configObj = {
          method: 'PATCH',
          headers:{
            'Content-Type':'application/json',
          },
          body: JSON.stringify(formData)
          }

          let id = `${parseInt(event.target.dataset.id)}`
    
          fetch(`http://localhost:3000/toys/${id}`, configObj)
          .then(resp => resp.json())
          .then(json => event.target.previousElementSibling.innerText = `${parseInt(likeCount) + 1} likes`)
      }
    }) 
  
  }
  increaseLikes()



});