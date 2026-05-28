// فتح واغلاق نافذة الرسائل

window.toggleMessages = function(){

const popup =
document.getElementById("messagesPopup");

popup.classList.toggle("show");

}


// اغلاق عند الضغط خارج الجرس

window.addEventListener("click",(e)=>{

const popup =
document.getElementById("messagesPopup");

const bell =
document.querySelector(".bell");

if(
!popup.contains(e.target) &&
!bell.contains(e.target)
){

popup.classList.remove("show");

}

});
