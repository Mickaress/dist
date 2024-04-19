export const enum StateID {
  Active = 1,
  Archived = 2,
  Review = 3,
  Approved = 4,
  Rejected = 5,
}

export type StateType = {
  id: StateID;
  state: string;
};

export const StateClass: Record<StateID, string> = {
  [StateID.Active]: 'active',
  [StateID.Archived]: 'archived',
  [StateID.Review]: 'review',
  [StateID.Approved]: 'approved',
  [StateID.Rejected]: 'rejected',
};
