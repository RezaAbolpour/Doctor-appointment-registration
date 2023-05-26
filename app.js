const bodycard=document.getElementById("bodycard");
const idsearch=document.getElementById("search");
const reserve=document.getElementById("reserve");
const heardersearch=document.getElementById("heardersearch");
const cards=[]
async function fetchData(target) {
    try {
      const response = await fetch(`http://localhost/apidoctor.php?target=${target}`);
      const json = await response.json();
      createcard([json])
      test([json])
    } catch (error) {
      console.log('خطا در دریافت داده ها:', error);
    }
    insertCard()
  }

async function search(target,typedoctor) {
    try {
        const response = await fetch(`http://localhost/apidoctor.php?target=${target}&typedoctor=${typedoctor}`);
        const json = await response.json();
        createcard([json])
        test([json])
    } catch (error) {
        console.log('خطا در دریافت داده ها:', error);
    }
    insertCard()
}
  
fetchData("getall");

function createcard(datalist){
    while(cards.length>0){
        cards.pop()
    }
    datalist[0].forEach(item => {
        id=item["id"];
        image=item['image'];
        name=item['name']
        expertise=item['expertise']
        const card=`
        <div class="h-200px flex flex-col flex-grow-1 bg-blue-550 radius-4">
                <div class="flex-grow-1 flex justify-center">
                    <img src="${image}" alt="${image}">
                </div>
                <div class="flex-grow-1 flex justify-center color-white rtl">
                    <p>نام:</p>
                    <p>${name}</p>
                </div>
                <div class="flex-grow-1 flex justify-center color-white rtl">
                    <p>تخصص:</p>
                    <p>${expertise}</p>
                </div>
                <div class="flex-grow-1 flex justify-center">
                    <button class="radius-24 w-100px h-25px color-white bg-blue-450 border-none pointer" onclick="reservation(this)">رزرو پزشک</button>
                </div>
            </div>
        `
        cards.push(card);
        // main.insertAdjacentHTML("afterend",card);
        
      });
}

function insertCard(){
    bodycard.innerHTML=""
    let counter=0;
    let parent=undefined
    let parentarry=[]
    cards.forEach(element => {
        debugger
        if(counter==0 || counter==5){
            parent=document.createElement("div")
            parent.classList="flex h-100px headre bg-white-650 gap10px"
            counter=0
        }if(counter<=4){
            parent.innerHTML+=element
            ++counter
        }
        parentarry.push(parent)
        
    });
    parentarry.forEach(element=>{
        bodycard.append(element)
    })
}


function test(dat){
    idsearch.addEventListener("input",()=>{
        setTimeout(() => {
            search("search",idsearch.value)
        }, 1000);
        
    })
}

function reservation(event){
    reserve.style.display="block"
    bodycard.style.opacity=".35"
    heardersearch.style.opacity=".35"
}

function filtetypedoctor(event){
    search("search",event.innerHTML)

}