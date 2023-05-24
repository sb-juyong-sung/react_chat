import { Routes, Route } from 'react-router-dom';
import Home from './Home';

import BasicGroupChannelSample from './samples/basicGroupChannel/BasicGroupChannel';
import BasicOpenChannelSample from './samples/basicOpenChannel/BasicOpenChannel';

import GroupChannelMuteUnmuteUsers from './samples/groupChannelMuteUnmuteUsers/GroupChannelMuteUnmuteUsers';
import GroupChannelRetrieveAListOfBannedOrMutedUsers from './samples/groupChannelRetrieveAListOfBannedOrMutedUsers/GroupChannelRetrieveAListOfBannedOrMutedUsers';
import GroupChannelBanUnbanUsers from './samples/groupChannelBanUnbanUsers/GroupChannelBanUnbanUsers';
import GroupChannelOperatorsList from './samples/groupChannelOperatorsList/GroupChannelOperatorsList';
import GroupChannelRegisterUnregisterOperator from './samples/groupChannelRegisterUnregisterOperator/GroupChannelRegisterUnregisterOperator';
import GroupChannelTypingIndicator from './samples/groupChannelTypingIndicator/GroupChannelTypingIndicator';
import GroupChannelSendAnAdminMessage from './samples/groupChannelSendAnAdminMessage/GroupChannelSendAnAdminMessage';
import GroupChannelFreezeUnfreeze from './samples/groupChannelFreezeUnfreeze/GroupChannelFreezeUnfreeze';
import GroupChannelMarkMessagesAsRead from './samples/groupChannelMarkMessagesAsRead/GroupChannelMarkMessagesAsRead';
import GroupChannelRetrieveOnlineStatus from './samples/groupChannelRetrieveOnlineStatus/GroupChannelRetrieveOnlineStatus';
import GroupChannelRetrieveNumberOfMembersHaventReadMessage from './samples/groupChannelRetrieveNumberOfMembersHaventReadMessage/GroupChannelRetrieveNumberOfMembersHaventReadMessage';
import GroupChannelMessageThreading from './samples/groupChannelMessageThreading/GroupChannelMessageThreading';
import GroupChannelUserProfileUpdate from './samples/groupChannelUserProfileUpdate/GroupChannelUserProfileUpdate';
import GroupChannelRetrieveNumberOfMembersHaventReceivedMessage from './samples/groupChannelRetrieveNumberOfMembersHaventReceivedMessage/GroupChannelRetrieveNumberOfMembersHaventReceivedMessage';
import GroupChannelPolls from './samples/groupChannelPolls/GroupChannelPolls';
import GroupChannelReactToAMessage from './samples/groupChannelReactToAMessage/GroupChannelReactToAMessage';

import OpenChannelSendAnAdminMessage from './samples/openChannelSendAnAdminMessage/OpenChannelSendAnAdminMessage';
import OpenChannelCopyMessage from './samples/openChannelCopyMessage/OpenChannelCopyMessage';
import OpenChannelFreeze from './samples/openChannelFreeze/OpenChannelFreeze';

import SendbirdChat from '@sendbird/chat';
import { GroupChannelModule } from '@sendbird/chat/groupChannel';
import { OpenChannelModule } from '@sendbird/chat/openChannel';


const App = () => {
  const sb = SendbirdChat.init({
    appId: "C05427B5-F36B-4445-BFB5-393B3A721C8C",
    modules: [
      new GroupChannelModule(),
      new OpenChannelModule(),
    ],
  }
  );

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/group-channel' element={<BasicGroupChannelSample sb={sb} />} />
      <Route path='/open-channel' element={<BasicOpenChannelSample sb={sb} />} />
      <Route path='/group-channel-mute-unmute-users' element={<GroupChannelMuteUnmuteUsers sb={sb} />} />
      <Route path='/group-channel-retrieve-a-list-of-banned-or-muted-users' element={<GroupChannelRetrieveAListOfBannedOrMutedUsers sb={sb} />} />
      <Route path='/group-channel-ban-unban-users' element={<GroupChannelBanUnbanUsers sb={sb} />} />
      <Route path='/group-channel-operators-list' element={<GroupChannelOperatorsList sb={sb} />} />
      <Route path='/group-channel-register-unregister-operator' element={<GroupChannelRegisterUnregisterOperator sb={sb} />} />
      <Route path='/group-channel-typing-indicator' element={<GroupChannelTypingIndicator sb={sb} />} />
      <Route path='/group-channel-send-an-admin-message' element={<GroupChannelSendAnAdminMessage sb={sb} />} />
      <Route path='/group-channel-freeze-unfreeze' element={<GroupChannelFreezeUnfreeze sb={sb} />} />
      <Route path='/group-channel-mark-message-as-read' element={<GroupChannelMarkMessagesAsRead sb={sb} />} />
      <Route path='/group-channel-retrieve-online-status' element={<GroupChannelRetrieveOnlineStatus sb={sb} />} />
      <Route path='/group-channel-retrieve-number-of-members-havent-read-message' element={<GroupChannelRetrieveNumberOfMembersHaventReadMessage sb={sb} />} />
      <Route path='/group-channel-message-threading' element={<GroupChannelMessageThreading sb={sb} />} />
      <Route path='/group-channel-user-profile-update' element={<GroupChannelUserProfileUpdate sb={sb} />} />
      <Route path='/group-channel-retrieve-number-of-members-havent-received-message' element={<GroupChannelRetrieveNumberOfMembersHaventReceivedMessage sb={sb} />} />
      <Route path='/group-channel-polls' element={<GroupChannelPolls sb={sb} />} />
      <Route path='/group-channel-react-to-a-message' element={<GroupChannelReactToAMessage sb={sb} />} />
      <Route path='/open-channel-send-an-admin-message' element={<OpenChannelSendAnAdminMessage sb={sb} />} />
      <Route path='/open-channel-copy-message' element={<OpenChannelCopyMessage sb={sb} />} />
      <Route path='/open-channel-freeze' element={<OpenChannelFreeze sb={sb} />} />
    </Routes>
    
    
  );
}

export default App;
