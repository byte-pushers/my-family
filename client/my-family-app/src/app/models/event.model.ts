import { Event } from './event';
import { BaseDomainModel } from './base-domain.model';
import { Address } from './address';
import { AddressModel } from './address.model';
import { MerchandiseItemModel } from './merchandise-item.model';
import { AgendaItemModel } from './agenda-item.model';
import { AgendaItem } from './agenda-item';
import { MerchandiseItem } from './merchandise-item';

/*interface MerchandiseItem {
  merchandiseType: string;
  productName: string;
  productPrice: number;
  productDescription: string;
  productImageUrl: string;
  SKU?: string;
  size?: string;
  color?: string;
  author?: string;
  ISBN?: string;
  wearableType?: string;
}*/


export class EventModel extends BaseDomainModel implements Event {
  #name: string;
  #type: string;
  #startDate: Date | null;
  #endDate: Date | null;
  #startTime: Date | null;
  #endTime: Date | null;
  #location: Address | null;
  #agendas: AgendaItem[] | null;
  #merchandiseList: MerchandiseItem[] | null;

  constructor(...args: any[])
  constructor(props: any)
  constructor(
    id: number,
    name: string,
    type: string,
    startDate: Date,
    endDate: Date,
    startTime: Date,
    endTime: Date,
    location: Address,
    agendas: AgendaItem[],
    merchandiseList: MerchandiseItem[],
    createdBy?: string,
    createdDate?: Date,
    updatedBy?: string,
    updatedDate?: Date
  )
  constructor() {
    const props: any = {};

    function getSuperParameters(args: IArguments, props: any): any {
      if (args.length === 1) {
        props.id = args[0].id;
        props.name = args[0].name;
        props.type = args[0].type;
        props.startDate = args[0].startDate;
        props.endDate = args[0].endDate;
        props.startTime = args[0].startTime;
        props.endTime = args[0].endTime;
        props.location = args[0].location;
        props.agendas = args[0].agendas;
        props.merchandiseList = args[0].merchandiseList;
        props.createdBy = args[0].createdBy;
        props.createdDate = args[0].createdDate;
        props.updatedBy = args[0].updatedBy;
        props.updatedDate = args[0].updatedDate;
      } else {
        const id = args[0];
        const name = args[1];
        const type = args[2];
        const startDate = args[3];
        const endDate = args[4];
        const startTime = args[5];
        const endTime = args[6];
        const location = args[7];
        const agendas = args[8];
        const merchandiseList = args[9];
        const createdBy = args[10];
        const createdDate = args[11];
        const updatedBy = args[12];
        const updatedDate = args[13];

        props.id = id;
        props.name = name;
        props.type = type;
        props.startDate = startDate;
        props.endDate = endDate;
        props.startTime = startTime;
        props.endTime = endTime;
        props.location = location;
        props.agendas = agendas;
        props.merchandiseList = merchandiseList;
        props.createdBy = createdBy;
        props.createdDate = createdDate;
        props.updatedBy = updatedBy;
        props.updatedDate = updatedDate;
      }

      return props;
    }

    super(getSuperParameters(arguments, props));

    this.#name = props?.name;
    this.#type = props?.type;
    this.#startDate = props && props?.startDate? new Date(props?.startDate) : null;
    this.#endDate = props && props?.endDate? new Date(props?.endDate) : null;
    this.#startTime = props && props?.startTime? new Date(props?.startTime) : null;
    this.#endTime = props && props?.endTime? new Date(props?.endTime) : null;
    this.#location = props && props?.location? new AddressModel(props?.location): null;
    this.#agendas = this.#createAgendas(props?.agendas);
    this.#merchandiseList = this.#createMerchandiseList(props?.merchandiseList);
  }


  // Public getter methods and two-way binding compatibility
  public get name(): string { return this.#name; }
  public set name(value: string) { this.#name = value; }
  public getName(): string { return this.#name; }


  public get type(): string { return this.#type; }
  public set type(value: string) { this.#type = value; }
  public getType(): string { return this.#type; }


  public get startDate(): Date | null { return this.#startDate; }
  public set startDate(value: Date | null) { this.#startDate = value; }
  public getStartDate(): Date | null { return this.#startDate; }


  public get endDate(): Date | null { return this.#endDate; }
  public set endDate(value: Date | null) { this.#endDate = value; }
  public getEndDate(): Date | null { return this.#endDate; }


  public get startTime(): Date | null { return this.#startTime; }
  public set startTime(value: Date | null) { this.#startTime = value; }
  public getStartTime(): Date | null { return this.#startTime; }


  public get endTime(): Date | null { return this.#endTime; }
  public set endTime(value: Date | null) { this.#endTime = value; }
  public getEndTime(): Date | null { return this.#endTime; }


  public get location(): Address | null { return this.#location; }
  public set location(value: Address | null) { this.#location = value; }
  public getLocation(): Address | null { return this.#location; }


  public get agendas(): AgendaItem[] | null { return this.#agendas; }
  public set agendas(value: AgendaItem[]) { this.#agendas = value; }
  public getAgendas(): AgendaItem[] | null { return this.#agendas; }


  public get merchandiseList(): MerchandiseItem[] | null { return this.#merchandiseList; }
  public set merchandiseList(value: MerchandiseItem[]) { this.#merchandiseList = value; }
  public getMerchandiseList(): MerchandiseItem[] | null { return this.#merchandiseList; }


  #createAgendas(agendas?: AgendaItem[]) {
    const agendasArray = Array.isArray(agendas) && agendas.map(agenda => new AgendaItemModel(agenda));

    return agendasArray? agendasArray: [];
  }

  #createMerchandiseList(merchandiseList?: MerchandiseItem[]) {
    const merchandiseListArray = Array.isArray(merchandiseList) && merchandiseList.map(merchandise => new MerchandiseItemModel(merchandise));

    return merchandiseListArray? merchandiseListArray: [];
  }


  public override toString(): string {
    const auditString = `${super.getAttributeAuditStrings()}`;
    return `{
     ${super.getAttributeIdString()}
     name: ${this.#name},
     type: ${this.#type},
     startDate: ${this.#startDate},
     endDate: ${this.#endDate},
     startTime: ${this.#startTime},
     endTime: ${this.#endTime},
     location: ${this.#location},
     agendas: [${JSON.stringify(this.#agendas)}],
     merchandiseList: [${JSON.stringify(this.#merchandiseList)}]${auditString.trim() === ''? `,\n\t  ${auditString}` : ''}
   }`;
  }
}
