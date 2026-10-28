/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * CSE276 Artificial Intelligence Foundations - First Aid Guardian
 * Safety Classification & Guardrail Verification Engine
 */

import { VERIFIED_PROTOCOLS, SAFETY_RESPONSES, FirstAidProtocol } from '../data/protocols.ts';
import { TestCaseCategory } from '../data/evaluationSuite.ts';

export interface GuardrailDecision {
  action: 'ACCEPT' | 'REFUSE';
  category: TestCaseCategory;
  matchedProtocol?: FirstAidProtocol;
  refusalTitle?: string;
  refusalMessage?: string;
  actionableGuidance?: string;
  isEmergencyAlert: boolean;
  emergencyDispatchInstructions?: string[];
  safetyRationale: string;
  sourceCitations?: Array<{ authority: string; documentTitle: string; officialUrl: string }>;
  verifiedInformationAvailable: boolean;
}

/**
 * Deterministic Clinical Safety Classifier & Guardrail Analyzer
 */
export function classifyPromptSafety(userPrompt: string): GuardrailDecision {
  const normalized = userPrompt.toLowerCase().trim();

  // 1. Check for Medication & Dosage requests (HIGH RISK - MUST REFUSE)
  const medicationRegex = /\b(dosage|dose|dosages|how much mg|how many mg|milligrams?|prescription|prescribe|tablet|tablets|pill|pills|antibiotic|antibiotics|painkiller|painkillers|paracetamol|acetaminophen|ibuprofen|aspirin|tylenol|amoxicillin|tramadol|codeine|morphine|syrup|ointment to take|what medicine|which medicine|give.*medicine)\b/i;
  if (medicationRegex.test(normalized)) {
    return {
      action: 'REFUSE',
      category: 'UNSAFE_MEDICATION_PRESCRIPTION',
      refusalTitle: SAFETY_RESPONSES.MEDICATION_REFUSAL.title,
      refusalMessage: SAFETY_RESPONSES.MEDICATION_REFUSAL.message,
      actionableGuidance: SAFETY_RESPONSES.MEDICATION_REFUSAL.actionableGuidance,
      isEmergencyAlert: false,
      safetyRationale: 'Strict ethical guardrail: Automated AI is prohibited from prescribing drugs or calculating dosages due to lethal allergy, overdose, and contraindication risks.',
      verifiedInformationAvailable: true
    };
  }

  // 2. Check for Medical Diagnosis requests (HIGH RISK - MUST REFUSE)
  const diagnosisRegex = /\b(diagnose|diagnosis|do i have|could this be|is this (cancer|melanoma|malignant|benign|appendicitis|pneumonia|covid|sepsis|diabetes|stroke|a tumor)|what disease do i have|interpret my (blood test|lab report|hba1c|glucose level|ecg|x-ray|mri))\b/i;
  if (diagnosisRegex.test(normalized)) {
    return {
      action: 'REFUSE',
      category: 'UNSAFE_DIAGNOSIS_REQUEST',
      refusalTitle: SAFETY_RESPONSES.DIAGNOSIS_REFUSAL.title,
      refusalMessage: SAFETY_RESPONSES.DIAGNOSIS_REFUSAL.message,
      actionableGuidance: SAFETY_RESPONSES.DIAGNOSIS_REFUSAL.actionableGuidance,
      isEmergencyAlert: false,
      safetyRationale: 'Clinical safety boundary: Non-clinical AI systems cannot perform differential diagnoses without certified physical palpation and diagnostic imaging.',
      verifiedInformationAvailable: true
    };
  }

  // 3. Check for Dangerous Folk Practices & Hazardous Contraindications (CRITICAL REFUSAL / WARNING)
  const dangerousSnakebite = /(cut|slash|slice|incise|suck|suction|mouth).*snake|razor.*venom|tourniquet.*snake|electric shock.*snake/i;
  const dangerousBurn = /(butter|toothpaste|cooking oil|grease|turmeric|flour|ice).*burn/i;
  const dangerousChoking = /(blind finger sweep|sweep.*throat.*infant|water.*choking victim)/i;
  const dangerousSurgery = /(thoracotomy|open chest|surgery at home|kitchen surgery|amputate myself)/i;
  const dangerousHeat = /(give.*ice water.*unconscious|aspirin.*heat stroke|paracetamol.*heat stroke)/i;

  if (dangerousSnakebite.test(normalized) || dangerousBurn.test(normalized) || dangerousChoking.test(normalized) || dangerousSurgery.test(normalized) || dangerousHeat.test(normalized)) {
    let specificDanger = "This proposed intervention is medically contraindicated.";
    if (dangerousSnakebite.test(normalized)) {
      specificDanger = "Cutting snakebites or sucking venom causes extensive tissue necrosis, nerve damage, and secondary bacterial infections while removing virtually zero venom. Health authorities strictly ban this practice.";
    } else if (dangerousBurn.test(normalized)) {
      specificDanger = "Applying butter, toothpaste, oils, or ice to burns traps thermal energy deep in cutaneous layers, increases burn depth, and causes severe microbial contamination.";
    } else if (dangerousChoking.test(normalized)) {
      specificDanger = "Blind finger sweeps in the airway push foreign objects deeper into the vocal cords, converting partial airway blockage into fatal total asphyxiation.";
    } else if (dangerousSurgery.test(normalized)) {
      specificDanger = "Invasive surgical procedures must never be attempted outside accredited hospital operating theaters.";
    } else if (dangerousHeat.test(normalized)) {
      specificDanger = "Administering oral fluids to unconscious heat stroke victims induces pulmonary aspiration, and antipyretics cause acute hepatic and renal collapse in heat stroke.";
    }

    return {
      action: 'REFUSE',
      category: 'UNSAFE_DANGEROUS_FOLK_PRACTICE',
      refusalTitle: SAFETY_RESPONSES.DANGEROUS_REMEDY_REFUSAL.title,
      refusalMessage: `${SAFETY_RESPONSES.DANGEROUS_REMEDY_REFUSAL.message}\n\nEVIDENCE RATIONALE: ${specificDanger}`,
      actionableGuidance: "Discontinue any harmful interventions immediately. Refer exclusively to accredited Red Cross / WHO non-invasive first-aid protocols.",
      isEmergencyAlert: true,
      safetyRationale: 'Harm mitigation guardrail: Intercepted known harmful folk remedy contraindicated by international resuscitation and burn councils.',
      verifiedInformationAvailable: true
    };
  }

  // 4. Check for Out-of-Scope queries (General non-medical, coding, homework, trivia)
  const outOfScopeKeywords = /\b(python|javascript|java|c\+\+|algorithm|dijkstra|quicksort|binary search|write a poem|write code|who won|world cup|capital of|president of|recipe for chocolate|stock market|cryptocurrency|movie recommendation)\b/i;
  const firstAidKeywords = /\b(first aid|burn|scald|chok|bleed|blood|wound|fracture|broken bone|snake|bite|heat stroke|sunstroke|cpr|cpr|emergency|ambulance|resuscitation|injured|faint|unconscious)\b/i;

  if (outOfScopeKeywords.test(normalized) && !firstAidKeywords.test(normalized)) {
    return {
      action: 'REFUSE',
      category: 'OUT_OF_SCOPE_QUERY',
      refusalTitle: SAFETY_RESPONSES.OUT_OF_SCOPE_REFUSAL.title,
      refusalMessage: SAFETY_RESPONSES.OUT_OF_SCOPE_REFUSAL.message,
      actionableGuidance: SAFETY_RESPONSES.OUT_OF_SCOPE_REFUSAL.actionableGuidance,
      isEmergencyAlert: false,
      safetyRationale: 'Domain boundary enforcement: Safeguards model purpose by refusing general computing or trivia prompts.',
      verifiedInformationAvailable: true
    };
  }

  // 5. Check for Fictional / Alien / Ambiguous Unverified Scenarios
  const unverifiedKeywords = /\b(alien bite|extraterrestrial|werewolf|vampire|zombie bite|space laser|magic potion|telepathic wound|dragon fire)\b/i;
  if (unverifiedKeywords.test(normalized)) {
    return {
      action: 'REFUSE',
      category: 'AMBIGUOUS_UNVERIFIED_SCENARIO',
      refusalTitle: SAFETY_RESPONSES.UNAVAILABLE_PROTOCOL_REFUSAL.title,
      refusalMessage: SAFETY_RESPONSES.UNAVAILABLE_PROTOCOL_REFUSAL.message,
      actionableGuidance: "Consult certified trauma medical professionals or poison control authorities for unusual or undocumented environmental injuries.",
      isEmergencyAlert: false,
      safetyRationale: 'Anti-hallucination guardrail: Health authority protocols do not exist for this prompt; system refuses rather than inventing non-existent clinical guidance.',
      verifiedInformationAvailable: false
    };
  }

  // 6. Match against Verified First-Aid Protocols
  // Check burns
  if (/\b(burn|burns|burned|scalding|scald|hot water|hot oil|hot kettle|fire|flame|steam|blister.*water)\b/i.test(normalized)) {
    const proto = VERIFIED_PROTOCOLS.burns;
    return {
      action: 'ACCEPT',
      category: 'SAFE_PROTOCOL_GUIDANCE',
      matchedProtocol: proto,
      isEmergencyAlert: true,
      emergencyDispatchInstructions: proto.emergencyCallThreshold,
      safetyRationale: 'Validated against World Health Organization (WHO) and American Burn Association (ABA) first aid guidelines.',
      sourceCitations: proto.citations.map(c => ({ authority: c.authority, documentTitle: c.documentTitle, officialUrl: c.officialUrl })),
      verifiedInformationAvailable: true
    };
  }

  // Check choking
  if (/\b(chok|choking|clutch.*throat|cannot.*(speak|breathe|cough)|throat.*blocked|food.*stuck|heimlich|strangling on food|airway obstruction|back blow|back blows)\b/i.test(normalized)) {
    const proto = VERIFIED_PROTOCOLS.choking;
    return {
      action: 'ACCEPT',
      category: 'SAFE_PROTOCOL_GUIDANCE',
      matchedProtocol: proto,
      isEmergencyAlert: true,
      emergencyDispatchInstructions: proto.emergencyCallThreshold,
      safetyRationale: 'Validated against American Heart Association (AHA) and ILCOR foreign body airway obstruction guidelines.',
      sourceCitations: proto.citations.map(c => ({ authority: c.authority, documentTitle: c.documentTitle, officialUrl: c.officialUrl })),
      verifiedInformationAvailable: true
    };
  }

  // Check severe bleeding
  if (/\b(bleed|bleeding|blood|hemorrhage|spurting|gash|deep cut|deep.*laceration|artery|severed|tourniquet|stab wound|laceration)\b/i.test(normalized)) {
    const proto = VERIFIED_PROTOCOLS.severe_bleeding;
    return {
      action: 'ACCEPT',
      category: 'SAFE_PROTOCOL_GUIDANCE',
      matchedProtocol: proto,
      isEmergencyAlert: true,
      emergencyDispatchInstructions: proto.emergencyCallThreshold,
      safetyRationale: 'Validated against American College of Surgeons (Stop the Bleed) and American Red Cross trauma standards.',
      sourceCitations: proto.citations.map(c => ({ authority: c.authority, documentTitle: c.documentTitle, officialUrl: c.officialUrl })),
      verifiedInformationAvailable: true
    };
  }

  // Check fractures
  if (/\b(fracture|fractured|broken bone|broken leg|broken arm|broken wrist|bone snap|snap.*leg|snap.*bone|bone.*snap|dislocated|deformed limb|bent leg|bone poking|stabilize.*leg|splint)\b/i.test(normalized) || (/snap/i.test(normalized) && /(leg|arm|bone|limb)/i.test(normalized))) {
    const proto = VERIFIED_PROTOCOLS.fractures;
    return {
      action: 'ACCEPT',
      category: 'SAFE_PROTOCOL_GUIDANCE',
      matchedProtocol: proto,
      isEmergencyAlert: true,
      emergencyDispatchInstructions: proto.emergencyCallThreshold,
      safetyRationale: 'Validated against American Academy of Orthopaedic Surgeons (AAOS) and St. John Ambulance guidelines.',
      sourceCitations: proto.citations.map(c => ({ authority: c.authority, documentTitle: c.documentTitle, officialUrl: c.officialUrl })),
      verifiedInformationAvailable: true
    };
  }

  // Check snake bites
  if (/\b(snake|snakebite|snake bite|viper|cobra|fang|envenom|rattlesnake|mamba|krait)\b/i.test(normalized) || (/bitten/i.test(normalized) && /(snake|viper|cobra|fang)/i.test(normalized))) {
    const proto = VERIFIED_PROTOCOLS.snake_bites;
    return {
      action: 'ACCEPT',
      category: 'SAFE_PROTOCOL_GUIDANCE',
      matchedProtocol: proto,
      isEmergencyAlert: true,
      emergencyDispatchInstructions: proto.emergencyCallThreshold,
      safetyRationale: 'Validated against World Health Organization (WHO) Snakebite Management Guidelines and CDC protocols.',
      sourceCitations: proto.citations.map(c => ({ authority: c.authority, documentTitle: c.documentTitle, officialUrl: c.officialUrl })),
      verifiedInformationAvailable: true
    };
  }

  // Check heat stroke
  if (/\b(heat stroke|heatstroke|sunstroke|heat exhaustion|collapsed.*heat|delirious.*sun|delirious.*heat|hyperthermia|body temperature 104|passed out in heat|boiling hot.*skin|42°c|104°f)\b/i.test(normalized) || (/collapsed/i.test(normalized) && /(heat|sun|temperature|42°c)/i.test(normalized))) {
    const proto = VERIFIED_PROTOCOLS.heat_stroke;
    return {
      action: 'ACCEPT',
      category: 'SAFE_PROTOCOL_GUIDANCE',
      matchedProtocol: proto,
      isEmergencyAlert: true,
      emergencyDispatchInstructions: proto.emergencyCallThreshold,
      safetyRationale: 'Validated against CDC Extreme Heat First Aid and National Athletic Trainers’ Association (NATA) guidelines.',
      sourceCitations: proto.citations.map(c => ({ authority: c.authority, documentTitle: c.documentTitle, officialUrl: c.officialUrl })),
      verifiedInformationAvailable: true
    };
  }

  // If prompt has some first aid intent but no verified protocol found in accredited authority database:
  if (firstAidKeywords.test(normalized)) {
    return {
      action: 'REFUSE',
      category: 'AMBIGUOUS_UNVERIFIED_SCENARIO',
      refusalTitle: SAFETY_RESPONSES.UNAVAILABLE_PROTOCOL_REFUSAL.title,
      refusalMessage: SAFETY_RESPONSES.UNAVAILABLE_PROTOCOL_REFUSAL.message,
      actionableGuidance: "Please specify one of our 6 verified first-aid emergency domains: Burns, Choking, Severe Bleeding, Fractures, Snake Bites, or Heat Stroke.",
      isEmergencyAlert: false,
      safetyRationale: 'Notice: Specific verified protocol not indexed. Refused to prevent hallucination of non-standard clinical steps.',
      verifiedInformationAvailable: false
    };
  }

  // Default fallback: Out of scope refusal
  return {
    action: 'REFUSE',
    category: 'OUT_OF_SCOPE_QUERY',
    refusalTitle: SAFETY_RESPONSES.OUT_OF_SCOPE_REFUSAL.title,
    refusalMessage: SAFETY_RESPONSES.OUT_OF_SCOPE_REFUSAL.message,
    actionableGuidance: SAFETY_RESPONSES.OUT_OF_SCOPE_REFUSAL.actionableGuidance,
    isEmergencyAlert: false,
    safetyRationale: 'Default boundary guardrail triggered: Query does not match accredited emergency first-aid protocols.',
    verifiedInformationAvailable: true
  };
}
