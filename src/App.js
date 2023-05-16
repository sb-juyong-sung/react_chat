import BasicGroupChannelSample from './samples/basicGroupChannel/BasicGroupChannel';
import BasicOpenChannelSample from './samples/basicOpenChannel/BasicOpenChannel';

import GroupChannelMuteUnmuteUsers from './samples/groupChannelMuteUnmuteUsers/GroupChannelMuteUnmuteUsers';
import GroupChannelRetrieveAListOfBannedOrMutedUsers from './samples/groupChannelRetrieveAListOfBannedOrMutedUsers/GroupChannelRetrieveAListOfBannedOrMutedUsers';
import GroupChannelBanUnbanUsers from './samples/groupChannelBanUnbanUsers/GroupChannelBanUnbanUsers';

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
    <GroupChannelBanUnbanUsers sb={sb} />
  );
}

export default App;