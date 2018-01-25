import { Tenant } from './../user/tenant.model';
export class Problem {

    id: any;
    title: string;
    description: string;
    tenant: Tenant;
    firm: any;
    postDate: string;
    repairDate: string;
    openForAll: boolean;
    active: boolean;
    images: any[] = [];
    imgNo: any;

    constructor() {
        this.title = '';
        this.description = '';
        this.openForAll = false;
    }
}
