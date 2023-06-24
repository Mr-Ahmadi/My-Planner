module.exports.setData = async setContentState => {
    try {
        setContentState({ 
            error: null,
            loaded: '0/3'
        })
        const worksData = await (await fetch('http://localhost:4000/loadPlans/works', {method: 'GET', credentials: 'include'})).json()
        setContentState({loaded: '1/3'})
        const remindersData = await (await fetch('http://localhost:4000/loadPlans/reminders', {method: 'GET', credentials: 'include'})).json()
        setContentState({loaded: '2/3'})
        const expensesData = await (await fetch('http://localhost:4000/loadPlans/expenses', {method: 'GET', credentials: 'include'})).json()
        if(!worksData.message && !remindersData.message && !expensesData.message)
            setContentState({ 
                works: worksData,
                reminders: remindersData,
                expenses: expensesData,
                error: null,
                loaded: 'complete'
            })
    } catch (err) {
        setContentState({ 
            error: 'Can not fetch data!',
            loaded: 'complete'
        })
    }
}
module.exports.appendData = async (forTab, data, setContentState) => {
    try {
        const res = await fetch(`http://localhost:4000/addPlan/${forTab}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })
        setContentState({ error: null })
        return await res.json()
    } catch (err) {
        setContentState({error: 'Can not fetch data!'})
        return false
    }
}
module.exports.reformData = async (forTab, data, setContentState) => {
    try {
        const res = await fetch(`http://localhost:4000/updatePlan/${forTab}/${data._id}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })
        setContentState({ error: null })
        return await res.json()
    } catch (err) {
        setContentState({ error: 'Can not fetch data!' })
        return false
    }
}
module.exports.removeData = async (forTab, id, setContentState) => {
    try {
        const res = await fetch(`http://localhost:4000/deletePlan/${forTab}/${id}`, {
            method: 'POST',
            credentials: 'include'
        })
        setContentState({ error: null })
        return await res.json()
    } catch (err) {
        setContentState({ error: 'Can not fetch data!' })
        return false
    }
}