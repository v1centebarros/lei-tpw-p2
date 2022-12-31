import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFiltersContainersComponent } from './search-filters-containers.component';

describe('SearchFiltersContainersComponent', () => {
  let component: SearchFiltersContainersComponent;
  let fixture: ComponentFixture<SearchFiltersContainersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFiltersContainersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFiltersContainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
