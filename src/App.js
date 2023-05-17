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
    <GroupChannelRetrieveOnlineStatus sb={sb} />
  );
}

export default App;