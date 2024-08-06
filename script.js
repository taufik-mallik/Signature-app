
const colorpicker = document.getElementById("colorPicker");
const canvascolor =document.getElementById("canvasColor");
const canvas= document.getElementById("myCanvas");
const clareBtn = document.getElementById("clareBtn");
const saveBtn = document.getElementById("saveBtn");
const retrieveBtn = document.getElementById("retrieveBtn");
const fontPicker = document.getElementById("fontSize");

let ctx = canvas.getContext("2d");

colorpicker.addEventListener("change",(e) => {
    ctx.strokeStyle=e.target.value;
    ctx.fillStyle=e.target.value;
})

canvas.addEventListener("mousedown",(e)=>{
 isDrawing = true;
 lastX= event.offsetX;
 lastY = event.offsetY;
})

canvas.addEventListener("mousemove",(e)=>{
    if(isDrawing){
        ctx.beginPath();
        ctx.moveTo(lastX,lastY);
        ctx.lineTo(event.offsetX,event.offsetY);
        ctx.stroke();
        lastX= event.offsetX;
        lastY = event.offsetY;
    }
})

canvas.addEventListener("mouseup" , ()=>{
    isDrawing = false;
})

canvascolor.addEventListener("change",(e)=>{
    ctx.fillStyle=e.target.value;
    ctx.fillRect(0,0,800,500);
})

fontPicker.addEventListener("change",()=>{
    ctx.lineWidth=event.target.value;
})

clareBtn.addEventListener("click",()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
})

saveBtn.addEventListener("click",()=>{
    localStorage.setItem("canvasContent",canvas.toDataURL());
    let link = document.createElement("a");
    link.download="my-signature.png";
    link.href=canvas.toDataURL();
    link.click();
})

retrieveBtn.addEventListener("click",()=>{
  let savedData = localStorage.getItem("canvasContent");
  if(savedData){
    let img = new Image();
    img.src = savedData;
    ctx.drawImage(img,0,0);
  }
})