import { handleResponse } from '../../helpers/responseHandler';
import { tokenHelper } from '../../helpers/tokenHelper';
import { ApiResponse } from '../../model/Model';
const { REACT_APP_SEARCH_PATH } = process.env;

const SEARCH_PATH = REACT_APP_SEARCH_PATH ?? 'http://localhost:8000/search';

export const searchService = {
    searchFor
}

function searchFor(searchType: string, searchTerm: string) {
    let result: ApiResponse;
    const requestOptions: any = { method: 'GET', headers: tokenHelper.getAuthHeader() };
    const path = SEARCH_PATH + '/' + searchType + '?term=' + searchTerm;

    return fetch(path, requestOptions)
        .then(handleResponse)
        .then(response => {
            const data = {
                entities: response.entities,
                numOfPages: response.numOfPages
            }            

            result = { success: true, data: data, error: ''};
            
            return result;
        })
        .catch(error => {
            result = { success: false, data: {}, error: error };
            
            return result;
        })
}