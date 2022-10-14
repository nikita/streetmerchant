import {Link, Store} from '../store/model';
import redis, {RedisClientType} from 'redis';
import {config} from '../config';
import {logger} from '../logger';

const {url} = config.notifications.redis;
let client: RedisClientType;

function initRedis(): RedisClientType | null {
  if (url) {
    client = redis.createClient({url});
  }

  return null;
}

export function updateRedis(link: Link, store: Store) {
  try {
    if (client) {
      const key = `${store.name}:${link.brand}:${link.model}`
        .split(' ')
        .join('-');

      const value = {
        ...link,
        labels: store.labels,
        links: store.links,
        name: store.name,
        updatedAt: new Date().toUTCString(),
      };

      const message = JSON.stringify(value);

      client
        .set(key, message)
        .then(_ => logger.info('✔ redis updated'))
        .catch(err => {
          logger.error(`✖ couldn't update redis for key (${key})`);
          throw err;
        });

      client
        .publish('streetmerchant', message)
        .then(_ => logger.info('✔ redis message published'))
        .catch(err => {
          logger.error(`✖ couldn't publish to redis`);
          throw err;
        });
    }
  } catch (error: unknown) {
    logger.error("✖ couldn't update redis", error);
  }
}

initRedis();
