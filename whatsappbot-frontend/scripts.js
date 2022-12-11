const pages = {}

// ##################################
//         LOGIN AND SIGNUP
// ##################################
let current;

pages.loadFor = (page) => { 
  eval("pages.load_" + page + "();")
}

document.getElementById('username').addEventListener('focus', function(e) {
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

document.getElementById('password').addEventListener('focus', function(e) {
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
form.addEventListener('click', function(){
  
})