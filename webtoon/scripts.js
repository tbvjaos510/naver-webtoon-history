var webtoon;
chrome.storage.sync.get(["webtoon"], (data) => {
    if (!data){

    } else {
        webtoon=data.webtoon;
    
    }
})
var wtime = [];
function getWebtoons(){
    var wkey = Object.keys(webtoon)
    var wdata = Object.values(webtoon)

    for(var i=0; i<wdata.length; i++){
        for(var data of wdata[i].no){
            wtime.push({id:wkey[i], name:wdata[i].name, lastVisit:data.lastVisit, no:data.no})
        }
    }
}
function sortTime(){
    wtime.sort((a, b)=>{
        if (a.lastVisit < b.lastVisit)
            return 1
        else
            return -1
        return 0
    })
}