import {Link, Store} from '../store/model';
import {Print, logger} from '../logger';
import {
  RefreshingAuthProvider,
  StaticAuthProvider,
  AccessToken,
} from '@twurple/auth';
import {existsSync, promises, readFileSync} from 'fs';
import {ChatClient} from '@twurple/chat';
import {config} from '../config';

const {twitch} = config.notifications;

const messages: string[] = [];
let alreadySaying = false;

let tokenData: AccessToken = {
  ...(existsSync('./twitch.json') &&
    JSON.parse(readFileSync('./twitch.json', 'utf-8'))),
  accessToken: twitch.accessToken,
  refreshToken: twitch.refreshToken,
};

const authProvider = new RefreshingAuthProvider(
  {
    clientId: twitch.clientId,
    clientSecret: twitch.clientSecret,
    onRefresh: async newTokenData =>
      await promises.writeFile(
        './twitch.json',
        JSON.stringify(newTokenData, null, 4),
        'utf-8'
      ),
  },
  tokenData
);

const chatClient = new ChatClient({authProvider, channels: [twitch.channel]});

chatClient.onJoin((channel: string, user: string) => {
  if (channel === `#${twitch.channel}` && user === chatClient.currentNick) {
    while (messages.length) {
      const message: string | undefined = messages.shift();

      if (message !== undefined) {
        try {
          chatClient.say(channel, message);
          logger.info('✔ twitch message sent');
        } catch (error: unknown) {
          logger.error("✖ couldn't send twitch message", error);
        }
      }
    }
  }

  chatClient.quit();
});

chatClient.onDisconnect(() => {
  alreadySaying = false;
});

export function sendTwitchMessage(link: Link, store: Store) {
  if (
    tokenData.accessToken &&
    twitch.channel &&
    twitch.clientId &&
    twitch.clientSecret &&
    tokenData.refreshToken
  ) {
    logger.debug('↗ sending twitch message');

    messages.push(
      `${Print.inStock(link, store)}\n${link.cartUrl ? link.cartUrl : link.url}`
    );

    if (!alreadySaying) {
      alreadySaying = true;
      chatClient.connect();
    }
  }
}
