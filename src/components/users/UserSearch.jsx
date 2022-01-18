import { useState, useContext } from 'react';
import GithubContext from '../../context/github/GithubContext';
import AlertContext from '../../context/alerts/AlertContext';
import { getUsers } from '../../context/github/GithubActions';

const UserSearch = () => {
  const [text, setText] = useState('');
  const searchTextHandler = (e) => setText(e.target.value);
  const { users, dispatch } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    if (text === '') {
      setAlert('Please enter something', 'error');
    } else {
      const users = await getUsers(text);
      dispatch({ type: 'GET_USERS', payload: users });
      setText('');
    }
  };

  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8 '>
      <div>
        <form onSubmit={formSubmitHandler}>
          <div className='form-control'>
            <div className='relative'>
              <input
                type='text'
                className='w-full pr-40 bg-gray-200 input input-lg text-black'
                value={text}
                onChange={searchTextHandler}
              />
              <button
                type='submit'
                className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg'
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button
            onClick={() => dispatch({ type: 'SET_USERS' })}
            className='btn-ghost btn-lg'
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default UserSearch;