class User {
    constructor(email, password, name, adress, age, phone, avatar, isAdmin) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.adress = adress;
        this.age = age;
        this.phone = phone;
        this.avatar = avatar;
        this.isAdmin = isAdmin;
    }
}

module.exports = User;