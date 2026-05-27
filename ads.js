import { db } from "./firebase.js";

import {
collection,
getDocs,
query,
orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// 🔥 جميع الإعلانات
let allAds = [];


// 🔥 العنصر الأساسي
const container = document.getElementById("adsContainer");


// 🚀 تحميل الإعلانات
async function loadAds(){

try{

// ترتيب من الأحدث
const q = query(
collection(db,"ads"),
orderBy("createdAt","desc")
);

const snap = await getDocs(q);


// تنظيف المصفوفة
allAds = [];


// إدخال البيانات
snap.forEach((docItem)=>{

allAds.push({
id: docItem.id,
...docItem.data()
});

});


// عرض الإعلانات
renderAds(allAds);

}
catch(error){

console.log(error);

container.innerHTML = `
<div class="empty">
حدث خطأ أثناء تحميل الإعلانات
</div>
`;

}

}


// 🔥 عرض الإعلانات
function renderAds(ads){

// لا توجد إعلانات
if(ads.length === 0){

container.innerHTML = `
<div class="empty">
لا توجد إعلانات حالياً
</div>
`;

return;

}


// إنشاء HTML
let html = "";

ads.forEach(ad => {

html += `

<div class="card">

<img
loading="lazy"
src="${
ad.image ||
'https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=1200&auto=format&fit=crop'
}"
onerror="this.src='https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=1200&auto=format&fit=crop'"
>

<div class="content">

<h3>
${ad.title || "بدون عنوان"}
</h3>

<p>
${ad.description || ""}
</p>

<div class="meta">

<span>
💰 ${ad.budget || 0}$
</span>

<span>
📢 ${ad.type || "إعلان"}
</span>

</div>

<div class="user">
👤 ${ad.userName || "مستخدم"}
</div>

<button
class="btn"
onclick="openChat('${ad.userId}')"
>
💬 تواصل مع المعلن
</button>

</div>

</div>

`;

});


// عرض البيانات
container.innerHTML = html;

}


// 🔍 البحث
window.searchAds = function(){

const text = document
.getElementById("searchInput")
.value
.trim()
.toLowerCase();


// فلترة
const filtered = allAds.filter(ad => {

return (

(ad.title || "")
.toLowerCase()
.includes(text)

||

(ad.description || "")
.toLowerCase()
.includes(text)

||

(ad.type || "")
.toLowerCase()
.includes(text)

);

});


// إعادة العرض
renderAds(filtered);

}


// 💬 فتح الشات
window.openChat = function(uid){

if(!uid){

alert("لا يوجد صاحب إعلان");
return;

}


// منع فتح شات لنفسك
if(uid === localStorage.getItem("userId")){

alert("هذا إعلانك");
return;

}

window.location.href = "chat.html?uid=" + uid;

}


// ➕ صفحة النشر
window.goCreate = function(){

window.location.href = "create-ads.html";

}


// 👤 صفحة الحساب
window.goProfile = function(){

window.location.href = "profile.html";

}


// 🚀 تشغيل الصفحة
loadAds();