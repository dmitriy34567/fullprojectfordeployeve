const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

//experemental shit
 
const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes.INTEGER}
})
//


const UserProfile = sequelize.define('userProfile', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userid: {type: DataTypes.INTEGER, allowNull: false, unique: true  },
    name : {type: DataTypes.STRING, allowNull: false },
    description : {type: DataTypes.STRING},
    hobbys : {type: DataTypes.STRING},
    country : {type: DataTypes.STRING, allowNull: false},
    city : {type: DataTypes.STRING, allowNull: false},
    age : {type: DataTypes.INTEGER},
    img : {type: DataTypes.STRING},
})

const Event = sequelize.define('event', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userid: {type: DataTypes.INTEGER, allowNull: false},
    authorName: {type: DataTypes.STRING, allowNull: false},
    data: {type: DataTypes.STRING, allowNull: false},
    time: {type: DataTypes.STRING, allowNull: false},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    country: {type: DataTypes.STRING, allowNull: false},
    city: {type: DataTypes.STRING, allowNull: false},
    contactsdetails: {type: DataTypes.STRING, allowNull: false},
    active: {type: DataTypes.BOOLEAN, defaultValue:true},
    img : {type: DataTypes.STRING,  allowNull: true},
    price : {type: DataTypes.INTEGER,  allowNull: true},
    
})

const EventRequest = sequelize.define('eventRequest', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    authorId: {type: DataTypes.INTEGER, allowNull: false},
    reciverId: {type: DataTypes.INTEGER, allowNull: false},
    eventId: {type: DataTypes.INTEGER, allowNull: false},
    description: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING, allowNull: false}, //of author 
    eventTittle: {type: DataTypes.STRING, allowNull: false},
    contactDetails: {type: DataTypes.STRING, allowNull: false},//ніде не відображається
    aprooved: {type: DataTypes.BOOLEAN, defaultValue: false},
    active: {type: DataTypes.BOOLEAN, defaultValue: true},
})


const AnsverRequest = sequelize.define('AnsverRequest', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    idEvReq: {type: DataTypes.INTEGER, allowNull: false},
    authorId: {type: DataTypes.INTEGER, allowNull: false},
    reciverId: {type: DataTypes.INTEGER, allowNull: false},
    eventId: {type: DataTypes.INTEGER, allowNull: false},
    contactDetails: {type: DataTypes.STRING, allowNull: false},
    tittleOfEvent: {type: DataTypes.STRING, allowNull: false},
})



UserProfile.hasOne(User)
User.belongsTo(UserProfile)

UserProfile.hasMany(Event)
Event.belongsTo(UserProfile)

UserProfile.hasMany(EventRequest)
EventRequest.belongsTo(UserProfile)

UserProfile.hasOne(Basket)
Basket.belongsTo(UserProfile)

module.exports = {
    User,
    UserProfile,
    EventRequest,
    Event,
    Basket,
    AnsverRequest
}





