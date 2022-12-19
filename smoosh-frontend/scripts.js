const smoosh = {}
const base_url = "http://localhost:8000/api"

// ##################################
//         POST AND GET APIS
// ##################################

smoosh.postAPI = async(api_url, api_data, api_token = null) => {  
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

smoosh.getAPI = async(api_url) => { 

  try{

      return await axios(api_url)

  }catch(error){

      console.log("Error from linking (GET)", error)
  }
}

smoosh.loadFor = (page) => { 
  eval("smoosh.load_" + page + "();")
}

// ##################################
//         LOGIN AND SIGNUP
// ##################################
let current;
const username = document.getElementById('username')
const password = document.getElementById('password')
const form = document.getElementById('submit')
const num = document.getElementById('no')


smoosh.load_login = () =>{
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
        const resp = await smoosh.postAPI(api_url, formData)
        if(resp){
          console.log(resp)

        }
        else{
          const txt = document.querySelector(".eula")
          txt.innerHTML = "INCORRECT USERNAME OR PASSWORD!"
        }

    })
    
}

smoosh.load_signup = () => {

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
      const resp = await smoosh.postAPI(api_url, formData)
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
//         Calculate Distance 
// ##################################
smoosh.computeDistance = (latitude, longitude) =>{
  const lat = localStorage.getItem("latitude") - latitude
  const long = localStorage.getItem("longitude") - longitude
  return Math.round(Math.sqrt(lat * lat + long * long))
}

// ##################################
//         GET LOCATION 
// ##################################
smoosh.location = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      localStorage.setItem("latitude", position.coords.latitude)
      localStorage.setItem("longitude", position.coords.longitude)
      smoosh.postAPI(
        "/location/update",
        { latitude: position.coords.latitude, longitude: position.coords.longitude },
        localStorage.getItem("access_token"),
      )
    })
  } else {
    console.log("Geo Location is not supported by this browser.");
  }
}



// ##################################
//         LANDING PAGE
// ##################################

smoosh.load_landing = () => {
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
