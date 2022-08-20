
const navMenuIcon = document.querySelector('.menu-icon');
const navMenu = document.querySelector('.nav-links');
const sections = document.querySelectorAll('section');
const navbarUl = document.querySelector('nav ul');
const nav = document.querySelector('nav');
const scrolUp = document.querySelector('.scroll-up');

// show and hide nav list
navMenuIcon.addEventListener('click',()=>{
    navMenu.classList.toggle('toggle-nav-menu');
});

// click to scroll top
scrolUp.addEventListener('click',()=>{
    window.scrollTo({
        top:0,
        behavior:'smooth'
    })
});


//  add li to navbar ul everytime new section is added 
function addToNavBar(){
    const navUl = document.querySelector('.navbar ul')
    const fragment = document.createDocumentFragment();
    for(let i=0; i<sections.length; i++){
      const li = document.createElement('li');
        li.textContent = sections[i].firstElementChild.textContent;
        li.setAttribute('data-section-index',i)
        fragment.appendChild(li)
    }
    navUl.appendChild(fragment)
};
addToNavBar();


// automatically change the direction of the section
function changeSectionDirection(){
    for(let i=1; i<sections.length; i+=2){

            sections[i].style.direction='rtl'
     }
};
changeSectionDirection()

// toggle navbar menu and scroll to target section
navbarUl.addEventListener('click',(e)=>{
    const index = e.target.getAttribute('data-section-index');
    navMenu.classList.toggle('toggle-nav-menu');
    sections[index].scrollIntoView({behavior:'smooth',block:'start'});
})


window.addEventListener('scroll',function(){

    const navLi = document.querySelectorAll('nav li');

    sections.forEach((sec,i)=>{

        if(window.scrollY>=sec.offsetTop-140 && window.scrollY<( sec.offsetTop-150 + sec.offsetHeight)){

           nav.style.transform='';  // make navbar slides up when scroll

           showNav();  // slide down navbar on scroll

           hideNav();  //  make navbar slides up after 3seconds 

           scrolUp.style.display='block';  //show scroll up button
            
            removeClass(sections,'active-section'); // remove active section from all sections

            sec.classList.add('active-section'); // apply active section style for the scrolled section

            removeClass(navLi,'nav-active');  // remove active navbar li from all the list

            navLi[i].classList.add('nav-active');  // apply active navbar style for the li that scroll to scrolled section

        }
        else if(window.scrollY<sections[0].offsetTop-140){
            
            scrolUp.style.display='none';  //hide scroll up button

            nav.style.transform='translateY(0)'; // show navbar 

            removeClass(navLi,'nav-active');  // remove active navbar li from all the list

            removeClass(sections,'active-section');  // remove active section from all sections
        }
        
    });
   
});

// to remove active class from wanted nodlist
function removeClass(nodeList,className){
    nodeList.forEach((ele)=>ele.classList.remove(className));
};


function hideNav(){
   setTimeout(()=>nav.classList.add('hide-nav'),4000) 
   
};

function showNav(){
    nav.classList.remove('hide-nav');
   };