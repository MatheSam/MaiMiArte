import { assetPath } from '@/lib/assets';
import { artists, type Author } from '@/lib/content';

// Display each supplied artwork directly from the original sheet; no generated replacement.
export function ArtistThumbnail({ artist }: { artist: Author }) {
  return <span className="artist-thumbnail" data-artist={artist} style={{ backgroundImage: `url("${assetPath('/images/portfolios-client.png')}")` }} role="img" aria-label={artists.find(a => a.slug === artist)!.name}/>;
}
