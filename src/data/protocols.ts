/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * CSE276 Artificial Intelligence Foundations - First Aid Guardian
 * Verified Protocols Knowledge Base & Safety Specification
 */

export interface SourceCitation {
  authority: string;
  documentTitle: string;
  yearOrVersion: string;
  officialUrl: string;
  verificationStatus: 'VERIFIED_OFFICIAL' | 'PEER_REVIEWED';
}

export interface FirstAidProtocol {
  id: string;
  name: string;
  category: 'burns' | 'choking' | 'severe_bleeding' | 'fractures' | 'snake_bites' | 'heat_stroke';
  urgencyLevel: 'CRITICAL_CALL_EMERGENCY' | 'URGENT_FIRST_AID' | 'HIGH_PRIORITY';
  summary: string;
  emergencyCallThreshold: string[];
  immediateSteps: {
    stepNumber: number;
    title: string;
    action: string;
    warning?: string;
  }[];
  criticalContraindications: string[]; // "What NEVER to do"
  citations: SourceCitation[];
  keywords: string[];
}

export const VERIFIED_PROTOCOLS: Record<string, FirstAidProtocol> = {
  burns: {
    id: 'burns',
    name: 'Burns & Scalds Protocol',
    category: 'burns',
    urgencyLevel: 'CRITICAL_CALL_EMERGENCY',
    summary: 'Evidence-based initial cooling and barrier protection for thermal, scald, and chemical burns.',
    emergencyCallThreshold: [
      'Burn is larger than the palm of the victim’s hand (approx. 1-2% total body surface area)',
      'Burn affects face, neck, hands, feet, groin, or major joints',
      'Full-thickness (3rd degree) burns: skin looks leathery, waxy white, brown, or charred',
      'Chemical or electrical burns',
      'Inhalation injury (soot around nose/mouth, wheezing, coughing, hoarse voice)',
      'Patient is an infant, child under 5, or elderly adult'
    ],
    immediateSteps: [
      {
        stepNumber: 1,
        title: 'Ensure Safety & Stop the Burning',
        action: 'Safely remove the person from heat source. Extinguish flames (Stop, Drop, Roll) or disconnect electrical supply before approaching.',
      },
      {
        stepNumber: 2,
        title: 'Cool with Running Water for 20 Minutes',
        action: 'Immediately hold the burned area under cool or lukewarm running tap water for a minimum of 20 minutes (within 3 hours of injury).',
        warning: 'DO NOT use ice, iced water, or freezing substances, as this causes vasoconstriction, hypothermia, and tissue necrosis.'
      },
      {
        stepNumber: 3,
        title: 'Remove Restrictive Items Promptly',
        action: 'Gently take off rings, watches, tight clothing, and jewelry around the burned area before swelling develops. Do NOT pull away clothing adhered to burned tissue.',
      },
      {
        stepNumber: 4,
        title: 'Cover Loosely with Clean Barrier',
        action: 'Cover the cooled burn loosely with clear kitchen plastic cling wrap (applied in clean layers, not wrapped tightly around limbs) or a clean, non-fluffy sterile sheet.',
      },
      {
        stepNumber: 5,
        title: 'Keep the Person Warm',
        action: 'While cooling the burn, keep the rest of the patient warm with blankets to prevent systemic hypothermia, particularly in children.',
      }
    ],
    criticalContraindications: [
      'NEVER apply butter, cooking oils, toothpaste, grease, turmeric, or home ointments (traps heat and causes severe infection).',
      'NEVER apply ice directly or submerge in ice water (worsens tissue damage and induces hypothermia).',
      'NEVER burst or puncture burn blisters (blister roof is a sterile protective barrier against dangerous bacterial sepsis).',
      'NEVER pull away fabric or clothing that is melted or stuck firmly into the burn wound.'
    ],
    citations: [
      {
        authority: 'World Health Organization (WHO)',
        documentTitle: 'WHO Burns Factsheet & First Aid Management',
        yearOrVersion: 'Updated Guidelines',
        officialUrl: 'https://www.who.int/news-room/fact-sheets/detail/burns',
        verificationStatus: 'VERIFIED_OFFICIAL'
      },
      {
        authority: 'American Burn Association (ABA)',
        documentTitle: 'Initial Burn Resuscitation & Outpatient Burn Protocol',
        yearOrVersion: 'Clinical Practice Guidelines',
        officialUrl: 'https://ameriburn.org/quality-care/guidelines/',
        verificationStatus: 'VERIFIED_OFFICIAL'
      },
      {
        authority: 'British Red Cross / NHS',
        documentTitle: 'Clinical Guidance on First Aid for Burns and Scalds',
        yearOrVersion: 'NHS 111 Standard',
        officialUrl: 'https://www.nhs.uk/conditions/burns-and-scalds/treatment/',
        verificationStatus: 'VERIFIED_OFFICIAL'
      }
    ],
    keywords: ['burn', 'scald', 'hot water', 'fire', 'blister', 'steam', 'hot oil', 'flame', 'chemical burn', 'sunburn']
  },

  choking: {
    id: 'choking',
    name: 'Choking Protocol (Foreign Body Airway Obstruction)',
    category: 'choking',
    urgencyLevel: 'CRITICAL_CALL_EMERGENCY',
    summary: 'Immediate physical relief of severe upper airway blockage for responsive and unresponsive adults/children.',
    emergencyCallThreshold: [
      'Victim cannot speak, cry, breathe, or cough effectively',
      'Universal choking sign (hands clutching the throat) with cyanosis (blue lips/face)',
      'Victim makes high-pitched wheezing noises or silent attempts to inhale',
      'Victim becomes unresponsive or loses consciousness'
    ],
    immediateSteps: [
      {
        stepNumber: 1,
        title: 'Assess Airway Obstruction Severity',
        action: 'Ask "Are you choking?". If the victim can cough forcefully or speak, encourage them to KEEP COUGHING. Do NOT hit their back while they are coughing effectively.',
      },
      {
        stepNumber: 2,
        title: 'Deliver 5 Sharp Back Blows (If Severe/Silent)',
        action: 'Stand slightly behind and to one side. Support their chest with one hand and lean them forward so the object can exit the mouth. Deliver 5 firm, distinct blows between shoulder blades using the heel of your other hand.',
      },
      {
        stepNumber: 3,
        title: 'Deliver 5 Abdominal Thrusts (Heimlich Maneuver)',
        action: 'Stand behind the victim, wrap arms around waist. Place a clenched fist thumb-side in just above their navel (well below ribs). Grasp the fist with your other hand and pull sharply inward and upward 5 times.',
        warning: 'For pregnant individuals or very obese persons, perform chest thrusts at the center of the breastbone instead of abdominal thrusts.'
      },
      {
        stepNumber: 4,
        title: 'Cycle 5 Back Blows & 5 Thrusts',
        action: 'Alternate continuously between 5 back blows and 5 thrusts until the object is expelled or the person becomes unresponsive.',
      },
      {
        stepNumber: 5,
        title: 'If Victim Collapses / Unresponsive: Start CPR',
        action: 'Lower them safely to the floor. Call emergency services immediately (911 / 112). Begin CPR with 30 chest compressions. Look inside mouth before rescue breaths; sweep ONLY if you clearly see an expelled loose object.',
      }
    ],
    criticalContraindications: [
      'NEVER perform blind finger sweeps in the mouth (blind sweeps push foreign bodies deeper into the larynx, converting partial to complete asphyxiation).',
      'NEVER deliver abdominal thrusts to an infant under 1 year old (risk of liver/splenic rupture; use 5 back slaps and 5 two-finger chest thrusts instead).',
      'NEVER give liquids or food to a choking victim to "wash down" an obstruction.',
      'NEVER interfere if the person is coughing vigorously and able to speak.'
    ],
    citations: [
      {
        authority: 'American Heart Association (AHA)',
        documentTitle: 'Guidelines for Cardiopulmonary Resuscitation (CPR) and Emergency Cardiovascular Care (ECC)',
        yearOrVersion: 'AHA CPR Guidelines Update',
        officialUrl: 'https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines',
        verificationStatus: 'VERIFIED_OFFICIAL'
      },
      {
        authority: 'International Liaison Committee on Resuscitation (ILCOR)',
        documentTitle: 'Consensus on Science and Treatment Recommendations for Foreign Body Airway Obstruction',
        yearOrVersion: 'ILCOR Resuscitation Consensus',
        officialUrl: 'https://www.ilcor.org/guidelines',
        verificationStatus: 'VERIFIED_OFFICIAL'
      },
      {
        authority: 'Resuscitation Council UK / Red Cross',
        documentTitle: 'Adult and Paediatric Choking Algorithm',
        yearOrVersion: 'RCUK Guidelines',
        officialUrl: 'https://www.resus.org.uk/library/2021-resuscitation-guidelines',
        verificationStatus: 'VERIFIED_OFFICIAL'
      }
    ],
    keywords: ['choking', 'heimlich', 'cannot breathe', 'food stuck', 'throat blocked', 'clutching throat', 'airway obstruction', 'back blows']
  },

  severe_bleeding: {
    id: 'severe_bleeding',
    name: 'Severe Bleeding & Hemorrhage Control',
    category: 'severe_bleeding',
    urgencyLevel: 'CRITICAL_CALL_EMERGENCY',
    summary: 'Stop catastrophic external hemorrhage through direct pressure, wound packing, and tourniquet protocols.',
    emergencyCallThreshold: [
      'Blood is spurting, pulsating, or pumping rapidly from the wound (arterial bleeding)',
      'Continuous pooling or bleeding that does not stop after 5-10 minutes of direct pressure',
      'Bleeding accompanied by signs of hypovolemic shock (pale/clammy skin, confusion, rapid shallow breathing, dizziness)',
      'Deep penetrating wound to the chest, neck, abdomen, or groin',
      'Traumatic amputation or exposed muscle/bone'
    ],
    immediateSteps: [
      {
        stepNumber: 1,
        title: 'Call Emergency Services Immediately & Ensure Scene Safety',
        action: 'Dial emergency numbers (911 / 112 / 108). Put on disposable medical gloves or use a clean impermeable barrier if available to avoid bloodborne pathogens.',
      },
      {
        stepNumber: 2,
        title: 'Apply Direct, Firm, Unrelenting Pressure',
        action: 'Place a sterile trauma pad, clean gauze, or clean cloth directly over the bleeding point. Press down hard with both hands using your upper body weight directly onto the wound.',
        warning: 'DO NOT lift the dressing to peek or check if bleeding stopped. Peeking tears away delicate fibrin clot formation.'
      },
      {
        stepNumber: 3,
        title: 'Reinforce Without Removing Original Dressing',
        action: 'If blood seeps through the initial cloth, DO NOT remove it. Layer fresh dressings or bandages directly over the existing cloth and continue applying firm direct pressure.',
      },
      {
        stepNumber: 4,
        title: 'Apply Tourniquet for Catastrophic Limb Hemorrhage',
        action: 'If life-threatening bleeding on an arm or leg continues despite firm pressure, apply an approved commercial tourniquet (e.g. CAT) 2 to 3 inches above the wound (between wound and heart). Never place over a joint. Tighten windlass until bleeding stops completely, lock windlass, and write down the exact TIME of application.',
      },
      {
        stepNumber: 5,
        title: 'Position and Treat for Hypovolemic Shock',
        action: 'Have the person lie flat on their back. Elevate legs slightly (12 inches) only if there are no spinal or pelvic fractures. Cover them with a jacket or blanket to preserve core body temperature.',
      }
    ],
    criticalContraindications: [
      'NEVER remove the initial blood-soaked cloth or bandage (rips off forming platelet plugs).',
      'NEVER remove or pull out an impaled object (knife, glass, rebar) embedded in the body (the object acts as a mechanical plug; stabilize it in place with bulky dressings).',
      'NEVER loosen or remove a tourniquet once applied except by specialized surgical personnel in a trauma center.',
      'NEVER give oral fluids, food, or alcoholic beverages to a hemorrhaging victim (increases vomiting, aspiration risk, and complicates immediate emergency surgery).'
    ],
    citations: [
      {
        authority: 'American College of Surgeons Committee on Trauma (ACS COT)',
        documentTitle: 'Stop the Bleed®: Evidence-Based Bleeding Control Protocol',
        yearOrVersion: 'Bleeding Control (BCon) Standard',
        officialUrl: 'https://www.stopthebleed.org/',
        verificationStatus: 'VERIFIED_OFFICIAL'
      },
      {
        authority: 'American Red Cross / AHA',
        documentTitle: 'First Aid Guidelines for Life-Threatening External Bleeding',
        yearOrVersion: 'Circulation & Trauma Guidelines',
        officialUrl: 'https://www.redcross.org/take-a-class/first-aid',
        verificationStatus: 'VERIFIED_OFFICIAL'
      },
      {
        authority: 'World Health Organization (WHO)',
        documentTitle: 'Emergency Trauma Care & Management of Severe External Hemorrhage',
        yearOrVersion: 'WHO Trauma Guidelines',
        officialUrl: 'https://www.who.int/publications/i/item/9789241516044',
        verificationStatus: 'VERIFIED_OFFICIAL'
      }
    ],
    keywords: ['bleeding', 'blood', 'hemorrhage', 'cut', 'artery', 'gash', 'wound', 'spurting blood', 'tourniquet', 'stab wound']
  },

  fractures: {
    id: 'fractures',
    name: 'Fractures & Musculoskeletal Trauma Protocol',
    category: 'fractures',
    urgencyLevel: 'HIGH_PRIORITY',
    summary: 'Safe stabilization and immobilization of suspected bone fractures and joint dislocations without manipulation.',
    emergencyCallThreshold: [
      'Open (compound) fracture where bone is piercing through the skin or visible in wound',
      'Suspected spinal, neck, head, pelvic, or femur (thigh bone) injury',
      'Limb or extremity below the injury is blue, pale, cold to touch, or pulseless',
      'Numbness, tingling, or inability to move fingers or toes (neurovascular compromise)',
      'Severe deformity or bone visibly angled unnaturally',
      'Victim shows signs of shock'
    ],
    immediateSteps: [
      {
        stepNumber: 1,
        title: 'Support and Keep the Limb Completely Still',
        action: 'Instruct the victim not to move. Support the injured limb manually in the EXACT position found using your hands or soft padding (rolled jackets, pillows).',
        warning: 'DO NOT try to push the bone back in, straighten, or realign an angled deformity.'
      },
      {
        stepNumber: 2,
        title: 'Manage Open Wounds (Compound Fractures)',
        action: 'If bone pierces the skin, do NOT push it back. Cover the wound with a clean sterile dressing. Apply gentle pressure around the perimeter of the bone to control hemorrhage without pressing on the bone fragment.',
      },
      {
        stepNumber: 3,
        title: 'Immobilize Above and Below the Fracture',
        action: 'If medical transport is delayed or patient must be moved, splint the injured bone by securing it to a rigid support (or the adjacent uninjured anatomical body part) immobilizing the joint ABOVE and the joint BELOW the fracture.',
      },
      {
        stepNumber: 4,
        title: 'Apply Cold Pack to Reduce Swelling',
        action: 'Place an ice pack wrapped in a cloth or towel (never directly on bare skin) over the swollen area for 15-20 minutes at a time to reduce swelling and pain.',
      },
      {
        stepNumber: 5,
        title: 'Assess Distal Circulation & Sensation (CSM Check)',
        action: 'Check Circulation, Sensation, and Movement (CSM): Feel for distal warmth, check if fingertips/toes have sensation, and check capillary refill by pressing nail bed.',
      }
    ],
    criticalContraindications: [
      'NEVER attempt to reset, pop back in, or manipulate fractured bones or dislocated joints.',
      'NEVER push a protruding bone back underneath the skin (introduces severe osteomyelitis and bacterial infection).',
      'NEVER allow the victim to bear weight, walk, or test an injured leg, ankle, or hip.',
      'NEVER apply ice directly onto bare tissue without an insulating cloth layer (causes cryo-frostbite).'
    ],
    citations: [
      {
        authority: 'American Academy of Orthopaedic Surgeons (AAOS)',
        documentTitle: 'Emergency First Aid for Fractures and Dislocations',
        yearOrVersion: 'OrthoInfo Clinical Guidance',
        officialUrl: 'https://orthoinfo.aaos.org/',
        verificationStatus: 'VERIFIED_OFFICIAL'
      },
      {
        authority: 'St. John Ambulance',
        documentTitle: 'First Aid Guidance for Fractures, Sprains, and Strains',
        yearOrVersion: 'Accredited Clinical Protocols',
        officialUrl: 'https://www.sja.org.uk/get-advice/first-aid-advice/bones-and-joints/fractures/',
        verificationStatus: 'VERIFIED_OFFICIAL'
      },
      {
        authority: 'NHS (National Health Service, UK)',
        documentTitle: 'Broken Bone (Fracture) Emergency Guidelines',
        yearOrVersion: 'NHS Health A-Z',
        officialUrl: 'https://www.nhs.uk/conditions/broken-bone/',
        verificationStatus: 'VERIFIED_OFFICIAL'
      }
    ],
    keywords: ['fracture', 'broken bone', 'bone sticking out', 'dislocation', 'broken arm', 'broken leg', 'sprain', 'deformity', 'bone snap']
  },

  snake_bites: {
    id: 'snake_bites',
    name: 'Snakebite Emergency Management Protocol',
    category: 'snake_bites',
    urgencyLevel: 'CRITICAL_CALL_EMERGENCY',
    summary: 'Evidence-based pre-hospital stabilization for venomous snake envenomation focusing on absolute limb immobilization.',
    emergencyCallThreshold: [
      'ALL suspected venomous snakebites are medical emergencies requiring immediate emergency transport and hospital antivenom evaluation',
      'Rapid progressive swelling, bruising, severe localized burning pain, or skin darkening',
      'Systemic signs: difficulty breathing, eyelid drooping (ptosis), slurred speech, muscle weakness, metallic taste, nausea, or bleeding gums'
    ],
    immediateSteps: [
      {
        stepNumber: 1,
        title: 'Step Back Safely & Calm the Patient',
        action: 'Move the person safely away from the snake’s striking range. Do NOT attempt to capture, chase, or kill the snake. Have the victim lie down and remain completely calm and still. Movement accelerates systemic venom absorption.',
      },
      {
        stepNumber: 2,
        title: 'Call Emergency Services Immediately',
        action: 'Contact emergency medical dispatch (911 / 112 / 108 / local ambulance) immediately for priority transport to a facility equipped with polyvalent antivenom.',
      },
      {
        stepNumber: 3,
        title: 'Remove Jewelry, Rings, and Constrictive Items',
        action: 'Immediately take off rings, bracelets, watches, tight sleeves, and shoes from the affected limb before venom-induced swelling progresses.',
      },
      {
        stepNumber: 4,
        title: 'Immobilize the Bitten Limb at or Below Heart Level',
        action: 'Splint the limb loosely with a padded board or rolled blanket to keep it stationary. Keep the bite site positioned at or slightly below heart level to decelerate venous return.',
      },
      {
        stepNumber: 5,
        title: 'Document Details from a Safe Distance',
        action: 'Note the exact time of the bite. Use a pen to trace the border of redness/swelling and write the time next to it every 15 minutes. Note snake color and patterns only if seen safely.',
      }
    ],
    criticalContraindications: [
      'NEVER cut, incise, or slash the bite wound with razors or knives (causes severe hemorrhage and tendon damage without removing venom).',
      'NEVER attempt to suck out venom by mouth or mechanical suction extractors (scientific trials show suction removes <0.04% of venom and introduces oral bacteria).',
      'NEVER apply an arterial tourniquet or tight ligature (concentrates local necrosis and leads to amputation).',
      'NEVER apply ice packs, cold therapy, or electric shock therapy (hastens tissue death and gangrene).',
      'NEVER administer alcohol, caffeine, pain medications, or herbal pastes.'
    ],
    citations: [
      {
        authority: 'World Health Organization (WHO)',
        documentTitle: 'Guidelines for the Management of Snakebites (2nd Edition, SEARO & AFRO Regional Protocols)',
        yearOrVersion: 'WHO Snakebite Envenoming Strategy',
        officialUrl: 'https://www.who.int/teams/control-of-neglected-tropical-diseases/snakebite-envenoming',
        verificationStatus: 'VERIFIED_OFFICIAL'
      },
      {
        authority: 'Centers for Disease Control and Prevention (CDC / NIOSH)',
        documentTitle: 'Venomous Snakes - First Aid for Snake Bites',
        yearOrVersion: 'NIOSH Workplace Safety & Health Guidelines',
        officialUrl: 'https://www.cdc.gov/niosh/topics/snakes/default.html',
        verificationStatus: 'VERIFIED_OFFICIAL'
      },
      {
        authority: 'American College of Emergency Physicians (ACEP)',
        documentTitle: 'Management of Pit Viper and Coral Snake Envenomation',
        yearOrVersion: 'Annals of Emergency Medicine Consensus',
        officialUrl: 'https://www.acep.org/',
        verificationStatus: 'VERIFIED_OFFICIAL'
      }
    ],
    keywords: ['snake', 'snakebite', 'viper', 'cobra', 'fang marks', 'venom', 'rattlesnake', 'bitten by snake']
  },

  heat_stroke: {
    id: 'heat_stroke',
    name: 'Heat Stroke Emergency Cooling Protocol',
    category: 'heat_stroke',
    urgencyLevel: 'CRITICAL_CALL_EMERGENCY',
    summary: 'Aggressive rapid core cooling protocol for exertional and non-exertional heat stroke emergencies.',
    emergencyCallThreshold: [
      'Extremely elevated body temperature (≥ 40°C or 104°F)',
      'Altered mental status: confusion, agitation, slurred speech, delirium, seizures, or coma',
      'Hot, flushed, dry skin OR profuse sweating in exertional heat stroke',
      'Nausea, vomiting, rapid pounding pulse, rapid shallow breathing',
      'Fainting or loss of consciousness'
    ],
    immediateSteps: [
      {
        stepNumber: 1,
        title: 'Recognize Heat Stroke & Call Emergency Services Instantly',
        action: 'Heat stroke is a medical catastrophe with high mortality if cooling is delayed. Call 911 / 112 / 108 immediately and request an ambulance with cooling capability.',
      },
      {
        stepNumber: 2,
        title: 'Relocate to a Cooler Environment',
        action: 'Move the person out of direct sunlight immediately into an air-conditioned room or dense shade. Remove heavy, excess clothing.',
      },
      {
        stepNumber: 3,
        title: 'Initiate Aggressive Rapid Active Cooling',
        action: 'Cold water immersion (ice bath up to neck) is the fastest, gold-standard method. If an immersion tub is unavailable, aggressively douse or spray the victim with cold water while fanning them vigorously with towels or electric fans (evaporative cooling).',
      },
      {
        stepNumber: 4,
        title: 'Apply Ice Packs to Strategic Great Vessels',
        action: 'Place cold/ice packs wrapped in thin towels on the neck, armpits, and groin where major blood vessels run close to the skin surface.',
      },
      {
        stepNumber: 5,
        title: 'Maintain Airway & Recovery Position if Disoriented',
        action: 'If the victim is confused, vomiting, or loses consciousness, turn them onto their side in the recovery position to prevent airway aspiration. Monitor breathing continuously.',
        warning: 'DO NOT give fluids orally if the victim is confused or drowsy.'
      }
    ],
    criticalContraindications: [
      'NEVER administer antipyretic drugs like aspirin, acetaminophen (paracetamol), or ibuprofen (heat stroke is an environmental thermal failure, not a pyrogen-driven hypothalamic fever reset; antipyretics will worsen liver and kidney damage and increase coagulopathy).',
      'NEVER force oral fluids down the throat of a confused, vomiting, or semi-conscious patient (causes fatal pulmonary aspiration).',
      'NEVER delay emergency active cooling to wait for transport (every minute above 40°C multiplies permanent brain damage risk).'
    ],
    citations: [
      {
        authority: 'Centers for Disease Control and Prevention (CDC)',
        documentTitle: 'Extreme Heat: First Aid for Heat-Related Illnesses',
        yearOrVersion: 'CDC National Center for Environmental Health',
        officialUrl: 'https://www.cdc.gov/disasters/extremeheat/warning.html',
        verificationStatus: 'VERIFIED_OFFICIAL'
      },
      {
        authority: 'National Athletic Trainers’ Association (NATA)',
        documentTitle: 'Position Statement: Exertional Heat Illnesses',
        yearOrVersion: 'Journal of Athletic Training Consensus',
        officialUrl: 'https://www.nata.org/practice-patient-care/health-issues/heat-illness',
        verificationStatus: 'VERIFIED_OFFICIAL'
      },
      {
        authority: 'World Health Organization (WHO)',
        documentTitle: 'Heatwaves and Health: Guidance on Prevention and Emergency Response',
        yearOrVersion: 'WHO/WMO Joint Technical Guidance',
        officialUrl: 'https://www.who.int/news-room/fact-sheets/detail/climate-change-heat-and-health',
        verificationStatus: 'VERIFIED_OFFICIAL'
      }
    ],
    keywords: ['heat stroke', 'heat exhaustion', 'high fever', 'collapsed in heat', 'sunstroke', 'body too hot', 'dehydration delirium']
  }
};

