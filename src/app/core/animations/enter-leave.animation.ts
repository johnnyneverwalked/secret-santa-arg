import {animate, style, transition, trigger} from "@angular/animations";

export const pulsate = trigger("pulsate", [
    transition(':enter', [
        style({transform: "scale(0)", opacity: 0}),
        animate("100ms ease-in", style({transform: "scale(1.2)", opacity: 1})),
        animate("100ms ease-in", style({transform: "scale(1)"})),
        animate("100ms ease-in", style({transform: "scale(1.2)"})),
        animate("100ms ease-in", style({transform: "scale(0.9)"})),
        animate("100ms ease-in", style({transform: "scale(1)"}))
    ]),
    transition(':leave', [
        animate(200, style({transform: "scale(0)", opacity: 0}))
    ])
]);

export const fade = trigger("fade", [
    transition(':enter', [
        style({opacity: 0}),
        animate(200, style({opacity: 1})),
    ]),
    transition(':leave', [
        animate(100, style({opacity: 0}))
    ])
]);

export const fadeOut = trigger("fadeOut", [
    transition(':leave', [
        animate(500, style({opacity: 0}))
    ])
]);
