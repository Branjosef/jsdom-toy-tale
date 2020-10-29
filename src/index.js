let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
   main();
});

function main (){
  fetchToys();
  newToy();
  increaseLikes();
}


function fetchToys() {fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(json => toyIndex(json))
};

function toyIndex (toys) {
const toyCollection = document.getElementById('toy-collection')
toys.forEach(toy => {
  const divToyCard = document.createElement('div')
  divToyCard.className = "card"
  const toyName = document.createElement('h2')
  toyName.innerText = toy.name
  const toyImg = document.createElement('img')
  toyImg.src = toy.image
  toyImg.width = "200"
  toyImg.height = "200"
  toyImg.className = 'toy-avatar'
  const likes = document.createElement('p')
  likes.innerText = `Likes: ${toy.likes}`
  const likeBtn = document.createElement('button')
  likeBtn.className = "like-btn"
  likeBtn.innerText = "Like"
  likeBtn.dataset.btn = `${toy.id}`
  divToyCard.appendChild(toyName)
  divToyCard.appendChild(toyImg)
  divToyCard.appendChild(likes)
  divToyCard.appendChild(likeBtn)
  toyCollection.appendChild(divToyCard)
})
};


function newToy (){
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

  const button = document.querySelector('.add-toy-form')
  button.addEventListener('submit', function(event){
    event.preventDefault();
    
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
      .then(toy => renderToy(toy));

      const renderToy = (toy) => {
        const toyCollection = document.getElementById('toy-collection')
        const toyDiv = document.createElement("div")
        toyDiv.className = "card"
        toyDiv.innerHTML = `
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>Likes: ${toy.likes} </p>
        <button class="like-btn" data-bin=${toy.id}>Like</button>
        `
        toyCollection.append(toyDiv)
      }   
    });
};


function increaseLikes() {
  const toyCollectionContainer = document.getElementById('toy-collection');
  toyCollectionContainer.addEventListener('click', function(event){
     //console.log(event.target)
    if (event.target.className === 'like-btn'){
       let likeCount = event.target.previousElementSibling.innerText.split(' ');
       likeCount = likeCount[1]
      const formData = {
        likes: ((parseInt(likeCount) )+ 1) 
      }
  
      const configObj = {
        method: 'PATCH',
        headers:{
          'Content-Type':'application/json',
          // accept:'application/json'
        },
        body: JSON.stringify(formData)
        }

        let id = `${parseInt(event.target.dataset.btn)}`
        let url = `http://localhost:3000/toys/${id}`
  
        fetch(url, configObj)
        .then(resp => resp.json())
        .then(json => event.target.previousElementSibling.innerText = `Likes: ${parseInt(likeCount) + 1}`)
    }
  }) 

}


    
