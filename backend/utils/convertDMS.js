export const dmsToDecimal = (dms) => {
  // Match DMS pattern: degrees, minutes, optional seconds, and direction
  const regex = /(\d+)°\s*(\d+)'?\s*(\d+(\.\d+)?)?"?\s*([NSEW])/i;
  const match = dms.match(regex);

  if (!match) {
    throw new Error('Invalid DMS format. Expected format: "29°53\'28.6"N"');
  }

  const degrees = parseFloat(match[1]);
  const minutes = parseFloat(match[2]);
  const seconds = parseFloat(match[3]) || 0; // Default to 0 if seconds are missing
  const direction = match[5].toUpperCase();

  let decimal = degrees + minutes / 60 + seconds / 3600;

  // Negate for South or West
  if (direction === "S" || direction === "W") {
    decimal *= -1;
  }

  return decimal;
};
