import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { randStudent, randTeacher } from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

/*
Img inserted via content projection, i.e. ng-content to render the children

Since we need to refactor the ListItemComponent as well,
so it uses content project to render the children,
we need to have a second content placeholder using the select attribute.
We will place the ListItemComponent inside this placeholder, and loop it with all the data.
https://angular.dev/guide/components/content-projection#multiple-content-placeholders

e.g.
    <app-card
      [list]="students"
      customClass="bg-light-green">
      <app-img>
        <img src="assets/img/student.webp" width="200px" />
      </app-img>
      <app-list-item>
        <div class="border-grey-300 flex justify-between border px-2 py-1">
          Name
          <button (click)="delete(id)">
            <img class="h-5" src="assets/svg/trash.svg" />
          </button>
        </div>
      </app-list-item>
    </app-card>

And the delete is bound to the id of the item.
To use the second part inside of the ListItemComponent, 
we need to use the ng-templateoutlet directive.
e.g.
    <ng-container *ngTemplateOutlet="app-list-item"></ng-container>


Good blog about ng-templateoutlet
https://blog.angular-university.io/angular-ng-template-ng-container-ngtemplateoutlet/

*/
@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-content select="[card-img]"></ng-content>

      <section>
        <app-list-item
          *ngFor="let item of list"
          [name]="item.firstName"
          [id]="item.id"
          [type]="type"></app-list-item>
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  imports: [NgFor, ListItemComponent],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() type!: CardType;
  @Input() customClass = '';

  CardType = CardType;

  constructor(
    private teacherStore: TeacherStore,
    private studentStore: StudentStore,
  ) {}

  addNewItem() {
    if (this.type === CardType.TEACHER) {
      this.teacherStore.addOne(randTeacher());
    } else if (this.type === CardType.STUDENT) {
      this.studentStore.addOne(randStudent());
    }
  }
}
