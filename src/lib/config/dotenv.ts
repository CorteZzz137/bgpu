import dotenv from 'dotenv';

dotenv.config();

function getEnvString(envVarName: string, fallback?: string): string {
	const result = process.env[envVarName]?.trim();
	if (fallback === undefined && !result)
		throw new Error(`Missing required environmnet variable: ${envVarName}`);
	return (result || fallback)!;
}

function getEnvInteger(envVarName: string, fallback?: number): number {
	const result = Number.parseInt(process.env[envVarName]!);
	const isNan = Number.isNaN(result);
	if (fallback === undefined && isNan)
		throw new Error(`Missing required environmnet variable: ${envVarName}`);
	return (isNan ? fallback : result)!;
}

export const mongoUri = getEnvString('DB_URI');

export const jwtValidityDays = getEnvInteger('JWT_VALIDITY_DAYS', 28);
export const jwtSecret = getEnvString('JWT_SECRET');
