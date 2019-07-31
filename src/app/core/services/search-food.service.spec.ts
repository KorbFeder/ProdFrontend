import { TestBed } from '@angular/core/testing';

import { SearchFoodService } from './search-food.service';

describe('SearchFoodService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchFoodService = TestBed.get(SearchFoodService);
    expect(service).toBeTruthy();
  });
});
