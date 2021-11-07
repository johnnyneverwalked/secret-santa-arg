import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MessageService} from "../../core/services/http/message.service";
import Swal from "sweetalert2";
import {ConfigService} from "../../core/services/http/config.service";

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

    public form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private messageService: MessageService,
        private config: ConfigService
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
        this.messageService.sendMessage(data.email, data.name, data.message)
            .subscribe(res => {
                if (res.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Your message was sent successfully",
                        background: "#000",
                        customClass: {
                            title: "text-white",
                            popup: "border border-dark"
                        },
                        showConfirmButton: false,
                        timer: 2000
                    });
                    this.form.reset();
                    return;
                }
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Something went wrong",
                    background: "#000",
                    customClass: {
                        title: "text-white",
                        popup: "border border-dark"
                    },
                    showConfirmButton: false,
                    timer: 2000
                });
            });

        if (data.message?.toLowerCase().trim() === "d") {
            this.router.navigate(["/riddles", "lscheqbu"]);
        }

        switch (this.config.config$.getValue()?.level) {

        }

    }

}
