const checkEmail = email => {
    return email.match(
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
    )
}

export default checkEmail