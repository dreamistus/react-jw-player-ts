
export interface ReactJWPlayerProps {
  /** A unique Id for the player instance. Used to distinguish the container divs. */
  playerId: string;

  /** Link to a valid JW Player script. */
  playerScript: string;

  /** Link to a valid JW Player playlist or playlist array. */
  playlist: string | MediaObject[];

  /** An optional aspect ratio to give the video player. Can be 'inherit', 1:1 or 16:9 currently. */
  aspectRatio: 'inherit' | '1:1' | '16:9';

  /** An optional class name to give the container div. */
  className?: string;

  /** Link to a valid JW Player video file. */
  file?: string;

  /** URL to a poster image to display before playback starts. */
  image?: string;

  /** Determines whether the player starts automatically or not. */
  isAutoPlay?: boolean;
  
  /** Determines whether the player starts muted or not. */
  isMuted?: boolean;
  
  /** License Key as supplied in the jwplayer dashboard, under: Players > Tools > Downloads > JW Player */
  licenseKey?: string;
  
  /** Custom JWPlayer properties */
  customProps?: unknown;
}

/* Set of events related to advertisements. */
export interface ReactJWPlayerProps {
  /** Fired whenever an ad is requested by the player. */
  onAdRequest?: jwplayer.EventCallback<jwplayer.EventParams['adRequest']>;

  /** Fired when the user taps skip button during ad. */
  onAdSkipped?: jwplayer.EventCallback<jwplayer.EventParams['adSkipped']>;
  
  /** Fired when ad is done playing. */
  onAdComplete?: jwplayer.EventCallback<jwplayer.EventParams['adComplete']>;

  /** Fired when ad shows up on the screen. */
  onAdImpression?: jwplayer.EventCallback<jwplayer.EventParams['adImpression']>;

  /** VPAID-only. Will trigger when a VPAID ad creative signals to our player that it is starting. 
   * This differs from adImpression since the advertisement may not yet be visible. 
   * Fires after the first onAdPlay event. 
   */
  onAdStarted?: jwplayer.EventCallback<jwplayer.EventParams['adStarted']>;

  /** Fired when new metadata has been broadcasted by the player during an Ad. */
  //TODO: event missing in @types/jwplayer
  //onAdMeta?: jwplayer.EventCallback<jwplayer.EventParams['adMeta']>;

  /** Fired when ad start to play or is resumed after pause. */
  onAdPlay?: jwplayer.EventCallback<jwplayer.EventParams['adPlay']>;

  /** Fired when ad is paused. */
  onAdPause?: jwplayer.EventCallback<jwplayer.EventParams['adPause']>;

  /** Fired whenever an ad contains companions. */
  onAdCompanions?: jwplayer.EventCallback<jwplayer.EventParams['adCompanions']>;

  /** Fired when ad can’t be played for any reason (onError event is fired at the same time). */
  onAdError?: jwplayer.EventCallback<jwplayer.EventParams['adError']>;

  /** Continuous ad playback time update. */
  onAdTime?: jwplayer.EventCallback<jwplayer.EventParams['adTime']>;

  /** Fired when the user taps the ad (omitted if openSafariOnAdClick is set to true) */
  onAdClick?: jwplayer.EventCallback<jwplayer.EventParams['adClick']>;
}

/*  A set of events reporting changes in the player state. 
      Each event (except onReady) has two params 
      newState and oldState that represent current state after event and previous state.
  */
export interface ReactJWPlayerProps {
/** Triggered the instant a user attempts to play a file. */
  //TODO: event missing in @types/jwplayer
  // onPlayAttempt?: jwplayer.EventCallback<jwplayer.EventParams['playAttempt']>;

  /** Triggered by a video's first frame event (Or the instant an audio file begins playback). */
  onFirstFrame?: jwplayer.EventCallback<jwplayer.EventParams['firstFrame']>;

  /** The player stopped playing. */
  onIdle?: jwplayer.EventCallback<jwplayer.EventParams['idle']>;

  //TODO: event missing in @types/jwplayer
  /** The player has done playing current media. */
  // onComplete: jwplayer.EventCallback<jwplayer.EventParams['complete']>;

  /** The player is buffering media. */
  onBuffer?: jwplayer.EventCallback<jwplayer.EventParams['buffer']>;

  /** Fired when the currently playing item loads additional data into its buffer. */
  onBufferChange?: jwplayer.EventCallback<jwplayer.EventParams['bufferChange']>;

  /** The player started to play media. */
  onPlay?: jwplayer.EventCallback<jwplayer.EventParams['play']>;

  /** The player is paused. */
  onPause?: jwplayer.EventCallback<jwplayer.EventParams['pause']>;

  /** The player is created and ready to be used. */
  onReady?: jwplayer.EventCallback<jwplayer.EventParams['ready']>;

