const { REACT_APP_CLIENTS_PATH } = process.env;
const { REACT_APP_PROJECTS_PATH } = process.env;

const CLIENTS_PATH = REACT_APP_CLIENTS_PATH ?? 'http//localhost:8000/clients';
const PROJECTS_PATH = REACT_APP_PROJECTS_PATH ?? 'http//localhost:8000/projects';

export function getReadPath(type: string, page: number, limit: number, searchTerm: string) {
    let root = type === 'clients' ? CLIENTS_PATH : PROJECTS_PATH;
    let path = root + '?page=' + page + '&limit=' + limit;
    path += searchTerm ? '&term=' + searchTerm.trim() : '';
    return path;
}