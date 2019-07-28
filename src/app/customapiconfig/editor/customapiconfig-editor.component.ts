import {Component, Input, OnInit} from "@angular/core";
import {UUID} from "angular2-uuid";
import {ActivatedRoute, Router} from "@angular/router";
import {APIResult} from "app/models/shared/result";
import {CustomApiConfig} from "app/models/core/customapiconfig";
import {CustomApiConfigService} from "app/customapiconfig/customapiconfig.service";

declare let M:any;

@Component ({
  selector: "customapiconfig-editor",
  templateUrl: "./customapiconfig-editor.component.html",
  styleUrls: ["./customapiconfig-editor.component.scss"],
})
export class CustomApiConfigEditorComponent implements OnInit {

  @Input()
  id: UUID = null;

  model:{name:string, type:string, index:boolean, primaryKey:boolean, deletable:boolean}[] = [];

  customApiConfig: CustomApiConfig = new CustomApiConfig();

  constructor(private customApiConfigService: CustomApiConfigService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params["id"] !== "undefined") {
        this.id = params["id"];

        if (this.id) this.getCustomApiConfig(this.id);
        else {
          this.model.push({
            name: "id",
            type: "uuid",
            index: false,
            primaryKey: true,
            deletable: false
          });
        }
      }
    });
  }

  add(event) {
    event.preventDefault();
    this.model.push({
      name: "",
      type: "string",
      index: false,
      primaryKey: false,
      deletable: true
    });
  }

  delete(event, index) {
    event.preventDefault();
    this.model = this.model.filter((x, i) => i !== index)
  }

  getCustomApiConfig(id: UUID) {
    this.customApiConfigService.get(id).subscribe(
      next => {
        this.customApiConfig = next;
      },
      error => {
        console.log("CustomApiConfig request failed");
      },
      () => {
        try {
          let keys = Array.from(this.customApiConfig.model.keys());
          this.model = keys.map(key => {return {
            name: key,
            type: this.customApiConfig.model.get(key),
            index: this.customApiConfig.tableConfig.indexes.includes(key),
            primaryKey: this.customApiConfig.tableConfig.primaryKey === key,
            deletable: this.customApiConfig.tableConfig.primaryKey !== key
          }});
        } catch (e) {
          this.model = Object.keys(this.customApiConfig.model).map(key => {return {
            name:key,
            type:this.customApiConfig.model[key],
            index: this.customApiConfig.tableConfig.indexes.includes(key),
            primaryKey: this.customApiConfig.tableConfig.primaryKey === key,
            deletable: this.customApiConfig.tableConfig.primaryKey !== key
          }})
        }
      }
    )
  }

  get isCreate(): boolean{
    return typeof this.id == "undefined";
  }

  save(event) {
    event.preventDefault();
    const filteredFields = this.model.filter(x => x.name.length > 0);

    this.customApiConfig.model = filteredFields.reduce((a,v) => {
      a[v.name] = v.type;
      return a;
    }, {}) as any;
    this.customApiConfig.tableConfig.indexes = filteredFields.filter(x => x.index).map(x => x.name);

    this.customApiConfig.tableConfig.primaryKey = filteredFields.find(x => x.primaryKey) ? filteredFields.find(x => x.primaryKey).name : 'id';

    if (this.isCreate)
      this.customApiConfigService.post(this.customApiConfig).subscribe(x => {
        let result = x as APIResult;
        if (result.inserted > 0) {
          M.toast({html: 'Saved'}, 4000);
          this.router.navigateByUrl(`/customApiConfigs/${result.generated_keys[0]}/edit`);
        } else M.toast({html: 'Something when wrong'}, 4000);
      });
    else
      this.customApiConfigService.put(this.customApiConfig.id, this.customApiConfig).subscribe(x => {
        let result = x as APIResult;
        if (result.replaced > 0) M.toast({html: 'Saved'}, 4000);
        if (result.unchanged > 0) M.toast({html: 'No Changes Found'}, 4000);
        else M.toast({html: 'Something when wrong'}, 4000);
      });
  }

  get typeDropdownOptions() {
    return [
      {key:"UUID/Guid", value:"uuid"},
      {key:"String", value:"string"},
      {key:"Integer", value:"integer"},
      {key:"Float", value:"float"},
      {key:"Long", value:"long"},
      {key:"Boolean", value:"bool"},
      //lists
      {key:"List<UUID/Guid>", value:"list<uuid>"},
      {key:"List<String>", value:"list<string>"},
      {key:"List<Integer>", value:"list<integer>"},
      {key:"List<Float>", value:"list<float>"},
      {key:"List<Long>", value:"list<long>"},
      {key:"List<Boolean>", value:"list<bool>"},
    ];
  }
}
