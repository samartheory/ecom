import { TestBed } from '@angular/core/testing';

import { ProductGetService } from './product-get.service';

describe('ProductGetService', () => {
  let service: ProductGetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductGetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
