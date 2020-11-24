import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-unlock',
    templateUrl: './unlock.component.html',
    styleUrls: ['./unlock.component.scss']
})
export class UnlockComponent implements OnInit {

    @Input() loop: boolean;

    @Output() animationEnd = new EventEmitter<void>();

    public showLock: boolean = true;

    constructor() {
    }

    ngOnInit(): void {

    }

    finished() {
        this.animationEnd.emit();
        if (this.loop) {
            this.showLock = false;
            setTimeout(() => this.showLock = true, 200);
        }
    }

}
