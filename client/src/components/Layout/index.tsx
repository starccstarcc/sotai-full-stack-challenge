import React, { useContext } from 'react';
import { useCurrentUser } from '@client/context/currentUserContext';
import { importCSVFromFile } from '@client/apis';

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const { user, setUser } = useCurrentUser();
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <>
      <nav className='relative flex flex-wrap items-center justify-between py-3 bg-blue-600 mb-3'>
        <div className='container px-4 mx-auto flex flex-wrap items-center justify-between'>
          <div className='w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start'>
            <a
              className='text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white'
              href='#pablo'
            >
              Satoi
            </a>
            <button
              className='text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none'
              type='button'
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <span>=</span>
            </button>
          </div>
          <div
            className={'lg:flex flex-grow items-center' + (navbarOpen ? ' flex' : ' hidden')}
            id='example-navbar-danger'
          >
            <ul className='flex flex-col lg:flex-row list-none lg:ml-auto'>
              {user?.isLoggedin ? (
                <>
                  <li className='nav-item'>
                    <button
                      className='px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'
                      onClick={(e) => {
                        importCSVFromFile();
                      }}
                    >
                      <span className='ml-2'>Import CSV From File</span>
                    </button>
                  </li>
                  <li className='nav-item'>
                    <a
                      className='px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'
                      href='/login'
                      onClick={(e) => {
                        e.preventDefault();
                        sessionStorage.removeItem('token');
                        setUser({ username: '', isLoggedin: false });
                      }}
                    >
                      <span className='ml-2'>Logout</span>
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a
                      className='px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'
                      href='/'
                    >
                      <span className='ml-2'>{user.username}</span>
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className='nav-item'>
                    <a
                      className='px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'
                      href='/login'
                    >
                      <span className='ml-2'>Login</span>
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a
                      className='px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'
                      href='/signup'
                    >
                      <span className='ml-2'>signup</span>
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {user?.isLoggedin ? (
        <div>{children}</div>
      ) : (
        <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
          <div className='max-w-md w-full space-y-8'>{children}</div>
        </div>
      )}
    </>
  );
}
