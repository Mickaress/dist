import { StateType } from './State';

export type CandidateResponseType = {
  id: number;
  vacancy: {
    id: number;
    title: string;
    project: {
      id: number;
      title: string;
    };
  };
  date: string;
  state: StateType;
};
