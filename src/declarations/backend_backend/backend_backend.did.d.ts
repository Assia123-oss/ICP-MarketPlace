import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type Role = { 'JobSeeker' : null } |
  { 'Employer' : null };
export interface User {
  'id' : string,
  'portfolio' : [] | [string],
  'name' : string,
  'role' : Role,
  'email' : string,
}
export interface _SERVICE {
  'getUser' : ActorMethod<[string], [] | [User]>,
  'registerUser' : ActorMethod<
    [string, string, string, Role, [] | [string]],
    string
  >,
  'updateUser' : ActorMethod<[string, string, string, [] | [string]], string>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
