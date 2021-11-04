import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

    public form: FormGroup;
    private _currentLevel = 5;

    constructor(
        private fb: FormBuilder,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            name: null,
            email: [null, [Validators.email, Validators.required]],
            message: null
        });
    }

    submit() {
        const data = this.form.value;
        switch (this._currentLevel) {
            case 1:
                if (data.message?.trim().toLowerCase() === "dawn") {

                }
                break;
            case 5:
                const validNames = ["sofia", "wisdom", "σοφια", "σόφια"];
                if (validNames.includes(data.name?.trim().toLowerCase())) {
                    this.router.navigate(["/riddles", "lscheqbu"]);
                }
                break;
        }

        // send form

    }

}
