import { getNews } from "../../scripts/api.js";
import { setCategory } from "../../scripts/localStorage.js";
import { createFullNewsElement } from "../../scripts/dom.js";


function homeButton(){
    const button = document.getElementById("homeButton");
    button.addEventListener("click",()=>{
        localStorage.removeItem("@Living:category");
        window.location.replace("/pages/home/index.html");
    })
}
homeButton();

async function findNotice(id){
    let news = await getNews(0);
    news = [...news, ...await getNews(1), ...await getNews(2)];
    const notice = news.find(notice=>notice.id===id);
    return notice;   
}

async function renderFullNew(){
    const main = document.querySelector("main");
    main.innerHTML = "";
    const notice = await findNotice(localStorage.getItem("@Living:postId"));
    const post = createFullNewsElement(notice);
    main.appendChild(post);
}
renderFullNew();

async function renderNavButton(){
    const nav = document.querySelector("nav");
    let news = await getNews(0);
    news = [...news, ...await getNews(1), ...await getNews(2)];
    let categories = ["Todos"];
    news.forEach(notice=>{
        if(!categories.find(category=>category===notice.category)){
            categories.push(notice.category);
        }
    })
    categories.forEach(category=>{
        const button = document.createElement("button");
        button.className = "button-grey font-4-semibold";
        button.innerText = category;
        button.addEventListener("click",async ()=>{
            setCategory(category);
            window.location.replace("/pages/home/index.html");
        })
        nav.appendChild(button);
    })
}
renderNavButton();


