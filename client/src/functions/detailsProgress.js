const detailsProgress = details => {
    let status = {completed: 0, all: 0}
    for (const detail of details) {
        detail.completed 
        && (status.completed += 1) 
        status.all += 1
    }
    return (status.completed / status.all) * 100
}

export default detailsProgress