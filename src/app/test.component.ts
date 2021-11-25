import { Component } from '@angular/core';

@Component({
  selector: 'test',
  templateUrl: 'test.component.html',
})
export class TestComponent {
  loginUsers: any = [];
  model: any = {};
  loading = false;
  outputMsg: string = '';
  selectedUser: string = '';
  constructor() {
    for (var i = 1; i <= 10; i++) {
      let user = { username: `user${i}`, password: `password${i}` };
      this.loginUsers.push(user);
    }
    console.log(this.loginUsers);
  }
  login() {
    this.loading = true;
    this.outputMsg = '';
    setTimeout(() => {
      this.loading = false;
      if (
        this.loginUsers.find(
          (item) =>
            item.username.toLowerCase() == this.model.username.toLowerCase() &&
            item.password.toLowerCase() == this.model.password.toLowerCase()
        )
      ) {
        this.outputMsg = 'Login Successful';
      } else {
        this.outputMsg = 'Login Failed';
      }
    }, 2000);
  }

  processOutput(userData) {
    this.selectedUser = userData.username;
  }
}
