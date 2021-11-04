import {Component, OnInit} from '@angular/core';
import {fadeOut} from "../../../core/animations/enter-leave.animation";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
    selector: 'app-sofia',
    templateUrl: './sofia.component.html',
    styleUrls: ['./sofia.component.scss'],
    animations: [fadeOut]
})
export class SofiaComponent implements OnInit {

    public showUnlock: boolean = true;
    public videoUrl: SafeResourceUrl;

    constructor(private sanitizer: DomSanitizer) {
    }

    ngOnInit(): void {
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/1dRiE5_Xm64`);
    }

}
