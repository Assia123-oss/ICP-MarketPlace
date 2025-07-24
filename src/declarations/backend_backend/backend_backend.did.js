export const idlFactory = ({ IDL }) => {
  const Role = IDL.Variant({ 'JobSeeker' : IDL.Null, 'Employer' : IDL.Null });
  const User = IDL.Record({
    'id' : IDL.Text,
    'portfolio' : IDL.Opt(IDL.Text),
    'name' : IDL.Text,
    'role' : Role,
    'email' : IDL.Text,
  });
  return IDL.Service({
    'getUser' : IDL.Func([IDL.Text], [IDL.Opt(User)], ['query']),
    'registerUser' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, Role, IDL.Opt(IDL.Text)],
        [IDL.Text],
        [],
      ),
    'updateUser' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Opt(IDL.Text)],
        [IDL.Text],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
