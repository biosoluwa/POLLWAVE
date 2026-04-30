const form = document.querySelector('form')

form.addEventListener('submit', async (e)=>{
    e.preventDefault()
    const pollFormData = new FormData(form)
    const question = pollFormData.get('question')
    const option1 = pollFormData.get('option1')
    const option2 = pollFormData.get('option2')
    const option3 = pollFormData.get('option3')
    const option4 = pollFormData.get('option4')

    let pollObj = {}

if(question, option1, option2, option3, option4){
    pollObj = {
        question: question,
        option1: option1,
        option2: option2,
        option3: option3,
        option4: option4,
        id: crypto.randomUUID()
    }
}
    try{
    await fetch('/polls', {
        method: "POST",
        headers:{
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(pollObj)
    })
    }catch(err){
        console.error('Post request failed', err.message)
    }

    console.log(pollObj)
    await renderPolls(pollObj.id)
})


async function renderPolls(id){
    const res = await fetch(`/polls?id=${id}`)
    const data = await res.json()
    console.log(data)
       
}