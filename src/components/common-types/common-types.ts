export interface DataType {
    data: DataType[];
    "id": string;
    "type": string,
    "severity": string,
    "kill_chain_phase": string,
    "timestamp": string,
    "attacker.id": string,
    "attacker.ip": string,
    "attacker.name": string,
    "attacker.port": number,
    "decoy.id": number,
    "decoy.name": string,
    "decoy.group": string,
    "decoy.ip": string,
    "decoy.port": number,
    "decoy.type" : string
}


export type SeverityType = 'low' | 'medium' | 'high' | ''