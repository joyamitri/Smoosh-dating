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
                  'Authorization': `Bearer ${api_token}`
              }
          }
      )
  } catch (error) {
      console.log("Error from linking (POST)", error)
  }
  
}

smoosh.getAPI = async(api_url, api_token=null) => { 

  try{

      return await axios(api_url,{
        headers:{
            'Authorization': `Bearer ${api_token}`
        }
    })

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
const email = document.getElementById('email')


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
          localStorage.setItem("account_jwt", resp.data.access_token)
          window.location.replace("./Landing-page.html")
        }
        else{
          const txt = document.querySelector(".eula")
          txt.innerHTML = "INCORRECT USERNAME OR PASSWORD!"
        }

    })

    sign.addEventListener('click', function(){
      window.location.replace('./Signup.html')
    })
    
}

smoosh.load_signup = () => {
  const log = document.getElementById('log')
  const sign = document.getElementById('sign')

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

    email.addEventListener('focus', function(e){
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
      const mail = email.value
      formData.append("username", user)
      formData.append("password", pass)
      formData.append("email", mail)
      const resp = await smoosh.postAPI(api_url, formData)
      if(resp){
        window.location.replace("./login.html")
      }
      else{
        const txt = document.querySelector(".eula")
        txt.innerHTML = "INCORRECT USERNAME OR PASSWORD!"
      }

  })

  log.addEventListener('click', function(){
    window.location.replace('./login.html')
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
        localStorage.getItem("account_jwt"),
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
  const homeBtn = document.getElementById('home')
const browseBtn = document.getElementById('browse')
const chatBtn = document.getElementById('chat')
const accountBtn = document.getElementById('account')

homeBtn.addEventListener('click', function(){
  window.location.replace('./Landing-page.html')
})
browseBtn.addEventListener('click',function(){
  window.location.replace('./Browse.html')
})
chatBtn.addEventListener('click', function(){
  window.location.replace('./chat.html')
})
accountBtn.addEventListener('click', function(){
  window.location.replace('./account.html')
})
  const startBtn = document.getElementById('startBTN')
  let sky = document.querySelectorAll('.cloud')
  let btn = document.querySelector('.btn')
  startBtn.addEventListener('click', function() {
    window.location.replace("./Browse.html")
  })
  window.addEventListener('scroll', function(){
    const value = window.scrollY
    for(let i = 0; i < sky.length; i++){
      sky[i].style.opacity = "calc(1 - " + value + ")"
      
    }
    btn.style.marginTop = value * 1.5 + 'px'
  })

}

// ##################################
//         BROWSE PAGE
// ##################################



smoosh.load_browse = async () =>{
  const homeBtn = document.getElementById('home')
const browseBtn = document.getElementById('browse')
const chatBtn = document.getElementById('chat')
const accountBtn = document.getElementById('account')

homeBtn.addEventListener('click', function(){
  window.location.replace('./Landing-page.html')
})
browseBtn.addEventListener('click',function(){
  window.location.replace('./Browse.html')
})
chatBtn.addEventListener('click', function(){
  window.location.replace('./chat.html')
})
accountBtn.addEventListener('click', function(){
  window.location.replace('./account.html')
})
  const api_url = base_url + "/auth/users/all"
  // console.log(localStorage.getItem('account_jwt'))
  const users = await smoosh.getAPI(api_url, localStorage.getItem('account_jwt'))
  

  let swiper = new Swiper('.blog-slider', {
    spaceBetween: 30,
    effect: 'fade',
    loop: true, 
    mousewheel: {
      invert: false,
    },
    pagination: {
      el: '.blog-slider__pagination',
      clickable: true,
    }
  })
  const prof = document.getElementById('content')
  for(let i = 0; i < users.data.data.length; i++){
    prof.innerHTML += 
    `<div class="blog-slider__item swiper-slide">
        <div class="blog-slider__img">
          
          <img src="./assets/${users.data.data[i].picture_url}" alt="">
        </div>
        <div class="blog-slider__content">
          <span class="blog-slider__code">Distance: ${smoosh.computeDistance(users.data.data[i].latitude, users.data.data[0].longitude)}</span>
          <div class="blog-slider__title">${users.data.data[i].username}</div>
          <div class="blog-slider__text">About: ${users.data.data[i].about}
          <br>Status: ${users.data.data[i].status}</div>
          <a href="#" class="blog-slider__button">READ MORE</a>
        </div>
      </div>`
  }
}
smoosh.load_account = async() => {
  const prof = document.getElementById('main-window')
  const api_url = base_url + "/auth/user-profile"
  const homeBtn = document.getElementById('home')
  const browseBtn = document.getElementById('browse')
  const chatBtn = document.getElementById('chat')
  const accountBtn = document.getElementById('account')
  const tkn = localStorage.getItem('access_jwt')
  const user = await smoosh.getAPI(api_url, tkn)
  console.log(user)
  // homeBtn.addEventListener('click', function(){
  //   window.location.replace('./Landing-page.html')
  // })
  // browseBtn.addEventListener('click',function(){
  //   window.location.replace('./Browse.html')
  // })
  // chatBtn.addEventListener('click', function(){
  //   window.location.replace('./chat.html')
  // })
  // accountBtn.addEventListener('click', function(){
  //   window.location.replace('./account.html')
  // })
  // document.getElementById("add-btn").onclick = async () => {
  //   let newState = {
  //     username: document.getElementById("username").value,
  //     email: document.getElementById("email").value,
  //     about: document.getElementById("about").value,
  //     status: document.getElementById("description").value,
  //     interest: document.getElementById("interested").value,
  //     gender: document.getElementById("gender").value,
  //   }
  //   let res = await smoosh.postAPI(
  //     "/update_user",
  //     newState
  //   );
  //   if (res.data)
  //     localStorage.setItem("friendooUser", JSON.stringify(res.data.data))
  // }
}
 




