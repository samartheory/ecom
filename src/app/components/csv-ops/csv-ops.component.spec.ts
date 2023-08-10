import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvOpsComponent } from './csv-ops.component';

describe('CsvOpsComponent', () => {
  let component: CsvOpsComponent;
  let fixture: ComponentFixture<CsvOpsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CsvOpsComponent]
    });
    fixture = TestBed.createComponent(CsvOpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
