const params = new URLSearchParams(window.location.search)
const id = params.get('id')
try{
    const res = await fetch(`/polls?id=${id}`)
    const data = await res.json()
    renderPolls(data)
}catch(err){
    console.error(err)
}

function renderPolls(data){
 let voteHtml = `<h2>${data.question}</h2>
        <p class="muted"></p>
        <p>Results updating live</p>`
 data.options.forEach(function(option){
    voteHtml += 
        `<div>
            <button>${option.text}</button>
            <button>${option.text}</button>
            <button>${option.text}</button>
            <button>${option.text}</button>
        </div>
        `
 })
document.getElementById('container').innerHTML = voteHtml


document.getElementById('container').addEventListener('click', async function(e){
            const text = e.target.innerHTML
            try{
                await fetch('/vote',{
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: id,
                        text: text
                    })
                })
                renderBarChart(data)
            }catch(err){
                console.error(err)
            }
        })
}
function renderBarChart(data){
    let voteHtml = `<h2>${data.question}</h2>
        <p class="muted"></p>
        <p>Results updating live</p>` 

    data.options.forEach(function(option){
                            `<div>
                                <div>
                                    <p>${option.text} <span>40%</span></p>
                                    <div></div>
                                </div>
                                <div>
                                    <p>${option.text} <span>40%</span></p>
                                    <div></div>
                                </div>                                
                                <div>
                                    <p>${option.text} <span>40%</span></p>
                                    <div></div>
                                </div>                                
                                <div>
                                    <p>${option.text} <span>40%</span></p>
                                    <div></div>
                                </div>                            
                            </div>
                            `
    })
            document.getElementById('container').innerHTML = voteHtml
        }
