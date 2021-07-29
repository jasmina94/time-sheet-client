import { useState } from 'react';
import { Client } from '../../model/Model';
import { ClientDetails } from './ClientDetails';

export const ClientDetailsList = (props: any) => {
    return (
        <div className='accordion-wrap clients'>
            {props.clients.map((item: Client) => 
                <ClientDetails key={item.id} client={item} handleToUpdate={props.handleToUpdate}/>
            )}
        </div>
    )
}