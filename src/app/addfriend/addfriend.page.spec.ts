import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfriendPage } from './addfriend.page';

describe('AddfriendPage', () => {
  let component: AddfriendPage;
  let fixture: ComponentFixture<AddfriendPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddfriendPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddfriendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
