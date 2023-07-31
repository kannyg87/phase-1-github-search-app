
function searchUser() {
    const form = document.querySelector('#github-form');
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.querySelector('#search').value;
      const ul = document.getElementById('user-list');
      const ulUser = document.querySelector('#repos-list')
      fetch(`https://api.github.com/search/users?q=${input}`, {
        method: 'GET',
        headers: {
          Accept: 'application/vnd.github.v3+json'
        },
      })
        .then(res => res.json())
        .then(data => {
          data.items.forEach(element => {
            let username = element.login;
            let avatar = element.avatar_url;
            let profile = element.url;

            ul.innerHTML += `<p>${username}</p>
            <a href ="${profile}">Profile</a>
            <li><img src="${avatar}" alt="${username}"></li>`
            ;

            let p = document.getElementsByTagName('p')
            for (let i =0; i<p.length; i++){
               let username = p[i]
               username.addEventListener('click',function(){
                fetch(`https://api.github.com/users/${username.textContent}/repos`,{
                    method: 'GET',
                    headers: {
                      Accept: 'application/vnd.github.v3+json'
                    }})
                .then(res=>res.json())
                .then(data=>{
                    data.forEach(el=>{
                        const name = el.name
                        ulUser.textContent += name
                    })

                })
               })
            }
            
          });
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
  
      form.reset();
    });
  }
  
  document.addEventListener('DOMContentLoaded', searchUser);
  