import { getNews } from "../../scripts/api.js";
import { createNewsElement } from "../../scripts/dom.js";
import { setCategory } from "../../scripts/localStorage.js";


export async function renderNews(){
    let news = [];
    const list = document.querySelector("ul");
    list.innerHTML = ""
    if(localStorage.getItem("@Living:category")){
        news = await filterNews(localStorage.getItem("@Living:category"));        
        news.forEach(notice=>{
            const post = createNewsElement(notice);
            list.appendChild(post);
        });
    } else{
        news = await getNews(0);
        news.forEach(notice=>{
            const post = createNewsElement(notice);
            list.appendChild(post);
        });        
    }
}
renderNews();


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
            renderNews();
        })
        nav.appendChild(button);
    })
}
renderNavButton();

async function filterNews(category){
    let news = await getNews(0);
    news = [...news, ...await getNews(1), ...await getNews(2)];
    const filteredNews = news.filter(notice=>notice.category===category);
    if(category==="Todos"){
        return await getNews(0);
    } else{
        return filteredNews;
    }
}