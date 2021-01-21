"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Member = void 0;
class Member {
    constructor(id, firstname, surname, email, status) {
        this._id = id;
        this._firstname = firstname;
        this._surname = surname;
        this._email = email;
        this._status = status;
    }
}
exports.Member = Member;
