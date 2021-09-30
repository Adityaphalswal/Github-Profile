const APIURL = 'https://api.github.com/users/'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

async function getUser(username) {
    try {
        const {data} = await  axios(APIURL + username)

        createUserCard(Data)
        getRepos(username)
    } catch(err) {
        if (error.response.status == 404) {
        createErrorCard('No User with this name found')
        }
    } 
}

async function getRepos(username) {
    try {
        const {data} = await  axios(APIURL + username + '/repos?sort=created')

        addReposToCard(Data)
    } catch(err) {
        createErrorCard('Problem fetching repos')
    } 
}

function createErrorCard(msg) {
    const cardHTML = `
        <div class = "card">
            <h1> ${msg} </h1>
        </div>
    `
    main.innerHTML = cardHTML
}

function createUserCard(user) {
    const cardHTML =`
    <div class="card">
       <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
    
    <div class="user-info">
      <h2>${user.name}</h2>
      <p>${user.bio}</p>
      <ul>
        <li>${user.followers}<strong>Followers</strong></li>
        <li>${user.following}<strong>Following</strong></li>
        <li>${user.public_repos}<strong>Repos</strong></li>
      </ul>
      <div id="repos">
      </div>
    </div>
  </div>
    `

    main.innerHTML = cardHTML
}



function addReposToCard(repos) {
    const reposEl = document.getElementById('repos')

    repos
        .slice(0,5)
        .forEach(repo => {
            const repoLink = document.createElement('a')
            repoEl.classList.add('repo')
            reposEl.href= repo.html_url
            repoEl.target = '_blank'
            repoEl.innerText = repo.name

            reposEl.appendChild(repoEl)
        })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const user = search.value 

    if(user) {
        getUser(user)

        search.value = ''
    }
})