/**
 * Page content and image sources.
 * Photos are free-licence Unsplash images used as stand-ins until real
 * Halden One product renders exist. Swap the ids in `photos` to replace them.
 */

export const photos = {
  hero: { id: '1550745165-9bc0b252726f', alt: 'A grey home console with a joystick, lit in a dark room' },
  cartridges: { id: '1720855101081-2f0933765993', alt: 'A table covered in boxed and loose game cartridges' },
  crtRack: { id: '1623910270913-3e0294a1c765', alt: 'A switched-on CRT television on a wooden stand' },
  controller: { id: '1724091948058-d914849064da', alt: 'A game controller lit from the side in a dark room' },
  livingRoom: { id: '1625805866852-b2ab3e740530', alt: 'A CRT television glowing in a dim room' },
} as const;

export type PhotoKey = keyof typeof photos;

export const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#display', label: 'Display' },
  { href: '#controller', label: 'Controller' },
  { href: '#specs', label: 'Specs' },
  { href: '#faq', label: 'FAQ' },
] as const;

export type Edition = {
  id: 'standard' | 'collector';
  name: string;
  price: number;
  blurb: string;
  contents: string[];
};

export const editions: Edition[] = [
  {
    id: 'standard',
    name: 'Standard',
    price: 229,
    blurb: 'The console and one controller.',
    contents: ['Halden One console', 'One wireless controller', 'HDMI and USB-C cables'],
  },
  {
    id: 'collector',
    name: 'Collector',
    price: 329,
    blurb: 'Two controllers and a charging dock.',
    contents: [
      'Halden One console',
      'Two wireless controllers',
      'Charging dock for both controllers',
      'HDMI and USB-C cables',
    ],
  },
];

export type Finish = { id: 'graphite' | 'fog'; name: string; swatch: string };

export const finishes: Finish[] = [
  { id: 'graphite', name: 'Graphite', swatch: '#2b2c30' },
  { id: 'fog', name: 'Fog', swatch: '#c9ccd1' },
];

export const headlineSpecs = [
  { value: '4K', label: 'Output at 60 Hz over HDMI' },
  { value: '<1', unit: 'frame', label: 'From button press to screen' },
  { value: '2', label: 'Cartridge slots, 8-bit and 16-bit' },
  { value: '4', label: 'Wireless controllers at once' },
];

export const fullSpecs = [
  {
    group: 'Video',
    items: [
      ['Digital out', 'HDMI 2.0, up to 2160p60'],
      ['Analog out', 'Composite and S-Video'],
      ['Scaling', 'Integer, 1x to 8x'],
      ['Display modes', 'Sharp, scanlines, CRT, arcade'],
    ],
  },
  {
    group: 'Audio and connectivity',
    items: [
      ['Audio', 'Stereo over HDMI and 3.5 mm'],
      ['Wireless', 'Wi-Fi 6 and Bluetooth 5.3'],
      ['Ports', '2 controller, 2 USB-A, 1 SD'],
      ['Saves', 'Unlimited states on SD'],
    ],
  },
  {
    group: 'Power and build',
    items: [
      ['Power', 'USB-C, 15 W'],
      ['Cooling', 'Passive, no fan'],
      ['Size', '18 x 13 x 4 cm'],
      ['Shell', 'Recycled polycarbonate'],
    ],
  },
];

export const faqs = [
  {
    q: 'Which cartridges does it play?',
    a: 'Halden One plays 8-bit and 16-bit home-console cartridges through its two top slots. We will publish the full compatibility list before launch.',
  },
  {
    q: 'Does it need an internet connection?',
    a: 'No. Everything runs on the console. Updates are optional and install over Wi-Fi or from an SD card.',
  },
  {
    q: 'Will it work with my old CRT television?',
    a: 'Yes. Alongside HDMI there are composite and S-Video outputs, so it looks right on period TVs too.',
  },
  {
    q: 'Can I use my original controllers?',
    a: 'Two front ports take original controllers for both supported systems, and they work alongside the wireless ones.',
  },
  {
    q: 'When will my pre-order ship?',
    a: 'Pre-orders ship in spring 2027, in the order they were placed. You can cancel for a full refund any time before then.',
  },
];

export function unsplash(id: string, width: number): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=72`;
}
