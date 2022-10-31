const baseUrl = "https://m2-api-living.herokuapp.com/news";

export async function getNews(page){
    try{
        const response = await fetch(`${baseUrl}?page=${page}`,{
            method: "GET"
        });
        const news = (await response.json()).news;
        return news;
    }catch(err){
        console.log(err);
    }  
}


