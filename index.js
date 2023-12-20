let btn=document.getElementById("customButton");
btn.addEventListener('click',function(){
    window.location.href="./webpages/customers/customer.html";
})

function setAbout(){
    let aboutNav=document.getElementById('about-nav');
    aboutNav.classList.add('active');
    let homeNav = document.getElementById('home-nav');
    homeNav.classList.remove('active');
}

function setHome(){
    let aboutNav=document.getElementById('about-nav');
    aboutNav.classList.remove('active');
    let homeNav = document.getElementById('home-nav');
    homeNav.classList.add('active');
}