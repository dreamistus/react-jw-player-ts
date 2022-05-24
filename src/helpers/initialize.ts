import ReactJWPlayer from '..';
import { callbackToEventMap, ReactJWPlayerProps } from '../types';
import { PlayerOpts } from './get-player-opts';


type InitializeArgType = { 
  component: ReactJWPlayer;
  player: jwplayer.JWPlayer;
  playerOpts: PlayerOpts; };

function initialize({ component, player, playerOpts }: InitializeArgType): void {
  player.setup( playerOpts );

  /* Link callbacks to native jwplayer events */
  (Object.keys(component.props) as Array<keyof ReactJWPlayerProps>).forEach(callbackName => {
    const eventName = callbackToEventMap[callbackName];
    if (eventName) {
      const callback = component.props[callbackName] as jwplayer.EventCallback<jwplayer.EventParams[typeof eventName]>;
      player.on(eventName, callback);
    }
  }
  );
}

export default initialize;
