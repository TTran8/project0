import { TestBed } from '@angular/core/testing';

import { CategorydetailService } from './categorydetail.service';

describe('CategorydetailService', () => {
  let service: CategorydetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorydetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
