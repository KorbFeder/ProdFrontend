import { TestBed } from '@angular/core/testing';

import { SummeriesService } from './summeries.service';

describe('SummeriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SummeriesService = TestBed.get(SummeriesService);
    expect(service).toBeTruthy();
  });
});
