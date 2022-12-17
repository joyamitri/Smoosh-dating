const pages = {}
const base_url = "http://localhost:8000/api"

// ##################################
//         POST AND GET APIS
// ##################################

pages.postAPI = async(api_url, api_data, api_token = null) => {  
  try {
      return await axios.post(
          api_url, 
          api_data,
          {
              headers:{
                  'Authorization': "Bearer" + localStorage.getItem(api_token)
              }
          }
      )
  } catch (error) {
      console.log("Error from linking (POST)", error)
  }
  
}

pages.getAPI = async(api_url) => { 

  try{

      return await axios(api_url)

  }catch(error){

      console.log("Error from linking (GET)", error)
  }
}

pages.loadFor = (page) => { 
  eval("pages.load_" + page + "();")
}

// ##################################
//         LOGIN AND SIGNUP
// ##################################
let current;
const username = document.getElementById('username')
const password = document.getElementById('password')
const form = document.getElementById('submit')
const num = document.getElementById('no')


pages.load_login = () =>{
    const api_url = base_url + "/auth/login"

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
    
    form.addEventListener('click', async function(){
        const formData = new FormData()
        const user = username.value
        const pass = password.value
        formData.append("username", user)
        formData.append("password", pass)
        const resp = await pages.postAPI(api_url, formData)
        if(resp){
          console.log(resp)

        }
        else{
          const txt = document.querySelector(".eula")
          txt.innerHTML = "INCORRECT USERNAME OR PASSWORD!"
        }

    })
    
}

pages.load_signup = () => {

  const api_url = base_url + "/auth/register"

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

    num.addEventListener('focus', function(e){
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

    password.addEventListener('focus', function(e) {
      if (current) current.pause()
      current = anime({
        targets: 'path',
        strokeDashoffset: {
        value: -668,
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

    form.addEventListener('click', async function(){
      const formData = new FormData()
      const user = username.value
      const pass = password.value
      const numb = num.value
      formData.append("username", user)
      formData.append("password", pass)
      formData.append("phone_number", numb)
      const resp = await pages.postAPI(api_url, formData)
      if(resp){
        console.log(resp)

      }
      else{
        const txt = document.querySelector(".eula")
        txt.innerHTML = "INCORRECT USERNAME OR PASSWORD!"
      }

  })
}


// ##################################
//         LANDING PAGE
// ##################################

pages.load_landing = () => {
  let sky = document.querySelectorAll('.cloud')
  let btn = document.querySelector('.btn')
  window.addEventListener('scroll', function(){
    const value = window.scrollY
    for(let i = 0; i < sky.length; i++){
      sky[i].style.opacity = "calc(1 - " + value + ")"
      
    }
    btn.style.marginTop = value * 1.5 + 'px'
})
}
