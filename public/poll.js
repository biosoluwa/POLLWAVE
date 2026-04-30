
async function renderPolls(id){
    const res = await fetch(`/polls?id=${id}`)
    const data = await res.json()
    // console.log(data)
}
