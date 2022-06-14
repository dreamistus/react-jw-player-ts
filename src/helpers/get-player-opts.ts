import { MediaObject, ReactJWPlayerProps } from '../types';

export type PlayerOpts = {
  key?: string;
  playlist?: string | MediaObject[];
  file?: string;
  aspectratio?: 'inherit' | '1:1' | '16:9';
  advertising?: {
    client: string;
    admessage: string;
    autoplayadsmuted: boolean;
  };
  autostart?: boolean;
  mute?: boolean;
  image?: string;
  customProps?: unknown;
};

function getPlayerOpts(props: ReactJWPlayerProps): PlayerOpts  {
  const {
    aspectRatio,
    file,
    image,
    isAutoPlay,
    isMuted,
    licenseKey,
    playlist,
    customProps
  } = props;


  const playerOpts: PlayerOpts = {};

  if (licenseKey) {
    playerOpts.key = licenseKey;
  }

  if (playlist) {
    playerOpts.playlist = playlist;
  } else if (file) {
    playerOpts.file = file;
  }

  if (aspectRatio && aspectRatio !== 'inherit') {
    playerOpts.aspectratio = aspectRatio;
  }

  if (typeof isAutoPlay !== 'undefined') {
    playerOpts.autostart = !!isAutoPlay;
  }

  if (typeof isMuted !== 'undefined') {
    playerOpts.mute = !!isMuted;
  }

  if (image) {
    playerOpts.image = image;
  }

  return Object.assign(playerOpts, customProps);
}

export default getPlayerOpts;
