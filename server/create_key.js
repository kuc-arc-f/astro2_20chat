
/*
Key create 
*/
const rand = Number(Math.random() * 1000000);
const s = Date.now() + "-" + String(parseInt(rand));

console.log("key=", s);
