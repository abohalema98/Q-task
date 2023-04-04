import { Component, PipeTransform } from '@angular/core';
import { UsersAuthService } from '../services/users-auth.service';
import { Users } from '../models/users';
import { AsyncPipe, DecimalPipe, NgFor } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';


@Component({
  selector: 'app-dataview',
  templateUrl: './dataview.component.html',
  styleUrls: ['./dataview.component.css'],
  providers: [DecimalPipe]
})
export class DataviewComponent {
  items: any = [];
  page = 1;
  pageSize = 4;
  collectionSize = this.items.length;
  dataViwe!: Users[];

  users!: Observable<Users[]>;
  filter = new FormControl('', { nonNullable: true });


  constructor(private AuthService: UsersAuthService, pipe: DecimalPipe) {
    this.users = this.filter.valueChanges.pipe(
      startWith(''),
      map((text) => this.search(text, pipe)),
    );
  }

  getAllUsers() {
    console.log(this.items);
  }
  ngOnInit() {
    this.AuthService.getAllUser().subscribe((data) => {
      this.items = data;
    });
  }

  // filtring
  search(text: string, pipe: PipeTransform): Users[] {
    return this.items.filter((users: Users) => {
      const term = text.toLowerCase();
      return (
        users.firstName.toLowerCase().includes(term)
      );
    });
  }

  refreshUsers() {
    this.dataViwe = this.items.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }
}
