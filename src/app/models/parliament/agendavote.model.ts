import { AgendaPoint } from './../parliament/agendapoint.model';
import { Tenant } from './../user/tenant.model';

export class AgendaVote {

    tenant: Tenant;
    agendaPoint: AgendaPoint;
    vote: any;
}
