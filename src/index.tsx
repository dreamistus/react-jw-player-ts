import React from 'react';
import isEqual from 'react-fast-compare';

import getPlayerOpts from './helpers/get-player-opts';
import initialize from './helpers/initialize';
import installPlayerScript from './helpers/install-player-script';
import removeJWPlayerInstance from './helpers/remove-jw-player-instance';
import { ExtendedWindow, ReactJWPlayerProps, ReactJWPlayerState } from './types';

const UNIQUE_SCRIPT_ID = 'jw-player-script';
const DISPLAY_NAME = 'ReactJWPlayer';

const noOp = (): void => {
  // do nothing.
};

const DEFAULT_PROPS: Omit<ReactJWPlayerProps, 'playerId' | 'playerScript'> = {
  aspectRatio: 'inherit',
  file: '',
  isAutoPlay: undefined,
  isMuted: undefined,
  playlist: '',
  customProps: {},
  onAdPlay: noOp,
  onAdSkipped: noOp,
  onAdComplete: noOp,
  onMute: noOp,
  onPlay: noOp,
  onReady: noOp,
  onError: noOp,
  onAdPause: noOp,
  onPause: noOp,
  onTime: noOp,
  onBuffer: noOp,
  onBufferChange: noOp,
  onAdClick: noOp,
  onAdCompanions: noOp,
  onAdError: noOp,
  onAdImpression: noOp,
  onAdRequest: noOp,
  onAdStarted: noOp,
  onAdTime: noOp,
  onFirstFrame: noOp,
  onFullscreen: noOp,
  onIdle: noOp,
  onSeek: noOp,
  onSetupError: noOp,
  onVolume: noOp
};

class ReactJWPlayer extends React.Component<ReactJWPlayerProps, ReactJWPlayerState> {
  static displayName = DISPLAY_NAME;

  static defaultProps = DEFAULT_PROPS;

  private uniqueScriptId;

  private videoRef: Element | null;

  constructor(props: ReactJWPlayerProps) {
    super(props);

    this.uniqueScriptId = UNIQUE_SCRIPT_ID;
    this.videoRef = null;
    
    this._initialize = this._initialize.bind(this);
    this._setVideoRef = this._setVideoRef.bind(this);
  }

  componentDidMount(): void {
    const isJWPlayerScriptLoaded = Boolean((window as ExtendedWindow).jwplayer);
    const existingScript = document.getElementById(this.uniqueScriptId);

    if (isJWPlayerScriptLoaded || existingScript) {
      this._initialize();
      return;
    }

    if (!existingScript) {
      installPlayerScript({
        context: document,
        onLoadCallback: this._initialize,
        scriptSrc: this.props.playerScript,
        uniqueScriptId: this.uniqueScriptId
      });
    } 
  }

  shouldComponentUpdate(nextProps: ReactJWPlayerProps): boolean {
    const hasFileChanged = this.props.file !== nextProps.file;
    const hasPlaylistChanged = !isEqual(this.props.playlist, nextProps.playlist);
    const hasIsMutedChanged = this.props.isMuted !== nextProps.isMuted;

    return hasFileChanged || hasPlaylistChanged || hasIsMutedChanged;
  }

  componentDidUpdate(): void {
    if (typeof window !== 'undefined') {
      const extendedWindow = window as ExtendedWindow;

      if (!extendedWindow.jwplayer) {
        console.error('JWPlayer script not initialized');

        return;
      }
      if (!this.videoRef) {
        console.error(`JWPlayer instance (${ this.props.playerId }) not initialized`);

        return;
      }
    
      const player = extendedWindow.jwplayer(this.videoRef);

      //TODO: update other props
      if (player) {
        player.setMute(this.props.isMuted);
      }
    }
  }

  componentWillUnmount(): void {
    const existingScript = document.getElementById(this.uniqueScriptId);
    existingScript?.removeEventListener('onload', this._initialize);
    if (this.videoRef) {
      removeJWPlayerInstance({ playerRef: this.videoRef, context: window });
    }
  }

  _initialize(): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const component = this;
    let player;

    if (typeof window !== 'undefined' && this.videoRef !== null) {
      const extendedWindow = window as ExtendedWindow;
      player = extendedWindow.jwplayer && extendedWindow.jwplayer(this.videoRef);
    }
    if (!player) {
      // this player ref may have been destroyed already
      return;
    }

    const playerOpts = getPlayerOpts(this.props);

    initialize({ component, player, playerOpts });
  }

  _setVideoRef = (element: HTMLDivElement): void => {
    this.videoRef = element;
  };

  render(): JSX.Element {
    return (
      <div className={ this.props.className } >
        <div id={ this.props.playerId } ref={ this._setVideoRef } />
      </div>
    );
  }
}

export default ReactJWPlayer;
