/*
User => 1.Name     => (String)
        2.Email    => (String - lowercase)
        3.Password => (bcrypt)
        4.Plans    => 1.Works     => 1.Title    => (String)
                                     2.Date     => (yyyy-mm-dd)
                                     3.Details  => 1.Title     => (String)
                                                   2.Completed => (Boolean)
                                     _____________________________                         
                      2.Reminders => 1.Title       => (String)
                                     2.Date        => (yyyy-mm-dd)
                                     3.Time        => (hh:mm)
                                     4.Description => (String)
                                     _____________________________
                      3.Expenses  => 1.Title       => (String)
                                     2.Date        => (yyyy-mm-dd)
                                     3.Amount      => ($dd)
                                     4.Description => (String)
========================================================================================
==>> Needd Schema: DetaileSchema, WorkSchema, ReminderSchema, ExpenseSchema, UserSchema
*/
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const DetailSchema = new mongoose.Schema({
    title: {
        type: String
    },
    completed: {
        type: Boolean
    }
});

const WorkSchema = new mongoose.Schema({
    title: {
        type: String
    },
    date: {
        type: String
    },
    details: [DetailSchema]
});

const ReminderSchema = new mongoose.Schema({
    title: {
        type: String
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    description: {
        type: String
    }
});

const ExpenseSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    date: {
        type: String
    },
    amount: {
        type: Number
    },
    description: {
        type: String
    }
});

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    plans: {
        works: [WorkSchema],
        reminders: [ReminderSchema],
        expenses: [ExpenseSchema]
    }
})

UserSchema.statics.login = async function({email, password}) {
    const user = await this.findOne({email})
    if (user) {
        if(await bcrypt.compare(password, user.password)) {
            return user
        } else {
            console.log(password)
            console.log(user.password)
            throw Error('Incurrect email/password')
        }
    } else {
        throw Error('Incurrect email/password')
    }
}

const User = mongoose.model('User', UserSchema, 'users')

module.exports = User