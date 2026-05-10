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
 let voteHtml = ''
 voteHtml += `<h2>${data.question}</h2>
        <p class="muted"></p>
        <p>Results updating live</p>
        <div>
            <button>${data.option1.text}</button>
            <button>${data.option2.text}</button>
            <button>${data.option3.text}</button>
            <button>${data.option4.text}</button>
        </div>
        `
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
            let voteHtml = ''
                voteHtml += `<h2>${data.question}</h2>
                            <p class="muted"></p>
                            <p>Results updating live</p>
                            <div>
                                <div>
                                    <p>${data.option1.text} <span>40%</span></p>
                                    <div></div>
                                </div>
                                <div>
                                    <p>${data.option2.text} <span>40%</span></p>
                                    <div></div>
                                </div>                                
                                <div>
                                    <p>${data.option3.text} <span>40%</span></p>
                                    <div></div>
                                </div>                                
                                <div>
                                    <p>${data.option4.text} <span>40%</span></p>
                                    <div></div>
                                </div>                            
                            </div>
                            `
            document.getElementById('container').innerHTML = voteHtml
        }
