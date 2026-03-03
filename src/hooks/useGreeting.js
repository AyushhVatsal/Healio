export default function useGreeting(userTimeZone = null) {
  // 1️⃣ Resolve timezone (backend or browser)
  const timeZone =
    userTimeZone ||
    Intl.DateTimeFormat().resolvedOptions().timeZone;

  // 2️⃣ Get current time
  const now = new Date();

  // 3️⃣ Format hour according to timezone
  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: false, // 24-hour format
    timeZone,
  });

  const hour = parseInt(formatter.format(now), 10);
//   !use it to convert the number in the string format (formatter.format(now)) 
//   !parseInt is used to convert the string to a number before comparison

  // 4️⃣ Determine greeting based on hour
  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";
  if (hour >= 17 && hour < 21) return "Good Evening";
  return "Late evening check-in";
}