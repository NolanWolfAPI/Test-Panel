import {Component, Input, OnInit} from "@angular/core";
import {UUID} from "angular2-uuid";
import {ActivatedRoute, Router} from "@angular/router";
import {VanityService} from "app/services/vanity.service";
import {VanityItem} from "app/models/api/plugins/vanity/vanity-item";
import {APIResult} from "app/models/shared/result";

declare let M: any;

@Component ({
  selector: "vantity-details",
  templateUrl: "./vanity-editor.component.html",
  styleUrls: ["./vanity-editor.component.scss"],
})
export class VanityEditorComponent implements OnInit {

  @Input()
  id: UUID = null;

  vanity: VanityItem = new VanityItem();

  itemInformation:any[] = [];

  constructor(private vanityService: VanityService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params["id"] !== "undefined") {
        this.id = params["id"];
        if (this.id)
          this.getVanity(this.id);

        if (!this.vanity.itemInformation.has('V1_8_R3'))
          this.vanity.itemInformation.set('V1_8_R3',{
            material: 'AIR',
            skinUUID: '',
            skinSecret: '',
            skinTexture: '',
            data: ''
          });

        try {
          let keys = Array.from(this.vanity.itemInformation.keys());
          this.itemInformation = keys.map(key => {
            return {key: key, value: this.vanity.itemInformation.get(key)}
          });
        }catch (e) {
          this.itemInformation =  Object.keys(this.vanity.itemInformation).map(key => {return {key:key, value:this.vanity.itemInformation[key]}})
        }
      }
    });
  }

  getVanity(id: UUID) {
    this.vanityService.get(id).subscribe(
      next => {
        this.vanity = next;
      },
      error => {
        console.log("Vanity request failed");
      },
      () => {}
    )
  }

  get isCreate(): boolean{
    return typeof this.id === 'undefined';
  }

  save() {
    this.vanity.itemInformation = new Map(this.itemInformation.map((value):[any,any] => [value.key,value.value]))
    if (this.isCreate)
      this.vanityService.post(this.vanity).subscribe(x => {
        const result = x as APIResult;
        if (result.inserted > 0) {
          M.toast({html: 'Saved'}, 4000);
          this.router.navigateByUrl(`/vanities/${result.generated_keys[0]}/edit`);
        } else M.toast({html: 'Something when wrong'}, 4000);
      });
    else
      this.vanityService.put(this.vanity.id, this.vanity).subscribe(x => {
        const result = x as APIResult;
        if (result.replaced > 0) M.toast({html: 'Saved'}, 4000);
        else if (result.unchanged > 0) M.toast({html: 'No changes Found'}, 4000);
        else M.toast({html: 'Something when wrong'}, 4000);
      });
  }

  get categoryOptions() {
    return [
      {key:'Hat', value:'Hat'},
      {key:'Trail', value:'Trail'},
      {key:'Effect', value:'Effect'},
      {key:'Gadget', value:'Gadget'},
      {key:'Head', value:'Head'},
      {key:'Chest', value:'Chest'},
      {key:'Legs', value:'Legs'},
      {key:'Boots', value:'Boots'},
    ];
  }

  get slotOptions() {
    return [
      {key:'Head', value:'HEAD'},
      {key:'Chest', value:'CHEST'},
      {key:'Legs', value:'LEGS'},
      {key:'Boots', value:'BOOTS'},
      {key:'Effect', value:'EFFECT'},
      {key:'Trail', value:'TRAIL'},
      {key:'Crown', value:'CROWN'},
      {key:'Companion', value:'COMPANION'},
      {key:'Gadget', value:'GEDGET'},
    ];
  }

  get typeOptions() {
    return [
      {key:'Plugin', value:0},
      {key:'Pure', value:1},
      {key:'Hybrid', value:2},
    ];
  }
}
