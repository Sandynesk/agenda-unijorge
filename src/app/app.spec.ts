import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should direct the Eventos menu to the cadastro form route', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const eventosLink = Array.from(compiled.querySelectorAll('a')).find(
      (link) => link.textContent?.trim() === 'Eventos'
    );

    expect(eventosLink).toBeTruthy();
    expect(eventosLink?.getAttribute('ng-reflect-router-link')).toBe('/eventos/novo');
  });
});
