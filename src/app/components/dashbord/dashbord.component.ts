import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserInfo } from 'src/app/models';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss'],
})
export class DashbordComponent implements OnInit {
  user!: UserInfo | null;
  buttons = [
    { text: 'Ошибка', class: 'error-btn', type: 'error' },
    { text: 'Предупреждение', class: 'attention-btn', type: 'attention' },
    { text: 'Успех', class: 'success-btn', type: 'success' },
    { text: 'Сообщение', class: 'message-btn', type: 'message' },
  ];

  constructor(private auth: AuthService, private toast: ToastService) {}
  ngOnInit(): void {
    this.user = this.auth.getUser();
  }

  addToast(text: string, type: string) {
    this.toast.add(text, type);
  }
}
