import checkPassword from './checkPassword'
import checkEmail from './checkEmail'

const selector = document.querySelector.bind(document)

const checkValue = el => {
    if (el) {
        if (el.value) 
            return el.value
        else 
            return null
    } else {
        return false
    }
}

const checkUser = setRequesting => {
    const name = checkValue(selector('#name'))
    const email = checkValue(selector('#email'))
    const password = checkValue(selector('#password'))
    const rePassword = checkValue(selector('#rePassword'))
    let user = {name, email, password}
    Object.keys(user).forEach(key => 
        user[key] === false && delete user[key]
    )
    selector('#status').classList = 'text-danger'
    setRequesting(true)
    for (const attribute in user) {
        if (user[attribute] === null) {
            selector('#status').innerHTML = 'All fields are required'
            setRequesting(false)
            return false
        }
    }
    if (!checkEmail(email)) {
        selector('#status').innerHTML = 'Email is not valid' 
        setRequesting(false)
        return false
    }
    if (rePassword !== false) {
        if (rePassword !== password) {
            selector('#status').innerHTML = 'Passwords do not match'
            setRequesting(false)
            return false
        }
    }
    if ((!checkPassword(password).validation) && name) {
        selector('#status').innerHTML = checkPassword(password).message
        setRequesting(false)
        return false
    }
    selector('#status').innerHTML = '' 
    return user
}

export default checkUser