export class MemberStore{

  constructor() {
    let members = [];
  }

  addMember(member){
    this._members.push(member);
    console.log("Member added ",member.toString());
  }

  getMembers(){
    if(this._members.length==0){
      return res.status(400);
    }
    return members;
  }

};

