export function formatSecondsToMinutes(seconds: number) {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secondsRemaining = String(seconds % 60).padStart(2, '0');
  return `${minutes}:${secondsRemaining}`;
}
