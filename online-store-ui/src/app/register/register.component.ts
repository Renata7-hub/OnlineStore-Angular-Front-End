import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-login',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  onSave() {
    this.router.navigate(['/login']);
  }
}
