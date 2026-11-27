(function () {
  'use strict';
  const D = window.CE_DATA;
  const IMG = k => 'img/' + k + '.webp';
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const app = document.getElementById('app');
  const CONTACT = {
    phones: ['+234 909 900 0901', '+234 708 005 2851'],
    email: 'info@cloudenergy.com.ng',
    addr: '191 Ikorodu Road, Opposite Palm Groove Bus Stop, Lagos State, Nigeria.',
    branches: [['Lagos', 'Head office & showroom', '191 Ikorodu Road, Opposite Palm Groove Bus Stop, Lagos State'], ['Abuja', 'Branch office', 'Yoma Place, No. 5, O. P. Fingesi Street, Utako, Abuja'], ['Port Harcourt', 'Branch office', 'Plot 128 Rumijogba Layout, opposite Mini Okoro Police Area Command Headquarters, Rumijogba Town, Port Harcourt']],
    maps: 'https://www.google.com/maps/search/?api=1&query=191+Ikorodu+Road+Palmgrove+Lagos'
  };
  const S = { pendingNeed: null, pendingMsg: '', hero: 0, heroTimer: null, projTab: 0, prodChip: 'all', prodQuery: '', pdTab: 'overview',
    calc: { 'LED Bulbs': 1, 'Ceiling Fan': 1, 'Television': 1, 'Wi-Fi Router': 1, 'Laptop Charging': 1 } };

  /* ---------- icons ---------- */
  const svg = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  const I = {
    audit: svg('<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/>'),
    site: svg('<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>'),
    design: svg('<path d="M3 21h18"/><path d="M5 21V8l7-5 7 5v13"/><path d="M9 21v-6h6v6"/>'),
    install: svg('<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>'),
    maint: svg('<path d="M12 22a10 10 0 1 0-10-10"/><path d="M2 12h4l2-4 3 8 2-4h3"/>'),
    support: svg('<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="2" y="14" width="5" height="6" rx="2"/><rect x="17" y="14" width="5" height="6" rx="2"/>'),
    train: svg('<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>'),
    sun: svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
    bolt: svg('<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/>'),
    shield: svg('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>'),
    leaf: svg('<path d="M11 20A7 7 0 0 1 4 13c0-6 7-10 16-10 0 9-4 16-10 16"/><path d="M4 21c4-4 7-7 10-10"/>'),
    bank: svg('<path d="M3 10h18L12 4 3 10z"/><path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 21h18"/>'),
    users: svg('<circle cx="9" cy="8" r="3.5"/><path d="M2 21c0-3.9 3.1-7 7-7s7 3.1 7 7"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M22 21c0-3-1.7-5.6-4.2-6.6"/>'),
    box: svg('<path d="M21 8 12 3 3 8v8l9 5 9-5V8z"/><path d="M3 8l9 5 9-5M12 13v8"/>'),
    chart: svg('<path d="M4 20V10M10 20V4M16 20v-6M22 20H2"/>'),
    handshake: svg('<path d="m11 17 2 2a1.4 1.4 0 0 0 2-2l-3-3"/><path d="m14 14 2.5 2.5a1.4 1.4 0 0 0 2-2L15 11l-1.6-1.6a2 2 0 0 0-2.8 0L9 11a1.4 1.4 0 0 1-2-2l3.6-3.6a3 3 0 0 1 3.4-.6L19 7l3 1v8h-2"/><path d="M2 8l3-1 5 2"/><path d="M2 8v8h3l4 4"/>'),
    search: svg('<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>'),
    left: svg('<path d="m15 18-6-6 6-6"/>'), right: svg('<path d="m9 18 6-6-6-6"/>'),
    menu: svg('<path d="M4 7h16M4 12h16M4 17h16"/>'), close: svg('<path d="M6 6l12 12M18 6 6 18"/>'),
    phone: svg('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.8 2z"/>'),
    mail: svg('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>'),
    pin: svg('<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>'),
    doc: svg('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>')
  };

  /* ---------- content ---------- */
  const SERVICES = [
    { id: 'energy-audit', icon: I.audit, tag: 'Energy Audit', title: 'Energy Audit', home: 'Deep diagnostic assessment of power consumption, generation efficiency and optimisation pathways for your home or business.',
      body: 'Understand your energy before you invest. Our energy assessment identifies current energy consumption, major loads, peak usage, existing power sources, energy inefficiencies, backup requirements and recommended system capacity.', cta: 'Book an audit', need: 'Energy Audit' },
    { id: 'site-assessment', icon: I.site, tag: 'Site Assessment', title: 'Site Assessment', home: 'Structural and positioning analysis of your site so panels, inverters and batteries are placed for safe, optimal performance.',
      body: 'Before designing a system, our technical team evaluates the installation environment and energy requirements: roof or ground space, structural load, cable routes and where equipment should sit.', cta: 'Schedule a site visit', need: 'Energy Audit', msg: 'I would like to schedule a site assessment.' },
    { id: 'system-design', icon: I.design, tag: 'System Design', title: 'System Design', home: 'Engineering designs tailored to your capacity targets, grid supply and site constraints.',
      body: 'Engineered for your requirements. We develop system configurations based on your energy consumption, load profile, budget, available space, backup requirements and growth expectations.', cta: 'Get a system design', need: 'Residential Solar', msg: 'I would like a system design for my site.' },
    { id: 'installation', icon: I.install, tag: 'Installation Service', title: 'Professional Installation', home: 'Installation and commissioning by trained technicians, with a safe, clean setup that performs as promised.',
      body: 'Professional installation, properly done. Our technical team handles the installation and commissioning of energy systems with attention to system performance and safety.', cta: 'Plan your install', need: 'Residential Solar', msg: 'I would like to plan an installation.' },
    { id: 'maintenance', icon: I.maint, tag: 'Maintenance & Support', title: 'Maintenance & After Sales Support', home: 'Proactive health checks, firmware updates and fast response to keep your system running.',
      body: 'We stay with you after installation. A good energy system should perform well throughout its useful life, so we offer health checks, servicing and after sales support from dedicated engineers and client service representatives.', cta: 'Request maintenance', need: 'Technical Support', msg: 'I would like to arrange maintenance for my system.' },
    { id: 'technical-support', icon: I.support, tag: 'Technician Support', title: 'Technical Support', home: 'Expert help on demand for troubleshooting, commissioning and hardware replacement.',
      body: 'Need help understanding an inverter fault, battery issue or system performance concern? Our technical support team is available to assist with troubleshooting and system related enquiries.', cta: 'Contact support', need: 'Technical Support' },
    { id: 'training', icon: I.train, tag: 'Installer & Partner Training', title: 'Installer & Partner Training', home: 'Professional development that gives installers current technical skills and safety practice.',
      body: 'Build capability. Grow the industry. The renewable energy industry needs skilled professionals, so we train installers and partners on product knowledge, system design, installation and safety.', cta: 'Explore training', need: 'Partnership', msg: 'I am interested in installer and partner training.' }
  ];

  const APPLIANCES = [['LED Bulbs', 50], ['Ceiling Fan', 75], ['Television', 120], ['Wi-Fi Router', 15], ['Refrigerator', 200], ['Laptop Charging', 65], ['Air Conditioner', 900], ['Water Pump', 750], ['Freezer', 250], ['Washing Machine', 500], ['Microwave', 600], ['Iron', 1200]];

  const PROJECTS = [
    { id: 'mini-grids', name: 'Mini Grids', big: '50+', bigLabel: 'Communities powered', tags: ['Distribution power lines', 'Smart pre-paid metering', 'LiFePO4 BESS'],
      metrics: [['Total capacity', '100MW'], ['Reliability', '99.4%'], ['Storage', 'LiFePO4 BESS']], img: 'street-03',
      eyebrow: 'Mini-grids', title: 'Reliable electricity for remote communities',
      intro: 'Our mini-grid solutions bring reliable electricity to remote communities, powering homes, businesses and essential services. We combine solar power with smart technology to create sustainable local energy ecosystems.',
      cards: [['What it covers', 'Mini-grids provide whole-community power, integrating solar generation, energy storage, distribution and smart metering. They replace expensive, polluting diesel generators with clean, reliable 24/7 power.'],
        ['Solar + Storage + Smart Metering', 'A clean, reliable power supply that enables productive use of energy, business growth, improved healthcare and education, and a higher quality of life for community members.']],
      // Selected deployments: correct list to come from the Projects department (Kenny). Format: [site, description, solar, storage, status, 'green'|'amber'|'']
      sites: [] },
    { id: 'solar-home', name: 'Solar Home Systems', big: '10K+', bigLabel: 'Homes powered', tags: ['Rooftop PV arrays', 'Pay-as-you-go integration', 'Smart pre-paid metering'],
      metrics: [['Satisfaction rate', '98.5%'], ['Daily generation', '45 MWh'], ['Architecture', 'Lithium BESS']], img: 'sun-s02',
      eyebrow: 'Solar home systems', title: 'Affordable clean energy for individual households',
      intro: 'Our solar home systems deliver continuous, standalone electricity directly to families. They are engineered for durability, easy daily use and zero recurring fuel expenses.',
      cards: [['Standalone reliable power', 'Standalone solar systems bringing power, lighting and cooling directly to homes without depending on erratic grid supply.'],
        ['Families & micro-enterprises', 'Households, residential families and micro-enterprises, with accessible pay-as-you-go and financed smart metering options.'],
        ['Silent, zero-fuel electricity', '24/7 reliability, no fuel or noise, automated battery health control and minimal routine maintenance.']],
      // Selected deployments for solar home systems: list and deployment photos to come from Kenny
      sites: [] },
    { id: 'cloud-zero', name: 'Buy Now, Pay Later', big: '1–5kVA', bigLabel: 'Complete solar packages', tags: ['Complete solar packages', 'Cloud Pay instalments', 'Partner bank finance'],
      metrics: [['Pay over', '3–18 months'], ['Packages', '4'], ['Partner banks', 'Stanbic IBTC · Access · FCMB']], img: 'hyb-s04',
      eyebrow: 'Buy Now, Pay Later', title: 'Go solar today, pay over time',
      intro: 'Buy Now, Pay Later is our range of complete solar packages for homes and small businesses, with an inverter, batteries, a charge controller and solar panels in one order, paid for in instalments.',
      cards: [['Four package sizes', 'Solar Ruby (1kVA), Solar Opal (2kVA), Solar Emerald (3.6kVA) and Solar Sapphire (5kVA), with lithium ion or tubular battery options on some packages.'],
        ['Cloud Pay instalments', 'Pay a fixed initial deposit, then spread the balance over 3 to 18 months.'],
        ['Partner bank finance', 'Finance through Stanbic IBTC, Access Bank or FCMB under the Solar Easy Payment Programme, on each bank’s terms.']] },
    { id: 'rooftop', name: 'Rooftop Solar', big: '200+', bigLabel: 'Commercial installations', tags: ['Utility grid intertie', 'Substation & transformer sync', '40% diesel & tariff displacement'],
      metrics: [['Average cost savings', '40%'], ['Total installations', '200+'], ['Grid coupling', 'HV / MV transformer']], img: 'solar-s02',
      eyebrow: 'Rooftop solar', title: 'Commercial energy savings and carbon reduction',
      intro: 'Our end-to-end rooftop solar service helps businesses and institutions reduce their reliance on erratic grid power and costly diesel, from site evaluation through to operation and maintenance.',
      cards: [['Commercial & industrial', 'Factories, office plazas, schools, healthcare institutions and agro-processing businesses seeking lower electricity costs and reliable power.'],
        ['Grid-tied & hybrid arrays', 'High-capacity rooftop PV engineered for zero-export, hybrid battery backup, or synchronisation with utility distribution transformers.'],
        ['Design to maintenance', 'Full turnkey delivery including structural load checks, intertie engineering, smart telemetry and ongoing preventive maintenance.']] }
  ];

  const FAQ = [
    { g: 'About Cloud Energy', q: [
      ['What does Cloud Energy do?', 'Cloud Energy Photoelectric Limited provides solar and alternative energy solutions. Our portfolio covers solar generation, energy storage, power electronics, rooftop solar, mini grids, solar home systems and complete energy systems.'],
      ['Who can work with Cloud Energy?', 'Our solutions are designed for homes, businesses, institutions, industries and communities. We also work with installers, resellers, distributors, developers and other organizations.'],
      ['Where does Cloud Energy operate?', 'We work across Nigeria and Africa. Project and service availability can depend on location and scope, so contact the team to confirm support for your area.'],
      ['When was Cloud Energy established?', 'Cloud Energy Photoelectric Limited was registered with the Corporate Affairs Commission in 2013, with a mission to provide alternative energy solutions.'],
      ['What makes Cloud Energy different?', 'We combine product supply, engineering expertise, project development and customer support. We assess your energy needs first, then design a practical solution around your requirements.']] },
    { g: 'Assessing Your Energy Needs', q: [
      ['How do I know which solar system is right for me?', 'Start with what you need to power, how often you use it and how long you need backup power. We can assess your loads, usage patterns, existing power sources, available space and budget before recommending a system. You can also try the load calculator on our home page.'],
      ['What happens during an energy audit?', 'An energy assessment reviews current consumption, major loads, peak usage, existing power sources, energy inefficiencies and backup requirements. The findings help us recommend an appropriate system capacity.'],
      ['What information should I prepare?', 'List your appliances or equipment, their power ratings if known, typical hours of use, your location, current power sources and the backup duration you want. Photos of the installation area also help.'],
      ['Can a system be designed for future growth?', 'Yes. Tell us what may change, such as additional equipment or longer operating hours, and we will explain which parts of the proposed system can be expanded. Several of our inverters and batteries support parallel connection.']] },
    { g: 'Products And Energy Storage', q: [
      ['What products are available?', 'Hybrid and low frequency inverters, lithium ion batteries, solar panels, MPPT charge controllers, Sunbox solar home systems, AC/DC fans, freezers and cold storage, LED lighting and solar street lights. Ask the team to confirm current models and availability.'],
      ['What is the difference between a hybrid inverter and a charge controller?', 'A hybrid inverter manages power between solar panels, batteries, the grid and connected loads. An MPPT charge controller manages energy harvested from solar panels and directs it efficiently into a battery bank.'],
      ['Which battery types does Cloud Energy offer?', 'Our range includes LiFePO4 lithium ion batteries from 960Wh to 16.07kWh. Our low frequency inverters also work with AGM, gel and tubular batteries. The right option depends on your system design and storage needs.'],
      ['What is a mini grid?', 'A mini grid is distributed energy infrastructure that provides electricity to a community where conventional grid service is limited or unreliable. Our projects combine solar generation, battery storage, community distribution and energy management.'],
      ['What is rooftop solar?', 'Rooftop solar uses available roof space to generate electricity for a business or institution. Our service covers system design, equipment selection, installation and support.']] },
    { g: 'Buy Now, Pay Later', q: [
      ['What is Buy Now, Pay Later?', 'Buy Now, Pay Later is our range of complete rooftop solar packages that you can pay for over time. Each package combines a Cloud Energy inverter, batteries, a charge controller and solar panels, so a home or small business can run on solar power with little or no fuel spend.'],
      ['Which Buy Now, Pay Later packages are available?', 'The range runs from 1kVA to 5kVA: Solar Ruby (1kVA), Solar Opal (2kVA), Solar Emerald (3.6kVA) and Solar Sapphire (5kVA). Some packages come with a lithium ion or a tubular battery option.'],
      ['What is inside a Buy Now, Pay Later package?', 'As an example, the 2kVA Solar Opal Lithium Ion package includes a 2kVA/24V home inverter, two 75Ah/25.6V lithium batteries, an 80A charge controller and six 410W solar panels.'],
      ['Who is Buy Now, Pay Later for?', 'Homes, small and medium businesses, offices and small health centres that need dependable power for lighting, fans, TVs, fridges, computers and other essential equipment.'],
      ['How do I pay for a package?', 'Pay over time through Cloud Pay or one of our partner banks under the Solar Easy Payment Programme. Our team can also assess your load and recommend the right size.'],
      ['Is installation included?', 'Ask the team when you order. We install and commission Buy Now, Pay Later packages and can confirm what is included for your location.']] },
    { g: 'Installation, Maintenance And Support', q: [
      ['Does Cloud Energy install energy systems?', 'Yes. Installation and commissioning are core services. Our technical team handles installation with attention to system performance and safety. Contact us to confirm scope and availability for your location.'],
      ['Can I get maintenance after installation?', 'Yes. Maintenance and after sales support are part of our services. Ask the team which maintenance options apply to your system and how to arrange a visit.'],
      ['How do I ask for technical support?', 'Share the product details, system capacity and a brief description of the issue. This helps our technical team understand the problem and assist with troubleshooting.'],
      ['Where can I find warranty information?', 'Warranty terms depend on the product. Ask the team for the warranty details of the specific product or system before purchase.'],
      ['How long does installation take?', 'Timing depends on the project scope, site conditions and equipment availability. Ask the team for an estimate for your project.']] },
    { g: 'Pricing, Audits And Project Estimates', q: [
      ['How much does a solar system cost?', 'The price depends on the equipment, required capacity, storage, site conditions and installation scope. Tell us what you want to power and request a quote based on your requirements.'],
      ['Is an energy audit free?', 'Ask the team about any assessment costs and what the assessment includes when you book.'],
      ['Does Cloud Energy offer financing?', 'Yes. Our Solar Easy Payment Programme (SEPP) offers Cloud Pay and financing through participating banks for eligible customers. See the Cloud Financing page for details.'],
      ['How quickly will I receive a quote?', 'Include complete contact and project details in your request so the team can review it and advise on next steps.']] }
  ];

  const NEEDS = ['Residential Solar', 'Commercial Solar', 'Rooftop Solar', 'Energy Storage', 'Solar Products', 'Mini Grid', 'Energy Audit', 'Partnership', 'Technical Support', 'Other'];

  /* ---------- extra icons ---------- */
  Object.assign(I, {
    chev: '<svg class="chev" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 4.5 3 3 3-3"/></svg>',
    check: svg('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),
    wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.7 11.7 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z"/></svg>',
    house: svg('<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/>'),
    dl: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>',
    expand: svg('<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>'),
    battery: svg('<rect x="2" y="7" width="17" height="10" rx="2"/><path d="M22 11v2M6 10v4M10 10v4"/>'),
    panel: svg('<path d="M3 20h18M5 16 7 4h10l2 12z"/><path d="M6 10h12M12 4v12"/>'),
    inverter: svg('<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h3"/><circle cx="15" cy="15" r="2"/>'),
    fan: svg('<circle cx="12" cy="12" r="2"/><path d="M12 10c0-4 1-7 4-7s2 5-2 7M14 12c4 0 7 1 7 4s-5 2-7-2M12 14c0 4-1 7-4 7s-2-5 2-7M10 12c-4 0-7-1-7-4s5-2 7 2"/>'),
    bulb: svg('<path d="M9 18h6M10 22h4"/><path d="M12 2a6 6 0 0 0-4 10.5c.8.8 1.3 1.7 1.5 2.5h5c.2-.8.7-1.7 1.5-2.5A6 6 0 0 0 12 2z"/>'),
    snow: svg('<path d="M12 2v20M4.9 6l14.2 12M19.1 6 4.9 18"/>'),
    clock: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    star: svg('<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),
    brief: svg('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/>'),
    heart: svg('<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/>'),
    grow: svg('<path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/>'),
    fb: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.3c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.2H8v3.2h2.6V22H14v-10.3h2.6l.4-3.2z"/></svg>',
    tw: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.8 3H21l-7 8 8.2 10h-6.4l-5-6.3L5 21H2l7.5-8.6L1.6 3h6.6l4.5 5.8zm-1.1 16.2h1.8L7.4 4.7H5.5z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    li: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.3 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8V21h-4z"/></svg>',
    yt: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15.1V8.9l5.8 3.1z"/></svg>'
  });
  const AR = '<span class="ar" aria-hidden="true">→</span>';
  const PH = k => 'img/ph/' + k + '.webp';
  const CAT_ICON = { 'hybrid-inverters': I.inverter, 'home-inverters': I.inverter, 'lithium-batteries': I.battery, 'solar-panels': I.panel, 'charge-controllers': I.bolt, sunbox: I.sun, fans: I.fan, 'cold-storage': I.snow, 'led-lighting': I.bulb, 'street-lights': I.bulb, 'energy-storage-bundle': I.box, 'inverter-bundles': I.box };
  const SVC_IMG = { 'energy-audit': PH('audit'), 'site-assessment': PH('svcp-site'), 'system-design': PH('svcp-design'), installation: PH('svcp-install'), maintenance: PH('svcp-maint'), 'technical-support': PH('svcp-support'), training: PH('svcp-training') };
  const PROJ_IMG = { 'mini-grids': ['mini-main', 'mini-main'], 'solar-home': ['shs-main', 'shs-band'], 'cloud-zero': ['zero-main', 'zero-band'], rooftop: ['rooftop', 'roof-band'] };
  const SOCIAL = [['Facebook', I.fb, 'https://www.facebook.com/cloudenergyng'], ['X (Twitter)', I.tw, 'https://x.com/cloudenergyng'], ['Instagram', I.ig, 'https://www.instagram.com/cloudenergyng'], ['LinkedIn', I.li, 'https://www.linkedin.com/search/results/all/?keywords=Cloud%20Energy%20Photoelectric'], ['YouTube', I.yt, 'https://www.youtube.com/results?search_query=Cloud+Energy+Photoelectric']];

  /* ---------- helpers ---------- */
  const allModels = () => D.cats.flatMap(c => c.models);
  const quoteBtn = (label, need, msg, cls) => `<button class="btn ${cls || ''}" data-quote="${esc(need || '')}" data-msg="${esc(msg || '')}">${label}</button>`;
  let dbP = null, userP = null;
  try { if (window.claude && window.claude.use) { dbP = window.claude.use('db').catch(() => null); userP = window.claude.use('user').catch(() => null); } } catch (e) { dbP = userP = null; }
  async function saveLead(kind, lines) {
    try {
      const db = dbP ? await dbP : null, user = userP ? await userP : null; if (!db || !user) return false;
      const uid = await user.id(); if (!uid) return false;
      await db.collection('leads/' + uid + '/items').add({ kind, lines, page: location.hash.slice(1) || 'home', at: new Date().toISOString() });
      return true;
    } catch (e) { return false; }
  }
  function toast(t) { document.querySelectorAll('.toast').forEach(x => x.remove()); const d = document.createElement('div'); d.className = 'toast'; d.setAttribute('role', 'status'); d.textContent = t; document.body.appendChild(d); setTimeout(() => d.remove(), 2400); }
  function copyText(t) {
    const done = () => toast('Copied: ' + (t.length > 40 ? t.slice(0, 40) + '…' : t));
    try { navigator.clipboard.writeText(t).then(done, () => toast('Select the text and copy it')); } catch (e) { toast('Select the text and copy it'); }
  }
  const copyLine = (txt, icon) => `<div class="copyline">${icon ? `<span class="ico">${icon}</span>` : ''}<b>${esc(txt)}</b><button class="copybtn" data-copy="${esc(txt)}">Copy</button></div>`;
  const specRows = rows => `<div class="spec">${rows.map(r => `<div><span>${esc(r[0])}</span><span>${esc(r[1])}</span></div>`).join('')}</div>`;
  /* eShop (eshop.com.ng): exact product page where the eShop lists the same product, otherwise the matching eShop category */
  const ESHOP = 'https://eshop.com.ng/index.php/';
  const ESHOP_P = { 'bulb-6w': '6-watts-bulb-pin', 'bulb-5w': 'cloud-energy-pack-of-10-cloud-energy-5w-ac-led-bulb-screw', 'bulb-10w': 'cloud-energy-pack-of-10-cloud-energy-10w-ac-classic-bulb-screw', 'bulb-7w-green': 'cloud-energy-pack-of-10-cloud-energy-7w-ac-led-bulb-screw', 'bulb-7w-red': 'cloud-energy-pack-of-10-cloud-energy-7w-ac-led-bulb-screw', 'bulb-18w': '18-watts-bulb-pin', 'bulb-30w': 'cloud-energy-30w-ac-led-classic-bulb', 'panel-18w-square': '18w-square-recessed-led-panel',
    'mppt-100a': 'cloud-energy-ce-mppt-100a-48v-charge-controller', 'mppt-80a': 'cloud-energy-ce-mppt-80a-48v-charge-controller',
    'fan-wall': '16inch-ac-dc-wall-fan', 'fan-orbit': 'cloud-energy-16inch-ac-dc-orbit-fan-2', 'fan-table-rechargeable': 'cloud-energy-16-inch-table-rechargeable-fan-remote-control-white',
    'freezer-150l': 'cloud-energy-deep-freezer-150l-dc-compressor', 'freezer-200l': 'cloud-energy-deep-freezer-200l-dc-compressor', 'freezer-318l': 'cloud-energy-deep-freezer-318l', 'vaccine-fridge-80l': 'cloud-energy-80l-dc-vaccine-fridge', 'chiller-339l': 'cloud-energy-339l-dc-chiller',
    'lf-1-5kva-12v': 'cloud-energy-1-5kva-12v-inverter', 'lf-1-5kva-24v': 'cloud-energy-1-5kva-24v-inverter', 'lf-2kva-24v': 'cloud-energy-2kva-24v-home-inverters', 'lf-3-6kva-48v': 'cloud-energy-3-6-kva-48v-inverter', 'lf-5kva-48v': 'cloud-energy-5kva-24v-home-inverters', 'lf-6-3kva-48v-hybrid': 'cloud-energy-5kw-48v-low-frequency-inverter-with-120a-mppt', 'lf-15kva-96v': 'cloud-energy-15kva-96v-home-inverters',
    'hybrid-3-6kw-24v': 'cloud-energy-3kw-24v-high-frequency-inverter-with-120a-mppt', 'hybrid-6-2kw-48v-parallel': 'cloud-energy-5kw-48v-high-frequency-inverter-with-120a-mppt-2',
    'lith-12-8v-75ah': 'cloud-energy-75ah-12v-lithium-battery', 'lith-25-6v-100ah': 'cloud-energy-100ah-24v-lithium-battery-3', 'lith-25-6v-200ah': 'cloud-energy-200ah-24v-lithium-battery',
    'solar-620w-bifacial': 'cloud-energy-620-watts-mono-solar-panel', 'solar-590w-bifacial': 'cloud-energy-590-watts-mono-120-cells', 'solar-180w-mono': 'cloud-energy-180-watts-mono',
    'sunbox-edge-plus-30ah': 'cloud-energy-sunbox-edge-plus', 'sunbox-pro-1-25kva': 'cloud-energy-1kw-solar-generator-sunbox-pro' };
  const ESHOP_CAT = { 'led-lighting': 'go-solar/energy-efficiency/bulb', 'charge-controllers': 'go-solar/energy-generation/charge-controller', 'fans': 'go-solar/energy-efficiency/ac-dc-fan', 'cold-storage': 'go-solar/solar-appliances', 'home-inverters': 'go-solar/energy-generation/inverter-energy-generation/home-inverter', 'hybrid-inverters': 'go-solar/energy-generation/inverter-energy-generation/solar-inverter', 'lithium-batteries': 'go-solar/energy-storage/battery', 'solar-panels': 'go-solar/energy-generation/solar-panel', 'sunbox': 'go-solar/solar-home-systems', 'street-lights': 'go-solar/street-lightning', 'energy-storage-bundle': 'energy-storage-bundle', 'inverter-bundles': 'go-solar/solar-bundles' };
  const catOf = m => (D.cats.find(c => (c.models || []).some(x => x.id === m.id)) || {}).id;
  const eshopCat = id => ESHOP + 'product-category/' + (ESHOP_CAT[id] || 'go-solar') + '/';
  const eshop = m => ESHOP_P[m.id] ? ESHOP + 'product/' + ESHOP_P[m.id] + '/' : m.id.startsWith('panel-') ? ESHOP + 'product-category/go-solar/energy-efficiency/' : eshopCat(catOf(m));
  const pcard = m => `<div class="pcard"><a class="pi" href="${eshop(m)}" target="_blank" rel="noopener" title="Buy the ${esc(m.name)} on the Cloud Energy eShop"><img src="${SRC(m.img)}" alt="${esc(m.name)}, view on the eShop" loading="lazy"><span class="eshop-tag">Buy on eShop ↗</span></a><a class="pb" href="#p-${m.id}"><span class="stock">● Full data sheet</span><h3>${esc(m.name)}</h3><p>${esc(m.short)}</p><span class="link">View product ${AR}</span></a></div>`;
  const catCard = c => `<a class="catc" href="#c-${c.id}"><div class="ci"><img src="${SRC(c.img)}" alt="${esc(c.name)}" loading="lazy"></div><span class="ico">${CAT_ICON[c.id] || I.box}</span><span class="range">${esc(c.range)}${c.models.length ? ' · ' + c.models.length + ' models' : ' · On request'}</span><h3>${esc(c.name)}</h3><p>${esc(c.blurb)}</p><span class="go">View category ${AR}</span></a>`;
  const head = (tag, title, lede, center, dark) => `<div class="head${center ? ' center' : ''}"><span class="tag${dark ? ' dark' : ''}">${tag}</span><h2 class="h-sec">${title}</h2>${lede ? `<p class="lead">${lede}</p>` : ''}</div>`;
  const faqBlock = (list, firstOpen) => `<div class="acc">${list.map(([q, a], i) => `<details${firstOpen && i === 0 ? ' open' : ''}><summary>${esc(q)}</summary><p class="ans">${esc(a)}</p></details>`).join('')}</div>`;
  function pageHero(o) {
    return `<section class="phero${o.cls ? ' ' + o.cls : ''}"><img src="${o.img}" alt="" fetchpriority="high"><div class="wrap">${o.crumbs ? `<nav class="crumbs" aria-label="Breadcrumb">${o.crumbs}</nav>` : ''}<span class="tag dark dot">${o.tag}</span><h1>${o.title}</h1>${o.lede ? `<p>${o.lede}</p>` : ''}${o.actions ? `<div class="btns">${o.actions}</div>` : ''}${o.extra || ''}</div></section>`;
  }
  const WAVES = (c1, c2) => `<svg class="waves" viewBox="0 0 600 400" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="wg${c1.slice(1)}" x1="0" x2="1"><stop offset="0" stop-color="${c1}" stop-opacity="0"/><stop offset=".5" stop-color="${c1}"/><stop offset="1" stop-color="${c2}" stop-opacity=".2"/></linearGradient></defs><path stroke="url(#wg${c1.slice(1)})" d="M-20 330 C 120 300, 240 360, 360 250 S 560 90, 640 40"/><path stroke="url(#wg${c1.slice(1)})" d="M-20 360 C 140 330, 260 380, 380 280 S 560 140, 640 90"/><path stroke="url(#wg${c1.slice(1)})" d="M-20 300 C 100 270, 220 330, 340 220 S 540 60, 640 10"/></svg>`;
  const CUT = new Set('bulb-s01 bulb-s02 bulb-s03 bulb-s04 bulb-s05 bulb-s06 bulb-s07 bulb-s08 bulb-s09 bulb-s11 fan-s02 fan-s04 fan-s06 hyb-s06 hyb-s08 lf-s02 lf-s06 lf-s08 lf-s10 lf-s12 lith-s04 lith-s06 lith-s08 mppt-s06 solar-s02 solar-s06 sun-s02 sun-s04 sun-s06 sun-s10'.split(' '));
  const SRC = k => CUT.has(k) ? 'img/cut/' + k + '.webp' : IMG(k);
  const prodVis = k => CUT.has(k) ? `<img class="bx-img cut" src="img/cut/${k}.webp" alt="" loading="lazy">` : `<div class="bx-stage"><img src="${IMG(k)}" alt="" loading="lazy"></div>`;
  function splitVal(v) {
    const m = String(v).match(/^([\d.,]+(?:\s*[–-]\s*[\d.,]+)?)\s*([A-Za-z%×°]{0,5})(?:\b|$)\s*(.*)$/);
    if (!m || /^[\/,(]/.test(m[3]) || m[3].length > 14) return null;
    if (m[2] && !/^(V|A|W|kW|kWp|kVA|VA|Ah|AH|kWh|KWh|Wh|WH|Vdc|Vac|h|%|L|mm|kg|Hz|lm|°C|MW|kWh)$/.test(m[2])) return null;
    return { n: m[1].replace(/\s*[–-]\s*/, '–'), u: m[2], rest: m[3] };
  }
  // dark overlay spec card: o = {v, label, sub, tone:'amber'|'blue'|'silver', gold, cls, img, extra}
  function bx(o) {
    const sv = o.raw ? null : splitVal(o.v);
    const tone = 'g-' + (o.tone || 'silver');
    const num = sv ? `<div class="bx-num ${o.small ? 'sm' : ''}"><span class="${tone}" ${/^[\d,]+$/.test(sv.n) && Number(sv.n.replace(/,/g, '')) > 9 ? `data-count="${sv.n.replace(/,/g, '')}"` : ''}>${esc(sv.n)}</span>${sv.u ? `<small class="${tone}">${esc(sv.u)}</small>` : ''}</div>${sv.rest ? `<span class="bx-sub">${esc(sv.rest)}</span>` : ''}`
      : `<div class="bx-num sm raw"${String(o.v).length > 9 ? ' style="font-size:clamp(28px,2.8vw,46px)"' : ''}><span class="${tone}">${esc(o.v)}</span></div>`;
    return `<div class="bx ${o.gold ? 'gold ' : ''}${o.cls || ''}">${WAVES(o.gold ? '#F9A930' : '#1190C8', o.gold ? '#FFE7B8' : '#9ED8F5')}${num}<span class="bx-lbl">${esc(o.label)}</span>${o.sub ? `<span class="bx-sub"><span class="up">↑</span>${esc(o.sub)}</span>` : ''}${o.extra || ''}${o.prod ? prodVis(o.prod) : ''}</div>`;
  }
  const ov = (o) => `<a class="ov ${o.cls || ''}" href="${o.href}" ${o.attrs || ''}><img src="${o.img}" alt="" loading="lazy">${o.pill ? `<span class="pill">${esc(o.pill)}</span>` : ''}${o.idx ? `<span class="idx">${o.idx}</span>` : ''}${o.stat ? `<div class="ovs"><b>${esc(o.stat[0])}</b><span>${esc(o.stat[1])}</span></div>` : ''}<h3>${esc(o.title)}</h3>${o.text ? `<p>${esc(o.text)}</p>` : ''}<span class="go">${o.go || 'Explore'} ${AR}</span></a>`;
  const svcGrid = () => `<div class="ovgrid">${SERVICES.map((s, i) => ov({ cls: i === 0 ? 'a' : i >= 5 ? 'w2' : '', href: '#services', attrs: `data-svc="${s.id}"`, img: SVC_IMG[s.id], pill: s.tag, idx: '0' + (i + 1), title: s.title, text: s.home.split('.')[0] + '.', go: 'Explore' })).join('')}</div>`;
  const marquee = () => { const items = D.cats.map(c => `<a class="mq" href="#c-${c.id}"><img src="${IMG(c.img)}" alt="" loading="lazy">${esc(c.name)}</a>`).join(''); return `<div class="marquee" aria-label="Product categories"><div class="marquee-t">${items}${items.replace(/<a /g, '<a tabindex="-1" aria-hidden="true" ')}</div></div>`; };
  function specBento() {
    return `<section class="sec darkband"><div class="wrap">${head('Built for Nigerian power', 'Engineered to Outperform', '', false, true)}
      <div class="bento">${bx({ v: '12kW', label: 'Hybrid inverter, scalable', sub: 'Up to 6 units in parallel', tone: 'silver', cls: 'tall', prod: 'hyb-s08' })}
        ${bx({ v: '16.07kWh', label: 'Lithium storage in one unit', sub: 'LiFePO4 · 51.2V / 314Ah', tone: 'amber', gold: true })}
        ${bx({ raw: 1, v: '90–280V', label: 'Wide AC input', sub: 'Rides through unstable grid supply', tone: 'blue', extra: `<div class="bx-split"><div><b class="g-amber">120A</b><span>MPPT charger</span></div><div><b class="g-blue">9000W</b><span>Max PV input</span></div></div>` })}</div>
      <div class="bento3">${bx({ v: '620W', label: 'Tier 1 bifacial panels', tone: 'blue', small: 1 })}${bx({ v: '25000h', label: 'LED bulb lifespan', tone: 'amber', gold: true, small: 1 })}${bx({ raw: 1, v: '24/7', label: 'After-sales support', sub: 'Dedicated engineers', tone: 'silver', small: 1 })}</div></div></section>`;
  }
  const crumbs = (...xs) => ['<a href="#home">Home</a>'].concat(xs).join('<span>›</span>');

  /* ---------- header + mega menus ---------- */
  const NAV = [['home', 'Home'], ['products', 'Products', 1], ['services', 'Services', 1], ['projects', 'Projects', 1], ['financing', 'Cloud Financing'], ['affiliates', 'Affiliates'], ['stores', 'Store Locator'], ['about', 'About Us'], ['contact', 'Contact us']];
  function header() {
    return `<header class="hdr" id="hdr"><div class="wrap hdr-in"><a class="logo" href="#home" aria-label="Cloud Energy home"><img src="img/logo.png" alt="Cloud Energy" width="112" height="46"></a>
      <nav class="nav" aria-label="Main">${NAV.map(([k, n, dd]) => dd ? `<button type="button" data-nav="${k}" data-mega="${k}" aria-expanded="false" aria-haspopup="true">${n}${I.chev}</button>` : `<a href="#${k}" data-nav="${k}">${n}</a>`).join('')}</nav>
      <div class="hdr-cta"><a class="btn" href="#products">Buy a Product</a>${quoteBtn('Get a Quote', '', '', 'outline')}</div>
      <button class="burger" data-drawer aria-label="Open menu">${I.menu}</button></div><div id="megaMount"></div></header>`;
  }
  function megaHTML(k) {
    const top = (title, n, label, href) => `<div class="mega-top"><h3>${title} <span class="count">${n}</span></h3><a class="btn sm" href="#${href}">${label} ${AR}</a></div>`;
    if (k === 'products') return top('Product Categories', D.cats.length + ' Categories', 'View All Products', 'products') + `<div class="mgrid">${D.cats.map(c => `<a class="mcard" href="#c-${c.id}"><div class="mi">${CUT.has(c.img) ? `<img src="img/cut/${c.img}.webp" alt="">` : `<img class="ph" src="${IMG(c.img)}" alt="">`}</div><div class="mb"><b>${esc(c.name)}</b><span>${esc(c.range)}</span><span class="link">View Products ${AR}</span></div></a>`).join('')}</div>`;
    if (k === 'services') return top('Our Services', SERVICES.length + ' Services', 'View All Services', 'services') + `<div class="mgrid photo">${SERVICES.map(s => `<a class="mcard" href="#services" data-svc="${s.id}"><div class="mi"><img class="cover" src="${SVC_IMG[s.id]}" alt="" loading="lazy"></div><div class="mb"><b>${esc(s.title)}</b><span>${esc(s.home.split('.')[0])}.</span><span class="link">View Service ${AR}</span></div></a>`).join('')}</div>`;
    return top('Our Projects', PROJECTS.length + ' Program Areas', 'View All Projects', 'projects') + `<div class="mgrid two">${PROJECTS.map((p, i) => `<a class="mcard" href="#projects" data-ptab="${i}" style="grid-template-columns:200px 1fr;grid-template-rows:auto"><div class="mi" style="height:100%"><img class="cover" src="${PH(PROJ_IMG[p.id][0])}" alt="" loading="lazy"></div><div class="mb" style="padding:16px"><span class="label">${esc(p.big)} ${esc(p.bigLabel)}</span><b>${esc(p.name)}</b><span>${esc(p.title)}</span><span class="link">View Project ${AR}</span></div></a>`).join('')}</div><a class="mev" href="#cloud-ride"><span class="tag dot">New</span><b>Cloud Ride</b><span>Electric mobility by Cloud Energy</span><span class="link">Discover ${AR}</span></a>`;
  }
  let megaTimer = null;
  function openMega(k) {
    clearTimeout(megaTimer);
    const mount = document.getElementById('megaMount');
    document.querySelectorAll('[data-mega]').forEach(b => b.setAttribute('aria-expanded', String(b.dataset.mega === k)));
    if (!k) { mount.innerHTML = ''; return; }
    if (mount.dataset.k === k && mount.firstChild) return;
    mount.dataset.k = k;
    mount.innerHTML = `<div class="mega" role="region" aria-label="${k} menu"><div class="wrap mega-in">${megaHTML(k)}</div></div>`;
  }
  function closeMega() { const m = document.getElementById('megaMount'); if (m) { m.innerHTML = ''; m.dataset.k = ''; } document.querySelectorAll('[data-mega]').forEach(b => b.setAttribute('aria-expanded', 'false')); }
  function drawer() {
    const d = document.createElement('div'); d.className = 'drawer'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-label', 'Menu');
    d.innerHTML = `<div class="drawer-p"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><img src="img/logo.png" alt="Cloud Energy" style="height:40px"><button class="burger" style="display:inline-flex;margin:0" data-close aria-label="Close menu">${I.close}</button></div>
      <a href="#home">Home</a><a href="#products">Products</a>${D.cats.map(c => `<a class="sub" href="#c-${c.id}">${esc(c.name)}</a>`).join('')}<a href="#services">Services</a><a href="#projects">Projects</a><a href="#cloud-ride">Cloud Ride (EV)</a><a href="#financing">Cloud Financing</a><a href="#affiliates">Affiliates</a><a href="#stores">Store Locator</a><a href="#about">About Us</a><a href="#awards">Awards &amp; Recognition</a><a href="#careers">Careers</a><a href="#contact">Contact us</a>
      <div class="btns" style="margin-top:18px"><a class="btn" href="#products">Buy a Product</a>${quoteBtn('Get a Quote', '', '', 'outline')}</div></div>`;
    d.addEventListener('click', e => { if (e.target === d || e.target.closest('[data-close]') || e.target.closest('a') || e.target.closest('[data-quote]')) d.remove(); });
    document.body.appendChild(d); d.querySelector('a').focus();
  }
  function bulkBanner() {
    return `<section class="bulk"><div class="wrap"><span class="out">Commercial &amp; Residential Installations</span><h2>Need Solar for Your Home, Business or Community?</h2><p>From single homes to estates, schools and factories, our engineers size, supply and install the right system for your load.</p><div class="btns" style="justify-content:center">${quoteBtn('Request Quote ' + AR, 'Commercial Solar')}<a class="btn white" href="#contact">Speak with an Engineer</a></div></div></section>`;
  }
  function footer() {
    const col = (h, items) => `<div><h4>${h}</h4><ul>${items.map(([n, href, q]) => `<li>${q ? `<a href="#quote" data-quote="Solar Products" data-msg="${esc(q)}">${n}</a>` : `<a href="#${href}">${n}</a>`}</li>`).join('')}</ul></div>`;
    return `<section class="news"><div class="wrap"><h3>Stay Updated on Solar Deals</h3><form id="newsForm" novalidate><label class="sr" for="newsEmail" style="position:absolute;left:-9999px">Email address</label><input id="newsEmail" type="email" placeholder="Enter your email" autocomplete="email"><button class="btn navy" type="submit">Subscribe</button></form></div></section>
      <footer class="ftr"><div class="wrap fcols"><div class="fbrand"><img src="img/logo-tagline.png" alt="Cloud Energy, energy for a better life"><p>Leading solar energy supplier in Nigeria since 2013.</p><div class="fbranches">${CONTACT.branches.map(b => `<small><b>${b[0]}${b[0] === 'Lagos' ? ' (Head office)' : ''}:</b> ${esc(b[2])}</small>`).join('')}</div><div class="social">${SOCIAL.map(([n, ic, u]) => `<a href="${u}" target="_blank" rel="noopener" aria-label="${n}">${ic}</a>`).join('')}</div></div>
      ${col('Generation &amp; Storage', [['Battery', 'c-lithium-batteries'], ['Charge Controller', 'c-charge-controllers'], ['Energy Storage Bundle', 'c-energy-storage-bundle'], ['Inverters', 'c-hybrid-inverters'], ['Solar Panel', 'c-solar-panels']])}
      ${col('Energy Appliances', [['Air Conditioner', '', 'I am interested in a solar-ready air conditioner.'], ['Fans', 'c-fans'], ['Freezers', 'c-cold-storage'], ['LED Bulbs', 'c-led-lighting'], ['Sunbox', 'c-sunbox']])}
      ${col('Quick Link', [["FAQ's", 'faq'], ['Our Partners', 'partner'], ['Awards & Recognition', 'awards'], ['Careers', 'careers']])}
      ${col('Navigation', [['About Us', 'about'], ['Solar Access (SEPP)', 'financing'], ['Projects', 'projects'], ['Cloud Ride (EV)', 'cloud-ride'], ['Blog', 'blog'], ['Store Locator', 'stores'], ['Contact Us', 'contact']])}</div>
      <div class="fbot"><div class="wrap"><span>© 2026 Cloud Energy Photoelectric LTD</span><span><a href="#policies" style="text-decoration:none">Privacy Policy</a> | <a href="#policies" style="text-decoration:none">Terms of Service</a> | <a href="#policies" style="text-decoration:none">Warranty Policy</a></span></div></div></footer>`;
  }

  /* ---------- HOME ---------- */
  const SLIDES = 5;
  function heroHTML() {
    const s1 = `<div class="slide" data-dark="1"><img class="bgimg" src="${PH('home-hero')}" alt="Solar panels on a Nigerian home" fetchpriority="high"><div class="shade"></div><div class="wrap inner"><div class="s-copy"><span class="eyebrow-chip">Cloud Energy · Established 2013</span><h1 class="h-hero">Reliable Solar Power for Homes &amp; Businesses</h1><div class="rule"></div><p>Inverters, lithium storage and Tier 1 panels, installed by engineers.</p><div class="btns"><a class="btn" href="#products">Explore Products ${AR}</a>${quoteBtn('Get a Quote', '', '', 'outline')}</div>
      <div class="s-meta"><div><small>Hybrid inverters</small><span>3.6kW – 12kW</span></div><div><small>Lithium storage</small><span>960Wh – 16.07kWh</span></div><div><small>Solar panels</small><span>Up to 620W bifacial</span></div></div></div></div></div>`;
    const s2 = `<div class="slide light-slide"><div class="split2"><div class="ph"><img src="${PH('family')}" alt="A family at home with solar power"><span class="ph-badge">Solar Access Program</span><div class="ph-cap">${I.shield}<span>Energy storage for homes and small businesses, paid over time</span></div></div><div class="pc"><div class="s-copy"><span class="eyebrow-chip amber light">Cloud Financing · SEPP</span><h1 class="h-hero">Own Your Solar System. Pay Over Time.</h1><p>Spread the cost with Cloud Pay instalments or finance through a participating bank.</p><div class="chips"><span class="chip">${I.clock}3–18 months</span><span class="chip">${I.bolt}1kVA – 6.5kVA</span><span class="chip">${I.bank}Partner banks</span></div><div class="btns"><a class="btn" href="#financing">Apply for Payment Plan ${AR}</a>${quoteBtn('Request an Energy Audit', 'Energy Audit', '', 'outline')}</div><p class="note">Terms depend on the system and finance provider.</p></div></div></div></div>`;
    const s3 = `<div class="slide light-slide"><div class="wrap inner" style="gap:56px;justify-content:space-between"><div class="s-copy" style="max-width:560px"><span class="eyebrow-chip light">Energy Storage</span><h1 class="h-hero" style="font-size:clamp(38px,4.4vw,64px)">Lithium Storage, Built for <span style="color:var(--blue)">Your Load.</span></h1><p>LiFePO4 batteries from 12.8V to 51.2V that pair with our inverters and scale in parallel as your needs grow.</p><div class="btns"><a class="btn" href="#c-lithium-batteries">View Batteries ${AR}</a><a class="btn outline" href="#home" data-calclink>Size My System</a></div>
      <div class="s-meta"><div><small>960Wh</small><span>Entry capacity</span></div><div><small>16.07kWh</small><span>Largest single unit</span></div><div><small>LiFePO4</small><span>Chemistry</span></div></div></div>
      <div class="prodcard-wrap"><div class="prodcard"><div class="pt">Cloud Energy · Lithium Ion Battery</div><div class="pi"><img src="${IMG('lith-s10')}" alt="Cloud Energy lithium battery"></div><div class="ps"><div><small>Planning</small><b>Load audit</b></div><div><small>Integration</small><b>Hybrid ready</b></div><div><small>Configuration</small><b>Parallel</b></div></div></div></div></div></div>`;
    const s4 = `<div class="slide light-slide"><div class="split2 wide"><div class="ph"><img src="${PH('audit')}" alt="Engineer carrying out an energy audit"><div class="ph-cap card"><span><b>Energy Audit</b>On-site load assessment</span></div></div><div class="pc"><div class="s-copy"><span class="eyebrow-chip light">Engineering Services</span><h1 class="h-hero" style="font-size:clamp(36px,4vw,60px)">Know Your Load Before You Invest.</h1><ul class="ticks"><li>Consumption, peak usage and critical loads measured</li><li>Roof, space and cable routes assessed on site</li><li>A system sized to your budget and growth plans</li></ul><div class="btns">${quoteBtn('Book an Energy Audit ' + AR, 'Energy Audit')}<a class="btn outline" href="#services">Our Services</a></div>
      <div class="s-meta"><div><small>01</small><span>Audit</span></div><div><small>02</small><span>Design</span></div><div><small>03</small><span>Install</span></div><div><small>04</small><span>Support</span></div></div></div></div></div></div>`;
    const s5 = `<div class="slide" data-dark="1"><img class="bgimg" src="${PH('rooftop')}" alt="Engineers testing a commercial rooftop solar array in Lagos"><div class="shade"></div><div class="wrap inner"><div class="s-copy"><span class="eyebrow-chip amber">Commercial · Mini Grids · Rooftop</span><h1 class="h-hero">Energy That Creates Impact.</h1><div class="rule" style="background:var(--amber)"></div><p>Rooftop arrays and mini grids that cut diesel and keep business running.</p><div class="btns"><a class="btn" href="#projects">View Projects ${AR}</a><a class="btn ghost-w" href="#partner">Partner with Us</a></div></div></div></div>`;
    return `<section class="hero" id="hero" aria-roledescription="carousel" aria-label="Highlights"><div class="slides">${[s1, s2, s3, s4, s5].join('')}</div>
      <button class="arrow l" data-hero="-1" aria-label="Previous slide">${I.left}</button><button class="arrow r" data-hero="1" aria-label="Next slide">${I.right}</button>
      <div class="dots">${Array.from({ length: SLIDES }, (_, i) => `<button data-dot="${i}" aria-label="Go to slide ${i + 1}"></button>`).join('')}</div><div class="counter" id="heroCount">01 / 05</div></section>`;
  }
  /* ---------- solutions illustration (isometric) ---------- */
  const SOL = [
    { id: 'res', icon: I.house, name: 'Residential', title: 'Residential Solar Solutions', text: 'Solar home systems from 1KVA to 5KVA, pairing hybrid inverters, LiFePO4 storage and Tier 1 panels so families keep the lights, fans and fridge running day and night.', href: '#projects', ptab: 1 },
    { id: 'ess', icon: I.battery, name: 'Energy Storage', title: 'Energy Storage Systems', text: 'Lithium batteries from 960Wh to 16.07kWh that scale in parallel, with built-in battery management and smart monitoring.', href: '#c-lithium-batteries' },
    { id: 'cni', icon: I.brief, name: 'Commercial & Industrial', title: 'Commercial & Industrial Solutions', text: 'Solar for businesses on lease-to-own or energy-as-a-service terms. Over 1,000 business systems deployed across Nigeria, from shops to hospitals.', href: '#projects', ptab: 3 },
    { id: 'mini', icon: I.bolt, name: 'Mini Grids', title: 'Mini Grids & Rural Electrification', text: 'Hybrid mini grids with battery storage and smart metering, such as the 100KVA Viu Kutha project in Borno, powering 600+ homes.', href: '#projects', ptab: 0 },
    { id: 'street', icon: I.bulb, name: 'Street Lighting', title: 'Solar Street Lighting', text: 'All-in-one solar street lights that improve security for schools, homes, stadiums and businesses, with no grid connection needed.', href: '#c-street-lights' }
  ];
  const SOLC = {
    res: { photo: PH('home-hero'), tag: 'Homes', stat: ['1–5', 'KVA', 'Solar home systems'], stat2: ['3,000+', 'Homes powered by our 2017 projects'], prod: ['hyb-s08', 'Hybrid inverters', '3.6kW – 12kW'], chips: ['Hybrid inverter', 'Lithium storage', 'Tier 1 panels', 'App monitoring'] },
    ess: { photo: PR('minigrid-bess'), tag: 'Storage', stat: ['16.07', 'kWh', 'In a single battery'], stat2: ['960Wh', 'Smallest unit, scales in parallel'], prod: ['lith-s08', 'Lithium batteries', 'LiFePO4 · 12.8V – 51.2V'], chips: ['Built-in BMS', 'Parallel ready', 'Bluetooth / Wi-Fi', 'Maintenance free'] },
    cni: { photo: PR('ssbu-shop'), tag: 'Business', stat: ['1,000', '+', 'Business systems deployed'], stat2: ['2–10 yrs', 'Lease-to-own through partner banks'], prod: ['lf-s10', 'Business inverters', '1KVA – 15KVA'], chips: ['Lease to own', 'Energy as a service', 'Shops & offices', 'Hospitals'] },
    mini: { photo: PR('minigrid-amagu'), tag: 'Communities', stat: ['100', 'KVA', 'Viu Kutha hybrid mini grid'], stat2: ['600+', 'Homes to be electrified in Borno'], photo2: PR('borno-site'), chips: ['Solar + storage', 'Smart metering', 'Rural electrification', 'Item Amagu · Ebonyi'] },
    street: { photo: PR('streetlight'), tag: 'Streets', stat: ['100', '%', 'Solar powered, no grid needed'], stat2: ['All-in-one', 'Panel, battery and lamp in one unit'], photo2: PR('standalone-install'), chips: ['Schools', 'Estates', 'Stadiums', 'Business premises'] }
  };
  function solCards(x) {
    const c = SOLC[x.id];
    const num = /^[\d,]+$/.test(c.stat[0]) ? `data-count="${c.stat[0].replace(/,/g, '')}"` : '';
    return `<div class="lb">
      <figure class="lc l-photo" style="--n:0"><img src="${c.photo}" alt="" loading="lazy"><figcaption><span class="pill">${esc(c.tag)}</span><b>${esc(x.name)}</b></figcaption></figure>
      <div class="lc l-stat" style="--n:1">${WAVES('#1190C8', '#9ED8F5')}<div class="l-num"><span class="g-navy" ${num}>${esc(c.stat[0])}</span><small class="g-navy">${esc(c.stat[1])}</small></div><span class="l-lbl">${esc(c.stat[2])}</span></div>
      ${c.prod ? `<div class="lc l-prod" style="--n:2"><div class="l-stage">${CUT.has(c.prod[0]) ? `<img src="img/cut/${c.prod[0]}.webp" alt="">` : `<img class="mb" src="${IMG(c.prod[0])}" alt="">`}</div><b>${esc(c.prod[1])}</b><span>${esc(c.prod[2])}</span></div>`
        : `<figure class="lc l-photo2" style="--n:2"><img src="${c.photo2}" alt="" loading="lazy"></figure>`}
      <div class="lc l-stat2" style="--n:3">${WAVES('#F9A930', '#FFE7B8')}<div class="l-num sm"><span class="g-amber2">${esc(c.stat2[0])}</span></div><span class="l-lbl">${esc(c.stat2[1])}</span></div>
      <div class="lc l-chips" style="--n:4">${c.chips.map((t, i) => `<span style="--i:${i}">${I.check}${esc(t)}</span>`).join('')}</div></div>`;
  }
  function isoSVG() {
    const U = 30, CX = 560, CY = 300;
    const P = (x, y, z = 0) => [(x - y) * U * 0.866 + CX, (x + y) * U * 0.5 - z * U + CY];
    const pt = a => a[0].toFixed(1) + ',' + a[1].toFixed(1);
    const poly = (pts, cls) => `<polygon class="${cls}" points="${pts.map(p => pt(P(...p))).join(' ')}"/>`;
    const items = []; // [depth, svg]
    const box = (x, y, w, d, h, cls, z = 0) => items.push([x + y + w + d, `<g class="${cls}">${poly([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]], 'fl')}${poly([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]], 'fr')}${poly([[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]], 'ft')}</g>`]);
    const panels = (x, y, cols, rows, z = 0, dep = 0) => { for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const px = x + c * 1.25, py = y + r * 1.1; items.push([px + py + 1.6 + dep, `<g class="pv">${poly([[px, py + 0.9, z + 0.25], [px + 1.1, py + 0.9, z + 0.25], [px + 1.1, py, z + 0.85], [px, py, z + 0.85]], 'pvf')}<line class="pvl" x1="${P(px + 0.55, py + 0.45, z + 0.55)[0]}" y1="${P(px + 0.55, py + 0.45, z + 0.55)[1]}" x2="${P(px + 0.55, py + 0.45, z)[0]}" y2="${P(px + 0.55, py + 0.45, z)[1]}"/></g>`]); } };
    const house = (x, y) => { box(x, y, 2.4, 2.4, 1.4, 'n'); items.push([x + y + 5, poly([[x, y, 1.4], [x + 2.4, y, 1.4], [x + 2.4, y + 1.2, 2.4], [x, y + 1.2, 2.4]], 'roof') + poly([[x, y + 1.2, 2.4], [x + 2.4, y + 1.2, 2.4], [x + 2.4, y + 2.4, 1.4], [x, y + 2.4, 1.4]], 'roof2') + poly([[x + 2.4, y, 1.4], [x + 2.4, y + 2.4, 1.4], [x + 2.4, y + 1.2, 2.4]], 'gable')]); };
    const pole = (x, y) => items.push([x + y + 0.5, `<line class="pole" x1="${P(x, y)[0]}" y1="${P(x, y)[1]}" x2="${P(x, y, 3)[0]}" y2="${P(x, y, 3)[1]}"/>${poly([[x - 0.1, y - 0.1, 3], [x + 0.9, y - 0.1, 3], [x + 0.9, y + 0.35, 3.05], [x - 0.1, y + 0.35, 3.05]], 'lamp')}${poly([[x + 0.1, y - 0.6, 2.4], [x + 0.9, y - 0.6, 2.4], [x + 0.9, y - 0.1, 2.9], [x + 0.1, y - 0.1, 2.9]], 'pvf')}`]);
    const pylon = (x, y) => items.push([x + y + 0.5, `<path class="pylon" d="M${pt(P(x - 0.4, y))}L${pt(P(x, y, 3.4))}L${pt(P(x + 0.4, y))}M${pt(P(x - 0.7, y, 2.6))}L${pt(P(x + 0.7, y, 2.6))}M${pt(P(x - 0.5, y, 3))}L${pt(P(x + 0.5, y, 3))}"/>`]);
    // grid
    let grid = '';
    for (let i = -10; i <= 10; i += 2) { grid += `<line x1="${P(i, -10)[0]}" y1="${P(i, -10)[1]}" x2="${P(i, 10)[0]}" y2="${P(i, 10)[1]}"/><line x1="${P(-10, i)[0]}" y1="${P(-10, i)[1]}" x2="${P(10, i)[0]}" y2="${P(10, i)[1]}"/>`; }
    // city filler
    [[-9, -9, 2, 2, 1.4], [-6.5, -9, 1.6, 1.6, 2.2], [4, -9, 2, 1.6, 1.2], [8, -1, 1.8, 1.8, 2.6], [8, 1.5, 1.6, 1.6, 1.4], [-9, 2, 1.8, 1.8, 1.8], [-3.5, 3, 1.4, 1.4, 1], [2.8, -3.6, 1.4, 1.4, 1.2], [-2, -6, 1.6, 1.6, 1.6], [5.5, 7.5, 1.8, 1.8, 1.2], [-9, 8, 1.6, 1.6, 1.2]].forEach(b => box(...b, 'd'));
    // nodes
    const N = {};
    const mark = (k, fn) => { const start = items.length; fn(); for (let i = start; i < items.length; i++) items[i][1] = `<g class="node" data-k="${k}">${items[i][1]}</g>`; };
    mark('res', () => { house(-8, -6); panels(-5, -6.5, 2, 2); });
    mark('ess', () => { box(4.5, -6.5, 1.2, 1.2, 2.2, 'n bat'); box(6, -6.5, 1.2, 1.2, 2.2, 'n bat'); box(4.5, -4.9, 1.2, 1.2, 2.2, 'n bat'); });
    mark('cni', () => { box(4.2, 2.6, 3, 2.6, 3.4, 'n'); panels(4.45, 2.75, 2, 2, 3.4, 20); });
    mark('mini', () => { panels(-8.5, 4, 3, 3); pylon(-3.2, 5.2); pylon(-3.2, 7.4); box(-4.8, 3.6, 1.2, 1, 1.6, 'n bat'); });
    mark('street', () => { pole(1, 6.5); pole(2.6, 6.5); pole(4.2, 6.5); pole(1, 8.4); });
    // shift building panels to its roof
    const routes = { res: [[-5.8, -4], [-5.8, 0], [-1.2, 0]], ess: [[5, -3.5], [0, -3.5], [0, -1.2]], cni: [[4, 3.8], [3, 3.8], [3, 0], [1.2, 0]], mini: [[-4, 4.6], [-4, 2], [0, 2], [0, 1.2]], street: [[1.6, 6.2], [1.6, 1.2], [0.8, 1.2]] };
    const path = pts => pts.map((p, i) => (i ? 'L' : 'M') + pt(P(...p))).join(' ');
    items.sort((a, b) => a[0] - b[0]);
    // core cube
    const core = `<g class="core">${(() => { const x = -1.2, y = -1.2, w = 2.4, h = 2.4; return `<g class="c">${poly([[x, y + w, 0], [x + w, y + w, 0], [x + w, y + w, h], [x, y + w, h]], 'fl')}${poly([[x + w, y, 0], [x + w, y + w, 0], [x + w, y + w, h], [x + w, y, h]], 'fr')}${poly([[x, y, h], [x + w, y, h], [x + w, y + w, h], [x, y + w, h]], 'ft')}</g>`; })()}<image href="img/logo.png" x="${P(0, 0, 2.4)[0] - 34}" y="${P(0, 0, 2.4)[1] - 13}" width="68" height="28" preserveAspectRatio="xMidYMid meet"/></g>`;
    const pings = Object.entries(routes).map(([k, r]) => `<circle class="ping" data-k="${k}" cx="${P(...r[0])[0]}" cy="${P(...r[0])[1]}" r="7"/>`).join('');
    return `<svg class="iso" viewBox="120 40 880 520" aria-hidden="true"><defs><radialGradient id="isofade" cx="50%" cy="50%" r="50%"><stop offset="60%" stop-color="#fff" stop-opacity="1"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/></radialGradient><mask id="isomask"><rect x="0" y="0" width="1200" height="700" fill="url(#isofade)"/></mask></defs>
      <g mask="url(#isomask)"><g class="grid">${grid}</g>
      ${Object.entries(routes).map(([k, r]) => `<g class="route" data-k="${k}"><path class="wire" d="${path(r)}"/><path class="flow" d="${path(r)}"/></g>`).join('')}
      ${items.map(i => i[1]).join('')}${pings}${core}</g></svg>`;
  }
  const solutions = () => `<section class="sec sol" id="solutions"><div class="wrap sol-grid">
    <div class="sol-tabs" role="tablist" aria-label="Solutions">${SOL.map((x, i) => `<button role="tab" class="sol-tab${i === 2 ? ' on' : ''}" data-sol="${i}" aria-selected="${i === 2}"><span class="nm">${esc(x.name)}</span><span class="ic"><svg class="ring" viewBox="0 0 60 60"><circle cx="30" cy="30" r="27"/></svg>${x.icon}</span></button>`).join('')}</div>
    <div class="sol-copy" id="solCopy"></div>
    <div class="sol-art" id="solArt"></div></div></section>`;
  function setSol(i) {
    const box = document.getElementById('solCopy'); if (!box) return;
    S.sol = i; const x = SOL[i];
    document.querySelectorAll('.sol-tab').forEach((b, j) => { b.classList.toggle('on', j === i); b.setAttribute('aria-selected', String(j === i)); });
    box.innerHTML = `<h2 class="h-sec">${esc(x.title)}</h2><p class="lead">${esc(x.text)}</p><a class="btn sol-more" href="${x.href}"${x.ptab != null ? ` data-ptab="${x.ptab}"` : ''}>More ${AR}</a>`;
    box.classList.remove('swap'); void box.offsetWidth; box.classList.add('swap');
    const art = document.getElementById('solArt');
    if (art) {
      const old = art.firstElementChild;
      const draw = () => { art.innerHTML = solCards(x); const sp = art.querySelector('[data-count]'); if (sp) tween(sp, 0, Number(sp.dataset.count), 1200, v => Math.round(v).toLocaleString()); };
      if (old && !matchMedia('(prefers-reduced-motion: reduce)').matches) { old.classList.add('leave'); setTimeout(draw, 320); } else draw();
    }
  }
  function startSol() {
    clearInterval(S.solTimer); if (!document.getElementById('solCopy')) return;
    setSol(S.sol == null ? 2 : S.sol);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    S.solTimer = setInterval(() => { const sec = document.querySelector('.sol'); if (!sec || !document.body.contains(sec)) return clearInterval(S.solTimer); if (!sec.matches(':hover')) setSol((S.sol + 1) % SOL.length); }, 6000);
  }

  function home() {
    const show = ['hybrid-inverters', 'lithium-batteries', 'solar-panels', 'charge-controllers', 'sunbox', 'cold-storage'].map(id => D.byId[id]);
    const fq = [FAQ[2].q[0], FAQ[1].q[0], FAQ[4].q[2], FAQ[3].q[0], FAQ[2].q[2]];
    return `<div class="homeflow">` + heroHTML()
      + `<section class="statbar"><div class="wrap stats">${[['2013', 'Registered with the CAC', 0], ['10000', 'Homes powered', '+'], ['1000', 'Business solar solutions', '+'], ['24/7', 'After-sales support', 0]].map(s => `<div class="stat"><b ${s[2] ? `data-count="${s[0]}" data-suffix="${s[2]}"` : ''}>${s[2] ? Number(s[0]).toLocaleString() + s[2] : s[0]}</b><span>${s[1]}</span></div>`).join('')}</div></section>`
      + awardsRibbon()
      + solutions()
      + `<section class="sec pale"><div class="wrap">${head('Product catalogue', 'Shop by Category', 'Inverters, batteries, panels and appliances, with full datasheets and eShop links.', true)}<div class="cat-grid">${show.map(catCard).join('')}</div><div class="center" style="margin-top:40px"><a class="btn" href="#products">View All Products ${AR}</a></div></div></section>`
      + specBento()
      + `<section class="sec pale"><div class="wrap">${head('How we deliver', 'End-to-End Energy Services', 'From the first energy audit to maintenance years later, one accountable team.', true)}${svcGrid()}<div class="center" style="margin-top:40px"><a class="btn navy" href="#services">View All Services ${AR}</a></div></div></section>`
      + `<section class="sec" id="calculator"><div class="wrap">${head('Load calculator', 'What Size System Do You Need?', 'Tick what runs at the same time.', true)}<div id="calcMount"></div></div></section>`
      + `<section class="sec pale"><div class="wrap fin"><div class="photo" style="aspect-ratio:5/4"><img src="${PH('family')}" alt="Family enjoying reliable power at home" loading="lazy"><span class="badge">Solar Access Program</span></div>
        <div style="display:grid;gap:24px"><span class="tag">Cloud Financing</span><h2 class="h-sec">Go Solar Now. Pay in Instalments.</h2>
        <div style="display:grid;gap:18px">${[[I.clock, 'Cloud Pay instalments', 'A fixed initial deposit, then 3 to 18 months for 1kVA – 6.5kVA systems.'], [I.bank, 'Participating banks', 'Finance through Stanbic IBTC, Access Bank or FCMB, on each bank’s terms.'], [I.audit, 'Sized by an energy audit', 'Systems from 1kVA to 6.5kVA, matched to your actual load.']].map(b => `<div class="benefit"><span class="bi">${b[0]}</span><div><b>${b[1]}</b><p>${b[2]}</p></div></div>`).join('')}</div>
        <div><a class="btn navy lg" href="#financing">Apply for Payment Plan ${AR}</a></div></div></div></section>`
      + `<section class="sec pale"><div class="wrap">${head('Our impact', 'Power That Changes Communities', '', true)}<div class="ovgrid">
        ${ov({ cls: 'a', href: '#projects', attrs: 'data-ptab="0"', img: PR('akwarata-powerhouse'), pill: 'Ebonyi State', stat: ['50 kW', 'hybrid solar system'], title: 'Akwarata Agbaja', text: 'A Cloud Energy hybrid solar system with battery storage serving the Akwarata Agbaja community.', go: 'View projects' })}
        ${ov({ cls: 'w2', href: '#projects', attrs: 'data-ptab="3"', img: PH('rooftop'), pill: 'Rooftop solar', stat: ['200+', 'commercial installations'], title: 'Rooftop Solar', go: 'Explore' })}
        ${ov({ href: '#projects', attrs: 'data-ptab="1"', img: PH('shs-main'), pill: 'Homes', stat: ['10K+', 'homes'], title: 'Solar Home Systems', go: 'Explore' })}
        ${ov({ href: '#projects', attrs: 'data-ptab="2"', img: PH('zero-main'), pill: 'Pay over time', stat: ['3–18', 'months to pay'], title: 'Buy Now, Pay Later', go: 'Explore' })}</div></div></section>`
      + fieldGallery()
      + testimonials()
      + `<section class="sec hpeople"><div class="wrap hp-grid"><div class="hp-copy"><span class="tag">Our people</span><h2 class="h-sec">The People Behind the Power</h2><p class="lead">Engineers, project managers and support staff who design, install and look after every Cloud Energy system, led by a team with over a decade in Nigerian solar.</p><div class="btns"><a class="btn navy" href="#about">About Cloud Energy ${AR}</a><a class="btn outline" href="#careers">Join Us</a></div></div>
        <div class="hp-photos"><figure class="hp-big"><img src="img/awards/team.webp" alt="Team Cloud Energy at the 2026 awards" loading="lazy"><figcaption>Team Cloud Energy, 2026 awards</figcaption></figure>${TEAM.filter(t => t.lead).slice(0, 4).map(t => `<figure class="hp-face"><img src="img/leaders/${t.lead}-orig.webp" alt="${esc(t.n)}, ${esc(t.r)}" loading="lazy"><figcaption><b>${esc(t.n.replace(/^Engr\. /, ''))}</b><span>${esc(t.r)}</span></figcaption></figure>`).join('')}</div></div></section>`
      + evBand()
      + `<section class="sec"><div class="wrap faqgrid"><div style="display:grid;gap:20px;position:sticky;top:120px"><span class="tag">FAQ</span><h2 class="h-sec">Frequently Asked Questions</h2><p class="lead">Quick answers about choosing, financing and maintaining your system.</p><div class="btns"><a class="btn navy" href="#contact">Speak to an Engineer ${AR}</a><a class="btn outline" href="#faq">All FAQs</a></div></div>${faqBlock(fq, true)}</div></section>`
      + bulkBanner() + `</div>`;
  }
  function goSlide(n) {
    const hero = document.getElementById('hero'); if (!hero) return;
    S.hero = (n + SLIDES) % SLIDES;
    const slides = hero.querySelectorAll('.slide');
    slides.forEach((s, i) => { s.classList.toggle('on', i === S.hero); s.setAttribute('aria-hidden', String(i !== S.hero)); s.querySelectorAll('a,button').forEach(b => b.tabIndex = i === S.hero ? 0 : -1); });
    hero.querySelectorAll('.dots button').forEach((d, i) => { d.classList.toggle('on', i === S.hero); d.setAttribute('aria-current', String(i === S.hero)); });
    hero.classList.toggle('lightc', !slides[S.hero].dataset.dark);
    const c = document.getElementById('heroCount'); if (c) c.textContent = '0' + (S.hero + 1) + ' / 05';
    placeTrack(hero, 0, true);
  }
  function placeTrack(hero, dx, anim) {
    const track = hero.querySelector('.slides'); const first = track && track.children[0]; if (!first) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = first.offsetWidth + gap; const off = (hero.clientWidth - first.offsetWidth) / 2;
    track.style.transition = anim ? '' : 'none';
    track.style.transform = `translate3d(${off - S.hero * step + dx}px,0,0)`;
  }
  function bindDrag(hero) {
    if (hero.dataset.drag) return; hero.dataset.drag = 1;
    const track = hero.querySelector('.slides'); let x0 = null, dx = 0, moved = false, id = null;
    track.addEventListener('pointerdown', e => { if (e.button !== 0 || e.target.closest('a,button')) return; x0 = e.clientX; dx = 0; moved = false; id = e.pointerId; hero.classList.add('dragging', 'paused'); });
    window.addEventListener('pointermove', e => { if (x0 === null || e.pointerId !== id) return; dx = e.clientX - x0; if (Math.abs(dx) > 6) { moved = true; try { track.setPointerCapture(id); } catch (_) {} } const edge = (S.hero === 0 && dx > 0) || (S.hero === SLIDES - 1 && dx < 0); placeTrack(hero, edge ? dx * 0.35 : dx, false); });
    const end = e => { if (x0 === null) return; hero.classList.remove('dragging', 'paused'); const w = track.children[0].offsetWidth; const n = Math.abs(dx) > w * 0.15 ? (dx < 0 ? 1 : -1) : 0; x0 = null; if (n && !((S.hero === 0 && n < 0) || (S.hero === SLIDES - 1 && n > 0))) { goSlide(S.hero + n); startHero(); } else placeTrack(hero, 0, true); };
    window.addEventListener('pointerup', end); window.addEventListener('pointercancel', end);
    track.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; return; } const sl = e.target.closest('.slide'); if (sl && !sl.classList.contains('on')) { e.preventDefault(); e.stopPropagation(); goSlide([...track.children].indexOf(sl)); startHero(); } }, true);
    window.addEventListener('resize', () => placeTrack(hero, 0, false));
  }
  function startHero() {
    clearInterval(S.heroTimer);
    const hero = document.getElementById('hero'); if (!hero) return;
    bindDrag(hero);
    goSlide(S.hero);
    // restart dot progress animation
    const on = hero.querySelector('.dots button.on'); if (on) { on.classList.remove('on'); void on.offsetWidth; on.classList.add('on'); }
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    S.heroTimer = setInterval(() => { if (!hero.classList.contains('paused') && document.body.contains(hero)) goSlide(S.hero + 1); }, 7000);
  }

  /* ---------- calculator ---------- */
  function recommend(w) {
    const M = D.modelById;
    if (w <= 0) return null;
    const pick = (inv, bat, batN, panel, panelMaxW, ctrl, note) => {
      const pw = parseInt(M[panel].name, 10); const n = Math.max(1, Math.min(Math.ceil(w * 1.6 / pw), Math.floor(panelMaxW / pw)));
      const kwh = { 'lith-12-8v-100ah': 1.28, 'lith-25-6v-100ah': 2.56, 'lith-25-6v-200ah': 5.12, 'lith-51-2v-314ah': 16.07, 'sunbox-pro-1-25kva': 0.96 }[bat] * batN;
      return { inv, bat, batN, panel, n, ctrl, kwh, hrs: kwh * 0.9 / (w / 1000), note };
    };
    if (w <= 800) return pick('sunbox-pro-1-25kva', 'sunbox-pro-1-25kva', 1, 'solar-180w-mono', 405, null, 'All-in-one unit with built-in battery and MPPT controller.');
    if (w <= 1200) return pick('lf-1-5kva-24v', 'lith-25-6v-100ah', 1, 'solar-590w-bifacial', 1620, 'mppt-60a');
    if (w <= 1600) return pick('lf-2kva-24v', 'lith-25-6v-200ah', 1, 'solar-590w-bifacial', 1620, 'mppt-60a');
    if (w <= 2880) return pick('hybrid-3-6kw-24v', 'lith-25-6v-200ah', 1, 'solar-590w-bifacial', 5000, null);
    if (w <= 5200) return pick('hybrid-6-5kw-48v', 'lith-51-2v-314ah', 1, 'solar-620w-bifacial', 9000, null);
    if (w <= 9600) return pick('hybrid-12kw-48v', 'lith-51-2v-314ah', 2, 'solar-620w-bifacial', 15000, null);
    return pick('hybrid-12kw-48v', 'lith-51-2v-314ah', 2, 'solar-620w-bifacial', 15000, null, 'Above 9.6kW, several 12kW inverters can run in parallel. Talk to an engineer for a full design.');
  }
  const APPL_SUB = { 'LED Bulbs': 'Lighting', 'Ceiling Fan': 'Cooling', 'Television': 'Entertainment', 'Wi-Fi Router': 'Connectivity', 'Refrigerator': 'Kitchen', 'Laptop Charging': 'Work', 'Air Conditioner': 'Cooling', 'Water Pump': 'Utility', 'Freezer': 'Kitchen', 'Washing Machine': 'Laundry', 'Microwave': 'Kitchen', 'Iron': 'Laundry' };
  let lastLoad = 0;
  function renderCalc(animate) {
    const mount = document.getElementById('calcMount'); if (!mount) return;
    const w = APPLIANCES.reduce((a, [n, wt]) => a + (S.calc[n] ? wt : 0), 0);
    const r = recommend(w); const M = D.modelById;
    const tier = w === 0 ? 'Select appliances' : w <= 800 ? 'Ideal starter load' : w <= 2880 ? 'Medium load' : w <= 5200 ? 'Heavy load' : 'Very heavy load';
    const rec = (icon, label, id, extra) => `<a class="rec" href="#p-${id}">${icon}<span><small>${label}</small><b>${extra ? extra + ' × ' : ''}${esc(M[id].name)}</b></span></a>`;
    const summary = APPLIANCES.filter(([n]) => S.calc[n]).map(([n, wt]) => `${n} (${wt}W)`).join(', ');
    const list = mount.querySelector('.apl');
    if (!list) {
      mount.innerHTML = `<div class="calc"><div class="apl"><div class="apl-h"><div><b>Your appliances</b><p>Typical wattage shown for each item.</p></div><button class="clear" data-calc-clear>Clear all</button></div><div class="apl-g">${APPLIANCES.map(([n, wt]) => `<button type="button" class="ap" data-calc="${n}" aria-pressed="false"><span class="ck">${I.check}</span><span><b>${n}</b><small>${APPL_SUB[n] || ''}</small></span><span class="w">${wt}W</span></button>`).join('')}</div></div><div class="res" id="calcRes" aria-live="polite"></div></div>`;
    }
    mount.querySelectorAll('.ap').forEach(b => b.setAttribute('aria-pressed', String(!!S.calc[b.dataset.calc])));
    const res = mount.querySelector('#calcRes');
    res.innerHTML = `<div><small class="k">Estimated concurrent load</small><div class="ld" style="margin-top:8px"><b id="ldNum">${lastLoad.toLocaleString()}</b><span>W</span></div><span class="tier${w > 2880 ? ' warn' : ''}">${tier}</span></div><hr>
      ${r ? `<small class="k">Recommended setup</small>${rec(I.inverter, 'Inverter', r.inv)}${r.bat !== r.inv ? rec(I.battery, 'Battery · ' + r.kwh.toFixed(2) + ' kWh', r.bat, r.batN > 1 ? r.batN : '') : ''}${rec(I.panel, 'Solar array', r.panel, r.n)}${r.ctrl ? rec(I.bolt, 'Charge controller', r.ctrl) : ''}
      <p class="note">≈ ${r.hrs >= 10 ? Math.round(r.hrs) : r.hrs.toFixed(1)} hrs backup at this load. ${r.note ? esc(r.note) + ' ' : ''}Indicative only: an energy audit confirms the final design.</p>
      ${quoteBtn('Get Pricing for This Setup ' + AR, 'Residential Solar', `Load calculator: ${w}W estimated concurrent load (${summary}). Suggested setup: ${M[r.inv].name}${r.bat !== r.inv ? ', ' + (r.batN > 1 ? r.batN + ' × ' : '') + M[r.bat].name : ''}, ${r.n} × ${M[r.panel].name}${r.ctrl ? ', ' + M[r.ctrl].name : ''}.`, 'amber')}`
      : `<p class="note" style="font-size:14px">Tick the appliances you want to run together and we will suggest an inverter, battery and solar array from our range.</p>`}`;
    tween(document.getElementById('ldNum'), lastLoad, w, 500, v => Math.round(v).toLocaleString());
    lastLoad = w;
  }
  function tween(el, from, to, dur, fmt) {
    if (!el) return; if (from === to || matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = fmt(to); return; }
    const t0 = performance.now();
    const step = t => { const p = Math.min(1, (t - t0) / dur); const e = 1 - Math.pow(1 - p, 3); el.textContent = fmt(from + (to - from) * e); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }

  /* ---------- PRODUCTS ---------- */
  function products() {
    const q = S.prodQuery.trim().toLowerCase();
    const chips = [['all', 'All Categories']].concat(D.cats.map(c => [c.id, c.name])).map(([id, n]) => `<button class="fchip" aria-pressed="${id === 'all'}" data-chip="${id}">${esc(n)}</button>`).join('');
    let body;
    if (q) {
      const hits = allModels().filter(m => (m.name + ' ' + m.short + ' ' + D.byId[m.cat].name).toLowerCase().includes(q));
      body = `<div class="head"><span class="tag">Search results</span><h2 class="h-cat">${hits.length} product${hits.length === 1 ? '' : 's'} for “${esc(S.prodQuery)}”</h2></div>${hits.length ? `<div class="grid g4">${hits.map(pcard).join('')}</div>` : `<div class="empty"><b>No products match that search.</b><p>Try a wattage, capacity or product type, such as “48V”, “620W” or “fan”.</p></div>`}`;
    } else {
      body = ['Generation & Storage', 'Energy Appliances'].map(g => `<div style="margin-bottom:64px"><div class="head"><span class="tag">${esc(g)}</span><h2 class="h-cat">${g === 'Energy Appliances' ? 'Efficient appliances for solar homes' : 'Power generation and storage'}</h2></div><div class="cat-grid">${D.cats.filter(c => c.group === g).map(catCard).join('')}</div></div>`).join('');
    }
    return pageHero({ img: PH('roof-main'), crumbs: crumbs('<span>Products</span>'), tag: 'Cloud Energy products', title: 'Our Products', lede: 'Inverters, lithium batteries, Tier 1 panels and efficient appliances, all from one supplier.' })
      + `<section class="sec sm pale"><div class="wrap" style="display:grid;gap:18px"><div class="search">${I.search}<input id="prodSearch" type="search" placeholder="Search products, e.g. 48V, 620W, freezer" value="${esc(S.prodQuery)}" aria-label="Search products"></div><div class="filters">${chips}</div></div></section>
      <section class="sec" style="padding-top:64px"><div class="wrap" id="prodBody">${body}</div></section>` + bulkBanner();
  }
  function category(c) {
    const chips = [['all', 'All Categories']].concat(D.cats.map(x => [x.id, x.name])).map(([id, n]) => `<button class="fchip" aria-pressed="${c.id === id}" data-chip="${id}">${esc(n)}</button>`).join('');
    const content = c.onRequest
      ? `<div class="split"><div style="display:grid;gap:20px"><span class="tag">Configured to order</span><h2 class="h-sec">${esc(c.name)}</h2><p class="lead">${esc(c.blurb)} Tell us about your site and we will recommend the right specification and quantity.</p><div class="btns">${quoteBtn('Request a Quote ' + AR, c.id === 'street-lights' ? 'Solar Products' : 'Energy Storage', `I am interested in ${c.name}.`)}<a class="btn outline" href="#contact">Speak with an Engineer</a></div></div>
         <div class="grid g2" style="gap:16px">${c.gallery.map(g => `<div class="pcard" style="cursor:default"><div class="pi"><img src="${IMG(g)}" alt="${esc(c.name)}" loading="lazy"></div></div>`).join('')}</div></div>`
      : `<div style="display:flex;justify-content:space-between;align-items:end;gap:16px;flex-wrap:wrap;margin-bottom:32px"><div class="head" style="margin:0"><span class="tag">${c.models.length} models · ${esc(c.range)}</span><h2 class="h-cat">${esc(c.name)}</h2></div><label class="field" style="min-width:220px"><span class="lbl">Sort</span><select id="sortSel"><option value="rec">Recommended</option><option value="az">Name A–Z</option></select></label></div><div class="grid g4" id="modelGrid">${c.models.map(pcard).join('')}</div>`;
    return `<section class="sec sm pale" style="padding-block:40px 32px"><div class="wrap" style="display:grid;gap:24px"><nav class="crumbs" style="color:var(--slate)" aria-label="Breadcrumb"><a href="#home" style="color:var(--slate)">Home</a><span>›</span><a href="#products" style="color:var(--slate)">Products</a><span>›</span><span>${esc(c.name)}</span></nav>
      <div class="split" style="gap:40px"><div style="display:grid;gap:16px"><span class="tag">${esc(c.short)}</span><h1 class="h-sec" style="font-size:clamp(34px,4vw,52px)">${esc(c.name)}</h1><p class="lead">${esc(c.blurb)}</p></div><div class="pd-media" style="padding:24px;max-height:320px;display:grid;place-items:center"><img src="${IMG(c.img)}" alt="${esc(c.name)}" style="max-height:270px;aspect-ratio:auto"></div></div>
      <div class="filters">${chips}</div></div></section><section class="sec" style="padding-top:56px"><div class="wrap">${content}</div></section>` + related(c.id, null) + bulkBanner();
  }
  function related(catId, modelId) {
    const c = D.byId[catId];
    const same = c.models.filter(m => m.id !== modelId).slice(0, 3);
    const others = ['hybrid-6-5kw-48v', 'lith-25-6v-200ah', 'solar-620w-bifacial', 'mppt-100a', 'sunbox-pro-1-25kva'].map(id => D.modelById[id]).filter(m => m && m.cat !== catId && m.id !== modelId);
    const list = (modelId ? same.concat(others) : others).slice(0, 4);
    return `<section class="sec pale"><div class="wrap">${head('Recommended for you', 'You May Also Like', '', true)}<div class="grid g4">${list.map(pcard).join('')}</div></div></section>`;
  }
  function product(m) {
    const c = D.byId[m.cat];
    const groups = m.groups || [{ h: 'Specifications', rows: m.specs }];
    const allRows = groups.flatMap(g => g.rows);
    const about = m.about || [`The Cloud Energy ${m.name} is part of our ${c.name.toLowerCase()} range. ${m.short}`, 'Contact our team to confirm availability, pricing and the right configuration for your home or business.'];
    const tabs = [['overview', 'Overview'], ['specs', 'Technical Specifications'], ['reviews', 'Reviews'], ['files', 'Files / Download']];
    const tabBody = {
      overview: `<div class="split" style="align-items:start"><div style="display:grid;gap:16px"><h2 class="h-cat">About the ${esc(m.name)}</h2>${about.map(p => `<p class="lead">${esc(p)}</p>`).join('')}</div><div class="grid g2" style="gap:12px">${allRows.slice(0, 8).map(r => `<div class="key"><small>${esc(r[0])}</small><b style="font-size:15px">${esc(r[1])}</b></div>`).join('')}</div></div>
        <div style="margin-top:56px" class="grid g3">${[[I.box, 'Confirm the right model', 'Share your application and quantity. We confirm suitability before purchase.'], [I.doc, 'Review product details', 'Ask for confirmed specifications, warranty terms and compatible equipment.'], [I.pin, 'Plan delivery or bulk supply', 'Give your location and schedule for delivery, installation or larger orders.']].map(x => `<div class="card hov"><span class="icn">${x[0]}</span><h3 class="h-card">${x[1]}</h3><p>${x[2]}</p></div>`).join('')}</div>`,
      specs: `<p class="note" style="margin-bottom:24px">From the Cloud Energy data sheet for the ${esc(m.name)}.</p><div class="grid g2" style="gap:40px">${groups.map(g => `<div><h3 class="h-card" style="margin-bottom:14px">${esc(g.h)}</h3>${specRows(g.rows)}</div>`).join('')}</div>`,
      reviews: `<div class="empty"><span class="icn" style="width:52px;height:52px;border-radius:50%;background:var(--pale);display:grid;place-items:center;color:var(--amber)">${I.star}</span><b style="color:var(--navy);font-size:18px">No verified reviews yet</b><p style="max-width:52ch">We only show ratings from verified customers. Bought the ${esc(m.name)}? Contact us with your order details to leave feedback.</p><a class="btn outline sm" href="#contact">Contact us</a></div>`,
      files: `<div class="ncard" style="grid-template-columns:1fr auto;align-items:center"><div><h3 class="h-card">Documents for the ${esc(m.name)}</h3><p>Datasheet, user guide, installation guide and warranty manual, all as PDF.</p></div>${pdfBtn(m, 'Download Datasheet (PDF)', 'white')}</div>
        <div style="margin-top:20px"><div class="check" style="grid-template-columns:44px 1fr auto;align-items:center"><span class="icn" style="width:40px;height:40px;border-radius:10px;background:rgba(17,144,200,.1);display:grid;place-items:center;color:var(--blue)">${I.doc}</span><span><b style="color:var(--navy)">Product datasheet</b><br><span class="note">PDF · 2 pages · key and full technical specifications</span></span>${pdfBtn(m, 'Download PDF', 'sm')}</div>
        ${[['user-guide', 'User guide', 'How to use, care for and troubleshoot the product'], ['installation-guide', 'Installation guide', 'Location, installation steps and commissioning checklist'], ['warranty', 'Warranty manual', 'Coverage, how to claim and warranty card']].map(d => `<div class="check" style="grid-template-columns:44px 1fr auto;align-items:center"><span class="icn" style="width:40px;height:40px;border-radius:10px;background:rgba(17,144,200,.1);display:grid;place-items:center;color:var(--blue)">${I.doc}</span><span><b style="color:var(--navy)">${d[1]}</b><br><span class="note">PDF · ${d[2]}</span></span>${pdfBtn(m, 'Download PDF', 'sm', d[0])}</div>`).join('')}</div>`
    };
    if (!tabBody[S.pdTab]) S.pdTab = 'overview';
    return `<section class="sec" style="padding-block:40px 72px;background:linear-gradient(180deg,var(--pale),#fff)"><div class="wrap"><nav class="crumbs" style="color:var(--slate)" aria-label="Breadcrumb"><a href="#home" style="color:var(--slate)">Home</a><span>›</span><a href="#products" style="color:var(--slate)">Products</a><span>›</span><a href="#c-${c.id}" style="color:var(--slate)">${esc(c.name)}</a><span>›</span><span>${esc(m.name)}</span></nav>
      <div class="pd" style="margin-top:28px"><a class="pd-media pd-shop" href="${eshop(m)}" target="_blank" rel="noopener" title="Buy the ${esc(m.name)} on the Cloud Energy eShop"><img src="${IMG(m.img)}" alt="${esc(m.name)}, view on the eShop"><span class="eshop-tag">Buy on eShop ↗</span></a>
      <div style="display:grid;gap:22px;min-width:0"><span class="tag">${esc(c.short)}</span><h1 class="h-sec" style="font-size:clamp(32px,3.6vw,48px)">${esc(m.name)}</h1><p class="lead">${esc(m.hero || m.short)}</p>
        <div class="keys">${m.key.map(k => `<div class="key"><small>${esc(k[0])}</small><b>${esc(k[1])}</b></div>`).join('')}</div>
        ${contactRow(m)}<div class="btns"><a class="btn" href="${eshop(m)}" target="_blank" rel="noopener">Buy on the eShop ↗</a>${pdfBtn(m, 'Download Datasheet (PDF)', 'outline')}</div>
        <p class="note"><span style="color:var(--green);font-weight:600">● ${allRows.length} specifications</span> from the Cloud Energy data sheet</p></div></div></div></section>
      ${productBento(m, allRows)}<section class="sec" style="padding-top:24px"><div class="wrap"><div class="tabs" role="tablist">${tabs.map(([id, n]) => `<button role="tab" aria-selected="${S.pdTab === id}" data-pdtab="${id}">${n}</button>`).join('')}</div><div id="pdBody" class="tabpane">${tabBody[S.pdTab]}</div></div></section>` + related(c.id, m.id) + bulkBanner();
  }

  const DOCS = { '': 'Datasheet', 'user-guide': 'User-Guide', 'installation-guide': 'Installation-Guide', warranty: 'Warranty-Manual' };
  const pdfName = (m, t) => 'Cloud-Energy-' + m.name.replace(/[^A-Za-z0-9.]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') + '-' + DOCS[t || ''] + '.pdf';
  const pdfBtn = (m, label, cls, t) => `<a class="btn ${cls || ''}" href="pdf/${m.id}${t ? '-' + t : ''}.pdf" download="${pdfName(m, t)}" target="_blank" rel="noopener" data-pdf="${m.id}" data-doc="${t || ''}">${I.dl} ${label}</a>`;
  let dlCap = null;
  try { if (window.claude && window.claude.use) dlCap = window.claude.use('downloads').catch(() => null); } catch (e) { dlCap = null; }
  async function downloadPdf(a) {
    const m = D.modelById[a.dataset.pdf]; if (!m) return;
    const label = a.innerHTML; a.setAttribute('aria-busy', 'true'); a.innerHTML = 'Preparing PDF…';
    try {
      const dl = dlCap ? await dlCap : null;
      const res = await fetch(a.getAttribute('href')); if (!res.ok) throw new Error('fetch');
      const blob = await res.blob();
      if (dl) { await dl.save({ filename: pdfName(m, a.dataset.doc), data: blob }); toast('PDF saved'); }
      else { const u = URL.createObjectURL(blob); const t = document.createElement('a'); t.href = u; t.download = pdfName(m, a.dataset.doc); document.body.appendChild(t); t.click(); t.remove(); setTimeout(() => URL.revokeObjectURL(u), 4000); }
    } catch (e) {
      if (e && e.code === 'declined') toast('Download cancelled');
      else window.open(a.getAttribute('href'), '_blank', 'noopener');
    } finally { a.innerHTML = label; a.removeAttribute('aria-busy'); }
  }
  const WA = '2349099000901';
  function contactRow(m) {
    const msg = `Hello Cloud Energy, I'm interested in the ${m.name}. Please share price and availability.`;
    const mail = `mailto:${CONTACT.email}?subject=${encodeURIComponent('Enquiry: ' + m.name)}&body=${encodeURIComponent(msg)}`;
    return `<div class="contact-row"><span class="label" style="color:var(--slate)">Talk to our sales team</span><div class="cgrid">
      <a class="cbtn wa" href="https://wa.me/${WA}?text=${encodeURIComponent(msg)}" target="_blank" rel="noopener">${I.wa}<span><b>WhatsApp</b><small>${CONTACT.phones[0]}</small></span></a>
      <a class="cbtn" href="tel:${CONTACT.phones[0].replace(/\s/g, '')}" data-copyalt="${CONTACT.phones[0]}">${I.phone}<span><b>Call</b><small>${CONTACT.phones[0]}</small></span></a>
      <a class="cbtn" href="${mail}" target="_blank" data-copyalt="${CONTACT.email}">${I.mail}<span><b>Email</b><small>${CONTACT.email}</small></span></a></div></div>`;
  }
  function productBento(m, rows) {
    const seen = new Set(m.key.map(k => k[0]));
    const extra = rows.filter(r => !seen.has(r[0]) && splitVal(r[1]) && String(r[1]).length < 18).slice(0, 2);
    const k = m.key.concat(extra);
    const tones = ['silver', 'amber', 'blue', 'amber', 'blue', 'silver'];
    const card = (r, i, o) => bx(Object.assign({ v: r[1], raw: !splitVal(r[1]) || String(r[1]).length > 22, label: r[0], tone: tones[i], gold: tones[i] === 'amber' }, o || {}));
    return `<section class="sec darkband"><div class="wrap">${head('Highlights', esc(m.name), '', false, true)}
      <div class="bento">${card(k[0], 0, { cls: 'tall', prod: m.img, sub: 'From the Cloud Energy data sheet' })}${k[1] ? card(k[1], 1) : ''}${k[2] ? card(k[2], 2) : ''}</div>
      ${k.length > 3 ? `<div class="bento3">${k.slice(3, 6).map((r, i) => card(r, i + 3, { small: 1 })).join('')}</div>` : ''}</div></section>`;
  }

  /* ---------- SERVICES ---------- */
  function services() {
    return pageHero({ img: PH('svcp-install'), crumbs: crumbs('<span>Services</span>'), tag: 'Engineering services', title: 'Energy Solutions, Engineered End to End', lede: 'Audit, design, install, support.', actions: quoteBtn('Book an Energy Audit ' + AR, 'Energy Audit') + '<a class="btn ghost-w" href="#contact">Speak with an Engineer</a>' })
      + `<section class="statbar"><div class="wrap stats" style="grid-template-columns:repeat(4,minmax(0,1fr))">${[['01', 'Audit your load'], ['02', 'Design the system'], ['03', 'Install &amp; commission'], ['04', 'Maintain &amp; support']].map(s => `<div class="stat"><b>${s[0]}</b><span>${s[1]}</span></div>`).join('')}</div></section>`
      + `<section class="sec pale"><div class="wrap">${head('Seven services', 'One Accountable Team', '', true)}${svcGrid()}</div></section>` + specBento()
      + SERVICES.map((s, i) => `<section class="sec${i % 2 ? ' pale' : ''}" id="svc-${s.id}"><div class="wrap split"><div class="photo" style="aspect-ratio:4/3;${i % 2 ? 'order:2' : ''}"><img src="${SVC_IMG[s.id]}" alt="${esc(s.title)}" loading="lazy"><span class="badge">${String(i + 1).padStart(2, '0')} · ${esc(s.tag)}</span></div><div style="display:grid;gap:20px"><span class="bigstat" style="font-size:64px;color:var(--border)">0${i + 1}</span><span class="tag">${esc(s.tag)}</span><h2 class="h-sec">${esc(s.title)}</h2><p class="lead">${esc(s.home)}</p><div>${quoteBtn(esc(s.cta) + ' ' + AR, s.need, s.msg || '')}</div></div></div></section>`).join('')
      + bulkBanner();
  }

  /* ---------- TESTIMONIALS: add real customer quotes here; the section shows once there is at least one ----------
     { q: 'quote', n: 'Name', r: 'City / business', p: 'Product or system', img: 'img/testimonials/name.webp' (optional) } */
  const TESTIMONIALS = [
    { q: 'Cloud Energy provides smart and affordable energy solutions. From personal experience, I highly recommend this brand.', n: 'Ijeoma Anulika', r: 'Cloud Energy customer' },
    { q: 'Cloud Energy Brand has lived up to the expectations of quality and reliability.', n: 'Philip Chukwueloka', r: 'Cloud Energy customer' },
    { q: 'Seamless and no stress. Just plug and relax. From the lights to the TV and cable to fan. Have no regrets.', n: 'Jenni', r: 'Cloud Energy customer' }
  ];
  function testimonials() {
    if (!TESTIMONIALS.length) return '';
    return `<section class="sec pale tsec"><div class="wrap">${head('Customer stories', 'What Our Customers Say', '', true)}<div class="testi-grid">${TESTIMONIALS.map(t => `<figure class="tcard"><span class="tq" aria-hidden="true">“</span><blockquote>${esc(t.q)}</blockquote><figcaption>${t.img ? `<img src="${t.img}" alt="" loading="lazy">` : `<span class="tav">${esc(t.n.split(' ').map(w => w[0]).slice(0, 2).join(''))}</span>`}<span><b>${esc(t.n)}</b><small>${esc([t.r, t.p].filter(Boolean).join(' · '))}</small></span></figcaption></figure>`).join('')}</div></div></section>`;
  }

  /* ---------- CLOUD RIDE (EV) ---------- */
  const EV_SVG = `<svg class="ev-art" viewBox="0 0 420 260" aria-hidden="true"><defs><linearGradient id="evg" x1="0" x2="1"><stop offset="0" stop-color="#1190C8"/><stop offset="1" stop-color="#23984A"/></linearGradient></defs><circle cx="330" cy="62" r="34" fill="#F9A930" opacity=".9"/><g stroke="#F9A930" stroke-width="4" stroke-linecap="round" opacity=".7"><path d="M330 12v-8M330 120v-8M280 62h-8M388 62h-8M295 27l-6-6M371 103l-6-6M365 27l6-6M289 103l6-6"/></g><path d="M40 214h340" stroke="rgba(255,255,255,.18)" stroke-width="3"/><path d="M92 176c8-34 30-58 70-62h70c26 0 44 10 58 30l20 30" fill="none" stroke="url(#evg)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/><path d="M150 114l-14-34h-22" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round"/><rect x="176" y="128" width="64" height="30" rx="8" fill="#0A3D5C" stroke="#fff" stroke-width="3"/><path d="M212 132l-10 12h10l-6 10" fill="none" stroke="#F9A930" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="96" cy="186" r="30" fill="none" stroke="#fff" stroke-width="9"/><circle cx="314" cy="186" r="30" fill="none" stroke="#fff" stroke-width="9"/><circle cx="96" cy="186" r="6" fill="#fff"/><circle cx="314" cy="186" r="6" fill="#fff"/></svg>`;
  const EVI = k => 'img/ev/' + k + '.webp';
  const EV_RANGE = [
    { grp: 'cars', id: 'x60', img: 'x60', type: 'Sedan', name: 'Cloud Energy X60', blurb: 'A four-seat electric sedan for daily city driving and ride hailing.', key: [['360km', 'Range per charge'], ['28.8kWh', 'Battery'], ['1–2h', 'Fast charge']], specs: [['Motor power', '13kW'], ['Maximum speed', '80km/h'], ['Slow charging', '5–8h'], ['Seats', '4']] },
    { grp: 'cars', id: 'x80', img: 'x80', type: 'SUV', name: 'Cloud Energy X80', blurb: 'A higher-riding electric SUV with the longest range in the line-up.', key: [['500km', 'Range per charge'], ['28.8kWh', 'Battery'], ['1–2h', 'Fast charge']], specs: [['Motor power', '7.5kW'], ['Maximum speed', '80km/h'], ['Slow charging', '5–8h'], ['Seats', '4']] },
    { grp: 'cars', id: 'box', img: 'box', type: 'Compact', name: 'Merkur Box', blurb: 'A compact electric hatchback that is easy to park and quick off the line.', key: [['320km', 'Range per charge'], ['31.45kWh', 'Battery'], ['1.2h', 'DC charge, 30–80%']], specs: [['Motor power', '35kW'], ['Maximum speed', '101km/h'], ['AC charging', '8–11h'], ['Torque', '125N·m'], ['Size (L×W×H)', '3584 × 1475 × 1666mm'], ['Seats', '4']] },
    { grp: 'bikes', id: 'cevd', img: 'moto-cevd', type: 'Motorcycle', name: 'CEVD 3.7', blurb: 'A full-size electric motorcycle for dispatch riders and daily commuting.', key: [['3000W', '72V motor'], ['70km/h', 'Top speed'], ['3', 'Speed modes']], specs: [['Motor', 'Brushless DC'], ['Brakes', 'Disc, front and rear'], ['Suspension', 'Hydraulic'], ['Tyres', '2.75-18 / 110/90-16'], ['Extras', 'Alarm, LED lights, rear rack']] },
    { grp: 'bikes', id: 'cevp', img: 'moto-cevp', type: 'Motorcycle', name: 'CEVP 3.7', blurb: 'The same 3000W platform with a sport fairing and protection bars.', key: [['3000W', '72V motor'], ['70km/h', 'Top speed'], ['3', 'Speed modes']], specs: [['Motor', 'Brushless DC'], ['Brakes', 'Disc, front and rear'], ['Suspension', 'Hydraulic'], ['Tyres', '2.75-18 / 110/90-16'], ['Extras', 'Alarm, front and rear protection bars']] },
    { grp: 'bikes', id: 'cev26', img: 'scooter-cev26', type: 'Scooter', name: 'CeV 2.6', blurb: 'A light electric scooter for short trips around town.', key: [['2000W', '72V motor'], ['60km/h', 'Top speed'], ['3', 'Speed modes']], specs: [['Motor', 'Brushless DC'], ['Brakes', 'Disc, front and rear'], ['Suspension', 'Hydraulic'], ['Tyres', '90/90-12'], ['Extras', 'Alarm, LED lights, rear rack']] },
    { grp: 'keke', id: 'keke', img: 'tricycle', type: 'Tricycle', name: 'Electric Keke', blurb: 'A passenger tricycle that runs on a lithium battery instead of petrol.', key: [['80–125km', 'Range per charge'], ['60V', '100/120Ah battery'], ['6–8h', 'Charging time']], specs: [['Motor controller', '60V 1800W'], ['Maximum speed', '40km/h'], ['Ground clearance', '320mm or more'], ['Grade ability', 'Up to 25%'], ['Size (L×W×H)', '2800 × 1250 × 1780mm'], ['Tyres', '4.0-12']] },
    { grp: 'charge', id: 'dc', img: 'charger', type: 'Fast charger', name: 'EV Fast Charge Station', blurb: 'Floor-standing DC chargers for fleets, filling stations and car parks.', key: [['60 / 120kW', 'AF-DC-060 / AF-DC-120'], ['200–1000V', 'DC output'], ['GB/T', 'Plug']], specs: [['Input', 'AC 380V ±15%, 45–65Hz'], ['Output current', '0–200A / 0–250A'], ['Cable', '5m'], ['Size', '1620 × 750 × 560mm'], ['Installation', 'Vertical, cables in from below']] },
    { grp: 'charge', id: 'swap', img: 'swap', type: 'Battery swap', name: 'Battery Swap Station', blurb: 'A smart cabinet where riders swap a flat battery for a fully charged one instead of waiting for a recharge.', key: [['9', 'Charging compartments'], ['1300W', 'Per compartment'], ['48–72V', 'Lithium batteries']], specs: [['Input', 'Single phase AC 220V, 50Hz'], ['Overall power', '11.7kW'], ['Connectivity', '4G, CAN communication'], ['Safety', 'Smoke, water and temperature sensors, fire extinguisher compartment'], ['Size (W×H×D)', '1321 × 1726 × 640mm']] }
  ];
  function evBand() {
    return `<section class="sec evband"><div class="wrap split"><div style="display:grid;gap:18px"><span class="tag dark dot">New · Electric mobility</span><h2 class="h-sec" style="color:#fff">Cloud Ride: Electric Mobility by Cloud Energy</h2><p class="lead" style="color:#CFE3EE">Electric cars, motorcycles and keke, plus fast chargers and battery swap stations. The same clean power we deliver to homes and businesses, now on Nigeria's roads.</p><div class="chips">${['Cars from 320km range', 'Electric keke', 'Battery swap'].map(c => `<span class="chip dark">${I.bolt}${c}</span>`).join('')}</div><div class="btns"><a class="btn amber" href="#cloud-ride">Discover Cloud Ride ${AR}</a></div></div><div class="ev-photo"><img src="${EVI('ride-sedan')}" alt="Cloud Ride electric sedan at the Cloud Energy yard in Lagos" loading="lazy"><span class="badge">At our Lagos yard</span></div></div></section>`;
  }
  /* Standalone Cloud Ride website: set this once the site is live and every category button links to it */
  const RIDE_SITE = '';
  const RIDE_CATS = [
    { id: 'cars', path: 'cars', img: 'x60', name: 'Electric Cars', blurb: 'Sedan, SUV and compact models for families, professionals and ride hailing.', facts: ['Up to 500km range', '1–2h fast charge', 'Sedan, SUV, compact'] },
    { id: 'bikes', path: 'motorcycles', img: 'moto-cevd', name: 'Motorcycles and Scooters', blurb: 'Electric two-wheelers for dispatch riders, delivery fleets and daily commuting.', facts: ['Up to 3000W motor', 'Up to 70km/h', 'Three speed modes'] },
    { id: 'keke', path: 'keke', img: 'tricycle', name: 'Electric Keke', blurb: 'A passenger tricycle that runs on a lithium battery instead of petrol.', facts: ['80–125km range', '6–8h charge', 'Up to 25% gradient'] },
    { id: 'charge', path: 'charging', img: 'swap', name: 'Charging and Battery Swap', blurb: 'DC fast chargers and smart swap cabinets that keep electric fleets moving.', facts: ['60kW and 120kW chargers', '9 slot swap cabinet', 'Solar ready'] }
  ];
  const rideLink = (c, cls) => RIDE_SITE ? `<a class="btn ${cls || ''}" href="${RIDE_SITE.replace(/\/$/, '')}/${c.path}" target="_blank" rel="noopener">Explore ${esc(c.name)} ↗</a>` : `<span class="btn ${cls || ''} soon" aria-disabled="true" title="The Cloud Ride website is launching soon">Explore ${esc(c.name)} <small>Website launching soon</small></span>`;
  /* Full screen animated Cloud Ride scene: sun -> solar carport -> charger -> EV, with background traffic */
  function evScene() {
    let seed = 7; const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
    const city = (y0, col, win, n) => { let x = -20, out = ''; for (let k = 0; k < n && x < 1640; k++) { const w = 50 + rnd() * 90, h = 70 + rnd() * 170; out += `<rect x="${x.toFixed(0)}" y="${(y0 - h).toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="${col}"/>`; if (win) for (let wy = y0 - h + 14; wy < y0 - 16; wy += 22) for (let wx = x + 10; wx < x + w - 12; wx += 18) if (rnd() > .55) out += `<rect class="${rnd() > .8 ? 'evs-win blink' : 'evs-win'}" style="animation-delay:${(rnd() * 6).toFixed(1)}s" x="${wx.toFixed(0)}" y="${wy.toFixed(0)}" width="7" height="9" rx="1"/>`; x += w + 6 + rnd() * 18; } return out; };
    const wheel = (cx, cy, r) => `<g class="evf-wheel" transform="translate(${cx} ${cy})"><circle r="${r}" fill="#0E1B26"/><circle r="${r * .55}" fill="#C9D5DF"/><path d="M0 -${r * .55} V${r * .55} M-${r * .55} 0 H${r * .55} M-${r * .4} -${r * .4} L${r * .4} ${r * .4} M${r * .4} -${r * .4} L-${r * .4} ${r * .4}" stroke="#5D7A90" stroke-width="2"/></g>`;
    return `<svg class="evscene" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" role="img" aria-label="Animation: sunlight powers a solar carport and charger. An electric car drives in, plugs in, charges to full and drives away while motorcycles and a keke pass by.">
      <defs><linearGradient id="evsSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#04182A"/><stop offset=".55" stop-color="#0B3A5C"/><stop offset=".8" stop-color="#1F6A8F"/><stop offset="1" stop-color="#F3B866"/></linearGradient><radialGradient id="evsSun"><stop offset="0" stop-color="#FFF1CC"/><stop offset=".45" stop-color="#F9A930"/><stop offset="1" stop-color="#F9A930" stop-opacity="0"/></radialGradient><linearGradient id="evsBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A6EBDA"/><stop offset="1" stop-color="#4FB29D"/></linearGradient><linearGradient id="evsRoad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#14222E"/><stop offset="1" stop-color="#070E15"/></linearGradient></defs>
      <rect width="1600" height="900" fill="url(#evsSky)"/>
      <g transform="translate(1210 250)"><circle r="150" fill="url(#evsSun)" opacity=".5"/><g class="evf-rays">${Array.from({ length: 16 }, (_, n) => `<line x1="0" y1="-74" x2="0" y2="-94" transform="rotate(${n * 22.5})"/>`).join('')}</g><circle r="54" fill="#F9A930"/></g>
      <g class="evs-clouds a"><ellipse cx="200" cy="170" rx="120" ry="26"/><ellipse cx="270" cy="152" rx="80" ry="24"/><ellipse cx="760" cy="120" rx="140" ry="22"/><ellipse cx="820" cy="104" rx="70" ry="20"/></g>
      <g class="evs-clouds b"><ellipse cx="1450" cy="200" rx="110" ry="20"/><ellipse cx="520" cy="250" rx="90" ry="16"/><ellipse cx="1000" cy="300" rx="120" ry="18"/></g>
      <g class="evs-far">${city(640, '#0C2C45', false, 40)}</g>
      <g class="evs-near">${city(700, '#081E30', true, 30)}</g>
      <rect y="700" width="1600" height="64" fill="#0C1C2A"/><rect y="700" width="1600" height="3" fill="#24425A"/>
      <path class="evf-beam" d="M1170 300 L1110 548"/>
      <g class="evs-port"><rect x="930" y="520" width="12" height="244" fill="#5D7A90"/><rect x="1420" y="500" width="12" height="264" fill="#5D7A90"/>
        <path d="M890 560 L1460 510 L1480 532 L910 584 Z" fill="#164A70" stroke="#8FD3F4" stroke-width="2"/>${Array.from({ length: 11 }, (_, n) => `<line x1="${940 + n * 50}" y1="${556 - n * 4.4}" x2="${958 + n * 50}" y2="${578 - n * 4.4}" stroke="#8FD3F4" stroke-width="1" opacity=".55"/>`).join('')}<line x1="900" y1="571" x2="1470" y2="521" stroke="#8FD3F4" stroke-width="1" opacity=".55"/></g>
      <path class="evf-wire" d="M1426 530 V690 H1332 V646"/>
      <g transform="translate(1300 600)"><rect width="64" height="164" rx="12" fill="#E8EEF3"/><rect x="9" y="16" width="46" height="34" rx="5" fill="#0A3D5C"/><path class="evf-bolt" d="M34 20 L25 35 H33 L28 46 L40 29 H32 Z" fill="#F9A930"/><rect x="9" y="60" width="46" height="6" rx="3" fill="#1190C8"/><circle cx="32" cy="112" r="10" fill="#0A3D5C"/><circle cx="32" cy="112" r="4" fill="#8FD3F4"/></g>
      <g transform="translate(1448 630)"><rect width="96" height="134" rx="8" fill="#DCE6EE"/>${Array.from({ length: 9 }, (_, n) => `<rect class="evs-slot" style="animation-delay:${(n * .37).toFixed(2)}s" x="${8 + (n % 3) * 28}" y="${10 + Math.floor(n / 3) * 38}" width="24" height="32" rx="3"/>`).join('')}</g>
      <rect y="764" width="1600" height="136" fill="url(#evsRoad)"/>
      <g class="evs-lane">${Array.from({ length: 22 }, (_, n) => `<rect x="${n * 80}" y="828" width="44" height="5" rx="2"/>`).join('')}</g>
      <g class="evs-moto"><g transform="translate(0 812)"><circle cx="0" cy="34" r="16" fill="#0E1B26"/><circle cx="74" cy="34" r="16" fill="#0E1B26"/><path d="M0 34 L28 8 H58 L74 34" fill="none" stroke="#23984A" stroke-width="7" stroke-linejoin="round"/><rect x="24" y="0" width="38" height="14" rx="6" fill="#23984A"/><circle cx="38" cy="-22" r="10" fill="#F9A930"/><path d="M38 -12 L46 8" stroke="#2B3B47" stroke-width="9" stroke-linecap="round"/><rect x="-6" y="-2" width="26" height="20" rx="3" fill="#F9A930"/></g></g>
      <g class="evs-keke"><g transform="translate(0 790)"><path d="M10 50 V12 Q10 0 24 0 H96 Q112 0 116 14 L126 50 Z" fill="#1190C8"/><rect x="20" y="8" width="40" height="26" rx="4" fill="#0B2A42" opacity=".85"/><rect x="66" y="8" width="38" height="26" rx="4" fill="#0B2A42" opacity=".85"/>${wheel(30, 54, 14)}${wheel(108, 54, 14)}</g></g>
      <g class="evs-car"><g transform="translate(0 626) scale(1.6)">
        <g transform="translate(78 -30)"><rect width="64" height="18" rx="5" fill="rgba(4,24,42,.7)" stroke="#8FD3F4" stroke-width="1.5"/><rect x="64" y="6" width="3" height="6" rx="1" fill="#8FD3F4"/><rect class="evf-fill" x="3" y="3" width="58" height="12" rx="2"/></g>
        <path d="M6 62 Q4 44 22 38 L58 30 L92 8 Q100 3 112 3 L158 3 Q172 3 182 12 L206 34 Q222 38 224 52 L224 64 Q224 72 216 72 L14 72 Q6 72 6 62 Z" fill="url(#evsBody)"/>
        <path d="M70 31 L98 11 Q103 8 110 8 L134 8 L134 31 Z M140 8 L160 8 Q168 8 174 14 L194 31 L140 31 Z" fill="#0B2A42" opacity=".85"/>
        <rect x="200" y="40" width="20" height="6" rx="3" fill="#FFF3D1"/><path class="evs-beamlight" d="M222 43 L320 30 L320 60 Z" fill="#FFF3D1"/><rect x="8" y="44" width="10" height="6" rx="3" fill="#ED3239" opacity=".9"/>
        ${wheel(56, 72, 18)}${wheel(178, 72, 18)}
      </g></g>
      <path class="evf-cable" d="M1306 712 C 1290 738, 1278 736, 1271 708"/>
    </svg>`;
  }
  function cloudRide() {
    return `<div class="ride story">
      <section class="rhero live">${evScene()}<div class="rh-shade" aria-hidden="true"></div>
        <div class="rh-top"><div class="rh-live" aria-hidden="true"><span class="rh-dot"></span>LIVE<span class="rh-sep"></span>Cloud Ride charging bay</div><div class="rh-status" aria-live="off"><span class="evf-s s1"><i></i>EV arrives at a Cloud Energy charging bay</span><span class="evf-s s2"><i></i>Charging from solar power</span><span class="evf-s s3"><i></i>Fully charged. Ride on.</span></div></div>
        <div class="wrap"><nav class="crumbs" aria-label="Breadcrumb"><a href="#home">Home</a><span>›</span><span>Cloud Ride</span></nav><div class="rh-copy"><span class="rkicker">Cloud Ride · Electric mobility by Cloud Energy</span><h1>Electric<br>Is the Way</h1><p>Electric cars, motorcycles and keke, with the chargers and battery swap stations to keep them moving. No fuel queues, lower running costs, zero tailpipe emissions.</p><div class="btns"><button type="button" class="btn amber" data-scroll="ride-cats">Explore the Range ${AR}</button>${quoteBtn('Register Interest', 'Other', 'I am interested in Cloud Ride, the Cloud Energy electric vehicle range. ', 'rghost')}</div></div></div></section>
      <section class="rstatbar"><div class="wrap"><div class="rstats">${[['4', '', 'Vehicle and charging categories'], ['500', 'km', 'Longest car range per charge'], ['120', 'kW', 'Fastest DC charger'], ['9', 'slots', 'Per battery swap station']].map(s => `<div><b>${s[0]}<em>${s[1]}</em></b><span>${s[2]}</span></div>`).join('')}</div></div></section>

      <section class="rlight" id="ch1"><div class="wrap rstory"><div class="rs-text"><h2>Every Litre Counts</h2><p>Since the petrol subsidy was removed in 2023, fuel has become one of the biggest daily costs for Nigerian drivers, dispatch riders and keke operators. Prices swing, queues return, and engines need constant servicing.</p><p>Every naira spent on fuel is a naira not earned.</p></div>
        <div class="rpains">${[[I.chart, 'Rising fuel costs', 'Daily fuel spend eats into every trip, every delivery and every fare.'], [I.clock, 'Hours lost in queues', 'Scarcity means waiting in line instead of working.'], [I.maint, 'Constant servicing', 'Oil changes, filters and engine repairs add up over the year.']].map(x => `<div><span class="ricn">${x[0]}</span><b>${x[1]}</b><p>${x[2]}</p></div>`).join('')}</div></div></section>

      <section class="rsec" id="ch2"><div class="wrap rstory flip"><figure class="rs-photo"><img src="${EVI('ride-sedan')}" alt="Cloud Ride electric sedan at the Cloud Energy yard, Lagos" loading="lazy"><figcaption>Cloud Ride electric sedan, Cloud Energy yard, Lagos</figcaption></figure><div class="rs-text"><h2>Meet Cloud Ride</h2><p>Since 2013, Cloud Energy has powered homes, schools and businesses across Nigeria with solar panels, inverters and lithium storage. Cloud Ride takes that same clean power onto the road.</p><ul class="rs-list">${[['No fuel queues', 'Charge at home, at work or at a Cloud Energy charging point.'], ['Charge from the sun', 'Pair your vehicle with a Cloud Energy solar and battery system.'], ['Fewer moving parts', 'Electric motors need no oil changes, spark plugs or exhaust repairs.']].map(x => `<li>${I.check}<span><b>${x[0]}</b>${x[1]}</span></li>`).join('')}</ul></div></div></section>

      <section class="rlight pale" id="ride-cats"><div class="wrap"><div class="rhead center"><h2>Choose How You Move</h2><p>Four categories, one Cloud Energy standard. Full models, prices and booking will live on the Cloud Ride website.</p></div>
        <div class="rcats">${RIDE_CATS.map((c, i) => `<article class="rcat${i === 0 ? ' wide' : ''}" id="ride-${c.id}"><div class="rcat-img"><img src="${EVI(c.img)}" alt="${esc(c.name)}" loading="lazy"></div><div class="rcat-b"><h3>${esc(c.name)}</h3><p>${esc(c.blurb)}</p><ul>${c.facts.map(f => `<li>${esc(f)}</li>`).join('')}</ul><div class="rcat-cta">${rideLink(c, 'navy')}${quoteBtn('Register Interest', 'Other', `I am interested in Cloud Ride ${c.name}. `, 'outline')}</div></div></article>`).join('')}</div></div></section>

      <section class="rsec alt" id="ch4"><div class="wrap"><div class="rhead"><h2>Charged by the Sun</h2><p>Vehicles are only as good as the energy behind them. Cloud Ride is backed by the chargers, swap stations, solar panels and lithium storage that Cloud Energy already supplies.</p></div>
        <div class="rpower">${[['charger', 'EV fast charge station', 'Floor standing DC chargers for fleets, filling stations and car parks.', [['60 / 120', 'kW output'], ['200–1000', 'V DC'], ['GB/T', 'Plug type']]], ['swap', 'Battery swap station', 'Riders swap a flat battery for a charged one instead of waiting to recharge.', [['9', 'Compartments'], ['1300', 'W each'], ['4G', 'Connected']]]].map(x => `<article class="rpow"><div class="rpow-img"><img src="${EVI(x[0])}" alt="${x[1]}" loading="lazy"></div><div class="rpow-b"><h3>${x[1]}</h3><p>${x[2]}</p><div class="rpow-vals">${x[3].map(v => `<div><b>${v[0]}</b><small>${v[1]}</small></div>`).join('')}</div></div></article>`).join('')}
          <article class="rpow sun"><span class="ricn">${I.sun}</span><h3>Solar and lithium storage</h3><p>Charge from a Cloud Energy solar system by day and from lithium storage by night, with no generator and no grid needed.</p><a class="btn amber" href="#c-lithium-batteries">See Lithium Storage ${AR}</a></article></div></div></section>

      <section class="rlight" id="ch5"><div class="wrap"><div class="rhead"><h2>Real Cars. Ready Now.</h2><p>Photographed at the Cloud Energy yard. Visit the head office at 191 Ikorodu Road, Lagos, to see them in person.</p></div>
        <div class="rmosaic"><figure class="m0"><img src="${EVI('ride-sedan')}" alt="Cloud Ride electric sedan at the Cloud Energy yard, Lagos" loading="lazy"><figcaption>Electric sedan</figcaption></figure><figure class="m1"><img src="${EVI('ride-hatch')}" alt="Cloud Ride electric hatchback at the Cloud Energy yard, Lagos" loading="lazy"><figcaption>Electric hatchback</figcaption></figure><figure class="m2"><img src="${EVI('ride-front')}" alt="Front view of a Cloud Ride electric car" loading="lazy"><figcaption>Front view</figcaption></figure></div></div></section>

      <section class="rsec" id="ch6"><div class="wrap rfleet"><div class="rfleet-img"><img src="${EVI('tricycle')}" alt="Cloud Ride electric keke" loading="lazy"></div><div><h2>Electrify Your Fleet</h2><p>Dispatch companies, transport operators, estates and filling stations can combine vehicles, fast chargers and battery swap stations in one package, sized and installed by Cloud Energy engineers.</p><ul>${['Ride hailing and keke operators cutting daily fuel spend', 'Delivery fleets using battery swap to stay on the road', 'Sites hosting 60kW or 120kW DC fast chargers'].map(t => `<li>${I.check}<span>${t}</span></li>`).join('')}</ul><div class="btns">${quoteBtn('Talk to the Cloud Ride Team ' + AR, 'Other', 'I would like to discuss electric vehicles and charging for my fleet or business. ', 'amber')}<a class="btn rghost" href="#contact">Contact Us</a></div></div></div></section>

      <section class="rlight pale rsoon" id="ch7"><div class="wrap"><h2>The Cloud Ride Website</h2><p>A dedicated site for the full Cloud Ride range, with every model, specifications, pricing and test drive booking. Register now and we will tell you when it launches.</p><div class="btns" style="justify-content:center">${quoteBtn('Register Interest ' + AR, 'Other', 'Please notify me when the Cloud Ride website launches. ', 'navy')}</div></div></section>
    </div>` + bulkBanner();
  }

  /* ---------- REAL FIELD PHOTOS ---------- */
  const FIELD = [['namu-aerial', 'Commissioning day, Namu solar mini grid'], ['gindin-inverters', 'Hybrid inverters and 17.92kWh lithium batteries, Gindin Dorowa, Taraba'], ['bantaji-panels', 'Solar array, Bantaji, Taraba'], ['amagu-battery', 'Battery bank, Amagu mini grid, Ebonyi'], ['bantaji-cabinet', 'Inverters and lithium battery cabinet, Bantaji, Taraba'], ['akwarata-powerhouse', '50kW Cloud Energy hybrid solar system, Akwarata Agbaja, Ebonyi'], ['gindin-panels', 'Solar array, Gindin Dorowa, Taraba'], ['amagu-panels', 'Solar array, Amagu mini grid, Ebonyi']];
  function fieldGallery() {
    return `<section class="sec fieldsec"><div class="wrap">${head('From our project sites', 'Real Work, Real Installations', 'Photos from Cloud Energy project sites across Ebonyi, Taraba and beyond.', true)}<div class="field-grid">${FIELD.map(([k, c], i) => `<figure class="fg fg${i}"><img src="${PR(k)}" alt="${esc(c)}" loading="lazy"><figcaption>${esc(c)}</figcaption></figure>`).join('')}</div><div class="center" style="margin-top:36px"><a class="btn navy" href="#projects">See Our Projects ${AR}</a></div></div></section>`;
  }

  /* ---------- PROJECTS ---------- */
  function projects() {
    const p = PROJECTS[S.projTab] || PROJECTS[0];
    const [main] = PROJ_IMG[p.id]; const REAL = { 'mini-grids': 'namu-aerial', 'solar-home': 'sunbox-install', 'cloud-zero': 'bantaji-cabinet', rooftop: 'standalone-install' };
    const LIVE = [['namu-aerial', 'Commissioning, Namu mini grid', 'big'], ['namu-collage', '50kW hybrid system, battery storage and commissioning, Namu', 'tall'], ['amagu-panels', 'Solar array, Amagu, Ebonyi'], ['amagu-battery', 'Battery bank, Amagu, Ebonyi'], ['eka-control', 'Control room, Eka Awoke, Ebonyi', 'wide'], ['amagu-inverters', 'Inverter room, Amagu, Ebonyi'], ['bantaji-cabinet', 'Lithium battery cabinet, Bantaji, Taraba'], ['bantaji-panels', 'Solar array, Bantaji, Taraba', 'wide'], ['gindin-panels', 'Solar array, Gindin Dorowa, Taraba'], ['gindin-inverters', 'Hybrid inverters and lithium storage, Gindin Dorowa, Taraba'], ['akwarata-powerhouse', '50kW hybrid system, Akwarata Agbaja, Ebonyi'], ['akwarata-panels', 'Solar array, Akwarata Agbaja, Ebonyi'], ['eka-panels', 'Solar array, Eka Awoke, Ikwo, Ebonyi'], ['namu-battery', 'Lithium battery rack, Namu']];
    return pageHero({ img: PR('gindin-panels'), crumbs: crumbs('<span>Projects</span>'), tag: 'Our projects', title: 'Powering Communities, Homes and Businesses', lede: 'Four programme areas, one goal: reliable clean energy across Nigeria.' })
      + `<section class="sec sm pale" style="padding-block:28px"><div class="wrap"><div class="ptabs" role="tablist">${PROJECTS.map((x, i) => `<button role="tab" aria-selected="${i === S.projTab}" data-ptab="${i}">${esc(x.name)}</button>`).join('')}</div></div></section>
      <div class="tabpane"><section class="sec"><div class="wrap split"><div style="display:grid;gap:20px"><span class="tag">${esc(p.eyebrow)}</span><h2 class="h-sec">${esc(p.title)}</h2><p class="lead">${esc(p.intro)}</p><div class="chips">${p.tags.map(t => `<span class="chip">${I.check}${esc(t)}</span>`).join('')}</div><div class="btns">${quoteBtn('Discuss a Project ' + AR, p.id === 'mini-grids' ? 'Mini Grid' : p.id === 'rooftop' ? 'Rooftop Solar' : 'Residential Solar', `I would like to discuss a ${p.name.toLowerCase()} project.`)}</div></div>
        <div class="photo" style="aspect-ratio:4/3"><img src="${REAL[p.id] ? PR(REAL[p.id]) : PH(main)}" alt="${esc(p.name)}, a Cloud Energy installation"><span class="badge">${esc(p.big)} ${esc(p.bigLabel)}</span></div></div></section>
      <section class="sec darkband"><div class="wrap"><div class="bento">${bx({ v: p.big, raw: 1, label: p.bigLabel, sub: p.name, tone: 'amber', gold: true, cls: 'tall', extra: `<div class="bars" aria-hidden="true"><i style="height:45%"></i><i style="height:70%"></i><i style="height:100%"></i></div>` })}${p.metrics.slice(0, 2).map((mt, i) => bx({ v: mt[1], raw: !splitVal(mt[1]), label: mt[0], tone: i ? 'blue' : 'silver' })).join('')}</div>${p.metrics[2] ? `<div class="bento3">${[p.metrics[2]].concat(p.tags.slice(0, 2).map(t => ['Includes', t])).map((mt, i) => bx({ v: mt[1], raw: 1, label: mt[0], tone: ['blue', 'amber', 'silver'][i], gold: i === 1, small: 1 })).join('')}</div>` : ''}</div></section>
      <section class="sec pale"><div class="wrap"><div class="grid ${p.cards.length === 3 ? 'g3' : 'g2'}">${p.cards.map((cd, i) => `<div class="card hov"><span class="icn">${[I.sun, I.users, I.shield][i]}</span><h3 class="h-card">${esc(cd[0])}</h3><p>${esc(cd[1])}</p></div>`).join('')}</div>
      ${p.sites && p.sites.length ? `<div style="margin-top:56px"><div class="head"><span class="tag">Project sites</span><h2 class="h-cat">Selected deployments</h2></div><div style="display:grid;gap:12px">${p.sites.map(s => `<div class="site-row"><div class="kv"><b>${esc(s[0])}</b><span class="note">${esc(s[1])}</span></div><div class="kv"><small>Solar</small><b style="color:var(--navy)">${s[2]}</b></div><div class="kv"><small>Storage</small><b style="color:var(--navy)">${s[3]}</b></div><span class="st ${s[5]}">${esc(s[4])}</span></div>`).join('')}</div></div>` : ''}</div></section></div>
      <section class="sec livegal"><div class="wrap">${head('Live from our sites', 'Installations Across Nigeria', 'Recent mini grid and storage projects in Ebonyi and Taraba, photographed by our field teams.', true)}<div class="lgrid">${LIVE.map(([k, c, sz]) => `<figure class="${sz || ''}"><img src="${PR(k)}" alt="${esc(c)}" loading="lazy"><figcaption>${esc(c)}</figcaption></figure>`).join('')}</div></div></section>` + bulkBanner();
  }

  /* ---------- FINANCING ---------- */
  function financing() {
    const bankMark = b => b[1] ? `<img src="${b[1]}" alt="${esc(b[0])}" loading="lazy">` : `<b>${esc(b[0])}</b>`;
    const STEPS = [[I.audit, 'Energy audit', 'Share your appliances and backup needs. Our engineers assess your load.'], [I.design, 'Recommendation', 'We confirm the system capacity, equipment and installation scope.'], [I.bank, 'Choose how to pay', 'Compare Cloud Pay instalments with bank finance.'], [I.doc, 'Apply', 'Submit your documents and sign the programme agreement.'], [I.install, 'Installation', 'Agree a date and our team installs your system.']];
    return `<section class="fhero"><div class="wrap fhero-grid"><div class="fhero-copy"><nav class="crumbs" aria-label="Breadcrumb">${crumbs('<span>Cloud Financing</span>')}</nav><span class="tag dark dot">Solar Easy Payment Programme</span><h1>Go Solar Now.<br><span class="g-amber">Pay Over Time.</span></h1><p>Get a solar and storage system installed today and spread the cost, through Cloud Pay instalments or one of our partner banks.</p><div class="btns">${quoteBtn('Request an Energy Audit ' + AR, 'Energy Audit', '', 'amber')}<button type="button" class="btn ghost-w" data-scroll="sepp-options">Compare Options</button></div></div>
      <div class="fplan" aria-label="How Cloud Pay works"><div class="fplan-top"><span class="fplan-lbl">Cloud Pay plan</span><span class="fplan-pill">1kVA to 6.5kVA systems</span></div>
        <div class="fplan-flow"><div class="fpstep"><span class="fpi">${I.check}</span><div><b>Initial deposit</b><small>Fixed for your selected system</small></div></div><div class="fpline" aria-hidden="true"></div><div class="fpstep"><span class="fpi">${I.clock}</span><div><b>Monthly instalments</b><small>Spread over 3 to 18 months</small></div></div><div class="fpline" aria-hidden="true"></div><div class="fpstep"><span class="fpi">${I.bolt}</span><div><b>Power from day one</b><small>Your system is installed after approval</small></div></div></div>
        <div class="fterm" aria-hidden="true">${['3', '6', '9', '12', '18'].map(m => `<span>${m}<small>mo</small></span>`).join('')}</div>
        <div class="fplan-banks"><small>Or finance through</small><div>${BANKS.map(b => `<span class="fbank">${bankMark(b)}</span>`).join('')}</div></div></div></div></section>
      <section class="fstats"><div class="wrap fstats-grid">${[['3–18', 'months', 'Repayment on Cloud Pay'], ['1–6.5', 'kVA', 'Systems on instalments'], ['3', 'banks', 'Stanbic IBTC, Access Bank, FCMB'], ['1', 'audit', 'Sizes your system first']].map(s => `<div><b>${s[0]}<span>${s[1]}</span></b><small>${s[2]}</small></div>`).join('')}</div></section>
      <section class="sec" id="sepp-options"><div class="wrap">${head('Payment options', 'Two Ways to Pay', 'Pick the route that suits you. Both start with a free energy audit, so you only pay for the system you need.', true)}
        <div class="fopts"><article class="fopt feat"><div class="fopt-head"><span class="fopt-tag">Most popular</span><h3>Cloud Pay</h3><p>Cloud Energy's own instalment plan.</p></div><ul>${['Fixed initial deposit for your system', 'Pay the balance over 3 to 18 months', 'Systems from 1kVA to 6.5kVA', 'Application handled directly by Cloud Energy'].map(t => `<li>${I.check}<span>${t}</span></li>`).join('')}</ul>${quoteBtn('Register for Cloud Pay ' + AR, 'Energy Storage', 'I would like to register for Cloud Pay under SEPP. ', 'amber')}</article>
          <article class="fopt"><div class="fopt-head"><span class="fopt-tag ghost">Partner banks</span><h3>Bank Finance</h3><p>Finance through a participating bank.</p></div><div class="fopt-banks">${BANKS.map(b => `<span class="fbank light">${bankMark(b)}</span>`).join('')}</div><ul>${['Loan from Stanbic IBTC, Access Bank or FCMB', 'Eligibility, rates and tenor set by each bank', 'The bank pays Cloud Energy once approved'].map(t => `<li>${I.check}<span>${t}</span></li>`).join('')}</ul>${quoteBtn('Ask About Bank Finance ' + AR, 'Energy Storage', 'I would like to explore bank finance under SEPP. ', 'navy')}</article></div></div></section>
      <section class="sec fsteps-sec"><div class="wrap">${head('How it works', 'From Audit to Installation in Five Steps', '', true, true)}<ol class="fsteps">${STEPS.map((x, i) => `<li><span class="fsi">${x[0]}<em>${i + 1}</em></span><b>${x[1]}</b><p>${x[2]}</p></li>`).join('')}</ol></div></section>
      <section class="sec pale"><div class="wrap">${head('Benefits', 'Why Customers Choose SEPP', '', true)}<div class="fben">${[[I.bank, 'Save money', 'Generate more of your own power and cut what you spend on fuel.'], [I.shield, 'Power security', 'Keep essentials running when the grid goes off.'], [I.leaf, 'Cleaner energy', 'Reduce generator use, with fully off-grid designs possible.'], [I.handshake, 'Flexible access', 'Cloud Pay or a bank, on terms that suit your budget.']].map(b => `<div class="fbx"><span class="icn">${b[0]}</span><h3 class="h-card">${b[1]}</h3><p>${b[2]}</p></div>`).join('')}</div></div></section>
      <section class="sec"><div class="wrap"><div class="felig"><div class="felig-list"><span class="tag dark">Eligibility</span><h2 class="h-sec" style="color:#fff">What You Need to Apply</h2><p>Share identity and financial details only through a verified, secure Cloud Energy channel.</p><ul>${['Cloud Pay account registration', 'Signed programme agreement', 'Initial deposit for your selected system', 'National Identification Number (NIN)', 'Proof of address', 'Bank Verification Number (BVN)', 'Two guarantors, each with a NIN and accepted ID'].map((x, i) => `<li><i>${i + 1}</i><span>${esc(x)}</span></li>`).join('')}</ul></div>
        <div class="card felig-form">${formHTML('auditForm', { need: 'Energy Audit', short: true, title: 'Request a Free Energy Audit' })}</div></div></div></section>
      <section class="sec pale"><div class="wrap" style="max-width:900px">${head('FAQs', 'Questions About SEPP', '', true)}${faqBlock([['What is SEPP?', "SEPP is Cloud Energy's Solar Easy Payment Programme. It offers Cloud Pay and bank finance as routes for eligible customers to access energy storage systems."], ['How much is the initial deposit?', 'The deposit is fixed for each system. Request a written quote for your selected system to see the amount.'], ['How long can I pay through Cloud Pay?', 'From 3 to 18 months for 1kVA to 6.5kVA systems. Ask us about other capacities.'], ['Is financing approval guaranteed?', 'No. Approval and terms depend on the application review and the financing provider.'], ['What warranty is included?', 'Warranty depends on the exact products. Ask for the duration, coverage and exclusions in writing.']], true)}</div></section>` + bulkBanner();
  }

  /* ---------- AFFILIATES ---------- */
  function affiliates() {
    return pageHero({ img: PH('shs-main'), crumbs: crumbs('<span>Affiliates</span>'), tag: 'Affiliate programme · Coming soon', title: 'Earn by Spreading Solar', lede: 'Refer homes and businesses to Cloud Energy and earn for successful installations. Join the waitlist for launch.', actions: '<a class="btn" href="#waitlist">Join the Waitlist ' + AR + '</a>' })
      + `<section class="sec"><div class="wrap">${head('Why join', 'Four Reasons to Partner', '', true)}<div class="grid g4">${[[I.chart, 'Commission', 'Earn on each successful installation you refer.'], [I.support, 'Support', 'Sales tools, training and a dedicated team.'], [I.shield, 'Trusted brand', 'A Nigerian solar company registered since 2013.'], [I.grow, 'Easy tracking', 'A dashboard for referrals and earnings.']].map(b => `<div class="card hov"><span class="icn">${b[0]}</span><h3 class="h-card">${b[1]}</h3><p>${b[2]}</p></div>`).join('')}</div></div></section>
      <section class="sec navyband"><div class="wrap">${head('How it works', 'From Waitlist to Payout', '', false, true)}<div class="steps">${[['Join', 'Get launch updates.'], ['Get approved', 'Complete the application.'], ['Get resources', 'Materials and tracking tools.'], ['Refer', 'Share your unique link.'], ['Earn', 'Rewards for installations.']].map((s, i) => `<div class="stepc"><i>${i + 1}</i><b>${s[0]}</b><p>${s[1]}</p></div>`).join('')}</div></div></section>
      <section class="sec pale" id="waitlist"><div class="wrap split" style="align-items:start"><div style="display:grid;gap:18px"><span class="tag">Waitlist</span><h2 class="h-sec">Join the Affiliate Waitlist</h2><p class="lead">Commission rates and payout terms will be published before enrolment opens.</p><div class="photo" style="aspect-ratio:16/10"><img src="${PH('shs-band')}" alt="" loading="lazy"></div></div><div class="card" style="padding:32px">
      <form class="form" id="waitForm" novalidate><div class="field"><label for="wName">Full name *</label><input id="wName" required placeholder="Enter your full name" autocomplete="name"></div><div class="fgrid"><div class="field"><label for="wEmail">Email address *</label><input id="wEmail" type="email" required placeholder="Enter your email address" autocomplete="email"></div><div class="field"><label for="wPhone">Phone number</label><input id="wPhone" type="tel" placeholder="Enter your phone number" autocomplete="tel"></div></div><div class="field"><label for="wCo">Company name (if applicable)</label><input id="wCo" placeholder="Optional"></div><button class="btn" type="submit" style="justify-self:start">Join the Waitlist ${AR}</button></form><div id="waitDone"></div></div></div></section>` + bulkBanner();
  }

  /* ---------- forms ---------- */
  function formHTML(id, o) {
    o = o || {};
    const need = o.need || S.pendingNeed || '';
    return `<form class="form" id="${id}" novalidate>${o.title ? `<h3 class="h-card">${esc(o.title)}</h3>` : ''}
      <div class="fgrid"><div class="field"><label for="${id}-name">Full name *</label><input id="${id}-name" name="Full name" required placeholder="Enter your full name" autocomplete="name"></div>
      ${o.short ? '' : `<div class="field"><label for="${id}-co">Company / organization</label><input id="${id}-co" name="Company" placeholder="Optional for a home"></div>`}
      <div class="field"><label for="${id}-phone">Phone number *</label><input id="${id}-phone" name="Phone" type="tel" required placeholder="e.g. +234 909 900 0901" autocomplete="tel"></div>
      <div class="field"><label for="${id}-email">Email address *</label><input id="${id}-email" name="Email" type="email" required placeholder="e.g. yourname@email.com" autocomplete="email"></div>
      <div class="field" style="${o.short ? '' : 'grid-column:1/-1'}"><label for="${id}-loc">Location *</label><input id="${id}-loc" name="Location" required placeholder="City, state and installation address"></div></div>
      ${o.short ? `<input type="hidden" name="Need" value="${esc(need)}">` : `<div class="field"><span class="lbl">What do you need? *</span><div class="filters" role="group" aria-label="What do you need">${NEEDS.map(n => `<button type="button" class="fchip" aria-pressed="${n === need}" data-need="${n}">${n}</button>`).join('')}</div><input type="hidden" name="Need" value="${esc(need)}"><span class="msg" data-needmsg hidden>Choose what you need.</span></div>`}
      <div class="field"><label for="${id}-msg">Tell us about your energy requirement</label><textarea id="${id}-msg" name="Details" placeholder="Appliances or equipment, usage hours, backup needs and your current power setup.">${esc(o.short ? '' : S.pendingMsg)}</textarea></div>
      <button class="btn" type="submit" style="justify-self:start">Submit Request ${AR}</button></form><div data-done="${id}"></div>`;
  }
  function quote() {
    const html = pageHero({ img: PH('svc-site'), crumbs: crumbs('<span>Get a Quote</span>'), tag: 'Request a quote', title: 'Tell Us What You Need to Power', lede: 'Homes, businesses, institutions and communities. Share a few details and our team advises the next step.' })
      + `<section class="sec pale"><div class="wrap split" style="align-items:start"><div style="display:grid;gap:20px"><span class="tag">Three quick steps</span><h2 class="h-sec">How Your Quote Works</h2>
        <div style="display:grid;gap:14px">${[['1', 'Share your needs', 'What you want to power and where.'], ['2', 'We review', 'An engineer checks if an audit or site visit is needed.'], ['3', 'Get your proposal', 'Equipment, scope and pricing in writing.']].map(s => `<div class="benefit" style="grid-template-columns:44px 1fr"><span class="bi" style="width:40px;height:40px;background:var(--blue);color:#fff;font-weight:700">${s[0]}</span><div><b>${s[1]}</b><p>${s[2]}</p></div></div>`).join('')}</div>
        <div class="card"><b style="color:var(--navy)">Prefer to talk?</b>${copyLine(CONTACT.phones[0], I.phone)}${copyLine(CONTACT.email, I.mail)}</div><a class="link" href="#home" data-calclink>Estimate your load with our calculator ${AR}</a></div>
        <div class="card" style="padding:32px">${formHTML('quoteForm')}</div></div></section>`;
    S.pendingNeed = null; S.pendingMsg = '';
    return html;
  }

  /* ---------- PARTNER ---------- */
  const BANKS = [['Stanbic IBTC', 'img/clients/stanbic.webp'], ['Access Bank', ''], ['FCMB', '']];
  function partner() {
    return pageHero({ img: PH('svcp-training'), crumbs: crumbs('<span>Our Partners</span>'), tag: 'External partners', title: 'Our Partners', lede: 'The banks, programmes and technical partners that help us bring reliable, affordable solar power to more Nigerians.', actions: `<a class="btn" href="#financing">See Financing Options ${AR}</a>` })
      + `<section class="sec"><div class="wrap">${head('Bank partners', 'Banks That Finance Our Customers', 'Eligible customers can spread the cost of a solar system through these banks under the Solar Easy Payment Programme.', true)}<div class="grid g3">${BANKS.map(b => `<div class="card hov bankcard">${b[1] ? `<img src="${b[1]}" alt="${esc(b[0])} logo" loading="lazy">` : `<span class="bankmark">${esc(b[0])}</span>`}<h3 class="h-card">${esc(b[0])}</h3><p>Partner bank for solar financing</p></div>`).join('')}</div></div></section>
      <section class="sec navyband"><div class="wrap">${head('Programme and technical partners', 'Programme and Technical Partners', 'Organisations we work with on rural electrification programmes and product supply.', false, true)}<div class="grid g2">${[['Universal Energy Facility (SEforALL)', 'Nominated in 2023 to deploy productive-use solar for businesses across Nigeria.'], ['Sacred Sun Hong Kong Ltd', 'Technical partner and supplier of OPzV lead carbon batteries.']].map(x => `<div class="card" style="background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.14)"><h3 class="h-card" style="color:#fff">${x[0]}</h3><p style="color:#D3E2EC">${x[1]}</p></div>`).join('')}</div></div></section>` + bulkBanner();
  }

  /* ---------- FAQ ---------- */
  function faqPage() {
    return pageHero({ img: PH('svcp-support'), crumbs: crumbs("<span>FAQ's</span>"), tag: 'Frequently asked questions', title: 'Clear Answers for Your Energy Journey', lede: 'Choosing, installing, financing and maintaining your system.' })
      + `<section class="sec pale"><div class="wrap" style="max-width:960px;display:grid;gap:32px"><div class="search">${I.search}<input id="faqSearch" type="search" placeholder="Search questions, e.g. battery, warranty, financing" aria-label="Search FAQs"></div><div id="faqList">${faqGroups('')}</div></div></section>` + bulkBanner();
  }
  function faqGroups(q) {
    q = q.toLowerCase().trim();
    const out = FAQ.map(g => { const qs = g.q.filter(([a, b]) => !q || (a + ' ' + b).toLowerCase().includes(q)); return qs.length ? `<div style="display:grid;gap:14px;margin-bottom:40px"><h2 class="h-card">${esc(g.g)}</h2>${faqBlock(qs, !!q)}</div>` : ''; }).join('');
    return out || `<div class="empty"><b>No questions match “${esc(q)}”.</b><p>Ask our team directly and we will help.</p>${quoteBtn('Ask a question', 'Other', '', 'sm')}</div>`;
  }

  /* ---------- STORES ---------- */

  function officeMap() {
    const blocks = [];
    const L = [[40,40,150,90],[210,40,170,90],[40,150,110,120],[170,150,210,120],[40,400,170,90],[230,400,150,90],[40,510,340,70]];
    const R = [[620,40,160,90],[800,40,160,90],[620,150,340,80],[790,250,170,110],[620,400,150,90],[790,400,170,90],[620,510,340,70]];
    L.concat(R).forEach(b => blocks.push(`<rect x="${b[0]}" y="${b[1]}" width="${b[2]}" height="${b[3]}" rx="10" class="om-blk"/>`));
    return `<figure class="omap"><svg viewBox="0 0 1000 620" role="img" aria-labelledby="omT omD">
      <title id="omT">Map of Cloud Energy head office, 191 Ikorodu Road, Lagos</title><desc id="omD">Schematic map. Ikorodu Road runs north towards Obanikoro and Maryland and south towards Onipanu and Yaba. The Cloud Energy head office and showroom sits at 191 Ikorodu Road, directly opposite the Palm Groove bus stop.</desc>
      <rect width="1000" height="620" class="om-bg"/>
      ${blocks.join('')}
      <rect x="0" y="282" width="440" height="40" class="om-side"/><text x="60" y="308" class="om-st">Palm Groove · Ilupeju road</text>
      <rect x="560" y="370" width="440" height="22" class="om-side"/><text x="830" y="386" class="om-st sm">Side street</text>
      <text x="215" y="235" class="om-area">ILUPEJU</text><text x="790" y="215" class="om-area">SOMOLU</text>
      <rect x="440" y="0" width="120" height="620" class="om-road"/>
      <rect x="492" y="0" width="16" height="620" class="om-brt"/>
      <line x1="470" y1="0" x2="470" y2="620" class="om-lane"/><line x1="530" y1="0" x2="530" y2="620" class="om-lane"/>
      <text x="500" y="160" class="om-rd" transform="rotate(-90 500 160)">IKORODU ROAD</text>
      <text x="500" y="500" class="om-rd" transform="rotate(-90 500 500)">IKORODU ROAD</text>
      <g class="om-stop"><circle cx="500" cy="34" r="9"/><text x="580" y="30" class="om-lbl">Obanikoro</text><text x="580" y="48" class="om-sub">to Maryland, Ikeja ↑</text></g>
      <g class="om-stop"><circle cx="500" cy="590" r="9"/><text x="580" y="586" class="om-lbl">Onipanu</text><text x="580" y="604" class="om-sub">to Fadeyi, Yaba ↓</text></g>
      <g><rect x="372" y="330" width="62" height="34" rx="6" class="om-bus"/><text x="403" y="352" class="om-bustx">BUS</text><text x="420" y="390" class="om-lbl end">Palm Groove</text><text x="420" y="408" class="om-sub end">bus stop · BRT</text></g>
      <path d="M434 347 C 500 347, 500 300, 566 300" class="om-walk"/>
      <g class="om-office"><rect x="566" y="248" width="200" height="104" rx="12"/><text x="666" y="290" class="om-otx">Cloud Energy</text><text x="666" y="312" class="om-osub">191 Ikorodu Road</text><text x="666" y="332" class="om-osub">Head office &amp; showroom</text></g>
      <g class="om-pin"><circle cx="666" cy="218" r="26" class="om-pulse"/><path d="M666 240c-12-16-20-27-20-38a20 20 0 0 1 40 0c0 11-8 22-20 38z"/><circle cx="666" cy="202" r="7" class="om-pinhole"/></g>
      <g transform="translate(930 470)"><circle r="30" class="om-cmp"/><path d="M0-22 8 4 0-2-8 4z" class="om-n"/><text y="20" class="om-ntx">N</text></g>
    </svg><figcaption>Schematic map, not to scale. The office faces Palm Groove bus stop across Ikorodu Road.</figcaption></figure>`;
  }
  function stores() {
    return pageHero({ img: PH('store'), cls: 'shero', crumbs: crumbs('<span>Store Locator</span>'), tag: 'Store locator', title: 'Visit Cloud Energy', lede: 'Our head office and showroom is on Ikorodu Road, Lagos, with branches in Abuja and Port Harcourt. Call ahead and we will have product information ready.' })
      + `<section class="sec pale"><div class="wrap split" style="align-items:stretch"><div class="card" style="padding:36px;gap:18px"><span class="tag">Head office &amp; showroom</span><h2 class="h-cat">Cloud Energy Photoelectric Limited</h2>
        <div style="display:grid;grid-template-columns:44px 1fr;gap:14px"><span class="icn">${I.pin}</span><div><b style="color:var(--navy)">Address</b><p>${esc(CONTACT.addr)}</p></div></div>
        <div style="display:grid;gap:10px">${CONTACT.phones.map(p => copyLine(p, I.phone)).join('')}${copyLine(CONTACT.email, I.mail)}</div>
        <div class="btns"><a class="btn" href="${CONTACT.maps}" target="_blank" rel="noopener">Open in Google Maps ↗</a><a class="btn outline" href="#contact">Contact form</a></div></div>
        <div class="photo" style="min-height:420px"><img src="${PH('store')}" alt="Cloud Energy building at 191 Ikorodu Road, Lagos"><span class="badge">191 Ikorodu Road · Palmgrove</span></div></div></section>
      <section class="sec" id="office-map"><div class="wrap">${head('Find the head office', 'Getting to 191 Ikorodu Road', 'Look for the Palm Groove bus stop. Our showroom is directly across the road.', true)}<div class="mapgrid">${officeMap()}
        <div class="card mapdir"><span class="tag">How to get here</span>${[['From Ikeja or Maryland', 'Head towards Yaba on Ikorodu Road. Pass Obanikoro and stop at Palm Groove bus stop.'], ['From Yaba or Fadeyi', 'Head towards Maryland on Ikorodu Road. Pass Onipanu and stop at Palm Groove bus stop.'], ['By bus or BRT', 'Alight at Palm Groove bus stop. The Cloud Energy building is opposite the stop.'], ['Landmark', 'Opposite Palm Groove Bus Stop, Ikorodu Road, Lagos.']].map(d => `<div class="dir"><b>${d[0]}</b><p>${d[1]}</p></div>`).join('')}<div class="btns"><a class="btn" href="${CONTACT.maps}" target="_blank" rel="noopener">Open in Google Maps ↗</a><button class="btn outline" data-copy="${esc(CONTACT.addr)}">Copy address</button></div></div></div></div></section>
      <section class="sec pale"><div class="wrap">${head('Our offices', 'Find Us Across Nigeria', 'Visit the Lagos showroom or one of our branch offices.', true)}<div class="grid g3 branches">${CONTACT.branches.map(b => `<div class="card hov branch"><span class="icn">${I.pin}</span><span class="tag${b[0] === 'Lagos' ? '' : ' blue'}">${esc(b[1])}</span><h3 class="h-card">${esc(b[0])}</h3><p>${esc(b[2])}</p><a class="link" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Cloud Energy ' + b[2])}" target="_blank" rel="noopener">Directions ↗</a></div>`).join('')}</div></div></section>` + bulkBanner();
  }

  /* ---------- CONTACT ---------- */
  function contact() {
    return pageHero({ img: PH('svcp-support'), crumbs: crumbs('<span>Contact us</span>'), tag: 'Contact Cloud Energy', title: "Let's Talk Energy", lede: 'A question, a quote or a project to plan. Our team is ready to help.' })
      + `<section class="sec pale"><div class="wrap split" style="align-items:start"><div style="display:grid;gap:20px"><div class="grid g2" style="gap:16px">${[[I.phone, 'Call us', CONTACT.phones[0]], [I.phone, 'Sales line', CONTACT.phones[1]], [I.mail, 'Email', CONTACT.email], [I.pin, 'Visit', '191 Ikorodu Road, Lagos · Branches in Abuja and Port Harcourt']].map(c => `<div class="card hov" style="padding:22px"><span class="icn">${c[0]}</span><small class="label" style="color:var(--slate)">${c[1]}</small><b style="color:var(--navy);overflow-wrap:anywhere">${esc(c[2])}</b>${c[1] !== 'Visit' ? `<button class="copybtn" style="justify-self:start" data-copy="${esc(c[2])}">Copy</button>` : `<a class="link" href="${CONTACT.maps}" target="_blank" rel="noopener">Directions ↗</a>`}</div>`).join('')}</div>
        <div class="photo" style="aspect-ratio:16/10"><img src="${PH('store')}" alt="Cloud Energy office" loading="lazy"><span class="badge">Head office · Lagos</span></div>
        <div class="ncard"><span class="tag dark">Technical support</span><h3 class="h-card">Include these for faster help</h3><p>Product model and serial number, system capacity, a short description of the fault and your installation date.</p></div></div>
        <div class="card" style="padding:32px" id="contact-form">${formHTML('contactForm', { title: 'Send us a message' })}</div></div></section>`;
  }

  /* ---------- ABOUT (content from the Cloud Energy company profile) ---------- */
  function PR(k) { return 'img/prof/' + k + '.webp'; }
  const TEAM = [
    { n: 'Theophilus C. Nweke', r: 'Managing Director', lead: 'theophilus-nweke', b: ['A seasoned business leader with over 28 years of experience in technology, renewable energy and education.', 'Before Cloud Energy he held leadership positions at Citinet Innovations Technologies, Green Plant FZE, Zinox Telecoms, Best Communications and Milestones Internet Services, with a track record in business strategy, strategic partnerships, team leadership and revenue growth.', 'He believes technology, renewable energy and education can transform lives and communities in Africa, and is committed to charity.'] },
    { n: 'Chioma Nweke', r: 'Executive Director, Strategy & Sustainability', lead: 'chioma-nweke', b: ['Over 30 years of business experience with global multinationals including Philips, Samsung and HP, driving growth and innovation across West and Central Africa.', 'She holds an Executive MBA from IESE Business School, University of Navarra, Barcelona, and was Director of Executive Education at Lagos Business School.', 'She volunteers for community causes and offers guidance to those in need.'] },
    { n: 'Engr. Uche Madukah Oteh', r: 'Executive Director, Engineering', lead: 'uche-oteh', b: ['Executive Director and Head of Engineering, with extensive engineering expertise and a proven record of effective leadership.', 'He brings deep knowledge of strategic planning, project execution and technical innovation, and leads the engineering team in developing and implementing new solutions.'] },
    { n: 'Momohjimoh Umar', r: 'Executive Director, Sales', lead: 'momohjimoh-umar', b: [] },
    { n: 'John Esoimeme', r: 'General Manager', b: ['Over 25 years across renewable energy, FMCG, pay television and telecommunications, spearheading strategic initiatives across West and Central Africa.', 'Previous roles include Country Director at Beebeejump Solar International, Head of Sales at Dangote Group and MultiChoice Africa, Director at StarTimes, Chief Sales Officer at Omatek Computers and Sales Head at Promasidor Nigeria.', 'He holds an MBA, is a certified Project Management Professional and a member of the Chartered Institute of Marketing.'] },
    { n: 'Taiwo Olubiyi', r: 'Operations Manager', lead: 'taiwo-olubiyi', b: [] },
    { n: 'Kelechi Okorie', r: 'Project Manager', lead: 'kelechi-okorie', b: [] },
    { n: 'Debo Carpenter', r: 'Service Manager', lead: 'debo-carpenter', b: [] },
    { n: 'Mobolaji Olajide', r: 'Human Resources Manager (Admin)', lead: 'mobolaji-olajide', b: [] },
    { n: 'Fidel James', r: 'Channel Sales Manager, South West', lead: 'fidel-james', b: [] },
    { n: 'Chioma Woke', r: 'Sales Manager', lead: 'chioma-woke', b: [] }
  ];
  const SEGMENTS = [
    { img: PR('ssbu-shop'), pill: 'SSBU', stat: ['1,000+', 'business solutions deployed'], title: 'Solar Solution for Business Use', text: 'Lease to own or energy as a service, in 1KVA, 2KVA, 3KVA and 5KVA sizes.' },
    { img: PR('sunbox-install'), pill: 'SSHU', stat: ['1–5KVA', 'home systems'], title: 'Solar System for Home Use', text: 'Home solar in 1KVA, 2KVA, 3.5KVA and 5KVA capacities.' },
    { img: PR('minigrid-amagu'), pill: 'Mini grid', stat: ['Item Amagu', 'Ebonyi State'], title: 'Mini Grids', text: 'Solar mini grid with battery energy storage serving the Item Amagu community.' },
    { img: PR('borno-site'), pill: 'Rural electrification', stat: ['600+', 'homes to be electrified'], title: 'Viu Kutha, Borno State', text: '100KVA solar hybrid mini grid: 216 × 2V/500AH batteries, 300W panels and a 100KW hybrid inverter.' },
    { img: PR('standalone-install'), pill: 'Stand-alone projects', stat: ['2', 'Lagos facilities featured'], title: 'Stand-alone Solar', text: 'Powered Oluten Hospitality Centre, Onipanu, and Adesola General Hospital, Bariga.' },
    { img: PR('streetlight'), pill: 'Street lighting', stat: ['Safer', 'schools, homes and stadiums'], title: 'Solar Street Lighting', text: 'Solar street lights that improve security for schools, homes, stadiums and businesses.' }
  ];
  const CLIENTS = [['rea', 'Rural Electrification Agency'], ['iita', 'IITA'], ['lbs', 'Lagos Business School'], ['edc', 'Enterprise Development Centre, Pan-Atlantic University'], ['unilag', 'University of Lagos'], ['mouau', 'Michael Okpara University of Agriculture, Umudike'], ['sterling', 'Sterling Bank'], ['fidelity', 'Fidelity Bank'], ['stanbic', 'Stanbic IBTC'], ['cwg', 'Computer Warehouse Group'], ['corona', 'Corona Secondary School, Agbara']];
  function about() {
    const statRow = [['2013', 'Registered with the CAC', 0], ['1000', 'SSBU solutions deployed', '+'], ['3000', 'Homes powered by 2017 projects', '+'], ['5000', 'Customers our stock can supply', '+']];
    return pageHero({ img: PR('namu-aerial'), crumbs: crumbs('<span>About Us</span>'), tag: 'About Cloud Energy', title: 'Clean, Reliable Power for Every Nigerian Home and Business', lede: 'Since 2013, we have supplied and installed solar panels, inverters, batteries and energy-saving lights for homes, schools, offices and industries across Nigeria.' })
      + `<section class="statbar"><div class="wrap stats">${statRow.map(s => `<div class="stat"><b ${s[2] ? `data-count="${s[0]}" data-suffix="${s[2]}"` : ''}>${s[2] ? Number(s[0]).toLocaleString() + s[2] : s[0]}</b><span>${s[1]}</span></div>`).join('')}</div></section>
      <section class="sec"><div class="wrap split"><div style="display:grid;gap:20px"><span class="tag">Who we are</span><h2 class="h-sec">Cloud Energy Photoelectric Limited</h2>
        <p class="lead">We are focused on the conservation of energy and delivering its immediate needs, using inverter systems, solar energy and LED energy-saving lighting for the most efficient use of energy.</p>
        <p class="lead">Registered with the Corporate Affairs Commission in 2013 and a member of the Nigerian-German Business Association, we back every installation with dedicated engineers and client service representatives.</p>
        <div class="btns"><a class="btn" href="#awards">Awards &amp; Recognition ${AR}</a><a class="btn outline" href="#projects">Our Projects</a></div></div>
        <div class="gallery" style="grid-template-rows:200px 200px"><figure><img src="${PH('store')}" alt="Cloud Energy head office on Ikorodu Road, Lagos" loading="lazy"><figcaption>Head office, Lagos</figcaption></figure><figure><img src="img/awards/team.webp" alt="The Cloud Energy team at the 2026 CEO Excellence Awards" loading="lazy"></figure><figure><img src="${PR('ssbu-install')}" alt="" loading="lazy"></figure><figure><img src="${PR('borno-site')}" alt="" loading="lazy"></figure><figure><img src="${PR('standalone-install')}" alt="" loading="lazy"></figure></div></div></section>
      <section class="sec brandband"><div class="wrap"><div class="bento">
        ${bx({ raw: 1, v: 'Our Mission', label: 'To provide affordable and reliable alternative energy solutions that create access to solar energy, energy conservation and lighting solutions across Nigeria and Africa.', tone: 'blue', cls: 'tall' })}
        ${bx({ raw: 1, v: 'Our Vision', label: 'To be the foremost provider of affordable and reliable alternative energy solutions in Nigeria and Africa.', tone: 'amber', gold: true })}
        ${bx({ raw: 1, v: 'What we do', label: 'Eco-friendly energy solutions for homes and businesses across Nigeria.', tone: 'silver' })}</div></div></section>
      <section class="sec pale"><div class="wrap">${head('Business segments', 'Where We Deliver Energy', '', true)}<div class="ovgrid">${SEGMENTS.map((s, i) => ov({ cls: i === 0 ? 'a' : i >= 4 ? 'w2' : '', href: '#projects', img: s.img, pill: s.pill, stat: s.stat, title: s.title, text: s.text, go: 'View projects' })).join('')}</div></div></section>
      <section class="sec"><div class="wrap">${head('Why do business with us', 'Reliable by Name, Reliable by Design', '', true)}<div class="grid g4">${[[I.shield, 'Efficient and reliable', 'Cloud Energy® is our brand and our name. We pride ourselves on being reliable and we stand by it.'], [I.star, 'Premium products, fair prices', 'Products among the best in the country, with friendly price tags.'], [I.box, 'Strong stock position', 'Enough inverters, panels, batteries and home systems to supply over 5,000 customers, with a 3-month reorder cycle.'], [I.bolt, 'Innovative, upgradable design', 'Wall-mounted inverters and premium solar cells with zero deviation from stated output.']].map(b => `<div class="card hov"><span class="icn">${b[0]}</span><h3 class="h-card">${b[1]}</h3><p>${b[2]}</p></div>`).join('')}</div></div></section>
      <section class="sec navyband"><div class="wrap">${head('Milestones', 'Our Journey', '', false, true)}<div class="timeline">${[['2013', 'Company founded and registered with the CAC. Lead carbon and gel batteries, and monocrystalline panels.'], ['2017', 'Three rural electrification projects in 3 states: one mini grid and two solar home system projects powering 3,000+ homes.'], ['2018', 'Solar home systems and a range of energy efficiency products.'], ['2019', 'Lithium ion batteries for energy storage, and solar irrigation for farms.'], ['2023', 'Second mini grid. Nominated by the Universal Energy Facility.'], ['2024', 'E-mobility, SSBU, HSSU and ESS, sustainability conversations and Cloud Renewable Gas.'], ['2026', 'Most Trusted Solar Energy Company of the Year (African Brand Awards); MD named Solar Solution Engineering CEO of the Year (Business Times).']].map(t => `<div class="tl"><b>${t[0]}</b><p>${t[1]}</p></div>`).join('')}</div></div></section>
      <section class="sec"><div class="wrap split" style="align-items:start"><div style="display:grid;gap:18px"><span class="tag">Who we serve</span><h2 class="h-sec">Energy for Every Nigerian</h2><p class="lead">We are committed to giving all Nigerians access to reliable, clean and sustainable energy.</p><div class="photo" style="aspect-ratio:4/3"><img src="${PR('sshu-poster')}" alt="Cloud Energy solar system for home use" loading="lazy" style="object-fit:cover"></div></div>
        <div style="display:grid;gap:16px"><div class="card"><span class="tag blue">Individuals</span>${[['Salary earners', 'Professionals seeking cost-effective answers to unreliable grid power.'], ['Self-employed', 'Entrepreneurs and small businesses cutting energy costs.'], ['Homeowners and renters', 'Rural, urban and peri-urban households needing dependable power.']].map(x => `<div class="check" style="border:0;padding:6px 0"><i>✓</i><span><b style="color:var(--navy)">${x[0]}</b> · ${x[1]}</span></div>`).join('')}</div>
        <div class="card"><span class="tag">Institutions</span><div class="filters">${['Offices', 'Schools', 'Cooperatives', 'Places of worship', 'Hospitals', 'Banks & financial institutions', 'Military & para-military'].map(x => `<span class="fchip" style="cursor:default">${x}</span>`).join('')}</div></div></div></div></section>
      <section class="sec pale"><div class="wrap">${head('Clientele', 'Trusted by Public and Private Institutions', '', true)}<div class="logos">${CLIENTS.map(c => `<figure class="logo-tile" title="${esc(c[1])}"><img src="img/clients/${c[0]}.webp" alt="${esc(c[1])}" loading="lazy"></figure>`).join('')}<figure class="logo-tile txt"><span>${I.bank}</span><b>Federal Ministries</b></figure><figure class="logo-tile txt"><span>${I.users}</span><b>NGOs</b></figure></div></div></section>` + bulkBanner();
  }

  /* ---------- AWARDS & RECOGNITION ---------- */
  const TROPHY = `<svg class="trophy" viewBox="0 0 120 120" aria-hidden="true"><defs><linearGradient id="tg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE7B8"/><stop offset=".55" stop-color="#F9A930"/><stop offset="1" stop-color="#9A5B00"/></linearGradient></defs><path fill="url(#tg)" d="M38 18h44v22c0 14-9 26-22 28-13-2-22-14-22-28z"/><path fill="none" stroke="url(#tg)" stroke-width="6" stroke-linecap="round" d="M38 26H24c0 16 8 24 18 26M82 26h14c0 16-8 24-18 26"/><path fill="url(#tg)" d="M54 68h12v16H54zM40 88h40l4 12H36z"/><path fill="#fff" opacity=".35" d="M46 22h6v24c0 6 2 10 5 14-7-3-11-9-11-16z"/></svg>`;
  const AWARDS = [
    { year: '2026', org: 'The African Brand Awards', title: 'The Most Trusted Solar Energy Company of the Year', cat: 'Teamwork & Customer Care · Renewable Energy Category', who: 'Received by the Managing Director on behalf of Cloud Energy', links: [['View the LinkedIn post', 'https://lnkd.in/p/dUHtZFUB']] },
    { year: '2026', org: 'Business Times C.E.O Excellence Awards', title: 'The Solar Solution Engineering CEO of the Year 2026', cat: 'Awarded to Engr. Theophilus Chukwudi Nweke, Founder & Managing Director', who: 'Celebrated with the Executive Director (Strategy) and members of Team Cloud Energy', img: 'team-theophilus', photo: 'img/awards/receiving.webp', links: [['The award', 'https://www.linkedin.com/posts/theophilus-nweke-468b8626_ceoexcellenceawards-cloudenergy-tcn-ugcPost-7512820842830073856-30Q-/'], ['Networking at the awards', 'https://www.linkedin.com/posts/theophilus-nweke-468b8626_networking-ceoexcellenceawards-leadership-ugcPost-7514269546887733248-G422/'], ['Celebrating with the team', 'https://www.linkedin.com/posts/theophilus-nweke-468b8626_cloudenergy-teamcloudenergy-ceoawards2026-ugcPost-7515435964782051328-BdDk/']] }
  ];
  const awardCard = (a, i) => `<article class="award ${i ? 'alt' : ''}">${a.photo ? `<div class="aw-photo"><img src="${a.photo}" alt="${esc(a.title)} presentation" loading="lazy"></div>` : ''}${WAVES('#F9A930', '#FFE7B8')}<div class="aw-top"><span class="aw-year g-amber">${a.year}</span>${a.img ? `<img class="aw-face" src="${IMG(a.img)}" alt="Theophilus C. Nweke">` : TROPHY}</div>
    <span class="aw-org">${esc(a.org)}</span><h3>${esc(a.title)}</h3><p class="aw-cat">${esc(a.cat)}</p><p class="aw-who">${esc(a.who)}</p>
    <div class="aw-links">${a.links.map(l => `<a href="${l[1]}" target="_blank" rel="noopener">${I.li}<span>${esc(l[0])}</span></a>`).join('')}</div></article>`;
  const AW_PICS = ['receiving', 'trophy', 'team', 'certificate', 'speaking', 'handshake'];
  const awardsRibbon = () => {
    const strip = (list) => list.map(k => `<img src="img/awards/${k}.webp" alt="" loading="lazy">`).join('');
    const rowA = AW_PICS.concat(AW_PICS), rowB = AW_PICS.slice(3).concat(AW_PICS.slice(0, 3)); 
    return `<section class="sec pale"><div class="wrap"><a class="awhero" href="#awards" aria-label="See our 2026 awards">
      <div class="aw-reel" aria-hidden="true"><div class="aw-row">${strip(rowA)}</div><div class="aw-row rev">${strip(rowB.concat(rowB))}</div><div class="aw-row slow">${strip(rowA.slice().reverse())}</div></div>
      <div class="aw-veil"></div><span class="aw-shine" aria-hidden="true"></span>
      <div class="aw-content">
        <div class="aw-badge">${TROPHY}<span class="aw-burst" aria-hidden="true"></span></div>
        <span class="aw-kicker">Award-winning · 2026</span>
        <h2>Most Trusted Solar Energy Company of the Year</h2>
        <p>The African Brand Awards · Teamwork &amp; Customer Care, Renewable Energy Category</p>
        <div class="aw-second"><img src="img/awards/receiving.webp" alt="" loading="lazy"><div><small>Business Times C.E.O Excellence Awards</small><b>Solar Solution Engineering CEO of the Year 2026</b><span>Engr. Theophilus Chukwudi Nweke</span></div></div>
        <span class="btn amber lg aw-cta">See our awards ${AR}</span>
      </div></a></div></section>`;
  };
  function awards() {
    const certs = [['NEMSA', 'Nigerian Electricity Management Services Agency', 'Electrical installation standards and safety.'], ['SON', 'Standards Organisation of Nigeria', 'Product quality and conformity standards.'], ['Lighting Global', 'An innovation of the World Bank Group', 'Quality assurance for off-grid solar products.'], ['Winrock', 'Winrock International', 'Development programmes in energy access.']];
    return pageHero({ img: 'img/awards/team.webp', crumbs: crumbs('<span>Awards &amp; Recognition</span>'), tag: 'Awards & recognition', title: 'Award-Winning Solar Energy', lede: 'Recognised in 2026 for trust, customer care and engineering leadership in renewable energy.' })
      + `<section class="sec darkband"><div class="wrap">${head('Awards · 2026', 'Celebrating Trust and Leadership', '', false, true)}<div class="awards">${AWARDS.map(awardCard).join('')}</div></div></section>
      <section class="sec"><div class="wrap">${head('Business Times C.E.O Excellence Awards 2026', 'A Proud Moment for Team Cloud Energy', '', true)}
        <div class="aw-gallery">${[['receiving', 'Receiving the award'], ['certificate', 'Winner: Solar Solution Engineering CEO of the Year 2026'], ['trophy', 'The trophy'], ['speaking', 'Addressing fellow CEOs and business leaders'], ['handshake', 'Congratulations on stage'], ['team', 'With Team Cloud Energy']].map(g => `<figure><img src="img/awards/${g[0]}.webp" alt="${esc(g[1])}" loading="lazy"><figcaption>${esc(g[1])}</figcaption></figure>`).join('')}</div>
        <blockquote class="aw-quote">“Having my team there to celebrate with me made the occasion even more meaningful.”<cite>Engr. Theophilus Chukwudi Nweke, Founder &amp; Managing Director</cite></blockquote></div></section>
      <section class="sec"><div class="wrap split"><div class="photo" style="aspect-ratio:3/2"><img src="${PR('uef-2023')}" alt="Cloud Energy receiving recognition at the launch of the Universal Energy Facility stand-alone solar programme" loading="lazy"><span class="badge">2023 · Universal Energy Facility</span></div>
        <div style="display:grid;gap:20px"><span class="tag">International recognition</span><h2 class="h-sec">Universal Energy Facility (SEforALL)</h2><p class="lead">In 2023, Cloud Energy was nominated by the Universal Energy Facility, managed by Sustainable Energy for All, to deploy solar solutions for productive use by businesses across Nigeria.</p>
        <div class="grid g2" style="gap:12px"><div class="key"><small>Year</small><b>2023</b></div><div class="key"><small>Programme</small><b>Stand-alone solar for productive use</b></div></div></div></div></section>
      <section class="sec darkband"><div class="wrap">${head('Certifications & registrations', 'Built to Recognised Standards', 'Cloud Energy and its products are registered with these organisations so that engineering, procurement, construction and service delivery meet the highest standard.', false, true)}
        <div class="grid g4">${certs.map((c, i) => `<div class="bx ${i % 2 ? 'gold' : ''}" style="min-height:220px">${WAVES(i % 2 ? '#F9A930' : '#1190C8', i % 2 ? '#FFE7B8' : '#9ED8F5')}<div class="bx-num sm raw" style="font-size:clamp(28px,2.6vw,40px)"><span class="${i % 2 ? 'g-amber' : 'g-blue'}">${esc(c[0])}</span></div><span class="bx-lbl" style="font-size:17px">${esc(c[1])}</span><span class="bx-sub">${esc(c[2])}</span></div>`).join('')}</div></div></section>
      <section class="sec"><div class="wrap">${head('Memberships & partnerships', 'Who Stands With Us', '', true)}<div class="grid g3">
        <div class="imgcard"><div class="im"><img src="${PR('sacred-sun')}" alt="Cloud Energy leadership with the Sacred Sun team" loading="lazy"></div><div class="ib"><span class="tag blue">Technical partner</span><h3 class="h-card">Sacred Sun Hong Kong Ltd</h3><p>A strong technical partnership with our supplier of OPzV lead carbon batteries.</p></div></div>
        <div class="card"><span class="icn">${I.bank}</span><span class="tag">Financial partners</span><h3 class="h-card">Lease to own, 2 to 10 years</h3><p>Long-standing bank relationships make financing easy for our lease-to-own solutions.</p><div class="filters">${['Stanbic IBTC', 'Access Bank', 'FCMB'].map(x => `<span class="fchip" style="cursor:default">${x}</span>`).join('')}</div></div>
        <div class="card"><span class="icn">${I.handshake}</span><span class="tag">Memberships</span><h3 class="h-card">Registered and connected</h3>${['Registered with the Corporate Affairs Commission (CAC), 2013', 'Member, Nigerian-German Business Association', 'Universal Energy Facility nominee, 2023'].map(x => `<div class="check" style="border:0;padding:6px 0"><i>✓</i><span>${x}</span></div>`).join('')}</div></div></div></section>` + bulkBanner();
  }

  /* ---------- CAREERS ---------- */
  const AREAS = [[I.install, 'Engineering & Installation', 'Design, install and commission solar and storage systems.'], [I.brief, 'Sales & Partnerships', 'Grow homes, business and reseller accounts.'], [I.support, 'Customer & Technical Support', 'Keep every customer system running.'], [I.box, 'Operations & Logistics', 'Stock, delivery and project logistics.'], [I.chart, 'Marketing & Communications', 'Tell the story of clean energy in Africa.'], [I.bank, 'Finance & Administration', 'Keep the business healthy as it grows.']];
  function careers() {
    return pageHero({ img: PH('svcp-install'), crumbs: crumbs('<span>Careers</span>'), tag: 'Careers at Cloud Energy', title: 'Power Your Career With Clean Energy', lede: 'Join the engineers, technicians and specialists bringing reliable power to homes, businesses and communities across Nigeria.', actions: '<a class="btn" href="#apply">Join Our Talent Pool ' + AR + '</a><a class="btn ghost-w" href="#areas">Explore teams</a>' })
      + `<section class="statbar"><div class="wrap stats">${[['2013', 'Building since', 0], ['4', 'Programme areas', 0], ['10000', 'Homes powered', '+'], ['24/7', 'Support culture', 0]].map(s => `<div class="stat"><b ${s[2] ? `data-count="${s[0]}" data-suffix="${s[2]}"` : ''}>${s[2] ? Number(s[0]).toLocaleString() + s[2] : s[0]}</b><span>${s[1]}</span></div>`).join('')}</div></section>
      <section class="sec"><div class="wrap">${head('Why Cloud Energy', 'Work That Keeps the Lights On', 'Real projects, real impact and room to grow.', true)}<div class="grid g4">${[[I.sun, 'Meaningful impact', 'Your work powers clinics, schools, homes and businesses.'], [I.train, 'Learn and grow', 'Hands-on training in product, design and safety.'], [I.users, 'Expert team', 'Work beside leaders with decades of industry experience.'], [I.heart, 'Care and safety', 'Safe practice on every site, every day.']].map(b => `<div class="card hov"><span class="icn">${b[0]}</span><h3 class="h-card">${b[1]}</h3><p>${b[2]}</p></div>`).join('')}</div></div></section>
      <section class="sec pale"><div class="wrap"><div class="gallery"><figure><img src="${PH('svcp-training')}" alt="Team training session" loading="lazy"><figcaption>Installer &amp; partner training</figcaption></figure><figure><img src="${PH('svcp-site')}" alt="" loading="lazy"><figcaption>Site assessment</figcaption></figure><figure><img src="${PH('store')}" alt="" loading="lazy"><figcaption>Head office, Lagos</figcaption></figure><figure><img src="${PH('mini-main')}" alt="" loading="lazy"><figcaption>Mini grids</figcaption></figure><figure><img src="${PH('svcp-maint')}" alt="" loading="lazy"><figcaption>Maintenance</figcaption></figure></div></div></section>
      <section class="sec" id="areas"><div class="wrap">${head('Teams', 'Areas We Hire For', 'No open roles are listed right now. Join the talent pool and we will contact you when a matching role opens.', true)}<div class="grid g3">${AREAS.map(a => `<div class="card hov"><span class="icn">${a[0]}</span><h3 class="h-card">${esc(a[1])}</h3><p>${a[2]}</p><button class="link" data-area="${esc(a[1])}">Join this talent pool ${AR}</button></div>`).join('')}</div></div></section>
      <section class="sec navyband"><div class="wrap">${head('Hiring process', 'How We Hire', '', false, true)}<div class="steps">${[['Apply', 'Share your details and area.'], ['Review', 'Our team reviews your profile.'], ['Conversation', 'A first call with the hiring lead.'], ['Assessment', 'A practical task or site interview.'], ['Offer', 'Welcome to Cloud Energy.']].map((s, i) => `<div class="stepc"><i>${i + 1}</i><b>${s[0]}</b><p>${s[1]}</p></div>`).join('')}</div></div></section>
      <section class="sec pale" id="apply"><div class="wrap split" style="align-items:start"><div style="display:grid;gap:18px"><span class="tag">Talent pool</span><h2 class="h-sec">Join Our Talent Pool</h2><p class="lead">Tell us where you fit. We keep your details on file and reach out when a matching role opens.</p><div class="photo" style="aspect-ratio:16/10"><img src="${PH('svcp-design')}" alt="" loading="lazy"></div></div>
        <div class="card" style="padding:32px"><form class="form" id="careerForm" novalidate><div class="fgrid"><div class="field"><label for="cf-name">Full name *</label><input id="cf-name" name="Full name" required autocomplete="name" placeholder="Enter your full name"></div><div class="field"><label for="cf-email">Email address *</label><input id="cf-email" name="Email" type="email" required autocomplete="email" placeholder="yourname@email.com"></div><div class="field"><label for="cf-phone">Phone number *</label><input id="cf-phone" name="Phone" type="tel" required autocomplete="tel" placeholder="+234 …"></div><div class="field"><label for="cf-loc">Location *</label><input id="cf-loc" name="Location" required placeholder="City, state"></div></div>
          <div class="field"><label for="cf-area">Area of interest *</label><select id="cf-area" name="Area of interest">${AREAS.map(a => `<option${S.area === a[1] ? ' selected' : ''}>${esc(a[1])}</option>`).join('')}</select></div>
          <div class="field"><label for="cf-link">LinkedIn or portfolio link</label><input id="cf-link" name="Profile link" type="url" placeholder="https://"></div>
          <div class="field"><label for="cf-msg">About you</label><textarea id="cf-msg" name="About" placeholder="Your experience, certifications and the kind of role you want."></textarea></div>
          <input type="hidden" name="Need" value="Careers"><button class="btn" type="submit" style="justify-self:start">Join Talent Pool ${AR}</button></form><div data-done="careerForm"></div></div></div></section>`;
  }

  /* ---------- BLOG ---------- */
  const POSTS = window.CE_BLOG || [];
  const postById = id => POSTS.find(x => x.id === id);
  const postCard = (x, big) => `<a class="bcard${big ? ' big' : ''}" href="#b-${x.id}" data-cat="${esc(x.cat)}"><div class="bim"><img src="${x.img}" alt="" loading="lazy"></div><div class="bb"><div class="bmeta"><span class="tag blue">${esc(x.cat)}</span><small>${x.mins} min read</small></div><h3>${esc(x.title)}</h3><p>${esc(x.dek)}</p><span class="link">Read article ${AR}</span></div></a>`;
  function blog() {
    const feat = POSTS.find(x => x.featured) || POSTS[0];
    const cats = ['All'].concat([...new Set(POSTS.map(x => x.cat))]);
    return pageHero({ img: PH('roof-band'), crumbs: crumbs('<span>Blog</span>'), tag: 'Cloud Energy blog', title: 'Insights on Solar, Storage and Electric Mobility', lede: 'Practical guides from our engineers, project stories from the field and news from Cloud Energy.' })
      + `<section class="sec"><div class="wrap"><div class="bfeat">${postCard(feat, true)}<div class="bside"><span class="label" style="color:var(--slate)">Popular guides</span>${POSTS.filter(x => x !== feat && x.cat === 'Guides').concat(POSTS.filter(x => x !== feat && x.cat !== 'Guides')).slice(0, 4).map(x => `<a class="bmini" href="#b-${x.id}"><img src="${x.img}" alt="" loading="lazy"><span><small>${esc(x.cat)} · ${x.mins} min</small><b>${esc(x.title)}</b></span></a>`).join('')}</div></div></div></section>
      <section class="sec pale" id="all-posts"><div class="wrap">${head('All articles', 'Browse by Topic', '', true)}<div class="filters bfilters" role="group" aria-label="Filter articles by topic">${cats.map((c, i) => `<button class="fchip" data-blogcat="${esc(c)}" aria-pressed="${i === 0}">${esc(c)}</button>`).join('')}</div><div class="bgrid">${POSTS.map(x => postCard(x)).join('')}</div></div></section>
      <section class="sec"><div class="wrap split" style="align-items:center"><div style="display:grid;gap:16px"><span class="tag">Ask an engineer</span><h2 class="h-sec">Have a Question We Have Not Covered?</h2><p class="lead">Send it to our team. We answer every enquiry and turn the most common questions into new guides.</p></div><div class="btns" style="justify-content:flex-end">${quoteBtn('Ask Our Engineers ' + AR, 'Other', 'I have a question for the Cloud Energy engineering team: ')}<a class="btn outline" href="#faq">Read the FAQs</a></div></div></section>`;
  }
  function blk(b, i) {
    if (b[0] === 'h') return `<h2 id="sec-${i}">${esc(b[1])}</h2>`;
    if (b[0] === 'p') return `<p>${esc(b[1])}</p>`;
    if (b[0] === 'ul' || b[0] === 'ol') return `<${b[0]}>${b[1].map(t => `<li>${esc(t)}</li>`).join('')}</${b[0]}>`;
    if (b[0] === 'tip') return `<aside class="atip"><b>Engineer's tip</b><p>${esc(b[1])}</p></aside>`;
    if (b[0] === 'table') return `<div class="atable"><table><thead><tr>${b[1].map(t => `<th>${esc(t)}</th>`).join('')}</tr></thead><tbody>${b[2].map(r => `<tr>${r.map(t => `<td>${esc(t)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    if (b[0] === 'figure') return `<figure class="afig"><img src="${b[1]}" alt="${esc(b[2])}" loading="lazy"><figcaption>${esc(b[2])}</figcaption></figure>`;
    if (b[0] === 'links') return `<div class="alinks">${b[1].map(l => `<a class="link" href="${l[1]}" target="_blank" rel="noopener">${esc(l[0])} ↗</a>`).join('')}</div>`;
    return '';
  }
  function article(x) {
    const toc = x.body.map((b, i) => b[0] === 'h' ? `<button type="button" data-scroll="sec-${i}">${esc(b[1])}</button>` : '').join('');
    const cta = x.cta[1] === 'quote' ? quoteBtn(x.cta[0] + ' ' + AR, x.cta[2] || 'Other') : `<a class="btn" href="#${x.cta[1]}"${x.cta[2] === 'calc' ? ' data-calclink' : ''}>${x.cta[0]} ${AR}</a>`;
    const rel = POSTS.filter(y => y !== x && y.cat === x.cat).concat(POSTS.filter(y => y !== x && y.cat !== x.cat)).slice(0, 3);
    return `<section class="ahero"><div class="wrap"><nav class="crumbs" aria-label="Breadcrumb">${crumbs(`<a href="#blog">Blog</a><span>›</span><span>${esc(x.cat)}</span>`)}</nav><span class="tag dark dot">${esc(x.cat)}</span><h1>${esc(x.title)}</h1><p class="adek">${esc(x.dek)}</p><div class="abyline"><img src="img/logo.png" alt=""><span><b>Cloud Energy Engineering Team</b><small>${x.mins} min read</small></span></div></div></section>
      <div class="wrap"><div class="acover"><img src="${x.img}" alt="" fetchpriority="high"></div></div>
      <section class="sec" style="padding-top:48px"><div class="wrap alayout"><article class="aprose">${x.body.map(blk).join('')}<div class="acta"><div><b>Ready for the next step?</b><p>Our engineers can size, supply and install the right system for you.</p></div><div class="btns">${cta}<a class="btn outline" href="#contact">Contact Us</a></div></div></article>
        <aside class="aside">${toc ? `<div class="atoc"><span class="label">On this page</span>${toc}</div>` : ''}<div class="acard"><span class="tag dark">Free energy audit</span><b>Not sure what you need?</b><p>Book an audit and get a system sized to your actual load.</p>${quoteBtn('Book an Audit ' + AR, 'Energy Audit', '', 'amber sm')}</div></aside></div></section>
      <section class="sec pale"><div class="wrap">${head('Keep reading', 'Related Articles', '', true)}<div class="bgrid">${rel.map(y => postCard(y)).join('')}</div><div class="center" style="margin-top:36px"><a class="btn navy" href="#blog">All Articles ${AR}</a></div></div></section>`;
  }


  function policies() {
    return pageHero({ img: PH('svcp-support'), crumbs: crumbs('<span>Policies</span>'), tag: 'Legal', title: 'Policies', lede: 'Privacy, terms and warranty information for Cloud Energy customers.' })
      + `<section class="sec pale"><div class="wrap"><div class="grid g3">${[[I.shield, 'Privacy Policy', 'How we collect, use and protect the details you share with us.'], [I.doc, 'Terms of Service', 'The terms that apply to quotes, orders, installation and payment plans.'], [I.check, 'Warranty Policy', 'Coverage, duration and how to make a claim for each product.']].map(x => `<div class="card hov"><span class="icn">${x[0]}</span><h2 class="h-card">${x[1]}</h2><p>${x[2]}</p><p class="note">The full document is being prepared for the website. Request a copy and our team will send it.</p><div>${quoteBtn('Request a copy ' + AR, 'Other', 'Please send me a copy of the Cloud Energy ' + x[1] + '.', 'outline sm')}</div></div>`).join('')}</div></div></section>`;
  }

  /* ---------- router ---------- */
  const ROUTES = { 'cloud-ride': cloudRide, home, products, services, projects, financing, affiliates, quote, partner, faq: faqPage, stores, contact, about, careers, blog, policies, awards };
  const TITLES = { 'cloud-ride': 'Cloud Ride', products: 'Products', services: 'Services', projects: 'Projects', financing: 'Cloud Financing', affiliates: 'Affiliates', quote: 'Get a Quote', partner: 'Partner with Us', faq: 'FAQs', stores: 'Store Locator', contact: 'Contact', about: 'About Us', careers: 'Careers', blog: 'Blog', policies: 'Policies', awards: 'Awards & Recognition' };
  function navKey(r) { if (r.startsWith('b-')) return 'blog'; if (r.startsWith('c-') || r.startsWith('p-') || r === 'products') return 'products'; return r; }
  let io = null;
  function splitWords(el) {
    if (el.dataset.split) return; el.dataset.split = 1;
    let i = 0;
    const walk = node => Array.from(node.childNodes).forEach(n => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(w => { if (!w) return; if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(w)); return; } const o = document.createElement('span'); o.className = 'sw'; const inn = document.createElement('span'); inn.style.setProperty('--i', i++); inn.textContent = w; o.appendChild(inn); frag.appendChild(o); });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && !n.classList.contains('sw')) walk(n);
    });
    walk(el);
  }
  function setupMotion() {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.querySelectorAll('#main video.rvid').forEach(v => { v.muted = true; if (reduce) v.pause(); else { const pr = v.play(); if (pr && pr.catch) pr.catch(() => {}); } });
    if (io) io.disconnect();
    if (reduce || !('IntersectionObserver' in window)) return;
    const vh = innerHeight;
    io = new IntersectionObserver(entries => entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target; io.unobserve(el);
      if (el.dataset.count) { const to = Number(el.dataset.count); const suf = el.dataset.suffix || ''; tween(el, 0, to, 1600, v => Math.round(v).toLocaleString() + suf); }
      el.classList.remove('pre', 'split-pre');
    }), { rootMargin: '0px 0px -8% 0px' });
    const below = el => el.getBoundingClientRect().top > vh * 0.9;
    // headline word-mask reveal
    document.querySelectorAll('#main .head h2, #main .phero h1, #main .h-sec').forEach(h => { splitWords(h); if (below(h)) { h.classList.add('split-pre'); io.observe(h); } });
    // image clip reveal
    document.querySelectorAll('#main .photo, #main .ov, #main .gallery figure').forEach(el => { el.classList.add('clipr'); if (below(el)) { el.classList.add('pre'); io.observe(el); } });
    // lift-in for cards
    const els = document.querySelectorAll('#main .head > .tag, #main .head > .lead, #main .catc, #main .card, #main .imgcard, #main .pcard, #main .member, #main .bx, #main .acc details, #main .site-row, #main .tl, #main .stepc, #main .calc > *, #main .benefit, #main .key, #main .rcat, #main .fopt, #main .fsteps li, #main .fbx, #main .fstats-grid > div, #main .bcard, #main .tcard, #main .rwhy-list > div, #main .sol-copy, #main .awhero');
    els.forEach(el => {
      el.classList.add('rv');
      if (below(el)) { const sib = Array.prototype.indexOf.call(el.parentElement.children, el); el.style.transitionDelay = Math.min(sib, 5) * 80 + 'ms'; el.classList.add('pre'); io.observe(el); }
    });
    document.querySelectorAll('#main [data-count]').forEach(el => { if (below(el)) io.observe(el); else if (!el.dataset.done) { el.dataset.done = 1; const to = Number(el.dataset.count); const suf = el.dataset.suffix || ''; tween(el, 0, to, 1600, v => Math.round(v).toLocaleString() + suf); } });
    parallax();
  }
  function parallax() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const vh = innerHeight;
    document.querySelectorAll('#main .phero > img, #main .ov > img').forEach(img => {
      const r = img.parentElement.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return;
      const c = (r.top + r.height / 2 - vh / 2) / vh;
      img.style.setProperty('--py', (c * -6).toFixed(2) + '%');
    });
  }
  function render() {
    closeMega();
    const r = (location.hash.slice(1) || 'home').replace(/[^a-z0-9-]/gi, '');
    let html;
    if (r.startsWith('c-') && D.byId[r.slice(2)]) { html = category(D.byId[r.slice(2)]); }
    else if (r.startsWith('p-') && D.modelById[r.slice(2)]) html = product(D.modelById[r.slice(2)]);
    else if (r.startsWith('b-') && postById(r.slice(2))) html = article(postById(r.slice(2)));
    else if (ROUTES[r]) html = ROUTES[r]();
    else html = home();
    const main = document.getElementById('main');
    main.innerHTML = html;
    main.classList.remove('enter'); void main.offsetWidth; main.classList.add('enter');
    document.querySelectorAll('[data-nav]').forEach(n => n.classList.toggle('on', n.dataset.nav === navKey(r)));
    document.title = r.startsWith('b-') && postById(r.slice(2)) ? postById(r.slice(2)).title + ' · Cloud Energy Blog' : r.startsWith('p-') && D.modelById[r.slice(2)] ? D.modelById[r.slice(2)].name + ' · Cloud Energy' : r.startsWith('c-') && D.byId[r.slice(2)] ? D.byId[r.slice(2)].name + ' · Cloud Energy' : (TITLES[r] ? TITLES[r] + ' · Cloud Energy' : 'Cloud Energy');
    if (document.getElementById('hero')) { lastLoad = 0; renderCalc(); startHero(); startSol(); } else { clearInterval(S.heroTimer); clearInterval(S.solTimer); }
    let target = null;
    if (S.scrollTo) { target = document.getElementById(S.scrollTo); S.scrollTo = null; }
    if (target) { window.scrollTo(0, 0); setTimeout(() => { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); setTimeout(setupMotion, 50); }, 60); }
    else { window.scrollTo(0, 0); setupMotion(); }
  }

  /* ---------- form handling ---------- */
  async function handleForm(form) {
    let ok = true; const lines = [];
    form.querySelectorAll('.field').forEach(f => { f.classList.remove('err'); const m = f.querySelector('.msg:not([data-needmsg])'); if (m) m.remove(); });
    form.querySelectorAll('input[required], textarea[required]').forEach(inp => {
      const v = inp.value.trim(); let bad = !v;
      if (!bad && inp.type === 'email') bad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      if (!bad && inp.type === 'tel') bad = v.replace(/\D/g, '').length < 7;
      if (bad) { ok = false; const f = inp.closest('.field'); f.classList.add('err'); const m = document.createElement('span'); m.className = 'msg'; m.textContent = !v ? 'This field is required.' : inp.type === 'email' ? 'Enter a valid email address, like name@example.com.' : 'Enter a phone number with at least 7 digits.'; f.appendChild(m); }
    });
    const needIn = form.querySelector('input[name="Need"]'); const needMsg = form.querySelector('[data-needmsg]');
    if (needMsg) { needMsg.hidden = !!needIn.value; if (!needIn.value) ok = false; }
    if (!ok) { const first = form.querySelector('.err input, .err textarea'); if (first) first.focus(); return; }
    form.querySelectorAll('input, textarea, select').forEach(inp => { if (inp.name && inp.value.trim()) lines.push((inp.name === 'Need' ? (form.id === 'careerForm' ? 'Enquiry' : 'Need') : inp.name) + ': ' + inp.value.trim()); });
    const summary = (form.id === 'careerForm' ? 'Cloud Energy talent pool application\n' : 'Cloud Energy enquiry\n') + lines.join('\n');
    const done = document.querySelector(`[data-done="${form.id}"]`);
    form.hidden = true; done.innerHTML = '<p class="note" role="status">Sending your details…</p>';
    const saved = await saveLead(form.id, lines);
    if (saved) done.innerHTML = `<div class="confirm" role="status" tabindex="-1"><b style="font-size:18px;color:var(--navy)">${form.id === 'careerForm' ? 'Application received' : 'Request received'}</b><p class="note">Thank you. The Cloud Energy team has your details and will get back to you. For anything urgent, call <b>${CONTACT.phones[0]}</b>.</p><div class="btns"><button class="btn outline sm" data-reset="${form.id}">Send another</button></div></div>`;
    else done.innerHTML = `<div class="confirm" role="status" tabindex="-1"><b style="font-size:18px;color:var(--navy)">${form.id === 'careerForm' ? 'Your application is ready to send' : 'Your request is ready to send'}</b><p class="note">Copy the details and send them to <b>${CONTACT.email}</b>, or call <b>${CONTACT.phones[0]}</b>.</p><pre>${esc(summary)}</pre><div class="btns"><button class="btn sm" data-copy="${esc(summary)}">Copy details</button><button class="btn outline sm" data-reset="${form.id}">Edit</button></div></div>`;
    done.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  function story() {
    const d = document.createElement('div'); d.className = 'lightbox'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-label', 'Featured story');
    d.innerHTML = `<div class="lb-in"><img src="${PR('akwarata-powerhouse')}" alt="Akwarata Agbaja hybrid solar system"><div class="lbt"><span class="tag">Featured story</span><h3 class="h-cat">Akwarata Agbaja, Ebonyi State</h3><p class="lead">A 50kW Cloud Energy hybrid solar system with battery storage serving the Akwarata Agbaja community.</p><div class="btns"><a class="btn" href="#projects" data-close>Explore Projects ${AR}</a><button class="btn outline" data-close>Close</button></div></div></div>`;
    d.addEventListener('click', e => { if (e.target === d || e.target.closest('[data-close]')) d.remove(); });
    document.body.appendChild(d); d.querySelector('button[data-close]').focus();
  }

  /* ---------- events ---------- */
  document.addEventListener('click', e => {
    const t = e.target;
    const mg = t.closest('[data-mega]');
    if (mg) { const k = mg.dataset.mega; if (mg.getAttribute('aria-expanded') === 'true') closeMega(); else openMega(k); return; }
    if (!t.closest('#megaMount')) closeMega();
    const q = t.closest('[data-quote]');
    if (q) { e.preventDefault(); S.pendingNeed = q.dataset.quote || null; S.pendingMsg = q.dataset.msg || ''; if (location.hash === '#quote') render(); else location.hash = 'quote'; return; }
    const pdfA = t.closest('[data-pdf]'); if (pdfA) { e.preventDefault(); downloadPdf(pdfA); return; }
    const ca = t.closest('[data-copyalt]'); if (ca) { copyText(ca.dataset.copyalt); }
    const eg = t.closest('[data-evgrp]'); if (eg) { const g = eg.dataset.evgrp; document.querySelectorAll('[data-evgrp]').forEach(b => b.setAttribute('aria-pressed', String(b === eg))); document.querySelectorAll('.rgrid .rcard').forEach(k => { k.hidden = g !== 'all' && k.dataset.grp !== g; }); return; }
    const bc = t.closest('[data-blogcat]'); if (bc) { const c = bc.dataset.blogcat; document.querySelectorAll('[data-blogcat]').forEach(b => b.setAttribute('aria-pressed', String(b === bc))); document.querySelectorAll('.bgrid .bcard').forEach(k => { k.hidden = c !== 'All' && k.dataset.cat !== c; }); return; }
    const sc = t.closest('[data-scroll]'); if (sc) { e.preventDefault(); document.getElementById(sc.dataset.scroll)?.scrollIntoView({ behavior: 'smooth' }); return; }
    const so = t.closest('[data-sol]'); if (so) { setSol(Number(so.dataset.sol)); startSol(); return; }
    const fsk = t.closest('.face.sk'); if (fsk) { fsk.classList.toggle('show'); return; }
    const cp = t.closest('[data-copy]'); if (cp) { copyText(cp.dataset.copy); return; }
    if (t.closest('[data-drawer]')) { drawer(); return; }
    if (t.closest('[data-story]')) { story(); return; }
    const hb = t.closest('[data-hero]'); if (hb) { goSlide(S.hero + Number(hb.dataset.hero)); startHero(); return; }
    const dot = t.closest('[data-dot]'); if (dot) { goSlide(Number(dot.dataset.dot)); startHero(); return; }
    const pt = t.closest('[data-ptab]'); if (pt) { S.projTab = Number(pt.dataset.ptab); if (location.hash === '#projects') { e.preventDefault(); const y = t.closest('.ptabs') ? scrollY : 0; render(); window.scrollTo(0, y); } return; }
    const svc = t.closest('[data-svc]'); if (svc) { S.scrollTo = 'svc-' + svc.dataset.svc; if (location.hash === '#services') { e.preventDefault(); render(); } return; }
    const ar = t.closest('[data-area]'); if (ar) { S.area = ar.dataset.area; const sel = document.getElementById('cf-area'); if (sel) sel.value = S.area; document.getElementById('apply').scrollIntoView({ behavior: 'smooth' }); return; }
    const pd = t.closest('[data-pdtab]'); if (pd) { S.pdTab = pd.dataset.pdtab; const r = location.hash.slice(1); if (r.startsWith('p-')) { const y = scrollY; render(); window.scrollTo(0, y); } return; }
    const ch = t.closest('[data-chip]'); if (ch) { S.prodQuery = ''; location.hash = ch.dataset.chip === 'all' ? 'products' : 'c-' + ch.dataset.chip; return; }
    const cb = t.closest('[data-calc]'); if (cb) { const n = cb.dataset.calc; S.calc[n] = S.calc[n] ? 0 : 1; renderCalc(); return; }
    if (t.closest('[data-calc-clear]')) { S.calc = {}; renderCalc(); return; }
    if (t.closest('[data-calclink]')) { e.preventDefault(); if (document.getElementById('calculator')) { document.getElementById('calculator').scrollIntoView({ behavior: 'smooth' }); return; } S.scrollTo = 'calculator'; location.hash = 'home'; return; }
    const nd = t.closest('[data-need]'); if (nd) { const f = nd.closest('form'); f.querySelectorAll('[data-need]').forEach(b => b.setAttribute('aria-pressed', String(b === nd))); f.querySelector('input[name="Need"]').value = nd.dataset.need; const m = f.querySelector('[data-needmsg]'); if (m) m.hidden = true; return; }
    const rs = t.closest('[data-reset]'); if (rs) { const f = document.getElementById(rs.dataset.reset); f.hidden = false; rs.closest('[data-done]').innerHTML = ''; f.scrollIntoView({ block: 'center' }); return; }
    const a = t.closest('a[href^="#"]'); if (a && a.getAttribute('href') === location.hash && !a.dataset.svc && !a.dataset.ptab) { e.preventDefault(); render(); }
  });
  // hover-intent mega menus on pointer devices
  document.addEventListener('mouseover', e => {
    if (!matchMedia('(hover: hover) and (min-width: 1241px)').matches) return;
    const mg = e.target.closest('[data-mega]');
    if (mg) { clearTimeout(megaTimer); megaTimer = setTimeout(() => openMega(mg.dataset.mega), 90); return; }
    if (e.target.closest('#megaMount')) { clearTimeout(megaTimer); return; }
    if (e.target.closest('.nav > a') || !e.target.closest('#hdr')) { clearTimeout(megaTimer); if (document.getElementById('megaMount')?.firstChild) megaTimer = setTimeout(closeMega, 220); }
  });
  document.addEventListener('mouseover', e => { const h = document.getElementById('hero'); if (h) h.classList.toggle('paused', !!e.target.closest('#hero')); });
  document.addEventListener('submit', e => {
    const f = e.target; e.preventDefault();
    if (f.id === 'newsForm') { const v = f.querySelector('input').value.trim(); if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { toast('Enter a valid email address'); f.querySelector('input').focus(); return; } f.querySelector('button').disabled = true; saveLead('newsletter', ['Email: ' + v]).then(ok => { f.outerHTML = ok ? `<p role="status" style="color:var(--navy)"><b>Thanks!</b> You will hear from us about solar deals at ${esc(v)}.</p>` : `<p role="status" style="color:var(--navy)"><b>Thanks!</b> Email ${CONTACT.email} with the subject Mailing list and we will add you.</p>`; }); return; }
    if (f.id === 'waitForm') {
      const n = f.querySelector('#wName'), m = f.querySelector('#wEmail');
      f.querySelectorAll('.field').forEach(x => { x.classList.remove('err'); const g = x.querySelector('.msg'); if (g) g.remove(); });
      let ok = true; [[n, !n.value.trim(), 'This field is required.'], [m, !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m.value.trim()), 'Enter a valid email address.']].forEach(([el, bad, msg]) => { if (bad) { ok = false; const fl = el.closest('.field'); fl.classList.add('err'); const s = document.createElement('span'); s.className = 'msg'; s.textContent = msg; fl.appendChild(s); } });
      if (!ok) return;
      const summary = `Affiliate waitlist\nName: ${n.value.trim()}\nEmail: ${m.value.trim()}` + (f.querySelector('#wPhone').value.trim() ? `\nPhone: ${f.querySelector('#wPhone').value.trim()}` : '') + (f.querySelector('#wCo').value.trim() ? `\nCompany: ${f.querySelector('#wCo').value.trim()}` : '');
      f.hidden = true; const wd = document.getElementById('waitDone'); wd.innerHTML = '<p class="note" role="status">Adding you to the waitlist…</p>'; saveLead('waitlist', summary.split('\n').slice(1)).then(ok => { wd.innerHTML = ok ? `<div class="confirm" role="status"><b style="font-size:18px;color:var(--navy)">You're on the waitlist</b><p class="note">Thank you. We will contact you when the affiliate programme opens.</p></div>` : `<div class="confirm" role="status"><b style="font-size:18px;color:var(--navy)">You're almost on the list</b><p class="note">Copy these details and email them to <b>${CONTACT.email}</b>.</p><pre>${esc(summary)}</pre><button class="btn sm" data-copy="${esc(summary)}">Copy details</button></div>`; }); return;
    }
    handleForm(f);
  });
  document.addEventListener('input', e => {
    if (e.target.id === 'prodSearch') { S.prodQuery = e.target.value; const pos = e.target.selectionStart; document.getElementById('main').innerHTML = products(); setupMotion(); const i = document.getElementById('prodSearch'); i.focus(); try { i.setSelectionRange(pos, pos); } catch (x) {} }
    if (e.target.id === 'faqSearch') document.getElementById('faqList').innerHTML = faqGroups(e.target.value);
  });
  document.addEventListener('change', e => {
    if (e.target.id === 'sortSel') { const c = D.byId[location.hash.slice(3)]; if (!c) return; const ms = c.models.slice(); if (e.target.value === 'az') ms.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true })); document.getElementById('modelGrid').innerHTML = ms.map(pcard).join(''); }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { document.querySelector('.drawer')?.remove(); document.querySelector('.lightbox')?.remove(); closeMega(); }
    const h = document.getElementById('hero'); if (h && h.contains(document.activeElement) && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) { goSlide(S.hero + (e.key === 'ArrowRight' ? 1 : -1)); startHero(); }
  });
  const prog = document.getElementById('prog');
  let ticking = false;
  window.addEventListener('scroll', () => { if (ticking) return; ticking = true; requestAnimationFrame(() => { ticking = false; const h = document.documentElement.scrollHeight - innerHeight; if (prog) prog.style.transform = `scaleX(${h > 0 ? Math.min(1, scrollY / h) : 0})`; parallax(); }); }, { passive: true });
  document.addEventListener('pointermove', e => {
    const b = e.target.closest && e.target.closest('.bx, .lc'); if (b) { const r = b.getBoundingClientRect(); b.style.setProperty('--mx', (e.clientX - r.left) + 'px'); b.style.setProperty('--my', (e.clientY - r.top) + 'px'); }
    const pm = e.target.closest && e.target.closest('.pd-media');
    document.querySelectorAll('.pd-media').forEach(x => { if (x !== pm) x.style.transform = ''; });
    if (pm && e.pointerType === 'mouse' && !matchMedia('(prefers-reduced-motion: reduce)').matches) { const r = pm.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; pm.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`; }
  }, { passive: true });
  window.addEventListener('hashchange', () => { S.pdTab = 'overview'; render(); });

  /* ---------- intro: logo loads, products fly in and settle around it ---------- */
  function intro() {
    const old = document.querySelector('.intro'); if (old) old.remove();
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = ['hyb-s08', 'lith-s08', 'solar-s02', 'sun-s02', 'fan-s06', 'bulb-s01', 'lf-s10', 'mppt-s06'];
    const n = items.length;
    const el = document.createElement('div'); el.className = 'intro'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', 'Welcome to Cloud Energy');
    const word = 'Cloud Energy'.split('').map((c, i) => `<i style="--i:${i}">${c === ' ' ? '&nbsp;' : c}</i>`).join('');
    el.innerHTML = `<div class="intro-aurora"></div><div class="intro-lines"></div>
      <div class="intro-stage"><div class="intro-orbit">${items.map((k, i) => {
        const ang = (i / n) * Math.PI * 2 - Math.PI / 2;
        return `<span class="intro-item" style="--ex:${Math.cos(ang).toFixed(3)};--ey:${Math.sin(ang).toFixed(3)};--sx:${(Math.cos(ang) * 2.2).toFixed(2)};--sy:${(Math.sin(ang) * 2.2).toFixed(2)};--d:${(0.35 + i * 0.07).toFixed(2)}s"><img src="img/cut/${k}.webp" alt=""></span>`;
      }).join('')}</div>
        <div class="intro-core"><svg class="intro-arc" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="48"/></svg><img class="intro-logo" src="img/logo.png" alt="Cloud Energy"></div></div>
      <div class="intro-copy"><span>Welcome to the home of</span><b>${word}</b><em>energy for a better life</em></div>
      <button class="intro-skip" type="button">Skip</button>`;
    document.body.appendChild(el); document.documentElement.classList.add('intro-on');
    let done = false;
    const close = () => { if (done) return; done = true; el.classList.add('out'); document.documentElement.classList.remove('intro-on'); setTimeout(() => el.remove(), 1000); };
    el.querySelector('.intro-skip').addEventListener('click', close);
    el.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    el.querySelector('.intro-skip').focus({ preventScroll: true });
    const imgs = [...el.querySelectorAll('img')];
    const ready = Promise.all(imgs.map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; })));
    Promise.race([ready, new Promise(r => setTimeout(r, 1500))]).then(() => {
      el.classList.add('go');
      setTimeout(close, reduce ? 1400 : 3900);
    });
  }

  app.innerHTML = header() + '<main id="main"></main>' + footer();
  // replay the intro whenever the logo or a Home link is clicked
  document.addEventListener('click', e => { const a = e.target.closest('a[href="#home"]'); if (a && !e.defaultPrevented && !a.closest('.intro')) setTimeout(intro, 0); }, true);
  intro();
  render();
})();
