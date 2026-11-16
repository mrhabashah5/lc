import {
  BadgeCheck,
  Check,
  Compass,
  Eye,
  FileText,
  Handshake,
  Lock,
  MapPin,
  Scale,
  Users,
  type LucideProps,
} from "lucide-react";

const map = {
  badge: BadgeCheck,
  check: Check,
  compass: Compass,
  eye: Eye,
  file: FileText,
  handshake: Handshake,
  lock: Lock,
  map: MapPin,
  scale: Scale,
  users: Users,
};

export type IconName = keyof typeof map;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const C = map[name];
  return <C aria-hidden="true" {...props} />;
}

/** Sky-blue icon in a light-blue tile: the standard icon treatment across the site. */
export function IconTile({ name }: { name: IconName }) {
  return (
    <span className="icon-tile">
      <Icon name={name} size={24} strokeWidth={2} />
    </span>
  );
}
