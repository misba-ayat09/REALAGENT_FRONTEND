import { Config } from '../config';
import { SocketAdapterImpl } from './SocketAdapter/SocketAdapterImpl';

class SocketSingleton {
  private static instances: Record<string, SocketAdapterImpl> = {};

  static getSocketAdapter(url: string): SocketAdapterImpl {
    if (!SocketSingleton.instances[url]) {
      SocketSingleton.instances[url] = new SocketAdapterImpl(url);
    }
    return SocketSingleton.instances[url];
  }
}

export const socketAdapter = SocketSingleton.getSocketAdapter(Config.API_URL + '/realtime/notification');

export * from './RealTimeEventHandler/RealTimeEvent';
export * from './RealTimeEventHandler/RealTimeEventHandler';
export * from './RealTimeEventObserverDecorator/RealTimeEventObserverDecorator';
export * from './SocketAdapter/SocketAdapter';
export * from './SocketAdapter/SocketAdapterImpl';
