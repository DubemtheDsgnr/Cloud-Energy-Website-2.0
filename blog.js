/* Cloud Energy blog articles. Each body item: ['h', heading] | ['p', text] | ['ul', [items]] | ['ol', [items]] | ['tip', text] | ['table', [head], [[row], ...]] | ['figure', img, caption] */
window.CE_BLOG = [
  {
    id: 'size-solar-system', cat: 'Guides', mins: 7, featured: true,
    img: 'img/prof/sunbox-install.webp',
    title: 'How to Size a Solar System for Your Home',
    dek: 'A step by step method for working out the inverter, battery and panels your home needs, with a worked example for a typical Lagos flat.',
    cta: ['Try the Load Calculator', 'home', 'calc'],
    body: [
      ['p', 'Most solar systems that disappoint their owners were sized by guesswork. The inverter trips when the fridge starts, the battery is flat by 2am, or the panels never fully recharge the battery. Sizing properly takes four steps, and you can do the first three yourself before you speak to an engineer.'],
      ['h', 'Step 1: List what you want to power'],
      ['p', 'Walk through your home and write down every appliance you want on solar, its power rating in watts (printed on the label or in the manual) and how many hours a day it runs. Be honest about what runs at the same time, because that sets the inverter size.'],
      ['table', ['Appliance', 'Quantity', 'Watts each', 'Hours per day', 'Energy per day'],
        [['LED bulbs', '6', '10W', '6', '360Wh'], ['Ceiling fans', '2', '60W', '10', '1,200Wh'], ['Television and decoder', '1', '120W', '5', '600Wh'], ['Refrigerator', '1', '150W', '10 (compressor run time)', '1,500Wh'], ['Wi-Fi router', '1', '15W', '24', '360Wh'], ['Laptop charging', '2', '65W', '4', '520Wh'], ['Total', '', '', '', '4,540Wh']]],
      ['p', 'In this example the household uses about 4.5kWh a day, and the largest load running at one time is roughly 700W when everything is on together.'],
      ['h', 'Step 2: Choose the inverter'],
      ['p', 'The inverter must carry everything that runs at once, with headroom. Add about 25% to your simultaneous load, and allow for surge: motors in fridges, freezers, pumps and air conditioners draw two to three times their running power for a moment when they start.'],
      ['ul', ['Simultaneous load of 700W plus 25% headroom gives about 875W.', 'The fridge compressor can surge to around 450W on start up.', 'A 2kVA inverter covers this comfortably. A 1kVA unit would trip whenever the fridge starts while other loads are on.']],
      ['tip', 'If you plan to add a freezer, pumping machine or air conditioner later, size the inverter for that now. Replacing an inverter costs more than buying the right one first.'],
      ['h', 'Step 3: Size the battery'],
      ['p', 'Work out how much energy you need from the battery when there is no sun and no grid, usually overnight. In the example, about 3kWh of the daily 4.5kWh is used between 6pm and 7am.'],
      ['p', 'Lithium iron phosphate (LiFePO4) batteries can safely deliver 80 to 90% of their rated capacity, so a 3kWh night needs at least 3.5 to 4kWh of battery. A 25.6V 200Ah Cloud Energy lithium battery stores 5.12kWh, which covers the night with a margin for cloudy days and battery ageing.'],
      ['h', 'Step 4: Size the solar panels'],
      ['p', 'Your panels must replace the energy you use each day, plus losses in wiring, charging and heat. Lagos receives roughly 4 to 5 peak sun hours a day on average, fewer during the rainy season and harmattan.'],
      ['ol', ['Daily energy: 4.5kWh.', 'Divide by peak sun hours: 4.5kWh ÷ 4.5h = 1kW of panels in perfect conditions.', 'Allow about 25% for losses: 1kW ÷ 0.8 = 1.25kW.', 'Round up to whole panels: three 590W bifacial panels give 1.77kW, which also recharges the battery on duller days.']],
      ['p', 'Finally, match a charge controller to the array. Many hybrid inverters include an MPPT controller. For separate inverters, an MPPT controller of 60A to 100A is typical for home systems.'],
      ['h', 'Why an energy audit still matters'],
      ['p', 'The method above gets you close. A site audit checks what a spreadsheet cannot: roof orientation and shading, cable runs, the condition of your wiring, and loads you forgot to list. Cloud Energy engineers carry out audits before every installation so the system is sized to how you actually use power.']
    ]
  },
  {
    id: 'lithium-vs-lead-carbon', cat: 'Guides', mins: 6,
    img: 'img/prof/minigrid-bess.webp',
    title: 'Lithium or Lead Carbon: Choosing the Right Solar Battery',
    dek: 'Both chemistries store solar energy well. The right choice depends on how deeply you cycle the battery, how much space you have and your budget.',
    cta: ['Shop Lithium Batteries', 'c-lithium-batteries'],
    body: [
      ['p', 'The battery is usually the most expensive part of a solar system and the part most likely to need replacing. Cloud Energy supplies both lithium iron phosphate (LiFePO4) batteries and OPzV lead carbon batteries, and each suits different jobs.'],
      ['h', 'Lithium iron phosphate (LiFePO4)'],
      ['p', 'LiFePO4 is the most common lithium chemistry for home and business storage because it is thermally stable and long lived. Each battery has a built-in battery management system (BMS) that protects the cells from overcharge, deep discharge and overheating.'],
      ['ul', ['Usable capacity of 80 to 90% of the rating, so less battery is needed for the same night.', 'Several thousand charge cycles, typically many years of daily use.', 'Light and compact enough to wall mount or stack.', 'No topping up or equalising, and no fumes.', 'Higher upfront cost per kWh than lead carbon.']],
      ['p', 'Cloud Energy lithium batteries run from 12.8V 75Ah (960Wh) for small systems up to 51.2V 314Ah (16.07kWh) in a single unit, and several models connect in parallel to grow with your needs.'],
      ['h', 'Lead carbon (OPzV)'],
      ['p', 'Lead carbon batteries add carbon to the negative plate of a sealed lead acid design. This makes them far more tolerant of sitting partly charged, which is the normal state for solar batteries, than ordinary lead acid. Cloud Energy sources OPzV lead carbon cells from its technical partner Sacred Sun.'],
      ['ul', ['Lower upfront cost per kWh.', 'Proven in large stationary banks such as mini grids, where 2V cells are wired in long strings.', 'Best kept to about 50 to 70% depth of discharge for long life, so you need more rated capacity.', 'Heavier and larger than lithium for the same usable energy.']],
      ['table', ['', 'LiFePO4 lithium', 'Lead carbon (OPzV)'], [['Usable depth of discharge', '80 to 90%', '50 to 70%'], ['Maintenance', 'None', 'None (sealed)'], ['Weight for the same usable energy', 'Lower', 'Higher'], ['Upfront cost', 'Higher', 'Lower'], ['Typical use', 'Homes, offices, shops', 'Mini grids, large stationary banks']]],
      ['h', 'Which should you choose?'],
      ['p', 'For most homes and small businesses that cycle the battery every night, lithium costs less over its life because it lasts longer and delivers more of its rated capacity. Lead carbon makes sense for large banks where space is not tight and upfront budget matters most, as in the 216 cell bank at the Viu Kutha mini grid in Borno State.'],
      ['tip', 'Whichever you choose, keep batteries in a shaded, ventilated space. Heat shortens the life of every battery chemistry.']
    ]
  },
  {
    id: 'hybrid-vs-low-frequency-inverters', cat: 'Products', mins: 5,
    img: 'img/prof/borno-inverter.webp',
    title: 'Hybrid or Low Frequency Inverter: Which Fits Your Home?',
    dek: 'Two inverter designs, two sets of strengths. How to choose between built-in solar charging and heavy duty surge capacity.',
    cta: ['Compare Inverters', 'c-hybrid-inverters'],
    body: [
      ['p', 'Cloud Energy sells two families of inverter. Both turn battery power into the 230V AC your appliances use, but they are built differently and suit different homes.'],
      ['h', 'Low frequency inverters'],
      ['p', 'Low frequency inverters use a large copper transformer. That makes them heavy, but it gives them a strong surge capacity for starting motors, pumps and compressors, and a reputation for durability on unstable grid supply.'],
      ['ul', ['Cloud Energy range: 1.5kVA to 15kVA, for 12V, 24V, 48V and 96V battery banks.', 'Strong surge handling for fridges, freezers, pumping machines and power tools.', 'Usually paired with a separate MPPT charge controller for solar.']],
      ['h', 'Hybrid inverters'],
      ['p', 'Hybrid inverters are high frequency designs with a built-in MPPT solar charger. They are lighter, more efficient at light loads and easier to install, because the inverter, charger and solar controller come in one box.'],
      ['ul', ['Cloud Energy range: 3.6kW to 12kW, with a wide 90 to 280V AC input that rides through unstable grid supply.', 'Built-in MPPT charging, with up to 9,000W of solar input on larger models.', 'Larger models run up to six units in parallel for business loads.', 'App monitoring on supported models.']],
      ['h', 'The best of both'],
      ['p', 'The 6.3kVA 48V low frequency hybrid pairs a transformer based inverter with a built-in 120A MPPT charger. It suits homes that need strong surge capacity and want solar charging in one unit.'],
      ['table', ['If you…', 'Consider'], [['Run pumps, freezers or workshop tools', 'Low frequency, or the 6.3kVA low frequency hybrid'], ['Want the simplest solar install with app monitoring', 'Hybrid'], ['Need to expand to a business load later', 'Hybrid with parallel support'], ['Already own a charge controller', 'Low frequency']]],
      ['tip', 'Match the inverter voltage to your battery bank. A 48V inverter needs a 48V battery bank, such as a 51.2V lithium battery.']
    ]
  },
  {
    id: 'how-cloud-pay-works', cat: 'Financing', mins: 4,
    img: 'img/prof/ssbu-shop.webp',
    title: 'How Cloud Pay Works: Go Solar Now, Pay in Instalments',
    dek: 'What you need to apply, how long you can pay and how bank financing through our partner banks compares.',
    cta: ['See Financing Options', 'financing'],
    body: [
      ['p', 'Cloud Pay is Cloud Energy’s instalment plan under the Solar Easy Payment Programme (SEPP). It lets you install a solar system now and spread the cost instead of paying in full upfront.'],
      ['h', 'What Cloud Pay covers'],
      ['ul', ['Systems from 1kVA to 6.5kVA.', 'Repayment over 3 to 18 months after a fixed initial deposit.', 'Every system is sized by an energy audit first, so you pay for what you need.']],
      ['h', 'What you need to apply'],
      ['ol', ['Register a Cloud Pay account.', 'Sign the programme agreement.', 'Pay the initial deposit for your selected system.', 'Provide your National Identification Number (NIN).', 'Provide proof of address.', 'Provide your Bank Verification Number (BVN).', 'Name two guarantors, each with a NIN and an accepted ID.']],
      ['h', 'Bank financing'],
      ['p', 'If you prefer to finance through a bank, Cloud Energy works with Stanbic IBTC, Access Bank and FCMB. Each bank sets its own eligibility rules, rates and tenors, and the bank pays Cloud Energy directly once your loan is approved.'],
      ['table', ['', 'Cloud Pay', 'Bank financing'], [['Who lends', 'Cloud Energy', 'Stanbic IBTC, Access Bank or FCMB'], ['System sizes', '1kVA to 6.5kVA', 'Set by the bank'], ['Repayment period', '3 to 18 months', 'Set by the bank'], ['Requirements', 'NIN, BVN, proof of address, two guarantors', 'The bank’s own checks']]],
      ['h', 'Next step'],
      ['p', 'Book an energy audit. Our engineers size the system, and you receive a quote showing the deposit and instalments before you commit.'],
      ['tip', 'Approval is not automatic. Having your NIN, BVN and guarantor details ready speeds up the process.']
    ]
  },
  {
    id: 'viu-kutha-mini-grid', cat: 'Projects', mins: 5,
    img: 'img/prof/borno-site.webp',
    title: 'Inside the Viu Kutha Solar Mini Grid, Borno State',
    dek: 'A 100KVA solar hybrid mini grid designed to bring reliable power to more than 600 homes, and what it shows about rural electrification.',
    cta: ['See Our Projects', 'projects'],
    body: [
      ['p', 'Millions of Nigerians live in communities the national grid does not reach. Extending power lines to remote villages is slow and expensive. Solar mini grids generate and store power locally and distribute it through a small community network.'],
      ['h', 'The system'],
      ['table', ['Component', 'Specification'], [['System size', '100KVA solar hybrid mini grid'], ['Inverter', '100KW hybrid inverter'], ['Solar array', '300W solar panels'], ['Storage', '216 × 2V 500Ah batteries'], ['Homes to be electrified', '600+']]],
      ['figure', 'img/prof/borno-inverter.webp', 'The inverter cabinet at the Viu Kutha site, Borno State.'],
      ['h', 'Why storage matters'],
      ['p', 'Solar panels only produce power in daylight, but homes need light, phone charging and refrigeration after dark. The battery bank stores daytime solar energy for evening and night use, which is when a rural household uses most of its power.'],
      ['h', 'Part of a longer track record'],
      ['ul', ['In 2017 Cloud Energy delivered three rural electrification projects in three states: one mini grid and two solar home system projects, together powering more than 3,000 homes.', 'In 2023 Cloud Energy built its second mini grid and was nominated by the Universal Energy Facility.', 'The Item Amagu mini grid in Ebonyi State uses solar with battery energy storage to serve the community.']],
      ['figure', 'img/prof/minigrid-amagu.webp', 'Solar array at the Item Amagu mini grid, Ebonyi State.'],
      ['h', 'What communities gain'],
      ['p', 'Reliable power lets clinics refrigerate vaccines, children study after dark and small businesses run grinding machines, freezers and phone charging kiosks without buying fuel for generators.']
    ]
  },
  {
    id: 'cloud-ride-electric-mobility', cat: 'Electric mobility', mins: 5,
    img: 'img/ev/ride-sedan.webp',
    title: 'Cloud Ride: Electric Cars, Bikes and Keke From Cloud Energy',
    dek: 'Cloud Energy’s electric vehicle range, from city cars to delivery motorcycles, with the chargers and swap stations to keep them moving.',
    cta: ['Explore Cloud Ride', 'cloud-ride'],
    body: [
      ['p', 'Since the removal of the petrol subsidy in 2023, fuel has become one of the largest running costs for Nigerian drivers, riders and transport operators. Electric vehicles replace that cost with electricity, which can come from the grid or from the sun.'],
      ['h', 'The range'],
      ['table', ['Model', 'Type', 'Key figures'], [['Cloud Energy X60', 'Sedan', '360km range, 28.8kWh battery, 1 to 2h fast charge'], ['Cloud Energy X80', 'SUV', '500km range, 28.8kWh battery, 1 to 2h fast charge'], ['Merkur Box', 'Compact', '320km range, 31.45kWh battery, 101km/h top speed'], ['CEVD 3.7 and CEVP 3.7', 'Motorcycle', '72V 3000W motor, 70km/h top speed'], ['CeV 2.6', 'Scooter', '72V 2000W motor, 60km/h top speed'], ['Electric Keke', 'Tricycle', '80 to 125km range, 60V battery, 6 to 8h charge']]],
      ['h', 'Charging and battery swap'],
      ['p', 'Vehicles need somewhere to charge. Cloud Ride includes DC fast chargers rated at 60kW and 120kW for fleets and car parks, and a nine compartment battery swap cabinet where riders exchange a flat battery for a charged one instead of waiting for a recharge.'],
      ['h', 'Charging from the sun'],
      ['p', 'Because Cloud Energy also supplies solar panels, inverters and lithium storage, an electric vehicle can be charged from a home or business solar system. For fleets, a solar powered swap station keeps riders on the road without relying on the grid.'],
      ['figure', 'img/ev/ride-hatch.webp', 'Cloud Ride electric cars at the Cloud Energy yard in Lagos.'],
      ['h', 'Who it is for'],
      ['ul', ['Families and professionals who want lower daily running costs.', 'Ride hailing drivers and keke operators paying for fuel every day.', 'Dispatch and delivery companies running motorcycle fleets.', 'Estates, filling stations and car parks that want to host charging.']]
    ]
  },
  {
    id: 'solar-maintenance-checklist', cat: 'Guides', mins: 4,
    img: 'img/prof/standalone-install.webp',
    title: 'A Simple Maintenance Checklist for Your Solar System',
    dek: 'Ten minutes a month keeps a solar system performing. What to check yourself and when to call an engineer.',
    cta: ['Request Maintenance', 'quote', 'Maintenance'],
    body: [
      ['p', 'Solar systems have few moving parts, but they are not maintenance free. Dust, heat and loose connections quietly reduce output until the battery no longer lasts the night.'],
      ['h', 'Monthly checks you can do yourself'],
      ['ul', ['Look at the panels. Dust, bird droppings and leaves reduce output. Rinse with clean water and a soft brush early in the morning, never with soap or a pressure washer.', 'Check the inverter display or app for warning codes and note them down.', 'Make sure the battery area is shaded, dry and ventilated.', 'Look for loose, chewed or burnt cables, and keep the area clear of clutter.', 'Watch your loads. A new appliance can push the system beyond its design.']],
      ['h', 'Seasonal care'],
      ['p', 'During harmattan, fine dust settles on panels quickly, so clean them more often. In the rainy season, check that cable entry points and the inverter area stay dry.'],
      ['h', 'When to call an engineer'],
      ['ul', ['The battery no longer lasts as long as it used to.', 'The inverter beeps, trips or shows repeated faults.', 'You smell burning or see scorched cables. Switch off and call immediately.', 'You want to add panels, batteries or heavy appliances.']],
      ['tip', 'For faster support, have your product model and serial number, system capacity, installation date and a short description of the fault ready when you call.'],
      ['p', 'Cloud Energy offers scheduled maintenance plans and 24/7 after-sales support, and warranty documents for every product are available on its product pages.']
    ]
  },
  {
    id: 'most-trusted-solar-company-2026', cat: 'News', mins: 3,
    img: 'img/awards/team.webp',
    title: 'Cloud Energy Named Most Trusted Solar Energy Company of the Year',
    dek: 'Two awards in 2026 recognise Cloud Energy’s customer care and the engineering leadership of its founder.',
    cta: ['View Awards', 'awards'],
    body: [
      ['p', 'Cloud Energy received two industry awards in 2026.'],
      ['h', 'The African Brand Awards'],
      ['p', 'Cloud Energy was named The Most Trusted Solar Energy Company of the Year in the Teamwork and Customer Care category for renewable energy. The Managing Director received the award on behalf of the company.'],
      ['figure', 'img/awards/receiving.webp', 'Receiving the award.'],
      ['h', 'Business Times C.E.O Excellence Awards'],
      ['p', 'Engr. Theophilus Chukwudi Nweke, Founder and Managing Director of Cloud Energy, was named The Solar Solution Engineering CEO of the Year 2026. He celebrated with the Executive Director (Strategy) and members of Team Cloud Energy.'],
      ['h', 'What it means for customers'],
      ['p', 'Both awards recognise the things customers rely on most: dependable products, engineers who stand behind every installation and support that continues after the sale. Since registering with the Corporate Affairs Commission in 2013, Cloud Energy has supplied and installed solar, storage and energy saving lighting for homes, schools, offices and industries across Nigeria.'],
      ['links', [['The award on LinkedIn', 'https://www.linkedin.com/posts/theophilus-nweke-468b8626_ceoexcellenceawards-cloudenergy-tcn-ugcPost-7512820842830073856-30Q-/'], ['African Brand Awards post', 'https://lnkd.in/p/dUHtZFUB']]]
    ]
  }
];
