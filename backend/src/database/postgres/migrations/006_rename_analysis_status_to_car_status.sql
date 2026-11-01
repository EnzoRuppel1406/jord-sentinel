ALTER TABLE analyses 
RENAME COLUMN analysis_status TO car_status;

ALTER TYPE analysis_status_type RENAME TO car_status_type;  
ALTER TYPE car_status_type RENAME VALUE 'free' TO 'active';
ALTER TYPE car_status_type RENAME VALUE 'conditional' TO 'pending';
ALTER TYPE car_status_type RENAME VALUE 'restricted' TO 'cancelled';
ALTER TYPE car_status_type ADD VALUE IF NOT EXISTS 'suspended';