const enum StateID {
  ActiveState = 1,
  ArchivedState = 2,
  ReviewState = 3,
  ApprovedState = 4,
  RejectedState = 5,
}

type State<T = StateID> = {
  id: T;
  state: string;
};

export type StateType = State<StateID>;

export const StateClass: Record<StateID, string> = {
  [StateID.ActiveState]: 'active',
  [StateID.ArchivedState]: 'archived',
  [StateID.ReviewState]: 'review',
  [StateID.ApprovedState]: 'approved',
  [StateID.RejectedState]: 'rejected',
};