  /** Triggered when the player has gone in or out of a mute state. */
  onMute?: jwplayer.EventCallback<jwplayer.EventParams['mute']>;

  /** Triggered when the player's volume is changed. */
  onVolume?: jwplayer.EventCallback<jwplayer.EventParams['volume']>;

  /** While the player is playing, this event is fired as the playback position gets updated. 
   * This may occur as frequently as 10 times per second. 
   */
  onTime?: jwplayer.EventCallback<jwplayer.EventParams['time']>;

  onFullscreen?: jwplayer.EventCallback<jwplayer.EventParams['fullscreen']>;

  onSeek?: jwplayer.EventCallback<jwplayer.EventParams['seek']>;
}

/* Fired when the player encounters any errors. */
export interface ReactJWPlayerProps {
  /**  Fired when an error occurs after setup. */
  onError?: jwplayer.EventCallback<jwplayer.EventParams['error']>;

  /** Fired when an error occurs before setup is complete, or in other words before the onReady Event. */
  onSetupError?: jwplayer.EventCallback<jwplayer.EventParams['setupError']>;
}

/** Misc JWPlayer events */
// export interface ReactJWPlayerProps{
/** Triggers when the recommendations interface is closed. */
//TODO: event missing in @types/jwplayer
// onClose?: jwplayer.EventCallback<jwplayer.EventParams['close']>;

//TODO: event missing in @types/jwplayer
/** Fired when the player is configured to autostart but the browser's settings are preventing it. */
// onAutoStartNotAllowed?: jwplayer.EventCallback<jwplayer.EventParams['autostartNotAllowed']>;
//}


export interface ReactJWPlayerState {
  //TODO: player state
  foo: string;
}

export type PlayerConfigs = { [playerId: string] : unknown }; 
  
export type ExtendedWindow = Window  & typeof globalThis & {
  jwplayer: jwplayer.JWPlayerStatic;
  __JW_PLAYER_CONFIGS__: PlayerConfigs;
};

/**
 * Media object used in playlists\
 * Reference: https://developer.jwplayer.com/jwplayer/docs/jw8-player-configuration-reference#playlists
 * @interface
 */
export interface MediaObject {
  /** URL or path to media resouce  */
  file: string;

  //TODO: add type
  /** Schedule advertising for a specific media file */
  adschedule?: unknown;

  /** Short description of the item. It is displayed below the title. 
   * This can be hidden with the displaydescription option. 
   */
  description?: string;

  /** Poster image URL. Displayed before and after playback. */
  image?: string;

  /** Unique identifier of this item. Used by advertising, analytics and discovery services */
  mediaid?: string;

  /** HLS-only In seconds, the minimum amount of content in an M3U8 required to trigger DVR mode. 
   * Set to 0 to always display DVR mode. (Defaults to 120) 
   */
  minDvrWindow?: number;

  /** URL to a feed that contains related items for a particular playlist item */
  recommendations?: string; 

  //TODO: add type
  /** Used for quality toggling and alternate sources */
  sources?: [];

  /** Time in seconds to start a media item.
   * NOTE: When used with an MP4 video file, both seek and seeked events are triggered. 
   * Neither event is triggered when used with a DASH or HLS stream. 
   */
  starttime?: number;

  /** Title of the item. 
   * This is displayed inside of the player prior to playback, as well as in the visual playlist. 
   * This can be hidden with the displaytitle option 
   */
  title?: string;

  //TODO: Add type
  /** Include captions, chapters, and thumbnails for media */
  tracks?: [];

  /** If true, "withCredentials" will be used to request a media file rather than CORS */
  withCredentials?: boolean;
}

/** Map component callback names to jwplayer events */
export const callbackToEventMap: { [key in keyof Partial<ReactJWPlayerProps>]: keyof jwplayer.EventParams } = {
  /* Set of events related to advertisements. */
  onAdRequest: 'adRequest',
  onAdSkipped: 'adSkipped',
  onAdComplete: 'adComplete',
  onAdImpression: 'adImpression',
  onAdStarted: 'adStarted',
  onAdPlay: 'adPlay',
  onAdPause: 'adPause',
  onAdCompanions: 'adCompanions',
  onAdError: 'adError',
  onAdTime: 'adTime',
  onAdClick: 'adClick',
 
  onPlay: 'play',
  onPause: 'pause',
  onReady: 'ready',
  onError: 'error',
  onMute: 'mute',
  onVolume: 'volume',
  onFirstFrame: 'firstFrame',
  onFullscreen: 'fullscreen',
  onIdle: 'idle',
  onSeek: 'seek',
  onSetupError: 'setupError',
  onTime: 'time',
  onBuffer: 'buffer',
  onBufferChange: 'bufferChange'
};
