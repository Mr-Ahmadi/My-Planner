const cookies = require('js-cookie');
const { default: checkPassword } = require('../validators/checkPassword');

const selector = document.querySelector.bind(document)

module.exports.checkAuth = async setAppState => {
    if(cookies.get('jwt')) {
        try {
            const res = await fetch(`http://localhost:4000/user/checkauth`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            if (res.status === 200) {
                setAppState({auth: true, user: (await res.json()).user})
            } else {
                setAppState({auth: false, user: null})
            }
        } catch (err) {
            setAppState({auth: undefined, user: null})
        }
    } else {
        setAppState({auth: false, user: null})
    }
}
module.exports.signUp = async (user, navigate, setRequesting) => {
    try {
        const res = await fetch(`http://localhost:4000/user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
            credentials: 'include'
        })
        const {message} = await res.json()
        if (res.status === 201) {
            navigate('/signin', {state: {navigateMessage: message}})
            setRequesting(false)
        } else {
            selector('#status').innerHTML = message
            setRequesting(false)
        }
    } catch (err) {
        selector('#status').innerHTML = 'Connection refused!' 
        setRequesting(false)
    }
}
module.exports.signIn = async (user, navigate, setAppState, setRequesting) => {
    try {
        const res = await fetch(`http://localhost:4000/user/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
            credentials: 'include'
        })
        const {message} = await res.json()
        if (res.status === 200) {
            navigate('/', {state: {navigateMessage: message}})
            this.checkAuth(setAppState)
            setRequesting(false)
        } else {
            selector('#status').innerHTML = message
            setRequesting(false)
        }
    } catch (err) {
        selector('#status').innerHTML = 'Connection refused!' 
        setRequesting(false)
    }
}
module.exports.signOut = async (navigate, setAppState) => {
    cookies.remove('jwt');
    this.checkAuth(setAppState);
    navigate('/signin');
}
module.exports.deleteAccount = async (navigate, setAppState) => {
    try {
        const res = await fetch(`http://localhost:4000/user/deleteaccount`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        const {message} = await res.json()
        
        if (res.status === 202) {
            this.checkAuth(setAppState)
            cookies.remove('jwt');
            navigate('/signup', {state: {navigateMessage: message}})
        } else {
            alert(message)
        }
    } catch (err) {
        console.log(err)
        alert('Connection refused!')
    }
}

module.exports.editPassword = async (resetModal, setRequesting) => {
    setRequesting(true)
    const oldPassword = selector('#oldPass').value
    const newPassword = selector('#newPass').value
    const reNewPassword = selector('#reNewPass').value
    if (newPassword === reNewPassword) {
        if (checkPassword(newPassword).validation) {
            selector('#status').innerHTML = ''
            try {
                const res = await fetch('http://localhost:4000/user/changepass',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({oldPassword, newPassword})
                })
                //const {message} = await res.json()
                if (res.status === 200) {
                    //changed successful
                    setRequesting(false)
                    resetModal();
                } else {
                    const {message} = await res.json()
                    setRequesting(false)
                    selector('#status').innerHTML = `- ${message}`
                }
            } catch (err) {
                setRequesting(false)
                selector('#status').innerHTML = `- Error while requesting`
            }
        } else {
            setRequesting(false)
            selector('#status').innerHTML = `- ${checkPassword(newPassword).message}`
        }
    } else {
        setRequesting(false)
        selector('#status').innerHTML = '- Passwords do not match'
    }
}