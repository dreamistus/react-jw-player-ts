import { ExtendedWindow } from '../types';

type RemoveJWPlayerInstanceArgs = {
  playerRef: Element; 
  context: Window & typeof globalThis;
};

function removeJWPlayerInstance({ playerRef, context }: RemoveJWPlayerInstanceArgs): void {
  const extendedWindow = context as ExtendedWindow;
  const player = extendedWindow.jwplayer && extendedWindow.jwplayer(playerRef);

  if (player) {
    player.remove();
  }
}

export default removeJWPlayerInstance;
