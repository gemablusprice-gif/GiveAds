import { auth, db } from "./firebase.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
doc,
getDoc,
setDoc,
updateDoc,
arrayUnion,
increment
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


let userId = null;

// =====================
onAuthStateChanged(auth, async (user) => {
if (!user) {
window.location.href = "login.html";
return;
}

userId = user.uid;

const ref = doc(db, "users", userId);
const snap = await getDoc(ref);

if (!snap.exists()) {
await setDoc(ref, {
balance: 5,
transactions: []
});
}

loadBalance();
loadTransactions();
});

// =====================
async function loadBalance(){
const ref = doc(db, "users", userId);
const snap = await getDoc(ref);

document.getElementById("balance").innerText =
snap.data().balance + "$";
}

// =====================
window.addMoney = async function(){
const ref = doc(db, "users", userId);

await updateDoc(ref, {
balance: increment(10),
transactions: arrayUnion({
type: "add",
amount: 10,
date: Date.now()
})
});

loadBalance();
loadTransactions();
};

// =====================
window.withdrawMoney = async function(){
const ref = doc(db, "users", userId);
const snap = await getDoc(ref);

let balance = snap.data().balance;

if(balance <= 0){
alert("لا يوجد رصيد كافي");
return;
}

await updateDoc(ref, {
balance: balance - 5,
transactions: arrayUnion({
type: "withdraw",
amount: 5,
date: Date.now()
})
});

loadBalance();
loadTransactions();
};

// =====================
async function loadTransactions(){
const ref = doc(db, "users", userId);
const snap = await getDoc(ref);

let data = snap.data().transactions || [];

document.getElementById("transactions").innerHTML =
data.slice(-10).reverse().map(t => `
<div class="transaction">
<span>${t.type === "add" ? "💰 إضافة رصيد" : "📉 سحب رصيد"}</span>
<span>${t.type === "add" ? "+" : "-"}${t.amount}$</span>
</div>
`).join("");
}

// =====================
window.goHome = function(){
window.location.href = "index.html";
}