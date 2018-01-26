import { Tenant } from './../user/tenant.model';

export class Announcement {


    title: string;
    message: string;
    tenant: Tenant;
    date: string;
    building: any;
    isAnonymous: boolean;
    assembly: boolean;
    parlRecord: any;
}
