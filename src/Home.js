import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <div>
                <h1>Basic channel</h1>
                <ul>
                    <li><Link to='/group-channel'>Basic Group Channel</Link></li>
                    <li><Link to='/open-channel'>Basic Open Channel</Link></li>
                </ul>
            </div>
            <div>
                <h1>Group channel samples</h1>
                <ul>
                    <li><Link to='/group-channel-mute-unmute-users'>Group Channel Mute Unmute Users</Link></li>
                    <li><Link to='/group-channel-retrieve-a-list-of-banned-or-muted-users'> Group Channel Retrieve A List Of Banned Or Muted Users </Link></li>
                    <li><Link to='/group-channel-ban-unban-users'> Group Channel Ban Unban Users </Link></li>
                    <li><Link to='/group-channel-operators-list'> Group Channel Operators List </Link></li>
                    <li><Link to='/group-channel-register-unregister-operator'> Group Channel Register Unregister Operator </Link></li>
                    <li><Link to='/group-channel-typing-indicator'> Group Channel Typing Indicator </Link></li>
                    <li><Link to='/group-channel-send-an-admin-message'> Group Channel Send An Admin Message </Link></li>
                    <li><Link to='/group-channel-freeze-unfreeze'> Group Channel Freeze Unfreeze </Link></li>
                    <li><Link to='/group-channel-mark-message-as-read'> Group Channel Mark Message As Read </Link></li>
                    <li><Link to='/group-channel-retrieve-online-status'> Group Channel Retrieve Online Status </Link></li>
                    <li><Link to='/group-channel-retrieve-number-of-members-havent-read-message'> Group Channel Retrieve Number Of Members Havent Read Message </Link></li>
                    <li><Link to='/group-channel-message-threading'> Group Channel Message Threading </Link></li>
                    <li><Link to='/group-channel-user-profile-update'> Group Channel User Profile Update </Link></li>
                    <li><Link to='/group-channel-retrieve-number-of-members-havent-received-message'> Group Channel Retrieve Number Of Members Havent Received Message </Link></li>
                    <li><Link to='/group-channel-polls'> Group Channel Polls </Link></li>
                    <li><Link to='/group-channel-react-to-a-message'> Group Channel React To A Message </Link></li>
                </ul>
            </div>
            <div>
                <h1>Open Channel samples</h1>
                <ul>
                <li><Link to='/open-channel-send-an-admin-message'> Open Channel Send An Admin Message </Link></li>
                <li><Link to='/open-channel-copy-message'> Open Channel Copy Message </Link></li>
                <li><Link to='/open-channel-freeze'> Open Channel Freeze </Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Home;