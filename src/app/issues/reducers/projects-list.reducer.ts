import * as projectsListActions from '../actions/projects-list.actions';
import { IProjectsListState } from '../models/i-projects-list-state.model';

function switchSelectedProp(isSelected: boolean) {
  return (project: any) => ({ ...project, isSelected });
}

function changeProject(state: IProjectsListState, payload: string) {
  const projects = state.model
    .map(switchSelectedProp(false))
    .map((project: any) => project.key === payload ? switchSelectedProp(true)(project) : project);

  return { ...state, model: projects };
}

const initialState = {
  isPending: false,
  isError: false,
  model: [],
};

export function projectsListReducer(
  state: IProjectsListState = initialState,
  action: projectsListActions.ProjectsListActions,
) {
  switch (action.type) {
    case projectsListActions.FETCH_LIST:
      return { ...initialState, isPending: true };

    case projectsListActions.FETCH_LIST_SUCCESS:
      return { ...initialState, model: action.payload };

    case projectsListActions.FETCH_LIST_ERROR:
      return { ...initialState, isError: true };

    case projectsListActions.CHANGE_PROJECT:
      return changeProject(state, action.payload);

    default:
      return state;
  }
}
