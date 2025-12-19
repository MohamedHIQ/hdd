export interface HDDPart {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  color: string;
}

export type PartId = 
  | 'base' 
  | 'platter' 
  | 'spindle' 
  | 'tape_seal'
  | 'actuator' 
  | 'actuator_axis'
  | 'arm' 
  | 'head' 
  | 'ribbon'
  | 'connector_scsi' 
  | 'connector_power' 
  | 'jumper_pins'
  | 'jumper'
  | 'cover_mount_holes'
  | 'case_mount_holes';