import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebSocketService } from './services/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentChecked {

  public lineChartData: Array<any> = [
    { data: [ 0, 0, 0, 0 ], label: 'Ventas'}
  ];

  public lineChartLabels: Array<any> = ['Enero', 'Febrero', 'Marzo', 'Abril' ];

  public estado: boolean;

  title = 'front';

  constructor(
    private http: HttpClient,
    private wsService: WebSocketService
  ) { }

  ngOnInit(): void {
    this.getData();
    this.escucharSocket();
  }

  ngAfterContentChecked(): void {
    this.estado = this.wsService.socketStatus;
  }

  getData(): void {

    this.http.get('http://localhost:5000/grafica')
      // tslint:disable-next-line: deprecation
      .subscribe( (data: any) => this.lineChartData = data );
  }

  escucharSocket(): void {

    console.log('Ok');

    this.wsService.listen('cambio-grafica')
      // tslint:disable-next-line: deprecation
      .subscribe( (data: any) => {

        console.log('socket', data);
        this.lineChartData = data;
      });

  }

}
