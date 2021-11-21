import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationService} from "../../core/services/navigation/navigation.service";
import {get} from "lodash";
import {Router} from "@angular/router";
import {HelperService} from "../../core/services/helper.service";

@Component({
    selector: 'app-console',
    templateUrl: './console.component.html',
    styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit, AfterViewInit, OnDestroy {

    public user: string = "anonymous";
    public dir: string = "";

    public history: string[] = [];

    public hideInput: boolean;
    public commandBuffer: string[] = [];
    public commandCursor: number = -1;

    private authenticated: boolean = true;
    private sudoBuffer: string;

    private directory: any = {
        employees: {
            __files: [
                "<span class='glitch' data-text='REDACTED'>[REDACTED]</span>",
                "crawford_amanda.txt",
                "<span class='glitch' data-text='REDACTED'>[REDACTED]</span>",
                "<span class='glitch' data-text='REDACTED'>[REDACTED]</span>",
                "<span class='glitch' data-text='REDACTED'>[REDACTED]</span>",
            ]
        },
        bl00d_logs_1967: {},
        __files: [
            "<span class='glitch' data-text='REDACTED'>[REDACTED]</span>",
            "passage.txt"
        ]
    };
    private commandList: Record<string, any> = {
        help: {
            title: "help [pattern]",
            desc: `<div class="pl-5 pb-3">Display information about builtin commands.</div>
            <div class="pl-5 pb-3">Displays brief summaries of builtin commands.
            If PATTERN is specified, gives detailed help on the command matching PATTERN, help
            otherwise the list of help topics is printed.</div>`
        },
        ls: {
            title: "ls [dir]",
            desc: `<div class="pl-5 pb-3">List information about the files in DIR (the current directory by default).</div>`,
            needsAuth: true
        },
        cd: {
            title: "cd [dir]",
            desc: `<div class="pl-5 pb-3">Change the shell working directory.</div>

    <div class="pl-5 pb-3">Change the current directory to DIR.  The default DIR is the value of the
    HOME shell variable.</div>

    <div class="pl-5 pb-3">
    A null directory name is the same as the current directory. '..' is processed by removing the immediately previous pathname component
    back to a slash or the beginning of DIR.</div>`,
            needsAuth: true
        },
        open: {
            title: "open [file]",
            desc: `<div class="pl-5 pb-3">Open file matching FILE in the current directory.</div>
    <div class="pl-5 pb-3">If file is found in the directory, displays the file's contents in the terminal screen.</div>`,
            needsAuth: true
        },
        sudo: {
            title: "sudo [command]",
            desc: `<div class="pl-5 pb-3">Execute COMMAND with authenticated access.</div>
            <div class="pl-5 pb-3">If the user is not authenticated, sudo will ask for their credentials  before trying to execute COMMAND.
             If COMMAND is null, nothing happens after authentication.</div>`
        },
        clear: {
            title: "",
            desc: `<div class="pl-5 pb-3">Clear the contents of the terminal screen.</div>`
        },
        exit: {
            title: "",
            desc: `<div class="pl-5 pb-3">Disconnect the user from the server and closes the terminal screen.</div>`
        }
    };

    @ViewChild("consoleInput") consoleInput: ElementRef;
    @ViewChild("consoleContainer") consoleContainer: ElementRef;

    constructor(
        private navService: NavigationService,
        private router: Router,
        private cd: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {
        this.navService.showNavBar$.next(false);
    }

    ngAfterViewInit() {
        this.goToInput();
    }

    ngOnDestroy() {
        this.navService.showNavBar$.next(true);
    }

    public addLine(contents: string = "", userContent?: boolean) {
        contents = (contents || "").trim();
        this.history.push((userContent ? this.userLine : "") + `${document.createTextNode(contents.trim()).textContent}`);
        if (userContent) {
            this._parseUserCommand(contents.replace(new RegExp(/\s(\s)*/, "g"), " "));
        }
    }

    public goToInput() {
        this.hideInput = false;
        this.cd.detectChanges();
        setTimeout(() => {
            this.navService.scrollTo({target: "consoleInput", duration: 0});
            this.consoleInput?.nativeElement?.focus();
        });
    }

    public moveCursor(dir: number) {
        this.commandCursor = Math.min(Math.max(this.commandCursor + dir, -1), this.commandBuffer.length - 1);
        this.consoleInput.nativeElement.value = this.commandBuffer[this.commandCursor] || '';
    }

    private async _parseUserCommand(contents: string = "") {
        this.commandBuffer.unshift(contents || "");
        this.commandCursor = -1;
        if (!contents) {
            return;
        }
        const args = contents.split(" ");
        const command = args.shift();

        if (this.commandList[command]?.needsAuth && !this.authenticated) {
            this.addLine("Access denied.");
            return;
        }

        let directory;

        switch (command) {
            case "ls":
                directory = args.length ? get(this.directory, ((this.dir.length ? this.dir + "/" : "") + args[0]).split("/").join(".")) : this.directory;
                if (!directory) {
                    this.addLine(`ls: Cannot find path '${args[0] || '/'}'.`);
                    return;
                }
                if (!Object.keys(directory).length) {
                    this.addLine(`ls: '${args[0] || '/'}' is empty.`);
                    return;
                }
                this.hideInput = true;
                for (const path in directory) {
                    if (path === "__files") {
                        for (const file of directory.__files) {
                            this.addLine(file);
                        }
                    } else {
                        this.addLine(path);
                    }
                    await HelperService.sleep(20);
                }
                this.goToInput();
                return;
            case "cd":
                if (!args.length) {
                    return;
                }

                if (args[0] === "..") {
                    const tokens = this.dir.split("/");
                    tokens.pop();
                    this.dir = tokens.join("/");
                    return;
                }

                directory = ((this.dir.length ? this.dir + "/" : "") + args[0]).split("/").join(".");

                if (get(this.directory, directory)) {
                    this.dir = directory.split(".").join("/");
                    return;
                }

                this.addLine(`cd: ${args[0]}: no such directory.`);

                return;
            case "open":
                const files = get(this.directory, this.dir.split("/").join(".") + "__files") || [];
                if (!files.includes(args[0])) {
                    this.addLine(`open: ${args[0]}: no such file.`);
                    return;
                }

                this.addLine(`Opening ${args[0]}...`);
                this.addLine(`---`);
                this.addLine(`---`);

                return;
            case "clear":
                this.history = [];
                return;
            case "exit":
                this.hideInput = true;
                this.addLine("Disconnecting from the server...");
                await HelperService.sleep(500);
                this.router.navigate(["/"]);
                return;
            case "help":
                if (args.length) {

                    for (const c of args) {
                        if (this.commandList.hasOwnProperty(c)) {
                            this.addLine(`${c}: ${this.commandList[c].title}`);
                            this.addLine(this.commandList[c].desc);
                            return;
                        }
                    }
                    this.addLine(`help: no help topics match '${args.join(" ")}'.`);
                    return;
                }
                for (const c in this.commandList) {
                    this.addLine(`${c}: ${this.commandList[c].title}`);
                    this.addLine(this.commandList[c].desc);
                }
                return;
            default:
                this.addLine(`${command}: Command not found. Type 'help' for a list of available commands.`);
        }
    }

    private get userLine() {
        return `<span class="text-success font-weight-bold">${this.user}@locke-corp</span><span class="mr-1">:</span><span class="text-primary font-weight-bold">${this.dir || "~"}</span><span class="mr-2">$</span>`;
    }

}
