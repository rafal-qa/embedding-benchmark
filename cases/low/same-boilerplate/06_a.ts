@Component({
  selector: 'app-autocomplete',
  template: `<input (input)="onInput($any($event.target).value)" /><ul><li *ngFor="let hit of results">{{ hit }}</li></ul>`,
})
export class AutocompleteComponent {
  results: string[] = [];

  constructor(private http: HttpClient) {}

  onInput(term: string): void {
    if (term.length < 2) {
      this.results = [];
      return;
    }
    this.http.get<string[]>(`/api/suggest?q=${term}`).subscribe((hits) => {
      this.results = hits.slice(0, 10);
    });
  }
}
