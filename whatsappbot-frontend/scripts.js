const pages = {}
const base_url = "http://localhost:8000/api"

// ##################################
//         LOGIN AND SIGNUP
// ##################################
let current;
const username = document.getElementById('username')
const password = document.getElementById('password')

pages.loadFor = (page) => { 
  eval("pages.load_" + page + "();")
}

pages.load_login = () =>{
    const api_url = base_url + "/login"

    username.addEventListener('focus', function(e) {
        if (current) current.pause()
        current = anime({
            targets: 'path',
            strokeDashoffset: {
            value: 0,
            duration: 700,
            easing: 'easeOutQuart'
            },
            strokeDasharray: {
            value: '240 1386',
            duration: 700,
            easing: 'easeOutQuart'
            }
        })
    })
    
    password.addEventListener('focus', function(e) {
        if (current) current.pause()
        current = anime({
          targets: 'path',
          strokeDashoffset: {
            value: -336,
            duration: 700,
            easing: 'easeOutQuart'
          },
          strokeDasharray: {
            value: '240 1386',
            duration: 700,
            easing: 'easeOutQuart'
          }
        })
    })
    
    document.getElementById('submit').addEventListener('focus', function(e) {
        if (current) current.pause()
        current = anime({
          targets: 'path',
          strokeDashoffset: {
            value: -730,
            duration: 700,
            easing: 'easeOutQuart'
          },
          strokeDasharray: {
            value: '530 1386',
            duration: 700,
            easing: 'easeOutQuart'
          }
        })
    })
    
    const form = document.getElementById('sign')
    form.addEventListener('click', async function(){
        const formData = new FormData()
        const user = username.value
        const pass = password.value
        formData.append("username", user)
        formData.append("password", pass)
        const resp = await axios.postAPI(api_url, formData)
    })
    
}

pages.postAPI = async(api_url, api_data, api_token = null) => {  
    try {
        return await axios.post(
            api_url, 
            api_data,
            {
                headers:{
                    'Authorization': "token" + api_token
                }
            }
        )
    } catch (error) {
        console.log("Error from linking (POST)", error);
    }
    
}

// ##################################
//         LANDING PAGE
// ##################################

let sky = document.querySelectorAll('.cloud')
let txt = document.querySelector('text')
window.addEventListener('scroll', function(){
  const value = window.scrollY
  for(let i = 0; i < sky.length; i++){
    sky[i].style.left = sky[i].getBoundingClientRect().left + value * 0.025 + 'px'
  }

})


