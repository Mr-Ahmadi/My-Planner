const checkPassword = password => {
    const checkingResult = {strengthNeeds: [], length: false}

    if (!password.match(/[0-9]+/)) checkingResult.strengthNeeds.push('number')
    if (!password.match(/[a-z]+/)) checkingResult.strengthNeeds.push('lowercase')
    if (!password.match(/[A-Z]+/)) checkingResult.strengthNeeds.push('uppercase')
    if (password.length >= 8 && password.length <= 15) checkingResult.length = true
    if (!checkingResult.length) {
        return {validation: false, message: 'Password: Length between 8 to 15'}
    } else {
        if(checkingResult.strengthNeeds.length === 0) {
            return {validation: true}
        } else {
            let message = 'Password: require '
            for(let needed of checkingResult.strengthNeeds) {
                message += needed + ', '
            }
            message = message.substring(0, message.length - 2)
            return {validation: false, message: message}
        }
    }
}

export default checkPassword