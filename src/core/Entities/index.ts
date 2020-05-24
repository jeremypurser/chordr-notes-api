export interface Entity {
  id: string;
}

export interface User extends Entity {
  firstName: string;
  lastName: string;
  email: string;
}

type GuitarString = 0 | 1 | 2 | 3 | 4 | 5;

export interface Chord extends Entity {
  chord: {
    [guitarString in GuitarString]: number;
  };
}

type Status = 'created' | 'retrieved' | 'updated' | 'marked for deletion';

export type ChordrResponse<D, S extends Status> =
  | {
      // Get request
      success: true;
      status: S;
      data: D;
    }
  | {
      // Post, Put, or Delete request
      success: true;
      status: S;
      data: D;
    }
  | {
      // Error
      success: false;
      status: 'error';
      error: string;
    };
