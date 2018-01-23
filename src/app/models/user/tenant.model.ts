export class Tenant {
  private _id: number;
  private _userId: number;
  private _supervisor: boolean = false;
  private _owner: boolean;
  private _buildingId: number;

  constructor() {}

  get id(): number {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }

  get userId(): number {
    return this._userId;
  }

  set userId(user: number) {
    this._userId = user;
  }

  get supervisor(): boolean {
    return this._supervisor;
  }

  set supervisor(sup: boolean) {
    this._supervisor = sup;
  }

  get owner(): boolean {
    return this._owner;
  }

  set owner(owner: boolean) {
    this._owner = owner;
  }

  get buildingId(): number {
    return this._buildingId;
  }

  set buildingId(building: number) {
    this._buildingId = building;
  }
}
