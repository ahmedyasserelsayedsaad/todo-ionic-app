import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoDetPage } from './todo-det.page';

describe('TodoDetPage', () => {
  let component: TodoDetPage;
  let fixture: ComponentFixture<TodoDetPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoDetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
