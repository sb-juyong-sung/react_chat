import './chat_page.css';
import SendbirdChat from '@sendbird/chat';
import { OpenChannelModule, SendbirdOpenChat } from '@sendbird/chat/openChannel';

const sb = SendbirdChat.init({
  appId: "AF724953-484C-4A31-A559-60D67D914C0A",
  modules: [
      new OpenChannelModule(),
  ],
}
);

const user = await sb.connect("send");

export default function Chat() {
    return (
        <div>
            <div className="align-left">
                <h1>"Channel List"</h1>
                <hr></hr>
            </div>
            <div className="align-right">
                <h1>"Channel Name"</h1>
                <hr></hr>
            </div>
        </div>
    );
}


