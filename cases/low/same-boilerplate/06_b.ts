@Component({
  selector: 'app-upload',
  template: `<input type="file" (change)="onSelect($any($event.target).files[0])" /><progress [value]="progress" max="100"></progress>`,
})
export class UploadComponent {
  progress = 0;

  constructor(private http: HttpClient) {}

  onSelect(file: File): void {
    const form = new FormData();
    form.append('file', file);
    this.http.post('/api/upload', form, { reportProgress: true, observe: 'events' }).subscribe((event: any) => {
      if (event.type === 1 && event.total) {
        this.progress = Math.round((100 * event.loaded) / event.total);
      }
    });
  }
}
