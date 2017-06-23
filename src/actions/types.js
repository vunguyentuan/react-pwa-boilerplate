// @flow

export type Action =
  | {
      type: 'LOGGED_IN',
      data: { id: string, name: string },
    }
  | { type: 'SKIPPED_LOGIN' }
  | { type: 'LOGGED_OUT' };

export type Dispatch = (
  // eslint-disable-next-line
  action: Action | ThunkAction | PromiseAction | Array<Action>
) => any;

export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
