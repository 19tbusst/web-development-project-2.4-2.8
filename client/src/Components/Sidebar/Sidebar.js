import { FiMenu } from 'react-icons/fi';
import { FaHome } from 'react-icons/fa';
import { BsFillPersonFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { signOutUser } from '../../firebase';

export default function Sidebar(props) {
    const { username, profile } = props;
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const button = document.getElementById('menu-button');
        if (menuOpen) { button.style.left = '17.8vw' }
        else { button.style.left = '-2px' }
    }, [menuOpen]);

    return (
        <aside>
            <button
                id='menu-button'
                onClick={() => {
                    if (menuOpen) { setMenuOpen(false); }
                    else { setMenuOpen(true) }
                }}
            >
                <FiMenu />
            </button>
            {menuOpen &&
                <div className='Sidebar'>
                    <div className='user-info'>
                        <img src={profile} alt='profile' />
                        <p>{username}</p>
                    </div>
                    <hr />
                    <ul>
                        <li>
                            <BsFillPersonFill />
                            <a href='/profile'>Profile</a>
                        </li>
                        <li>
                            <FaHome />
                            <a href='/home'>Home</a>
                        </li>
                        <li>
                            <button onClick={() => {
                                signOutUser()
                                    .then(res => window.location.href = '/')
                            }}>
                                Log out
                            </button>
                        </li>
                    </ul>
                </div>}
        </aside >
    )
}