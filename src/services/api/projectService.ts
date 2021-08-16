import { BehaviorSubject } from 'rxjs';
import { tokenHelper } from '../../helpers/tokenHelper';
import { ApiResponse, Project } from '../../model/Model';
import { handleResponse } from '../../helpers/responseHandler';
import { getReadPath } from '../../helpers/searchPathHelper';
const { REACT_APP_PROJECTS_PATH } = process.env;

const PROJECTS_PATH = REACT_APP_PROJECTS_PATH ?? 'http//localhost:8000/projects';

const projectsSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('projects') || 'null'));

export const projectService = {
    readAll,
    read,
    create,
    update,
    remove,
    projects: projectsSubject.asObservable(),
    get projectsValue(): Project[] { return projectsSubject.value },
};

function readAll() {
    const requestOptions: any = { method: 'GET', headers: tokenHelper.getAuthHeader() };
    return fetch(PROJECTS_PATH + '/all', requestOptions)
        .then(handleResponse)
        .then(response => {
            let data = response.data;
            localStorage.setItem('projects', JSON.stringify(data));
            projectsSubject.next(data);

            return { success: true, data: data, error: '' };
        })
        .catch(error => {
            return { success: false, data: {}, error: error };
        })
}

function read(page: number, perPage: number, term: string = '') {
    let result: ApiResponse;
    const requestOptions: any = { method: 'GET', headers: tokenHelper.getAuthHeader() };
    const path = getReadPath('projects', page, perPage, term);

    return fetch(path, requestOptions)
        .then(handleResponse)
        .then(response => {
            let projects = response.data;
            let numOfPages = response.numOfPages;
            let total = response.total;

            localStorage.setItem('projects', JSON.stringify(projects));
            projectsSubject.next(projects);

            result = { success: true, data: { projects, numOfPages, total }, error: '' };

            return result;
        })
        .catch(error => {
            result = { success: false, data: {}, error: error };

            return result;
        })
}

function create(project: Project) {
    const requestOptions: any = {
        method: 'POST',
        headers: { ...tokenHelper.getAuthHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: project.name, description: project.description,
            status: project.status, customer: project.customer, lead: project.lead
        })
    };
    return fetch(PROJECTS_PATH, requestOptions)
        .then(handleResponse)
        .then(response => { return { success: true, data: response.data, error: '' }; })
        .catch(error => { return { success: false, data: {}, error: error }; })
}

function update(project: Project) {
    const requestOptions: any = {
        method: 'PUT',
        headers: { ...tokenHelper.getAuthHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: project.id, name: project.name, description: project.description,
            status: project.status, customer: project.customer, lead: project.lead
        })
    };
    return fetch(PROJECTS_PATH + '/' + project.id, requestOptions)
        .then(handleResponse)
        .then(response => { return { success: true, data: response.data, error: '' }; })
        .catch(error => { return { success: false, data: {}, error: error }; })
}

function remove(id: number) {
    let requestOptions: any = { method: 'DELETE', headers: tokenHelper.getAuthHeader() };
    return fetch(PROJECTS_PATH + '/' + id, requestOptions)
        .then(handleResponse)
        .then(response => { return response; })
        .catch(error => {
            return { success: false, data: {}, error: error };
        })
}

