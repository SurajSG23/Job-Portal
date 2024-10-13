let sign_in_btn=document.getElementsByClassName("sign-in")[0];
let sign_up_btn=document.getElementsByClassName("sign-up")[0];
let sign_up_section=document.getElementsByClassName("sign-section")[0]
let sign_in_section=document.getElementsByClassName("sign-section-2")[0]


sign_in_btn.addEventListener("click",()=>{
    sign_up_section.style.visibility="hidden";
    sign_in_section.style.visibility="visible";
})

sign_up_btn.addEventListener("click",()=>{
    sign_in_section.style.visibility="hidden";
    sign_up_section.style.visibility="visible";
})
