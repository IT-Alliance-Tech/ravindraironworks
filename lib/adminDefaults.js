// DEMO ONLY — default values for the Admin demo panel. No server persistence.
const adminDefaults = {
  hero: {
    title: 'Precision Fabrication for Industry',
    subtitle: 'Custom metalwork, assemblies and turnkey solutions for manufacturing.',
    buttonPrimary: 'Get a Quote',
    buttonSecondary: 'Our Services',
    image: '/images/About us.jpg', // using existing image as fallback
  },
  services: [
    { id: 1, title: 'Custom Fabrication', description: 'Steel and stainless assemblies, tailored to spec.' },
    { id: 2, title: 'Welding & Joining', description: 'MIG/TIG/Stick for diverse materials.' },
    { id: 3, title: 'Machining', description: 'CNC turning and milling for precision parts.' },
  ],
  stats: [
    { id: 1, label: 'Years', value: 25 },
    { id: 2, label: 'Projects', value: 1200 },
    { id: 3, label: 'Clients', value: 300 },
  ],
  industries: ['Automotive', 'Construction', 'Agriculture', 'Energy'],
  clients: [
    { id: 1, name: 'Client A', logo: null },
    { id: 2, name: 'Client B', logo: null },
    { id: 3, name: 'Client C', logo: null },
    { id: 4, name: 'Client D', logo: null },
  ],
  cta: {
    text: 'Request a Quote',
    color: '#b8860b',
  },
  ga: {
    id: '',
    enabled: false,
  },
}

export default adminDefaults
