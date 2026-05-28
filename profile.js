
// 🔔 فتح وغلق صندوق الرسائل

window.toggleMessages = function(){

const popup =
document.getElementById("messagesPopup");

if(popup){

popup.classList.toggle("show");

}

};


// اغلاق عند الضغط بالخارج

window.addEventListener("click",(e)=>{

const popup =
document.getElementById("messagesPopup");

const bell =
document.querySelector(".bell");

if(!popup || !bell) return;

if(
!popup.contains(e.target) &&
!bell.contains(e.target)
){

popup.classList.remove("show");

}

});
