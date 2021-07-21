import { Client, User } from "../model/Model";

export const selectOptionService = {
    getLeads,
    getClients
};

function getLeads(leads: User[], emptyOption = false): any {
    let options: any[] = [];
    if (emptyOption)
        options.push({ label: 'Select lead ... ', value: '' });

    leads.forEach((lead: User) => {
        options.push({ label: lead.firstname + ' ' + lead.lastname, value: lead.id });
    });

    return options;
}

function getClients(clients: Client[], emptyOption = false): any {
    let options: any[] = [];
    if (emptyOption)
        options.push({ label: 'Select client ... ', value: '' });

    clients.forEach((client: Client) => {
        options.push({ label: client.name, value: client.id });
    });

    return options;
}