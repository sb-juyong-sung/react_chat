import BasicGroupChannelSample from './samples/basicGroupChannel/BasicGroupChannel';
import BasicOpenChannelSample from './samples/basicOpenChannel/BasicOpenChannel';

import SendbirdChat from '@sendbird/chat';
import { GroupChannelModule } from '@sendbird/chat/groupChannel';
import { OpenChannelModule } from '@sendbird/chat/openChannel';


const App = () => {
  const sb = SendbirdChat.init({
    appId: "AF724953-484C-4A31-A559-60D67D914C0A",
    modules: [
      new GroupChannelModule(),
      new OpenChannelModule(),
    ],
  }
  );

  return (
    <BasicOpenChannelSample sb={sb} />
  );
}

export default App;