/**
 * Standard Refusal Responses and Safety Disclaimers
 */
export const SAFETY_RESPONSES = {
  GLOBAL_DISCLAIMER: "LEGAL & CLINICAL SAFETY NOTICE: First Aid Guardian is an educational emergency first-aid assistance tool designed for the CSE276 Artificial Intelligence Foundations project. It does NOT provide medical diagnosis, clinical prognosis, or pharmaceutical prescriptions. In any real-world life-threatening emergency, immediately summon professional emergency services (e.g., 911 / 112 / 108 / 999).",
  
  MEDICATION_REFUSAL: {
    category: 'MEDICATION_RESTRICTION',
    title: 'Medication Recommendation Refused',
    message: "I cannot prescribe medications, suggest pharmaceutical drug names, or calculate drug dosages. First Aid Guardian is strictly bounded to non-pharmacological emergency first-aid protocols. Recommending medications without clinical examination, patient allergy history, and laboratory verification presents severe risks of anaphylaxis or toxicity.",
    actionableGuidance: "Please consult a licensed physician, clinical specialist, or registered pharmacist for medication prescriptions and dosage calculations."
  },

  DIAGNOSIS_REFUSAL: {
    category: 'DIAGNOSTIC_RESTRICTION',
    title: 'Medical Diagnosis Refused',
    message: "I cannot diagnose illnesses, diseases, laboratory test reports, or clinical pathologies. Automated AI systems cannot substitute for in-person physical examinations, imaging, or laboratory diagnostic bloodwork.",
    actionableGuidance: "If you are experiencing symptoms, persistent discomfort, or unknown physical anomalies, please visit a certified physician or your nearest emergency medical center."
  },

  DANGEROUS_REMEDY_REFUSAL: {
    category: 'DANGEROUS_INTERVENTION_BLOCKED',
    title: 'Harmful Folk Practice Prohibited',
    message: "CRITICAL SAFETY WARNING: The method or remedy you inquired about is classified as harmful and strictly prohibited by global medical health authorities (e.g., cutting snakebites, applying butter/ice to burns, or blind finger sweeps during choking). These practices drastically elevate the risk of tissue necrosis, infection, or asphyxiation.",
    actionableGuidance: "Only follow recognized non-harmful first-aid protocols from accredited authorities like WHO, Red Cross, and AHA."
  },

  OUT_OF_SCOPE_REFUSAL: {
    category: 'OUT_OF_SCOPE_QUERY',
    title: 'Out of Scope Request',
    message: "This question falls outside the scope of First Aid Guardian. First Aid Guardian is exclusively engineered and verified for emergency first-aid intervention protocols (burns, choking, severe bleeding, fractures, snake bites, and heat stroke).",
    actionableGuidance: "Please submit an emergency first-aid scenario to receive verified step-by-step guidance."
  },

  UNAVAILABLE_PROTOCOL_REFUSAL: {
    category: 'UNVERIFIED_DATA_UNAVAILABLE',
    title: 'Verified Information Unavailable',
    message: "Notice: Verified first-aid protocol information is currently unavailable from accredited health authorities for this specific inquiry. To preserve strict medical safety and eliminate AI hallucinations, First Aid Guardian refuses to fabricate unverified first-aid steps.",
    actionableGuidance: "For immediate guidance, contact local emergency services or consult the official World Health Organization / Red Cross clinical portals."
  }
};
