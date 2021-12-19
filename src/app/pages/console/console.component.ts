import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationService} from "../../core/services/navigation/navigation.service";
import {get} from "lodash";
import {Router} from "@angular/router";
import {HelperService} from "../../core/services/helper.service";
import {FileService} from "../../core/services/http/file.service";
import {cloneDeep} from "lodash";

@Component({
    selector: 'app-console',
    templateUrl: './console.component.html',
    styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit, AfterViewInit, OnDestroy {
    public readonly credentials = {
        username: "crawfamanda97",
        password: "Cicada3301"
    };
    public user: string = "anonymous";
    public dir: string = "";

    public history: string[] = [];

    public hideInput: boolean;
    public commandBuffer: string[] = [];
    public commandCursor: number = -1;

    private authenticated: boolean = false;
    public sudoBuffer: string[];
    public sudo: any = {
        username: "",
        showPass: false,
    };

    private glitchtext: string = "?̷̧̨̬͇̣͙̲̰̣̬̜͕͚̮̞͇̳̙̖̞̱̘̝͋̀̑̇̉̾̀́́̾͐̇̅̿̑̓͋̈͜*̸̢̛̹̹̲̩͉̩̂̓̈́̊̀̽̉̐͊̋͑͆͑͂̊̏̏̽̔̓̕͜͜ ̷͖̜͕͕̟͓̝͈̳̯͂̅̇̒͊́̓͝͝ͅ'̶̢̳̳̞̖̱̘̤͔͇͙͖̠̳̬̫̳̻̬̖̰̘̈́̌̀̇̎̍̈͊̒̏̀̍͐́͐̓͒͑̚͘͝ͅ<̷̢̛̘̝͕͍̖̮̖̯̗̺͕͎̯̃̀̈͑͆͊͊́̾̍́̿͑̈́̏̕͘͝>̷̢̰̪̼͇̯̺͉͓̼͍̝̳͉͈͇̋̇͐͝ ̸̧̨͎̥̖͇͈͍̭̩̘͖̫̦̘̯̞͖̯̟̖̬̮̽͊͑̒͗̑#̶̡̡̢̢̤͖̭̺̝̻̻͎̻̙̹͈̲͔̬̯̹̪̘̝͇̀̃̊̐̈́͋͐̇̈̍̓̓͊̆̿̈̓̏̏͐͘͝͠ͅ|̶̧̡̧̡̰̯̪̘̯̝̜͎̘̦͎̖͔̼̥̼̗̍̋̏̎̅̔̈̚͜͝;̷̡̨̡̞͙͓̹̊̽́̎̅͊̌̍̀̀̇̀̂̑̊̅̒͊̄́͆̔͘̚͠ͅ ̴̧̢̛̭̲͎͔̮̳̙͕̝̥̺̞̂̎̇̀͆̈́̄̍̿̄̊͆̽̂́̃͌͌͘͝͠͠²̵̤̺̪̟̐̆̂̽³̵̰̋̈̀̕̚̕~̵̛̰̙̝̪̗̟͇͍͈̫͈̭̃̄͑̒̂̒̎̆̃̎̇̐̓̄̽͒͒͒̚ͅ ̴̨̡̡̡̮͕̲̜̣̦̳̲͈̦̙̙͉̥̗̱̘͔̼̫̰̰̟̊̈́̔̽̈́͑͐͒̾́̉̃̊͒͝͝@̵͇̹͍̻͍̥̰͉̥̯̻͔͚̫͔̰̝̱͕̰̦̳͋̇̈́͊̽̉̉̑̒̀͑̓̏̍́̃̍̽̐̓̈́́̾̾͘͝͝`̶͍̯̪̲̳̮̫̻̝̬̝̰̮̟͇͙̦͙̉̑̔͜´̷̡̢̨̢̰̩̙̤̯̳͖̗̠̻̣̫̯̥͓͍̫̟͛̓͗̊́̆̐̈͗̑͂̈́̓̋̒͗̓̉͛̕͘͝͝͝ͅ ̷̛͈̃͐̍̈́͑̚©̶̨̛̦̙̥̜͇̼͇̳̙̰̯̞̑́͒̔̉̀͗̋͑̈́̓̋̀̇̂̽͛̽͐̑͆͘̕͜͝͝«̵̡̡̧̡̫͚̯͎̥̥͉̳͈͎̲̳̙̮̗̠̗̺̦͒̅̃͗͝»̸̨̧̛̣̯̲̮͕̺̼͓̺̰͙̩̪͉̜̩͔̩̳̱͙͙͍̃͒͗͌͌͒͆͊̉̿̑͘͜͝ ̴̧̛̛̲̺̮̩͍̠͍͇̺̜̭̰͎̣̘̗͕̆́͛̍̂̈́̇͒͂̏͗̓͐̇̾̄̕͘͘ͅ¤̷̡̨̩̠̜̥̤̘̟͎̠̠̗̥̭̙̼̿͌͒̅̋͋̏̌̕͝͝¼̵̳̮̼̻̯͎̃̍̔̀͛̓̒̾̒̽̓̆͑͘͜×̶̢̡̧̧̨̫̺͈̘͚͕̰͉̺̣̯̳̳̖̗̈̌̑͗̽̀́͌͊̐͌̈́͛̃̑̌̾̾̂̓̾̑͒̕ ̸̧̡̧̛͉͓͙̖̩͕̻̺̻͇̻̠̠̳̳̊̈̒́͛͠{̸̡͔͓͖̰̤̲̜̈̔͛̀̇͆̐̔̆̀͂́͒̊͂̃͐̓̽̅͘̚͜͝}̶̨̺͕̙̬̥͍͝ ̴̨̛͙͇͕̼͖̱͈̺͙͚̣̖̒̌͌͑͋͜͜ą̷̧͙̙͖̳̭̟̳̗̯̝̹͔͊̂͗̿́̄̊̃̔̀̅͂̇̊͘͜͠b̶̼̞͇̬̺̝̫̙̲̳̳̘̥̃̈̃̌̚c̵̼͔̣̪͕̪̮̫͈̳̗̻̪͎̯̑̊̌̔͜͝ ̶̺̦̦̥̖̻͎̺̏́̍͂ͅḋ̶̡̛̛͔̩̯̳̭̟͖̈́̏̊͋͗͌͋͋̀́͗̈́̽̈́́͋̚͝͠ḛ̶̡̫͙̳̟͇̤͎̪̳̭̞͚͙̀̌̓̈́̒̎͋͐̎̉̔͛̕̕f̴̗̫̜̍̈́̉̓͂́̍̃͗̎͌͆̀̚͝ ̶̡̢̢̳͍̙͈̼̪͔̯͉̝̖̭̭̿̓̏̂̍̑́̈́̎̑́̊͑͑̈͐͒̀͆̈́̔̕̕͝͝͠ͅg̵͖͉͂͂͛͆͂̀̍̀̃̈́́̈́̚͝͝͝h̴͉̒̈́ȉ̸̛͈̘͌̿͐̆̓̀̂̍͆̑̽̓͌͆̐́͐͒̀̑͛͗͘͠͝ ̸̨̠͎̮̹̞̱́̈́͋̓̕̕͜j̷̛̛̛̲̜̠̳̖̘͎̇͗́͛͂́̏̑̌͛̓̇́̕͝͝k̴̨̢̫̤̠̝̘̱̯̜̗͋̀͋̀̿̔̇̽̐͝ͅl̵̡̛͍̳̗̳̖̬̙̫̮͖̮͉̝̬̙̤͌͋̋̄̈́̀̿̉̅̓̇̈͝ ̵̡̛̗̜̠̝̖̮͇̳̳̞͓̘͉̞̓̓͐̃̏̊̽͋̓̈́̾̈́̚͜m̶̛̦̠͉͚̼̝̱̣̽͑̽͊̋́̊̀̊̀̓̓̊̃̉̿̎̾̾̿͑̊͝͝ņ̴̨͉̹͙͓̳̗̥̼̤͎̰͍̓̀̓̇́̿̽͑̓̃̊̉́̕̚ͅơ̷̡̧̧̛͙͓̠̩̩͓̹̘͚̈͂̃͐̎̿̑̐̑̔̈̿̇̃͌̀̾͑̂̃͘ ̶̢̢̗͇̣̼̳̤̱̻͖̩͚͎͙͙̙͚̜̞͔͊̏̀̈͆͌̒̂͛̌̌͐̎͛̄̉͑͒͂̈̚̚͠͝͝p̷̧̖̱̰̖̞̫̬̣͚̠̙̣̏̆̏̓q̸̨̢̡̢̭͍͕̱͈͇̖̞͇̣̪̦̤̪̟̗̟̹̰̣̥̥̦̅̈̒͌̓r̷̨̢͍̟͇̪̙͎̻̲̱͇͈̥̊̍̍͌͐̀̒̈́̀̂̅̓̆̌̈̆͊̓̂̅́̚͜͠͝͝ș̷̐̾̽̏́̽̈͛̏̔̇̽̓́̕͝ ̵̢͓̭̹͍̑͐̍̂̿̆̿ẗ̸̢̪̣̤͖̙͇̳͓͖̝̞̽͒̈́̓̓́̾͛̈͗̊̚̕͝ͅͅư̷̧̙̤͖̠̻͖͉͚̗̙̩̰̠̭̮̓͋̂͛͂̏̂́̓̊̒͂̋̾͗̇͆͌̐̽̕͝v̷̥͊̒͋͂̊̇̆͗̔̚̚ ̷̹̭͇̘̖̹́̒̓͌͆̆͑̽̎̓̓̊͊w̵̨͉͎͈̘̮̘̺̥͇̥͎̹̬͙̮͈͖͑́̓͑̾͘͜͜x̶̜̥͔̟̖͎̐̌̽͛̎̿̉̒̉̎̐̓̃͘͝͠ͅy̸̛̛̛̥̣͈̟͇̪͔̟͍͇̺̹̘̲̼̪̰͂͐̾̓̅͛̆̽͗̔̓̓̄̃̇̄́̑͒̏̕̚͠z̷̡̞͖̳̻͚̗̙̤͐̈́̂̐́̈̐͗͜͝͠ ̴̨͙͇̦̝̫̙̞̮͉̬͙͉̫͍̪̯̽̉͗͂̏̕͘͜Á̷̢̛̩̻̮̙̹̌̔͊͗̈́̉͆̄̍̀̔̆̆͝͝B̸̯̍̑̈́̀̉̄́̕͝͝͠C̷̡̢̧̡̲͙̟̫̺̠͎̳̪͔̪̹̈́̽̽̂́͛̃͂̚̕ ̶̨̧̛̭̩͇̖͍̥̰͈̺̖͓͚̻̲̝̟͗̈́̆̓͋̄̈́́́̓̔́͗̈́̋̐̾̂̈́̌͜͠ͅD̸̡̡̛̲͖̱̟͉͇̮̬̳̻̙̪̲͎͍̑̂̔̑̈̿̿̈́̈́͗͂̃͑͊̈͗̄̓͌̚͜͠Ë̴̡̧͚̭͇̭͕̺̺̠̺̦̗̻̼͙͔̫̟̦̳̹̩͓̳̞͒̑̀͘F̴̡̛̜͈͕̜̞̌͋̃̎́́̔̈́͗̀̈́̀̅͂̓̊͒̒̉́̏͗̕͝͝͝ ̸̱̝̈́̀͐͆͗̇͑̀̒͘̕̚͠Ǵ̸̫̖͙̤̞̠̯̠̳̰́͐́̆͒̽͋̄͆̓̈́̏̅͛̿̅̆̓͘͘͜͝ͅḨ̸̧̨̛̫̗̼̝̘̞͎̤̙̬͖̯͓̬̙̥̪̪͊̍̽̀̎̃̆̈́̾͒͋͌͒̈́̉̓͑̎͜I̷̛̝̤͇̼̜̤̖̻͉̹̼̳̲̪̬̩͓̩̻̤̙͚̹̠͈͈̅̄̾̉̀̌̇̔̾̿̏̌̌̏͌͛͐̀͗̾͜͝͝ ̴̧̰͇̟̤̯͓̞͎̣͕͈͓̥̤̼̜̤̪͕̖̀̎͑̽̂̅̓͜͜ͅJ̶͓̹̭̬̹̖̤̱̯̟͌̆̽͋̿̑͆͋̓̆̆̀̈́̐͊͒̄̅̑̇̑̂̕̕͘͠K̷̢̛̛̲͉͉͚̮̯̗̪̦̼͖̲̮͉͇͍̞̀̊͋̔̔̂̍́̾̃͒̈́̾̽̔̏͘̚̕̚͜͠͠͝Ļ̷̛̛͚̖̺͕͔̹̜̲͙̣͂̓̄́̒̎̌̆͛̓̇͆͐̓͌̊̾̋̓̀͆͆̌̆͠ ̵̧̡̨̼͚̬̭̻͙̬̤͖͚͙̤̤̩̆M̶̨̢̞̼̦̞͙͚̟̻̖̯̻͖͇͚̘̣̑̀͐͊̓̽̊̚͝ͅͅN̵̢̘͍̙̠͖̪̹̟͓̝̗̘̪̳̼̏̀͐̑̃̓Ǫ̴̪̩̲̙͎͕̪̳̺̹̩̥̎̔̆̂͐̈́̈́͑͂͋͘͜͠͝ ̸̨̦̙̝͇̰͕̦̱̼̎̄̈́͛̏̇̔̍͆͌͌̔̇͗͑̌̕͘͠͠ͅP̶͈͇̹͈̫̺͍̫̠̩̻̟̦̅̒̏́͗ͅͅQ̵̢̛̭̩̤̖͔̤̰̦̱̗̩̪͈̩̤̟̩̳̬͍̫͆͑͌͂̈̌̈͒̚͜R̵̖̯͍̰̥͈̼̮̜̩̙͕͕̙̝̫̹̪̳̆͌̅̂̽̂̔̈̅̊́̏̀̕͜Š̷̡͈̣͈̳̟͙͚̘̞̤͈͎̟̟̣͈̻͓͖͉̱̜̑͘ͅ ̷̨̧̡̛̗̲̬̠̰͓͉͚͓̘͖̝̥̞̬̫͇̇̄̈́̒̂̃̋̿̔͐͊̃̄͗͜͠T̵̢̨̮͈̩̉̉́̂U̵̢̨̡̡̦̻̲̖͓̞̗̲͈̹̞̻͉͚͌͠ͅV̶̨̢̧̯͚̯̰̪̹̫̥̭͎̭̹̙̳̥̲͍͈̪͕̯̪̈́̊ͅ ̸̢̢̱͇͙̲̖̭͍͖̼̣̠̘͈̻̪̙͈̬̪̖͂̾̎̀̇̊̉͒̿̆͂̿́͆̈̈̉̿͘͜͠W̶̺̒̅̍̌͑̿̓̎͒̆͆͘͘͝X̴̡̻̮͕̝͇̱̝͕̪͈̱̦͊̎́̊̅̈́̆͛̈ͅY̵̨̛̯̯̳̙̗̱͈̺͍̤͖̙̝̥̺̦̻̔́̓̎̾̆̉͋̍̄͗̅̾̈͆̍͛̏̊̈̑̿͘͜͠͝Z̶̨̧̢̯̦̻͈̩̩̭̳̥͕̗̟̩̠̺͔͎̲̥͖̑̐̎̈́̑̈́̋̈́̓̅̿̀̈́͑̓̔̍́̍͌̚̚̚͜͝ ̵̢̗̱̦̞̘̗̦̹͉͎͎̩̫̙͙̩̠͓̗̮̮̓́̅̍̔͊̆͛̑̓̏̑̃̇̅̈́̔̀͛̈̾͘̚̚͝͝!̴̡̟̱̜̳͇̺̯͓̠͍̂̇̚͘͜ͅͅ\"̸̧̦̟͚̮̝̝͚͇͍͔̝̰͉̹̲͈̤̹̯̗̎̑̍̃͌̓ͅ§̷̡̢̡̨̛̪̥̞̞̙̙̱̲͓̯͓͙̞͔̳͓͎̘͉̱̘̻̠͒̏̆̋͆̑̒̌̎͒̉̓̌̃͒͆̌͗͆̏̚̚͘͠ ̸̨̨̨̛̦͉̯̟̫̠̹̼̖̥̩̻͓̩̮̘̗̫̣̌̃͛̌̌͆̾͗̋̊̿̐̇́̑̈́͘̚͜͜͠͠͝$̸̨̨̧̗̣̠͚͕̞̩̳̝͔̣̙̻̤̥̺͙̹̗̠̘͙̑̔͜%̸̨̨̛̞̻̼͔̪̞̤̮̱̳̬͔̫̑͐̌̋͋͐̈̆̉̔̈́͑̇́̅̉̏̈́̈́̏̎̏̚͜͠͝ͅͅ&̸̨̡̛̖̫̪̺͖͙̲̥̪͎̪̝̠̞̈́̉͆̂̉́̇̄̔̈́͐͜ͅͅ ̶̡̨̘̭͈̠͎̞̹̭̲̲̦̠̥̖̩̙͎̗̰͔́͗̉̽͛̔͌͜͝͝ͅ/̵̛̻̝̳̼͓̠̺̞͖͓̗͉͂͑̎̎̎͑͊̑͠(̶̨̻̱̬͙̮̝̲̼̲̩̹͓̠̲͐̌̉̕)̷̡̣̪̦̰͈̥̗͖́͛ ̷̖̙̐̔̓̉̈́͆̌͑̋̈́̒͆̋̈́́̈́̈̐̊̈́͑͘̕≠̧̗͈͉̖͗̒?̶̡̡͕̦͔͓̩̘͚̱̫͔̣̱̣͔̫͎̓̀̉͜*̷̹̗͈̹͈̰͈̻̗̺̝̹̝̳̲̰̟͙̫̲͙̠͕͓̞̼͎̑͊̓͐́͆́̎̈́̓̀̽̑̃͛̔͊̀͌̐̇͝͠͠͝ ̸̢̢̡̩͈͍͔͕͙̩͕͎̮̻͚̺͓̹̱͔̏̍̉̏͆̀̈́̒́͛̄̆̂̌̈́̌͋̎̇͂͐̌̒͐͘͝ͅͅ'̸̧̥͇͑̊̈͋̐̌̃͋͗̊̒̔̿͗̕̚̚͝͝<̷̛̱̝̒̓̔̓̊̓̆̓̿̈̀̊̈̀͠>̶̢̢̨̛͎̪͙͚̪͓̬̩͙̩͕͕̗̱̖͈̟̦̩̞́̎͗̓͊̓̈̅̒̎̐̒̔̃̈̊͌̌̔͘̚͘̚͜͠͝ͅ ̸̡̨̨̰̤̹̗̬̺̱̗͓̝̤͍͕̮̜̰̒̄̓̾͛̍͛͑͆͆̀̉͑̆̀̐͊̐͝ͅ#̶̧̗̘̬͍̟͈̦̝̠̙̬̝̺̝͊̈́̾͆̀́̌́̊͗͗̒̓͑̆͊̏̽̈́͂|̴̧͚̗͍̗̦͈̮̯̺̠̈́͑͌̋͐̒̒;̶̢̧̢̧͎̝̹̖̬͍̳͉̝̱̈̈́̃͐̓͌̆̀̑͒̚͜ ̶̡̬̳̜̬͔̞̙͉͔͉͔͖̘̥̲͉̼͈͛͆́̈́̿̍̾̓̆͌̐̓̍͛̋̐͊̃͌͐̋̕͠͠²̴͖̪̦͔͚̳̹̗͉͇̹̺͚̲̦̦̝̞͍̥͛͆̆̃̐͝ͅ³̷̢͚̬̜͓̣͔̟̭̟͎̦̳̯̹͖̗̲̥̃̽͌͂̾̒̀͆̈́͛̇̉̆͊͊̊̍̔͂͌́̍͐~̸͔͖͙̰́ͅ ̶͚͖͖͕͎̦̘̫̹̏̾̋̄̾͐̒͐̊͋͊̈́̓̑̈́̏̄̓̑͘͜ͅ@̷̛̼͓̭͙̦̖̞͓̻̫͈̘̩͉̈́́̐͆̈́͐͗̈́̆͛́̾͂̒͗̒̏̇͂̚͝͠͝͝`̵̡̡̨̧̗̣̣͖̭͓̥͎͎̻̳͕̉̏̿͂́ͅ´̴͚͇̮͖̖̞́̀̀͊̑ ̴̹̫͓͈̥͆͒̓̓̍̿̀̈͠͝©̷̗͚̦̾̉̏͝«̸̢̟̻͔̭̫͉̤͔̩̖̯̝͚̣̖͚̠̘͎̟̭̪̖̈́͛͜»̸̡̖̥̪̲̈́̓̎̍͊̿̌́͒̏̆̒͑͐͛̌͘ ̸̨̻̯̫̯̠̣̻̞̃̃̒́̓̓̌̋̉͑͑̈͠ͅ¤̴̡̻͎͈͚̼̮͚͕͇̰̝̳̘̗͔̏̂͊́̋̕¼̴̢̧̡̡̤̙̮̺̱͕̥̩͚̼̘̈̉̇̈́̿͋͌̀̒͌̈́͆̑͂̽̀̉̓͌̑̂̑̾̚͘͘͝ͅ×̸̨̦̼͓̲̣̭̝̮̲̩͇͚͕̠̆̎̓̌̾̉̈́̓͌̌̉͒̽͐͒̒̑͂͜͝͝͠͝ ̸̨̢̙̯͖̯̱̜̦̬͚̼͉͉̙̟̭͗͜{̴̢̨̰̯͖̟̪̺̩͈͔̖̟͂̈͛̈́̅̆̕̕̕}̵̡̪̗͚̤̞̳͔̺̠̬̭̤͎̲͎͖̹̭̖͍̩̌̍̉̄̽̽̊̈̓̀̏̈́͊̄̒̒͘͘̕͜͜͝ͅ ̷̛̛̫̼͙͈͓̫̗́̊͑́̽̌̌̋͒̔̃̏̈̏̏̈́́͗̆́͑͊͝͝a̴̛̘̝͓̪̜̜̼̞̖̹̮̼̪͆̔̌̎͗̐͊͌̒͌͂̉́͌̓͑̈́̈́̿̕̚͠͝͝͝͝ͅb̴̢̢̟͎͈̼̗͖̮͓͓̩̼̫͖͙̝̟̰̟̣̯̺͈̬͚̱̔̎͛̈́̀̽͆͐̉̊̂̈̇̈́̾̽̈́͝͝͝c̸̨̗͕͔̼̖̳̱̠̺̗̲͈̭̣̣̩͖̘̩̮̗̲̮̼̠͐̌͐ ̶̡̡̺̭̣̪̣̠̬͉͚̅̊͛̏͒̎̇̏̿̆̋͛ͅd̷̢̼͙̮̹͖̘͈̯͕͈̙̳̮͓̥͓̱̙̠͆͆͛̌̍͠ę̸̧̡̛͍̭̰͚̬̟̦̥̱̗̭̰̟̼̳̻̖͗́̽͋̌̃̒̽̊̐͊͛̋̈́͛̈̊͊̚f̴̡̡̯̟̐̂͂͆̍̑̽̎͌̈̀͊̐͒͒͑͑̈̆̀͊̀̚͠͠͝ ̴̨̬̲̱̣̪̣̭̣̫̦͍͉̥̜̩͑̾͋̀́̆̑͒̆̋̓͗̂͗̍̅́̒̕̕͜͝ͅĝ̴̯͕͈̃̂͑̑̌͋̓̑͆̉̒͂́̔̔̋́̎͘͘͠h̵̦̘͚͓̥͖̄ì̵̛͎̜̝̟̔ ̷͎̩̠̦̺͒̃̿͛̀̊͛̋̓͌̐͆̆̔̊͛͐̈͊̽͆̄̚͘͘͝ǰ̵̨̛̬͍̥̰̮̫̗͖͙̆́̍͛͑k̴̪̙͓̮̤̭̹͑̽̀̃̏̈̂̓͐̅̉̿͐́͌̈́̓͆̑̈́̆̕̕͘͝͝l̴̛̬̘͈̈́̄̀̍̇̈́͆ ̸̡̛͇͈̦̫̠̟̼͖̺͙͚͙̦̖̦̥̭͇͙̪̦͈͖̻͗͛̏̌̄͆͌́̓̈́̒̈́͗̕͜͝ͅm̷̢̜̮̖͕͖̙̻͇̦̰̗͍͚̜̻͕̬̤͖̪̖̱̼̮̓̓̀̔̄̑͆̆̚̚̕̕ͅn̴̢͍̞͔͈̬̮͗͛̆̽̉͆͐̄͊̍̈̽͑͝͠͠͝ǫ̴̠̮̍̐̔̿͒̐́̈̀̓̒̑͋̑̎͑̚͘̕͝͠ ̴̢̨̛̹̮͉̳͕͉͕̞͕͎̙̤͉̗̘̖͍̮̊̓̐͋̒̎͜͜͠͝p̸̗̙̫̀̔̊̔̄̊͊̃̾͛͌̑͆̓̃͂̌̑͗̇͗͠͠q̶̡̧̢̗̦̩̺̯͙̞̟̲͍̱͙̣̺̘̞̹̣̗̺̲͋̓̀̍̊͛͑̐̌͊̉͌̎̐ŕ̸̨̧̢̡̼͈̫̥̘͙̥̘͚̯̟͖͓͇͙̪̝̩̯̞̭̒̓̾̆̽̏̉̿͋͐̆͒̾̂̈́̈́͊̆͐̅͘̚͝͝ͅs̶̢̼̮͔̯͍̪̻͊̓̃̿͐̿̆́̔̉̾͂͝ ̴̢̢̨̧̡̻̹͇̠̟̮̬̰̤̗̪͚̻̬̪͓͙̬̥͙͖͙̍̈͑̅͗̂͐̑̈̈́͊̄́͂̽͌̚͝t̸̞̣̩̤̤̫͇̯̥͖͈͉͎͚̲̟̭̊́̽͒́̌͆̿̈̄̂̔̇̂͑͌͂̔͆̉͘̚̚͘͝ͅu̷̢̹̳̲͉̖̘͔͇͚̻̲̣͕̐̌̆̍̋̉̏̽̇̀̓͜͜͝v̷̡̧̻͙̻̠͇̞͎̓̌͛͂̓ ̵̢̨̱̯̼̯͉̙͈͓̦͇͖̩̤̝̟͔̮͚͕̭͊̏̀̀͂̈̇̊͊͋̍́̈́͆̃̎̓̽̂̄̊̇̎̉̊̚͠w̵͖̝͇̬̉̓̐͐̐̅̈͆̍̃͗͂̄͐̕͝͝͝x̸̧̱̰̰̳̝̪̖̘̻̲͍̲̺̙͕̦͚̭͌̇̇͗͊͑̐̇͆͘y̴̢̧̟͕̬͇͓͔̭͉̘͈̏̓̓̐͆͋̑̿̀z̴͔͖̲̱͎̲͐͋͐̐͋̈̏̎̉ ̷̲͚͈͕͔̝̩̥͌̏̓́̈́͋̃́̒̈́̈̊̚͠͝͠ͅȂ̸̹̀̌͘B̵̢̨̻̠̞̬̩̖͖̩̗̥̟͂̏̎̄̂̑̎͆̐͂̀̏͛̉̈̈́̎͐̐͘͜͝͝C̸̝̜̭̆̓͒̿̀̈͆̂̌̽̔͊̇͐̕̕̚ ̴̢̰̠̥͓̘̼̹͕̺͕̗͎̪͎͙̳̠̙͔̲͔̟̭͎̔̓̏̐͛̈́̎͂͒͗̋͒̌̚͘̚͜͝͠ͅD̵̨̤̯̰̹̙̩͍̞̤̯̼̲̗̠͈̜̺̰͙̰͚͙͚̲͓̄̓́̇̆̃͒̔͆̀́͗͜E̵̢̨̛͔̱͔͇̗̟͇̩̝̗̗̹̳̹̦̹̯͇̩"

    private directory: any = {
        employees: {
            __files: []
        },
        logs: {
            __files: []
        },
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
        private cd: ChangeDetectorRef,
        private fileService: FileService
    ) {
    }

    ngOnInit(): void {
        this.navService.showNavBar$.next(false);
    }

    async ngAfterViewInit() {
        this.addLine("Booting up console...");
        await HelperService.sleep(Math.random() * 1000);
        this.addLine("Accessing server...");
        await HelperService.sleep(Math.random() * 1500);
        this.addLine("Handshake complete.");
        this.addLine("Creating session...");
        await HelperService.sleep(Math.random() * 500);

        this.addLine("Session created.");
        this.addLine("<pre>\n\n" +
            "  ██████████████████████\n" +
            "████                  ████\n" +
            "██    ░░░░░░░░░░░░░░  ░░██\n" +
            "██    ░░██████████    ░░██\n" +
            "██    ░░██▓▓▓▓▓▓██    ░░██\n" +
            "██    ░░██████████    ░░██\n" +
            "██                    ░░██\n" +
            "████░░░░░░░░░░░░░░░░░░████\n" +
            "  ██████████████████████\n" +
            "        ██    ░░██\n" +
            "        ██    ░░████████\n" +
            "        ██    ░░██    ██\n" +
            "        ██    ░░████████\n" +
            "        ██    ░░██    ██\n" +
            "        ██░░░░░░██░░░░██\n" +
            "        ████████████████\n" +
            "</pre>");
        this.addLine("<pre>" +
            " ___       ________  ________  ___  __    _______   ________  ________  ________  ________   \n" +
            "|\\  \\     |\\   __  \\|\\   ____\\|\\  \\|\\  \\ |\\  ___ \\ |\\   ____\\|\\   __  \\|\\   __  \\|\\   __  \\  \n" +
            "\\ \\  \\    \\ \\  \\|\\  \\ \\  \\___|\\ \\  \\/  /|\\ \\   __/|\\ \\  \\___|\\ \\  \\|\\  \\ \\  \\|\\  \\ \\  \\|\\  \\ \n" +
            " \\ \\  \\    \\ \\  \\\\\\  \\ \\  \\    \\ \\   ___  \\ \\  \\_|/_\\ \\  \\    \\ \\  \\\\\\  \\ \\   _  _\\ \\   ____\\\n" +
            "  \\ \\  \\____\\ \\  \\\\\\  \\ \\  \\____\\ \\  \\\\ \\  \\ \\  \\_|\\ \\ \\  \\____\\ \\  \\\\\\  \\ \\  \\\\  \\\\ \\  \\___|\n" +
            "   \\ \\_______\\ \\_______\\ \\_______\\ \\__\\\\ \\__\\ \\_______\\ \\_______\\ \\_______\\ \\__\\\\ _\\\\ \\__\\   \n" +
            "    \\|_______|\\|_______|\\|_______|\\|__| \\|__|\\|_______|\\|_______|\\|_______|\\|__|\\|__|\\|__|   " +
            "</pre>");
        this.addLine("Welcome to LockeCorp DataLake_T-0B32.");
        this.goToInput();
    }

    ngOnDestroy() {
        this.navService.showNavBar$.next(true);
    }

    public addLine(contents: string = "", userContent?: boolean) {
        if (this.sudoBuffer && userContent) {
            this._handleSudoInput(contents);
            return;
        }

        contents = (contents || "").trim();
        this.history.push((userContent ? this.userLine : "") + `${document.createTextNode(contents.trim()).textContent}`);
        if (userContent) {
            this._parseUserCommand(contents.replace(new RegExp(/\s(\s)*/, "g"), " "));
        }
    }

    public goToInput(keepHidden?: boolean) {
        if (!keepHidden) {
            this.hideInput = false;
        }
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
                const lsPath = ((this.dir.length ? this.dir + "/" : "") + (args.length ? args[0] : ''))
                    .split("/")
                    .filter(token => token.length).join(".");
                directory = lsPath ? get(this.directory, lsPath) : this.directory;

                if (!directory) {
                    this.addLine(`ls: Cannot find path '${args[0] || '/'}'.`);
                    break;
                }
                if (!Object.keys(directory).length) {
                    this.addLine(`ls: '${args[0] || '/'}' is empty.`);
                    break;
                }
                this.hideInput = true;

                if (directory.hasOwnProperty("__files") && !directory.__files?.length) {
                    const folderRes = await this.fileService.getFolder(lsPath.split(".").pop()).toPromise();
                    if (folderRes.success) {
                        directory.__files = folderRes.data || [];
                    }
                }

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
                break;
            case "cd":
                if (!args.length) {
                    break;
                }

                if (args[0] === "..") {
                    const tokens = this.dir.split("/");
                    tokens.pop();
                    this.dir = tokens.join("/");
                    break;
                }

                directory = ((this.dir.length ? this.dir + "/" : "") + args[0]).split("/").join(".");

                if (get(this.directory, directory)) {
                    this.dir = directory.split(".").join("/");
                    break;
                }

                this.addLine(`cd: ${args[0]}: no such directory.`);

                break;
            case "open":
                let target = (args[0] || "").split("/").pop();
                let filePath = (this.dir + "/" + (args[0] || ""))
                    .split("/")
                    .slice(0 , -1)
                    .filter(token => token.length);
                console.log(filePath);
                let files = get(this.directory, filePath.join(".") + "__files") || [];
                if (files && !files?.length) {
                    const folderRes = await this.fileService.getFolder(cloneDeep(filePath).pop()).toPromise();
                    if (folderRes.success) {
                        files = folderRes.data || [];
                    }
                }
                if (!files.includes(target)) {
                    this.addLine(`open: ${target}: no such file.`);
                    break;
                }

                this.addLine(`Opening ${target}...`);
                const fileRes = await this.fileService.getFile(target, cloneDeep(filePath).pop() || "def").toPromise();
                this.addLine(`---`);
                this.addLine(fileRes.data || this.glitchtext);
                this.addLine(`---`);

                break;
            case "clear":
                this.history = [];
                break;
            case "sudo":
                if (this.authenticated) {
                    this.sudoBuffer = null;
                    this._parseUserCommand(args.join(" "));
                    return;
                }

                this.sudoBuffer = args;
                this.hideInput = true;
                return;
            case "exit":
                this.hideInput = true;
                this.addLine("Disconnecting from the server...");
                await HelperService.sleep(500);
                this.router.navigate(["/"]);
                break;
            case "help":
                if (args.length) {

                    for (const c of args) {
                        if (this.commandList.hasOwnProperty(c)) {
                            this.addLine(`${c}: ${this.commandList[c].title}`);
                            this.addLine(this.commandList[c].desc);
                            break;
                        }
                    }
                    this.addLine(`help: no help topics match '${args.join(" ")}'.`);
                    break;
                }
                for (const c in this.commandList) {
                    this.addLine(`${c}: ${this.commandList[c].title}`);
                    this.addLine(this.commandList[c].desc);
                }
                break;
            default:
                this.addLine(`${command}: Command not found. Type 'help' for a list of available commands.`);
        }

        this.goToInput(!!this.sudoBuffer);
    }

    private _handleSudoInput(content: string = "") {
        if (!this.sudo.showPass) {
            this.sudo.username = content;
            this.sudo.showPass = true;
            this.addLine("Username: " + content);
            return;
        }


        const buffer = this.sudoBuffer;
        this.sudoBuffer = null;
        this.sudo.showPass = null;

        this.addLine("Password:");

        if (this.sudo.username === this.credentials.username && content === this.credentials.password) {
            this.authenticated = true;
            this.user = this.credentials.username;
            this.addLine("Access granted.");
        }

        this.addLine("---");
        this.goToInput(false);
        this._parseUserCommand(buffer.join(" "));
    }

    private get userLine() {
        return `<span class="text-success font-weight-bold">${this.user}@locke-corp</span><span class="mr-1">:</span><span class="text-primary font-weight-bold">${this.dir || "~"}</span><span class="mr-2">$</span>`;
    }

}
